import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan';
import './RegisterForm.css';
import registerBg from '../../assets/register.png';

export default function RegisterForm() {
    const { mutate, data, error, isPending, isSuccess, isError } = useRegisterUserTan();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value
        };
        mutate(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            formRef.current?.reset(); // Optional: clear form
            setTimeout(() => {
                navigate('/login'); // 🔁 Navigate to login page after success
            }, 1000); // Optional: small delay for feedback
        }
    }, [isSuccess, navigate]);

    return (
        <div className="background-container">
            <img src={registerBg} alt="register" className="background-image" />

            <div className="register-box">
                <form onSubmit={handleSubmit} className="register-form" ref={formRef}>
                    <h2>Register</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />

                    <button type="submit" className="submit-button" disabled={isPending}>
                        {isPending ? 'Registering...' : 'Register'}
                    </button>

                    {isError && <p className="error">{error.message}</p>}
                    {isSuccess && <p className="success">{data.message}</p>}
                </form>
            </div>
        </div>
    );
}
