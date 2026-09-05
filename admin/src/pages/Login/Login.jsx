import React, { useState, useContext } from 'react';
import './Login.css'; // Reuse the CSS you provided
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../AdminContext/AdminContext';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AdminContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

    try {
      const res = await axios.post('http://localhost:4000/api/user/login', formData);

      if (res.data.success) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        setToken(token);
        navigate('/add'); // Redirect to a protected admin route
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="user-page">
      <h2>Admin Login</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
        />

        <label>Password:</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
        />

        <div className="user-form-buttons">
          <button type="submit">Login</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
