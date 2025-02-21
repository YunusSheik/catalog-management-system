import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "./context/DataContext";
import "./ProductDetails.css";
import { Avatar } from "@mui/material";

const ProductDetails = () => {
  const { products } = useContext(ProductContext);
  const { productId, name, skuCode, category } = useParams();

  const product = products.find(
    (p) =>
      p.id === productId ||
      p.sku_code === skuCode ||
      p.main_category === category ||
      p.name === name
  );

  if (!product) {
    return <p>Product details not found.</p>;
  }

  return (
    <div className="product-details">
      <div className="product-header">
        <Avatar
          src={product.imageUrl}
          alt={product.name}
          variant="square"
          style={{ marginLeft: "1rem" }}
        />
        <h2>{product.name}</h2>
      </div>
      <p>{product.description}</p>
      <p>SKU Code: {product.sku_code ? product.sku_code : "N/A"}</p>
      <p>
        Main Category: {product.main_category ? product.main_category : "N/A"}
      </p>
      <p>GTIN: {product.gtin ? product.gtin : "N/A"}</p>
      <p>
        Selling Unit:{" "}
        {product.sellingUnit === "nos" ? "0 nos" : product.sellingUnit}
      </p>
      <p>MRP: ₹{product.mrp?.mrp || "N/A"}</p>
      <p>
        Country of Origin:{" "}
        {product.country_of_origin ? product.country_of_origin : "N/A"}
      </p>
      <p>
        Activation Date:{" "}
        {product.activation_date ? product.activation_date : "N/A"}
      </p>
      <p>
        Deactivation Date:{" "}
        {product.deactivation_date ? product.deactivation_date : "N/A"}
      </p>
    </div>
  );
};

export default ProductDetails;
