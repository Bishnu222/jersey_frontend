import React from 'react';
import { useAdminProduct } from '../../hooks/admin/useAdminProduct';
import './ProductTable.css';

export default function ProductTable() {
  const {
    data,
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

  if (error) return <>{error.message}</>;
  // if (isPending) return <>Loading....</>;

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
    setPageNumber(1); // reset page number
    setSearch(e.target.value);
  };

  return (
    <div className="product-table-container">
      <h2 className="product-table-title">Product Table</h2>

      <div className="product-controls">
        <div>
          <label>Show</label>
          <select
            className="product-select"
            value={pagination.limit}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            className="product-search"
            placeholder="Search products..."
            onChange={handleSearch}
            value={search}
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
          {products.map((row) => (
            <tr key={row._id}>
              <td>
                {row.filepath ? (
                  <img
                    src={getBackenedImageUrl(row.filepath)}
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
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next ➡
        </button>
      </div>
    </div>
  );
}