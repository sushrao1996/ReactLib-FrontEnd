import React from "react";
import Base from "../core/Base";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  NavLink
} from "reactstrap";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email }
  } = isAuthenticated();
  const AdminLeft = () => {
    return (
      <Card>
        <CardHeader className="bg-dark text-white">
          <h4>Admin Navigation</h4>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <NavLink
                tag={Link}
                to="/admin/create/category"
                className="text-success"
              >
                Create Category
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                tag={Link}
                to="/admin/categories"
                className="text-success"
              >
                Manage Category
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink
                tag={Link}
                to="/admin/create/product"
                className="text-success"
              >
                Create Product
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink tag={Link} to="/admin/products" className="text-success">
                Manage Products
              </NavLink>
            </ListGroupItem>
            <ListGroupItem>
              <NavLink tag={Link} to="/admin/orders" className="text-success">
                Manage Orders
              </NavLink>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  };

  const AdminRight = () => {
    return (
      <Card>
        <CardHeader>
          <h4>Admin Information</h4>
        </CardHeader>
        <CardBody>
          <ListGroup>
            <ListGroupItem>
              <span className="badge badge-success p-2 mr-2">Name</span> {name}
            </ListGroupItem>
            <ListGroupItem>
              <span className="badge badge-success p-2 mr-2">Email</span>{" "}
              {email}
            </ListGroupItem>
            <ListGroupItem>
              <span className="badge badge-danger p-2 mr-2">Admin Area</span>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    );
  };
  return (
    <Base className="container bg-success p-3" title="Welcome to Admin area">
      <Row>
        <Col md={3}>{AdminLeft()}</Col>
        <Col md={9}>{AdminRight()}</Col>
      </Row>
    </Base>
  );
};

export default AdminDashboard;
