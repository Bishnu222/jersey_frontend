import React, { useState } from 'react'
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'
import { getBackendImageUrl } from '../../utils/backend-image'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModel'
import './CategoryTable.css' // Optional: if you're using the CSS provided earlier

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory()
    const deleteCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)

    const handleDelete = () => {
        deleteCategoryHook.mutate(deleteId, {
            onSuccess: () => setDeleteId(null)
        })
    }

    if (isPending) return <div>Loading categories...</div>
    if (error) return <div>Error loading categories</div>

    return (
        <div className="category-table-container">
            <DeleteModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete?"
            />

            <h2 className='category-table-title'>Category Table</h2>
            <table className='category-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((row) => (
                        <tr key={row._id}>
                            <td>{row.name}</td>
                            <td>
                                <img
                                    className='category-image'
                                    src={getBackendImageUrl(row.filepath)}
                                    alt={row.name}
                                />
                            </td>
                            <td className='category-actions'>
                                <Link to={`/admin/category/${row._id}`}>
                                    <button className='view-btn'>View</button>
                                </Link>
                                <Link to={`/admin/category/${row._id}/edit`}>
                                    <button className='edit-btn'>Edit</button>
                                </Link>
                                <button
                                    onClick={() => setDeleteId(row._id)}
                                    className='delete-btn'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
