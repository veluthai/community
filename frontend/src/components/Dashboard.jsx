import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, logout }) {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: 'Tech Quiz',
      description: 'an interactive challenge designed to test and enhance participants\' knowledge of technology, programming, and digital innovations',
      icon: '💻',
      badge: ''
    },
    {
      id: 2,
      title: 'Practice Coding',
      description: 'Learn and improve with coding challenges',
      icon: '👨‍💻',
      badge: ''
    },
    {
      id: 3,
      title: 'Leaderboard',
      description: 'Compete and track your progress',
      icon: '🏆',
      badge: ''
    },
    {
      id: 4,
      title: 'Tech News',
      description: 'Stay updated with the latest in tech',
      icon: '📰',
      badge: ''
    },
    {
      id: 5,
      title: 'Games',
      description: 'Programming games help users learn coding through fun and interactive challenges.',
      icon: '📄',
      badge: ''
    },
    {
      id: 6,
      title: 'Community',
      description: 'Connect with developers and share knowledge',
      icon: '👥',
      badge: 'Coming Soon'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFeatureClick = (feature) => {
    if (feature.title === 'Practice Coding') {
      navigate('/difficulty-levels');
    } else if (feature.title === 'Leaderboard') {
      navigate('/leaderboard');
    } else if (feature.title === 'Games') {
      navigate('/games');
    }
    // Add navigation for other features as needed
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Our Community</h1>
        <div className="user-info">
          <span>Welcome, {user.username || user.email}</span>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
      
      <div className="features-grid">
        {features.map(feature => (
          <div 
            key={feature.id} 
            className={`feature-card ${feature.badge ? 'disabled' : ''}`}
            onClick={() => !feature.badge && handleFeatureClick(feature)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.badge && (
              <span className={`feature-badge ${feature.badge === 'Coming Soon' ? 'coming-soon' : ''}`}>
                {feature.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;