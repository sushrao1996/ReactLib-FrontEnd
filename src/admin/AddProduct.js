import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    photo: "",
    categories: [],
    error: "",
    loading: false,
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });
  const {
    name,
    description,
    category,
    stock,
    categories,
    error,
    loading,
    createdProduct,
    getaRedirect,
    formData
  } = values;
  const { user, token } = isAuthenticated();
  const preload = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const onChangeHandler = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data.name
          });
        }
      })
      .catch(err => console.log(err));
  };
  const successMessage = () => {
    if (createdProduct) {
      return (
        <h4 className="text-success">{createdProduct} created successfully</h4>
      );
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create product</h4>;
    }
  };
  const goBack = () => {
    return (
      <div className="mt-4">
        <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3 p-2">
          Admin Home
        </Link>
      </div>
    );
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={onChangeHandler("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={onChangeHandler("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={onChangeHandler("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <select
          onChange={onChangeHandler("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={onChangeHandler("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base title="Add Book here!" className="container mb-1 p-2">
      <Row>
        <Col md={8} className="offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          {goBack()}
        </Col>
      </Row>
    </Base>
  );
};

export default AddProduct;
