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
        console.log("Fetched product data:", data);

        // If the API returns an object like { products: [...] }
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error("Invalid product data format.");
        }
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: "1rem" }}>Loading products...</p>;
  if (error) return <p style={{ padding: "1rem" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>
      {Array.isArray(products) && products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(products) &&
            products.map((product) => (
              <li
                key={product._id}
                style={{
                  marginBottom: "1.5rem",
                  border: "1px solid #ccc",
                  padding: "1rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {product.productImage && (
                  <img
                    src={`http://localhost:5000/${product.productImage}`}
                    alt={product.name}
                    style={{ maxWidth: "150px", height: "auto", borderRadius: "8px" }}
                  />
                )}
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{product.name}</h3>
                  <p style={{ margin: 0 }}>Price: ${product.price}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Homepage;
