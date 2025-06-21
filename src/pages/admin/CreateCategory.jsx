import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateCategory } from '../../hooks/admin/useAdminCategory'; // adjust path if needed

export default function CreateCategory() {
  const { mutate, isPending, error } = useCreateCategory();

  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    image: Yup.mixed()
      .nullable()
      .test('fileSize', 'File too large', (value) =>
        !value || (value && value.size <= 5 * 1024 * 1024)
      ),
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
      if (values.image) formData.append('image', values.image);

      mutate(formData, {
        onSuccess: () => formik.resetForm(),
      });
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="border p-2 w-full"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Category Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue('image', file);
            }}
            className="block"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}
        </div>

        {formik.values.image && (
          <img
            src={URL.createObjectURL(formik.values.image)}
            alt="Preview"
            className="w-32 h-32 object-cover border"
          />
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>

        {error && <p className="text-red-600 mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
