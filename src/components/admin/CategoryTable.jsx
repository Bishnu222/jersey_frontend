import React, { useState } from 'react';
import './CategoryTable.css';
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory';
import { getBackenedImageUrl } from '../../utils/backend-image';
import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteModal';

export default function CategoryTable() {
  const { categories = [], error, isPending } = useAdminCategory();
  const deleteCategoryHook = useDeleteOneCategory();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteCategoryHook.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  if (isPending) {
    return <div className="text-center p-6 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error loading categories</div>;
  }

  return (
    <div className="category-table-container">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this category?"
      />

      <h1 className="category-table-title">Category Table</h1>

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No categories available.
              </td>
            </tr>
          ) : (
            categories.map((row) => (
              <tr key={row._id}>
                <td data-label="Name">{row.name}</td>
                <td data-label="Image">
                  <img
                    className="category-image"
                    src={getBackenedImageUrl(row.filepath)}
                    alt={row.name || 'Category'}
                    onError={(e) => (e.target.src = '/fallback-image.png')}
                  />
                </td>
                <td data-label="Actions">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link to={`/admin/category/${row._id}`}>
                      <button className="action-button view-button">View</button>
                    </Link>
                    <Link to={`/admin/category/${row._id}/edit`}>
                      <button className="action-button edit-button">Edit</button>
                    </Link>
                    <button
                      className="action-button delete-button"
                      onClick={() => setDeleteId(row._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
