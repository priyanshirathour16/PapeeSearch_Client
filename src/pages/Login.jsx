import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import api from '../services/api';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message ||
                (err.response?.data?.errors ? err.response.data.errors[0].msg : 'Login failed');
            setError(msg);
        }
    };

    return (
        <div className="da-login-container">
            <div className="da-login-card">
                <div className="da-header">
                    <h2 className='da-header'> Admin Login </h2>
                </div>

                <form onSubmit={handleSubmit} className="da-login-form">
                    <div className="da-input-group">
                        <label>
                            <FaUser className="da-label-icon" /> Username
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="da-input-group">
                        <label>
                            <FaLock className="da-label-icon" /> Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="da-error">{error}</p>}

                    <button type="submit" className="da-login-btn">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );

};

export default Login;
