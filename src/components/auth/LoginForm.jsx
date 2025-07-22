import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../../hooks/useLoginUser';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import loginBg from '../../assets/login.png';

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate, data, error, isPending, isSuccess, isError } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  useEffect(() => {
    if (isSuccess && data?.token) {
      // Save token or navigate
      localStorage.setItem('token', data.token); // Optional
      navigate('/normal/dashboard'); // Redirect after login
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="background-container">
      <div className="login-box">
        <form onSubmit={formik.handleSubmit} className="login-form" noValidate>
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}

          <button type="submit" className="submit-button" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </button>

          <div className="register-container">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="register-link">Register</Link>
            </p>
          </div>

          {isError && (
            <p className="error">{error?.response?.data?.message || 'Login failed. Please try again.'}</p>
          )}
        </form>
      </div>

      <img src={loginBg} alt="login" className="background-image" />
    </div>
  );
}
