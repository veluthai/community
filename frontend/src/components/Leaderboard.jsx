import React from 'react';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
  const navigate = useNavigate();

  // Sample leaderboard data
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'Sakshi',
      role: 'Full Stack Developer',
      points: 125,
      avatar: 'https://picsum.photos/seed/sakshi/50/50.jpg'
    },
    {
      id: 2,
      rank: 2,
      name: 'ZZZ',
      role: 'Data Scientist',
      points: 40,
      avatar: 'https://picsum.photos/seed/zzz/50/50.jpg'
    },
    {
      id: 3,
      rank: 3,
      name: 'coolmanwrench',
      role: 'UI/UX Designer',
      points: 15,
      avatar: 'https://picsum.photos/seed/coolmanwrench/50/50.jpg'
    },
    {
      id: 4,
      rank: 4,
      name: 'TechGuru',
      role: 'Backend Developer',
      points: 15,
      avatar: 'https://picsum.photos/seed/techguru/50/50.jpg'
    },
    {
      id: 5,
      rank: 5,
      name: 'CodeMaster',
      role: 'Frontend Developer',
      points: 10,
      avatar: 'https://picsum.photos/seed/codemaster/50/50.jpg'
    },
    {
      id: 6,
      rank: 6,
      name: 'AlgorithmNinja',
      role: 'Software Engineer',
      points: 10,
      avatar: 'https://picsum.photos/seed/algorithmninja/50/50.jpg'
    },
    {
      id: 7,
      rank: 7,
      name: 'DevWizard',
      role: 'DevOps Engineer',
      points: 10,
      avatar: 'https://picsum.photos/seed/devwizard/50/50.jpg'
    },
    {
      id: 8,
      rank: 8,
      name: 'PythonPro',
      role: 'Data Analyst',
      points: 5,
      avatar: 'https://picsum.photos/seed/pythonpro/50/50.jpg'
    },
    {
      id: 9,
      rank: 9,
      name: 'JavaJedi',
      role: 'Android Developer',
      points: 5,
      avatar: 'https://picsum.photos/seed/javajedi/50/50.jpg'
    },
    {
      id: 10,
      rank: 10,
      name: 'ReactRocker',
      role: 'React Developer',
      points: 5,
      avatar: 'https://picsum.photos/seed/reactrocker/50/50.jpg'
    },
    {
      id: 11,
      rank: 11,
      name: 'CSSChampion',
      role: 'Web Designer',
      points: 5,
      avatar: 'https://picsum.photos/seed/csschampion/50/50.jpg'
    },
    {
      id: 12,
      rank: 12,
      name: 'NodeNinja',
      role: 'Backend Developer',
      points: 5,
      avatar: 'https://picsum.photos/seed/nodeninja/50/50.jpg'
    },
    {
      id: 13,
      rank: 13,
      name: 'DatabaseDynamo',
      role: 'Database Administrator',
      points: 5,
      avatar: 'https://picsum.photos/seed/databasedynamo/50/50.jpg'
    },
    {
      id: 14,
      rank: 14,
      name: 'CloudCommander',
      role: 'Cloud Engineer',
      points: 5,
      avatar: 'https://picsum.photos/seed/cloudcommander/50/50.jpg'
    },
    {
      id: 15,
      rank: 15,
      name: 'SecuritySage',
      role: 'Security Analyst',
      points: 5,
      avatar: 'https://picsum.photos/seed/securitysage/50/50.jpg'
    }
  ];

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Global Leaderboard</h1>
        <p>Top performers in coding challenges</p>
      </div>
      
      <div className="leaderboard-content">
        <div className="top-three">
          {leaderboardData.slice(0, 3).map(user => (
            <div key={user.id} className={`top-player rank-${user.rank}`}>
              <div className="rank-icon">{getRankIcon(user.rank)}</div>
              <img src={user.avatar} alt={user.name} className="player-avatar" />
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <div className="player-points">{user.points} points</div>
            </div>
          ))}
        </div>
        
        <div className="rest-players">
          {leaderboardData.slice(3).map(user => (
            <div key={user.id} className="player-row">
              <div className="player-rank">{user.rank}</div>
              <img src={user.avatar} alt={user.name} className="player-avatar-small" />
              <div className="player-info">
                <h4>{user.name}</h4>
                <p>{user.role}</p>
              </div>
              <div className="player-points-small">{user.points} points</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="leaderboard-footer">
        <button className="activate-btn">Activate</button>
        
      </div>
    </div>
  );
}

export default Leaderboard;