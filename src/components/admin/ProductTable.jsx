import React, { useState } from "react";
import {
  useAdminProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../../hooks/admin/useAdminProduct";
import "./ProductTable.css";

const getImageUrl = (filename) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
  return filename ? `${BASE_URL}/uploads/${filename}` : "";
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
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  // State to handle editing
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    team: "",
    type: "",
    size: "",
    price: "",
  });

  // Open edit form modal with prefilled data
  const openEditForm = (product) => {
    setEditingProduct(product);
    setEditForm({
      team: product.team || "",
      type: product.type || "",
      size: product.size || "",
      price: product.price || "",
    });
  };

  // Close edit form modal
  const closeEditForm = () => {
    setEditingProduct(null);
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edited data
  const submitEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedData = {
      ...editForm,
      price: Number(editForm.price),
    };

    updateProduct(
      { id: editingProduct._id, data: updatedData },
      {
        onSuccess: () => {
          alert("Product updated!");
          closeEditForm();
          refetch();
        },
        onError: (err) => {
          alert(err?.response?.data?.message || "Failed to update");
        },
      }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(id, {
        onSuccess: () => {
          alert("Deleted");
          refetch();
        },
        onError: (err) => {
          alert(err?.response?.data?.message || "Error deleting");
        },
      });
    }
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-table-container">
      <h2>Product Management</h2>

      <div className="product-controls">
        <div>
          <label>Show</label>
          <select
            value={pagination.limit || 10}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="product-select"
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            value={search || ""}
            onChange={(e) => {
              setPageNumber(1);
              setSearch(e.target.value);
            }}
            placeholder="Search team or type..."
            className="product-search"
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
            <th>Price</th>
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
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.productImage ? (
                    <img
                      src={getImageUrl(p.productImage)}
                      alt="jersey"
                      className="product-image"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{p.team}</td>
                <td>{p.type}</td>
                <td>{p.size}</td>
                <td>Rs. {p.price}</td>
                <td className="product-actions">
                  <button className="edit-btn" onClick={() => openEditForm(p)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p._id)}
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
        <button
          disabled={!canPreviousPage}
          onClick={() => setPageNumber((n) => n - 1)}
        >
          Prev
        </button>
        <span>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </span>
        <button
          disabled={!canNextPage}
          onClick={() => setPageNumber((n) => n + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h3>Edit Product</h3>
            <form onSubmit={submitEdit}>
              <label>
                Team:
                <input
                  name="team"
                  value={editForm.team}
                  onChange={handleEditChange}
                  required
                  placeholder="Enter team name"
                />
              </label>
              <label>
                Type:
                <input
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                  required
                  placeholder="Enter type"
                />
              </label>
              <label>
                Size:
                <input
                  name="size"
                  value={editForm.size}
                  onChange={handleEditChange}
                  required
                  placeholder="Enter size"
                />
              </label>
              <label>
                Price:
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  required
                  min="0"
                  placeholder="Enter price"
                />
              </label>
              <div className="edit-buttons">
                <button
                  type="submit"
                  disabled={isUpdating}
                  title="Save changes"
                  className="btn-save"
                >
                  ✔ Save
                </button>
                <button
                  type="button"
                  onClick={closeEditForm}
                  title="Cancel editing"
                  className="btn-cancel"
                >
                  ✖ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
