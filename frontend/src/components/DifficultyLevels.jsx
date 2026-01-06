import React from 'react';
import { useNavigate } from 'react-router-dom';

function DifficultyLevels() {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      title: 'Beginner',
      description: 'Perfect for beginners to learn the basics',
      icon: '🌱',
      challenges: 50,
      users: '5k+',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Intermediate',
      description: 'For those ready to tackle more complex problems',
      icon: '🔗',
      challenges: 50,
      users: '3k+',
      color: '#FF9800'
    },
    {
      id: 3,
      title: 'Advanced',
      description: 'For those who want to master algorithms and data structures',
      icon: '🧠',
      challenges: 50,
      users: '1k+',
      color: '#F44336'
    }
  ];

  const handleLevelClick = (level) => {
    // Navigate to the appropriate topics page based on the selected level
    if (level.title === 'Beginner') {
      navigate('/coding/beginner/topics');
    } else if (level.title === 'Intermediate') {
      navigate('/coding/intermediate/topics');
    } else if (level.title === 'Advanced') {
      navigate('/coding/advanced/topics');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="difficulty-container">
      <div className="difficulty-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Choose Your Level</h1>
      </div>
      
      <div className="levels-grid">
        {levels.map(level => (
          <div 
            key={level.id} 
            className="level-card"
            onClick={() => handleLevelClick(level)}
            style={{ borderTopColor: level.color }}
          >
            <div className="level-icon" style={{ color: level.color }}>
              {level.icon}
            </div>
            <h2>{level.title}</h2>
            <p>{level.description}</p>
            <div className="level-stats">
              <div className="stat">
                <span className="stat-value">{level.challenges}</span>
                <span className="stat-label">Challenges</span>
              </div>
              <div className="stat">
                <span className="stat-value">{level.users}</span>
                <span className="stat-label">Users</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DifficultyLevels;