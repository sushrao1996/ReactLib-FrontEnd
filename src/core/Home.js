import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Base from "./Base";
import { getProducts } from "../admin/helper/adminapicall";
import MyCard from "./Card";
const Home = () => {
  const [products, setProducts] = useState([]);
  const preload = () => {
    getProducts()
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload();
  }, []);
  return (
    <Base title="Welcome to React Library">
      <Row className="text-center mb-5 p-2">
        {products.map((product, index) => {
          return (
            <Col md={4} key={index} className="mb-4 text-center">
              <MyCard product={product} />
            </Col>
          );
        })}
      </Row>
    </Base>
  );
};

export default Home;
