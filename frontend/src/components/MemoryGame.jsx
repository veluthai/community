import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

/* 🌟 NEW ICON SET */
const ICONS = ["🦋", "🌵", "🎈", "🍉", "🧩", "🎨", "🛸", "🎭"];

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

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [screen, setScreen] = useState("intro"); // intro | play | win
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  /* 🔥 PREVIEW STATES */
  const [preview, setPreview] = useState(true);
  const [previewTime, setPreviewTime] = useState(10); // 10s memory

  /* ⏱ GAME TIMER */
  const [timeLeft, setTimeLeft] = useState(50); // 50s play time

  /* 🎉 CONFETTI */
  const [showConfetti, setShowConfetti] = useState(false);

  /* ------------------------
     START GAME
  ------------------------- */
  const startGame = () => {
    const duplicated = [...ICONS, ...ICONS];
    setCards(shuffle(duplicated));
    setFlipped([]);
    setMatched([]);
    setMoves(0);

    setPreview(true);
    setPreviewTime(10);
    setTimeLeft(50);

    setShowConfetti(false);
    setScreen("play");
  };

  /* ------------------------
     PREVIEW TIMER (10s)
  ------------------------- */
  useEffect(() => {
    if (!preview || screen !== "play") return;

    if (previewTime === 0) {
      setPreview(false);
      return;
    }

    const timer = setInterval(() => {
      setPreviewTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [preview, previewTime, screen]);

  /* ------------------------
     GAME TIMER (50s)
  ------------------------- */
  useEffect(() => {
    if (screen !== "play" || preview) return;

    if (timeLeft === 0) {
      setScreen("intro");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, timeLeft, preview]);

  /* ------------------------
     HANDLE CARD CLICK
  ------------------------- */
  const handleFlip = (index) => {
    if (
      preview ||
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return;
    }

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

  /* ------------------------
     CHECK WIN
  ------------------------- */
  useEffect(() => {
    if (screen === "play" && matched.length === cards.length && cards.length) {
      setScreen("win");
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000); // ⏱️ stop after 10s
    }
  }, [matched, cards, screen]);

  return (
    <div className="memory-wrapper">

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

      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      {/* INTRO */}
      {screen === "intro" && (
        <div className="game-intro">
          <div className="icon">🧠</div>
          <h1>Memory Match</h1>
          <p>Memorize first, then match the pairs</p>
          <button className="start-game-btn" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {/* PLAY */}
      {screen === "play" && (
        <div className="play-screen">
          <h2>Match the Pairs</h2>

          {preview ? (
            <div className="game-timer">
              ⏳ Memorize the cards: <span>{previewTime}s</span>
            </div>
          ) : (
            <div className="game-timer">
              ⏱️ Time Left: <span>{timeLeft}s</span>
            </div>
          )}

          <div className="grid">
            {cards.map((icon, index) => {
              const isOpen =
                preview ||
                flipped.includes(index) ||
                matched.includes(index);

              return (
                <div
                  key={index}
                  className={`tile ${isOpen ? "active" : ""}`}
                  onClick={() => handleFlip(index)}
                >
                  {isOpen && icon}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WIN */}
      {screen === "win" && (
        <div className="win-screen">
          <h1>🎉 Excellent!</h1>

          <div className="quote">
            “Amazing! You matched all the pairs.”
            <span>Memory Master</span>
          </div>

          <h2>🏆 Badge Unlocked</h2>
          <p>Moves: {moves}</p>

          <div className="actions">
            <button onClick={() => navigate("/games")}>
              Back to Games
            </button>
            <button onClick={startGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;

