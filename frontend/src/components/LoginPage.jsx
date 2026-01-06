import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, you'd validate against a backend
    // For demo purposes, we'll just log in
    const userData = {
      email,
      type: 'student' // Default type for demo
    };
    
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>RMKEC COMMUNITY </h1>
        <h2> Welcome </h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-btn">Sign In</button>
          
          <div className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
      
      <div className="login-illustration">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxp5BL-4ZEAnOH_ddss2j17W50rHjcnuZIw&s" alt="Login Illustration"/>
      </div>
    </div>
  );
}

export default LoginPage;