import React from "react";
import { useAdminProduct, useDeleteProduct } from "../../hooks/admin/useAdminProduct";
import "./ProductTable.css";

const getImageUrl = (filename) => {
  if (!filename) return "";
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
  return `${BASE_URL}/uploads/${filename}`;
};

export default function ProductTable() {
  const {
    products = [],
    pagination = {},
    isPending,
    error,
    canNextPage,
    canPreviousPage,
    setPageNumber,
    setPageSize,
    search,
    setSearch,
    refetch,
  } = useAdminProduct();

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleSearch = (e) => {
    setPageNumber(1);
    setSearch(e.target.value);
  };

  const handlePrev = () => {
    if (canPreviousPage) setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canNextPage) setPageNumber((prev) => prev + 1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id, {
        onSuccess: () => {
          alert("Product deleted successfully");
          refetch();
        },
        onError: (err) => {
          alert(err.message || "Failed to delete product");
        },
      });
    }
  };

  if (isPending) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;

  return (
    <div className="product-table-container">
      <h2 className="product-table-title">Product Management</h2>

      <div className="product-controls">
        <div className="control-group">
          <label>Show</label>
          <select
            className="product-select"
            value={pagination.limit || 10}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Search:</label>
          <input
            type="text"
            className="product-search"
            placeholder="Search by team or type..."
            value={search || ""}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Team</th>
            <th>Type</th>
            <th>Size</th>
            <th>Price (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.productImage ? (
                    <img
                      src={getImageUrl(product.productImage)}
                      alt={product.team + " jersey"}
                      className="product-image"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.team}</td>
                <td>{product.type}</td>
                <td>{product.size}</td>
                <td>Rs. {product.price}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => alert("Edit not implemented")}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="product-pagination">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          ⬅ Prev
        </button>
        <span>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
