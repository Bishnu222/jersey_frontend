import React, { useState } from 'react';
import { useCreateUser } from '../../hooks/admin/useAdminUser';
import { useNavigate } from 'react-router-dom';

export default function CreateUserForm() {
    const navigate = useNavigate();
    const { mutate: createUser, isPending, isSuccess, isError, error } = useCreateUser({
        onSuccess: () => {
            navigate("/admin/user");
        }
    });

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(formData);
    };

    return (
        <div className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
                Create New User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-3 text-white font-semibold rounded-md transition ${
                        isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                    {isPending ? 'Creating...' : 'Create User'}
                </button>

                {isError && (
                    <p className="mt-3 text-red-600 text-sm font-medium">
                        Error: {error.message}
                    </p>
                )}
                {isSuccess && (
                    <p className="mt-3 text-green-600 text-sm font-medium">
                        User created successfully!
                    </p>
                )}
            </form>
        </div>
    );
}
