import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

/* ICON SET */
const ICONS = ["🍎", "🚗", "⭐", "🎧", "⚽", "🌙", "🎁", "🐱"];

/* WINDOW SIZE */
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const resize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return size;
}

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

function MatchingPairs() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  /* ---------------- START GAME ---------------- */
  useEffect(() => {
    const duplicated = shuffle([...ICONS, ...ICONS]);
    setCards(duplicated);
  }, []);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (gameOver) return;

    if (time === 0) {
      setGameOver(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
      return;
    }

    if (matched.length === cards.length && cards.length) {
      setGameOver(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, matched, cards, gameOver]);

  /* ---------------- HANDLE FLIP ---------------- */
  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  /* ---------------- GAME OVER SCREEN ---------------- */
  if (gameOver) {
    return (
      <div className="match-wrapper">

        {/* 🎉 CONFETTI SHOWER */}
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={650}
            gravity={0.35}
            recycle={false}
            initialVelocityY={10}
            confettiSource={{
              x: 0,
              y: 0,
              w: width,
              h: 10
            }}
          />
        )}

        <h1>🎉 Congratulations!</h1>
        <p>You completed the Matching Pairs game</p>

        <h2>🏆 Score: {matched.length * 10}</h2>
        <p>Moves: {moves}</p>

        <div className="actions">
          <button onClick={() => navigate("/games")}>
            Back to Games
          </button>
          <button onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="match-wrapper">
      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="title">🎯 Matching Pairs</h1>

      <div className="stats">
        <span>⏱ Time: {time}s</span>
        <span>Moves: {moves}</span>
        <span>Score: {matched.length * 10}</span>
      </div>

      <div className="grid">
        {cards.map((icon, index) => {
          const isFlipped =
            flipped.includes(index) || matched.includes(index);

          return (
            <div
              key={index}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{icon}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MatchingPairs;

