import React from 'react';
import { useAdminProduct } from '../../hooks/admin/useAdminProduct';
import './ProductTable.css';

// Helper to build full image URL from backend path (adjust as needed)
const getBackendImageUrl = (path) => {
  if (!path) return '';
  // Adjust BASE_URL according to your backend server config
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5050';
  return `${BASE_URL}/${path}`;
};

export default function ProductTable() {
  const {
    error,
    isPending,
    products = [],
    pagination = {},
    canNextPage,
    canPreviousPage,
    setPageNumber,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct();

  if (error) return <div className="error-message">{error.message}</div>;

  if (isPending) return <div className="loading-message">Loading...</div>;

  const handlePrev = () => {
    if (canPreviousPage) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = (e) => {
    setPageNumber(1); // reset to first page on new search
    setSearch(e.target.value);
  };

  return (
    <div className="product-table-container">
      <h2 className="product-table-title">Product Table</h2>

      <div className="product-controls">
        <div>
          <label htmlFor="pageSizeSelect">Show</label>
          <select
            id="pageSizeSelect"
            className="product-select"
            value={pagination.limit || 10}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            id="searchInput"
            type="text"
            className="product-search"
            placeholder="Search products..."
            onChange={handleSearch}
            value={search || ''}
          />
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>
                No products found.
              </td>
            </tr>
          )}
          {products.map((row) => (
            <tr key={row._id}>
              <td>
                {row.filepath ? (
                  <img
                    src={getBackendImageUrl(row.filepath)}
                    alt={row.name}
                    className="product-image"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{row.name}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="product-pagination">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          ⬅ Back
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
