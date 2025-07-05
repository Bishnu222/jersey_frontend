import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetOneCategory, useUpdateOneCategory } from '../../hooks/admin/useAdminCategory'; // adjust paths if needed
import { useParams } from 'react-router-dom';
import { getBackenedImageUrl } from '../../utils/backend-image';
import './UpdateCategory.css'; // create your CSS or adjust accordingly

export default function UpdateCategory() {
  const { id } = useParams();
  const categoryOne = useGetOneCategory(id);
  const updateCategory = useUpdateOneCategory();

  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    image: Yup.mixed()
      .nullable()
      .test('fileSize', 'File too large', (value) => !value || value.size <= 5 * 1024 * 1024),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryOne.category?.name || '',
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.image) formData.append('image', values.image);

      updateCategory.mutate(
        { id, data: formData },
        {
          onSuccess: () => formik.resetForm(),
        }
      );
    },
  });

  return (
    <div className="update-category-container">
      <h2 className="update-category-title">Update Category</h2>
      <form className="update-category-form" onSubmit={formik.handleSubmit}>
        <label className="form-label">Category Name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="form-error">{formik.errors.name}</div>
        )}

        <label className="form-label">Category Image</label>
        <input
          className="form-input"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) formik.setFieldValue('image', file);
          }}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="form-error">{formik.errors.image}</div>
        )}

        <div className="image-preview">
          {formik.values.image ? (
            <img
              className="preview-image"
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
            />
          ) : (
            <img
              className="preview-image"
              src={getBackenedImageUrl(categoryOne.category?.filepath)}
              alt="Current"
            />
          )}
        </div>

        <button type="submit" className="update-button">
          Update
        </button>
      </form>
    </div>
  );
}
