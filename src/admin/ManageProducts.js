import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { Row, Col } from "reactstrap";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setProducts(data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = productId => {
    console.log(user);
    deleteProduct(productId, user._id, token)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch(err => console.log(err));
  };
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3 p-2">
          Admin Home
        </Link>
      </div>
    );
  };
  return (
    <Base title="Manage Books">
      {goBack()}
      <Row className="text-center bg-info p-4">
        <Col>
          {products.map((product, index) => {
            return (
              <Row key={index}>
                <Col md={4}>
                  <h3 className="text-dark text-left">{product.name}</h3>
                </Col>
                <Col md={4}>
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </Col>
                <Col md={4}>
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Base>
  );
};

export default ManageProducts;
