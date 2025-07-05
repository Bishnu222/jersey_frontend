import React, { useState } from 'react'
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'
import { getBackenedImageUrl } from '../../utils/backend-image'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'

function Welcome(props) {
    return <h1>{props.name}</h1>
}
// Removed NameCompoment completely since it's no longer used

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory()
    const deleteCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)

    const handleDelete = () => {
        deleteCategoryHook.mutate(
            deleteId,
            {
                onSuccess: () => {
                    setDeleteId(null)
                }
            }
        )
    }

    return (
        <div>
            <DeleteModal
                isOpen={deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                description="Are you sure you want to delete"
            >
            </DeleteModal>
            CategoryTable
            <table className='min-w-full table-auto'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((row) =>
                            <tr key={row._id}>
                                <td>{row.name}</td>
                                <img className='w-16 h-16 object-cover'
                                    src={getBackenedImageUrl(row.filepath)}
                                ></img>
                                <td>
                                    <Link to={"/admin/category/" + row._id}>
                                        <button>View</button>
                                    </Link>

                                    <Link to={"/admin/category/" + row._id + "/edit"}>
                                        <button>Edit</button>
                                    </Link>

                                    <button onClick={
                                        () => setDeleteId(row._id)
                                    }>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
