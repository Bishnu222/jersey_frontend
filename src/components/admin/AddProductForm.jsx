import React, { useState } from 'react';
import './AddProductForm.css'; // Make sure this matches your filename

export default function AddJerseyForm() {
    const [formData, setFormData] = useState({
        team: '',
        type: '',
        size: '',
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        const res = await fetch('/api/jerseys', {
            method: 'POST',
            body: data,
        });

        const result = await res.json();
        console.log(result);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>Add Jersey</h2>

            <div className="form-field">
                <label>Team Name</label>
                <input
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-field">
                <label>Jersey Type</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Away">Away</option>
                    <option value="Third">Third</option>
                    <option value="GK">Goalkeeper</option>
                </select>
            </div>

            <div className="form-field">
                <label>Size</label>
                <select name="size" value={formData.size} onChange={handleChange} required>
                    <option value="">Select Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>

            <div className="form-field">
                <label>Price</label>
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-field">
                <label>Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </div>

            <button className="submit-button" type="submit">
                Add Jersey
            </button>
        </form>
    );
}
