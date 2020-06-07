import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {
  getProducts,
  deleteProduct,
  getCategories,
  deleteCategory
} from "./helper/adminapicall";
import { Row, Col } from "reactstrap";
const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, token)
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
    <Base title="Manage Categories">
      {goBack()}
      <Row className="text-center bg-info p-4">
        <Col>
          {categories.map((category, index) => {
            return (
              <Row key={index}>
                <Col md={4}>
                  <h3 className="text-white text-left">{category.name}</h3>
                </Col>
                <Col md={4}>
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </Col>
                <Col md={4}>
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
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

export default ManageCategories;
