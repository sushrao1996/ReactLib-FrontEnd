import React, { useState } from "react";
import Base from "../core/Base";
import {
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";
import { signup } from "../auth";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });
  const { name, email, password, error, success } = values;
  const onChangeHandler = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(err => console.log(err));
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created succesfully.
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signUpForm = () => {
    return (
      <Container className="text-center">
        <Row>
          <Col md={6} className="offset-md-3">
            <Card>
              <CardHeader>SignUp</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <InputGroup>
                      <Label for="name" sm={3}>
                        Name
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={onChangeHandler("name")}
                          placeholder="Enter your name"
                        />
                      </Col>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup row>
                    <InputGroup>
                      <Label for="email" sm={3}>
                        Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={onChangeHandler("email")}
                          placeholder="Enter your email"
                        />
                      </Col>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup row>
                    <InputGroup>
                      <Label for="password" sm={3}>
                        Password
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={onChangeHandler("password")}
                          placeholder="Enter your password"
                        />
                      </Col>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={onSubmit} block>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <>
      <Base>
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-center text-black">{JSON.stringify(values)}</p>
      </Base>
    </>
  );
};

export default Signup;
