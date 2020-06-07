import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth";
import {
  getProduct,
  getCategories,
  updateProduct
} from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    photo: "",
    stock: "",
    categories: [],
    error: "",
    createdProduct: "",
    loading: false,
    getaRedirect: false,
    formData: ""
  });
  const {
    name,
    description,
    categories,
    category,
    loading,
    stock,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;
  const { user, token } = isAuthenticated();
  const preloadCategories = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ categories: data, formData: new FormData() });
        }
      })
      .catch(err => console.log(err));
  };
  const preload = productId => {
    getProduct(productId)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            category: data.category._id,
            stock: data.stock,
            formData: new FormData()
          });
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.file[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            stock: "",
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
        <h4 className="text-success">{createdProduct} updated successfully</h4>
      );
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update product</h4>;
    }
  };

  const updateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
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
          onChange={handleChange("stock")}
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
        Update Product
      </button>
    </form>
  );
  const goBack = () => {
    return (
      <div className="mt-4">
        <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3 p-2">
          Admin Home
        </Link>
      </div>
    );
  };
  return (
    <Base title="Update Book">
      {goBack()}
      <Row className="bg-dark text-white rounded">
        <Col md={8} className="offset-md-2">
          {successMessage()}
          {warningMessage()}
          {updateProductForm()}
        </Col>
      </Row>
    </Base>
  );
};

export default UpdateProduct;
