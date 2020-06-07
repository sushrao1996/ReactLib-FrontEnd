import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardHeader,
  CardFooter
} from "reactstrap";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const MyCard = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = f => f
}) => {
  const [redirect, setRedirect] = useState(false);
  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };
  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <Button onClick={addToCart} className="btn btn-block btn-success mb-2">
          Add to Cart
        </Button>
      )
    );
  };
  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <Button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-danger btn-block mb-2"
        >
          Remove from Cart
        </Button>
      )
    );
  };
  return (
    <div>
      <Card className="text-white bg-dark border border-info">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>{product.description}</CardSubtitle>
        </CardHeader>
        <CardBody>
          {getARedirect(redirect)}
          <ImageHelper product={product} />
          <CardText>{product.category.name}</CardText>
        </CardBody>
        <CardFooter>
          {showAddToCart(addtoCart)}
          {showRemoveFromCart(removeFromCart)}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyCard;
