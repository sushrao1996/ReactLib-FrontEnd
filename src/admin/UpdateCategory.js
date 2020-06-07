import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  const preload = categoryId => {
    getCategory(categoryId)
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setName(data.name);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

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
    updateCategory(match.params.categoryId, user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          console.log(data);
          setName(data.name);
          setSuccess(true);
        }
      })
      .catch(err => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };
  const createCategoryForm = () => {
    return (
      <Form>
        <FormGroup>
          <Label for="category" className="lead">
            Update Category
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
            Update Category
          </Button>
        </FormGroup>
      </Form>
    );
  };
  return (
    <Base className="container bg-success p-3" title="Update Category">
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

export default UpdateCategory;
