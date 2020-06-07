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
import { signin, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const onChangeHandler = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              loading: false,
              didRedirect: true
            });
          });
        }
      })
      .catch(err => console.log(err));
  };
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <Row>
          <Col md={6} className="offset-md-3 text-left">
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          </Col>
        </Row>
      )
    );
  };

  const errorMessage = () => {
    return (
      <Row>
        <Col md={6} className="offset-md-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </Col>
      </Row>
    );
  };
  const signInForm = () => {
    return (
      <Container className="text-center">
        <Row>
          <Col md={6} className="offset-md-3">
            <Card>
              <CardHeader>SignIn</CardHeader>
              <CardBody>
                <Form>
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
    <Base>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
