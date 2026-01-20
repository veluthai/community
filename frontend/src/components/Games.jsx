import React from "react";
import { useNavigate } from "react-router-dom";

function Games() {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: "Alphabet",
      slug: "alphabet",
      icon: "🔤",
      description: "Learn the alphabet with interactive exercises"
    },
    {
      id: 2,
      title: "Memory",
      slug: "memory",
      icon: "🧠",
      description: "Test and improve your memory skills"
    },
    {
      id: 3,
      title: "Matching Pairs",
      slug: "matching-pairs",
      icon: "🎯",
      description: "Match pairs of cards to improve concentration"
    },
    {
      id: 4,
      title: "Word Puzzle",
      slug: "word-puzzle",
      icon: "🧩",
      description: "Solve word puzzles to expand your vocabulary"
    },
    {
      id: 5,
      title: "Fill in the Blanks",
      slug: "fill-in-the-blanks",
      icon: "✍️",
      description: "Complete sentences with the correct words"
    },
    {
      id: 6,
      title: "Word Scramble",
      slug: "word-scramble",
      icon: "🔀",
      description: "Unscramble letters to form words"
    },
    {
      id: 7,
      title: "Spelling",
      slug: "spelling",
      icon: "📝",
      description: "Practice spelling with interactive exercises"
    },
    {
      id: 8,
      title: "Slides",
      slug: "slides",
      icon: "📊",
      description: "Learn through interactive slideshows"
    },
    {
      id: 9,
      title: "Dialogue",
      slug: "dialogue",
      icon: "💬",
      description: "Practice conversations and dialogue skills"
    }
  ];

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleGameClick = (game) => {
    navigate(`/games/${game.slug}`);
  };

  return (
    <div className="games-container">
      <div className="games-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Educational Games</h1>
        <p>Learn and have fun with our interactive games</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => handleGameClick(game)}
          >
            <div className="game-icon">{game.icon}</div>
            <h3>{game.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
