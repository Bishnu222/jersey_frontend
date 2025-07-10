import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateCategory } from '../../hooks/admin/useAdminCategory';

export default function CreateCategory() {
  const { mutate, isPending, error } = useCreateCategory();

  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    image: Yup.mixed()
      .nullable()
      .test('fileSize', 'File size too large (max 5MB)', value => {
        return !value || (value && value.size <= 5 * 1024 * 1024);
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.image) {
        formData.append('image', values.image);
      }

      mutate(formData, {
        onSuccess: () => formik.resetForm(),
      });
    },
  });

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Category</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter category name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`mt-1 block w-full px-4 py-2 border ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none bg-white text-black`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Image Input */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
            className="mt-1 block w-full text-sm text-gray-700 file:border file:rounded file:p-1"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        {/* Image Preview */}
        {formik.values.image && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Image Preview:</p>
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create Category'}
        </button>

        {/* Backend error message */}
        {error && (
          <p className="text-red-600 text-sm mt-2">
            {error.message || 'Failed to create category.'}
          </p>
        )}
      </form>
    </div>
  );
}
