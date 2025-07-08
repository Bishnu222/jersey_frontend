import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css';
import registerBg from '../../assets/register.png';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { mutate, data, error, isPending, isSuccess, isError } = useRegisterUserTan();

  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    password: '',
    address: ''
  });

  // Controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Basic client-side validation
  const validateForm = () => {
    const { email, username, password, address } = formValues;
    if (!email || !username || !password || !address) {
      toast.error('All fields are required!');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email format.');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formValues);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'Registration successful!');
      setFormValues({
        email: '',
        username: '',
        password: '',
        address: ''
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isError) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    }
  }, [isError, error]);

  return (
    <div className="background-container">
      <img src={registerBg} alt="register" className="background-image" />

      <div className="register-box">
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <h2>Register</h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formValues.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
          />

          <button type="submit" className="submit-button" disabled={isPending}>
            {isPending ? <span className="spinner"></span> : 'Register'}
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
