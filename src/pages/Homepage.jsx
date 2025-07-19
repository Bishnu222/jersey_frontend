// src/pages/Homepage.jsx
import React, { useEffect, useState } from "react";
import { getAllProductService } from "../services/admin/productService";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProductService();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              {product.productImage && (
                <img
                  src={product.productImage}
                  alt={product.name}
                  style={{ maxWidth: "150px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Homepage;
