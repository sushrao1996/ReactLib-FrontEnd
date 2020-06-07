import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260`;
  return (
    <div>
      <img
        src={imageurl}
        alt="myphoto"
        style={{ height: "318px", width: "250px" }}
        // className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
