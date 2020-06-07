import React from "react";
import Menu from "./Menu";
import { Jumbotron, Container } from "reactstrap";
const Base = ({
  title,
  description,
  className = "container text-dark",
  children
}) => {
  return (
    <>
      <Menu />
      <Container fluid>
        <Jumbotron className="text-center p-0 bg-white">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </Jumbotron>
      </Container>
      <div className={className}>{children}</div>
      <footer className="fixed-bottom p-3 text-white text-center text-uppercase bg-dark">
        Library App with React and Express
      </footer>
    </>
  );
};

export default Base;
