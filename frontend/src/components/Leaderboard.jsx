import React, { useEffect, useState } from "react";


const LeaderboardPage = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('totalPoints'); // 'totalPoints', 'mcqSolved', 'codingSolved'
  const usersPerPage = 10;

  useEffect(() => {
    fetchLeaderboardData();
  }, [sortBy]);

  const fetchLeaderboardData = () => {
    try {
      setLoading(true);
      const savedUsers = localStorage.getItem("quizAppUsers");
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        const sorted = sortUsers(parsedUsers, sortBy);
        setUsers(sorted);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load leaderboard data");
      setLoading(false);
    }
  };

  const sortUsers = (users, criteria) => {
    const sorted = [...users];
    switch(criteria) {
      case 'mcqSolved':
        return sorted.sort((a, b) => (b.mcqSolved || 0) - (a.mcqSolved || 0));
      case 'codingSolved':
        return sorted.sort((a, b) => (b.codingSolved || 0) - (a.codingSolved || 0));
      case 'totalPoints':
      default:
        return sorted.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={fetchLeaderboardData} className="retry-button">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header-section">
        <h1>🏆 Leaderboard</h1>
        <div className="sort-options">
          <span>Sort by:</span>
          <button 
            className={sortBy === 'totalPoints' ? 'active' : ''}
            onClick={() => handleSortChange('totalPoints')}
          >
            Total Points
          </button>
          <button 
            className={sortBy === 'mcqSolved' ? 'active' : ''}
            onClick={() => handleSortChange('mcqSolved')}
          >
            MCQ Solved
          </button>
          <button 
            className={sortBy === 'codingSolved' ? 'active' : ''}
            onClick={() => handleSortChange('codingSolved')}
          >
            Coding Solved
          </button>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <p>No data available</p>
          <p className="no-data-subtitle">Start solving problems to see your ranking!</p>
        </div>
      ) : (
        <>
          <div className="leaderboard-table">
            <div className="table-header">
              <span>Rank</span>
              <span>User</span>
              <span>School</span>
              <span>MCQ</span>
              <span>Coding</span>
              <span>Points</span>
            </div>

            <div className="table-body">
              {currentUsers.map((user, idx) => {
                const actualRank = indexOfFirstUser + idx + 1;
                const isCurrent = currentUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    className={`table-row ${isCurrent ? "current-user" : ""}`}
                  >
                    <span className="rank-cell">{getRankIcon(actualRank)}</span>
                    <span className="user-cell">
                      <div className="user-info">
                        <span className="username">{user.username}</span>
                        {isCurrent && <span className="you-badge">YOU</span>}
                      </div>
                    </span>
                    <span className="school-cell">{user.schoolName || "-"}</span>
                    <span className="mcq-cell">
                      <span className="count">{user.mcqSolved || 0}</span>
                    </span>
                    <span className="coding-cell">
                      <span className="count">{user.codingSolved || 0}</span>
                    </span>
                    <span className="points-cell">{user.totalPoints || 0}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Previous
              </button>
              <div className="page-info">
                <span className="current-page">{currentPage}</span>
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </div>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;