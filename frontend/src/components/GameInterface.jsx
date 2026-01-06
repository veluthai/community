import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlphabetGame from './AlphabetGame';

function GameInterface() {
  const navigate = useNavigate();
  const { gameName } = useParams();

  const handleBackToGames = () => {
    navigate('/games');
  };

  const renderGame = () => {
    switch (gameName) {
      case 'alphabet':
        return <AlphabetGame />;
      default:
        return (
          <div className="game-interface-container">
            <div className="game-interface-header">
              <button className="back-button" onClick={handleBackToGames}>← Back</button>
              <h1>Game Not Found</h1>
            </div>
            <div className="game-start-screen">
              <p>Sorry, the game "{gameName}" is not available yet.</p>
              <button className="start-game-btn" onClick={handleBackToGames}>Back to Games</button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {renderGame()}
    </>
  );
}

export default GameInterface;