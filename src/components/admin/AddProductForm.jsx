import React, { useState, useRef, useEffect } from "react";
import "./AddProductForm.css";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";
import { useCreateProduct } from "../../hooks/admin/useAdminProduct";
import { toast } from "react-toastify";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    team: "",
    type: "",
    size: "",
    price: "",
    image: null,
    categoryId: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const {
    categories,
    isLoading: loadingCategories,
    isError: errorCategories,
  } = useAdminCategory();

  const { mutate: createProduct, isLoading: creating } = useCreateProduct();

  // Show error if categories fail to load
  useEffect(() => {
    if (errorCategories) {
      toast.error("Failed to load categories");
    }
  }, [errorCategories]);

  // Create & revoke preview URL to avoid memory leaks
  useEffect(() => {
    if (formData.image) {
      const url = URL.createObjectURL(formData.image);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "text" ? value.trimStart() : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { team, type, size, price, image, categoryId } = formData;

    if (!team || !type || !size || !price || !image || !categoryId) {
      toast.error("Please fill in all fields and select an image and category");
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const data = new FormData();
    data.append("team", team);
    data.append("type", type);
    data.append("size", size);
    data.append("price", price);
    data.append("categoryId", categoryId);
    data.append("productImage", image); // **Important**: must match backend field name

    createProduct(data, {
      onSuccess: () => {
        toast.success("Jersey added successfully!");
        setFormData({
          team: "",
          type: "",
          size: "",
          price: "",
          image: null,
          categoryId: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      },
      onError: () => {
        toast.error("Failed to add jersey");
      },
    });
  };

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <fieldset disabled={creating} style={{ border: "none" }}>
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
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Home">Home</option>
            <option value="Away">Away</option>
            <option value="Third">Third</option>
            <option value="GK">Goalkeeper</option>
          </select>
        </div>

        <div className="form-field">
          <label>Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="form-field">
          <label>Price (Rs)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            disabled={loadingCategories}
          >
            <option value="">Select Category</option>
            {loadingCategories && <option disabled>Loading...</option>}
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            ref={fileInputRef}
          />
          {previewUrl && (
            <div className="image-preview">
              <img
                src={previewUrl}
                alt="Selected"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            </div>
          )}
        </div>

        <button className="submit-button" type="submit" disabled={creating}>
          {creating ? "Adding..." : "Add Jersey"}
        </button>
      </fieldset>
    </form>
  );
}
