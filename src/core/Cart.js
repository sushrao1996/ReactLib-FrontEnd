import React, { useState, useEffect } from "react";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import MyCard from "./Card";
import { Row, Col, Button } from "reactstrap";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  const loadAllProducts = products => {
    return (
      <Row className="text-center mb-5 p-2">
        {products.map((product, index) => (
          <Col md={4} key={index} className="mb-3">
            <MyCard
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          </Col>
        ))}
      </Row>
    );
  };
  const onPurchase = () => {
    const orderData = {
      products: products
    };
    createOrder(userId, token, orderData);
  };
  return (
    <Base title="Cart Page">
      <Row>
        <Col md={6} className="offset-md-3 text-center p-2">
          <Button
            className="btn btn-success btn-lg text-center"
            onClick={onPurchase}
          >
            Checkout
          </Button>
        </Col>
      </Row>
      {products.length > 0 ? (
        loadAllProducts(products)
      ) : (
        <h3 className="text-center">No Books in Cart!</h3>
      )}
    </Base>
  );
};

export default Cart;
