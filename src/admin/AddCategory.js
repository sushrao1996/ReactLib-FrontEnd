import React, { useState } from "react";
import Base from "../core/Base";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const onChangeHandler = event => {
    setName(event.target.value);
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
  const onSubmit = event => {
    event.preventDefault();
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setSuccess(true);
          setName("");
        }
      })
      .catch(err => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };
  const createCategoryForm = () => {
    return (
      <Form>
        <FormGroup>
          <Label for="category" className="lead">
            Enter the Category
          </Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={name}
            onChange={onChangeHandler}
            placeholder="For Ex.Adventure"
            required
            autoFocus
          />
          <br />
          <Button onClick={onSubmit} outline color="success">
            Create Category
          </Button>
        </FormGroup>
      </Form>
    );
  };
  return (
    <Base className="container bg-success p-3" title="Create Category">
      <Row className="bg-white rounded m-3 p-2">
        <Col md={8} className="offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createCategoryForm()}
          {goBack()}
        </Col>
      </Row>
    </Base>
  );
};

export default AddCategory;
