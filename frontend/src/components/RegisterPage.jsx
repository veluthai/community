import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage({ register }) {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    institutionName: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.institutionName || !formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password.length < 6 || formData.password.length > 14) {
      setError('Password must be 6-14 characters');
      return;
    }
    
    // In a real app, you'd send this data to your backend
    const userData = {
      ...formData,
      type: userType
    };
    
    register(userData);
    navigate('/dashboard');
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Create Account</h1>
        <p>Join our coding community today</p>
        
        <div className="role-selector">
          <button
            className={`role-btn ${userType === 'student' ? 'active' : ''}`}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            className={`role-btn ${userType === 'professional' ? 'active' : ''}`}
            onClick={() => setUserType('professional')}
          >
            Professional
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="institutionName"
              placeholder={userType === 'student' ? 'College/School Name' : 'Company Name'}
              value={formData.institutionName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="password-hint">Password must be 6 - 14 characters</p>
          </div>
          
          <button type="submit" className="register-btn">Register</button>
        </form>
        
        <div className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;