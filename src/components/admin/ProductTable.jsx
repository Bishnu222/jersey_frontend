import React from 'react';
import { useAdminProduct } from '../../hooks/admin/useAdminProduct';
import { getBackendImageUrl } from '../../utils/backend-image';
import './ProductTable.css';

export default function ProductTable() {
  const {
    error,
    isPending,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct();

  if (error) return <div>Error: {error.message}</div>;
  if (isPending) return <div>Loading products...</div>;

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
    setPageNumber(1);
    setSearch(e.target.value);
  };

  return (
    <div className="product-table-container">
      <h2 className="product-table-title">Product Table</h2>

      <div className="product-controls">
        <div className="product-select-wrapper">
          <label>
            Show
            <select
              className="product-select"
              value={pagination.limit}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </label>
        </div>

        <div className="product-search-wrapper">
          <label>
            Search:
            <input
              type="text"
              className="product-search"
              placeholder="Search products..."
              onChange={handleSearch}
              value={search}
            />
          </label>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="no-results">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((row) => (
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
                <td className="product-price">${row.price}</td>
                <td className="product-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="product-pagination">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          ⬅ Back
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
