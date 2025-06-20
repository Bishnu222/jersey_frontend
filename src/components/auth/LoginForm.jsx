import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUser } from '../../hooks/useLoginUser';
import { Link } from 'react-router-dom'; // <-- Import Link
import './LoginForm.css';
import loginBg from '../../assets/login.png'; 

export default function LoginForm() {
  const { mutate, data, error, isPending } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Please fill email"),
    password: Yup.string().min(8, "Password needs 8 characters").required("Please fill the password")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  return (
    <div className="background-container">
      <div className="login-box">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
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

          {/* Register button/link below */}
          <div className="register-container">
            <p>Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
          </div>

          {error && <p className="error">Login failed. Try again.</p>}
          {data && <p className="success">Login successful!</p>}
        </form>
      </div>
      <img src={loginBg} alt="background" className="background-image" />
    </div>
  );
}
