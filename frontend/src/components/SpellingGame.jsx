import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

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

/* ONLY CORRECT WORDS */
const WORDS = [
  { word: "RECEIVE", hint: "To get or accept something" },
  { word: "SEPARATE", hint: "To divide into parts" },
  { word: "OCCASION", hint: "A special event" },
  { word: "NECESSARY", hint: "Something that is needed" },
  { word: "ACCOMMODATE", hint: "To provide space or room" },
  { word: "DEFINITELY", hint: "Without any doubt" },
  { word: "EMBARRASS", hint: "To make someone feel awkward" },
  { word: "ENVIRONMENT", hint: "Natural surroundings" },
  { word: "GOVERNMENT", hint: "System that runs a country" },
  { word: "PRONUNCIATION", hint: "How a word is spoken" },

  { word: "CONSCIENCE", hint: "Sense of right and wrong" },
  { word: "DISCIPLINE", hint: "Training to follow rules" },
  { word: "EXPERIENCE", hint: "Knowledge gained over time" },
  { word: "INTELLIGENCE", hint: "Ability to learn and think" },
  { word: "INTERRUPT", hint: "To stop someone while speaking" },

  { word: "COMMITMENT", hint: "Dedication to something" },
  { word: "OPPORTUNITY", hint: "A good chance" },
  { word: "SUCCESSFUL", hint: "Achieving desired results" },
  { word: "PERSEVERANCE", hint: "Not giving up easily" },
  { word: "RESPONSIBILITY", hint: "Duty or obligation" }
];

/* CREATE WRONG SPELLINGS */
const generateWrongSpellings = (word) => {
  const letters = word.split("");
  const wrong = new Set();

  while (wrong.size < 3) {
    const arr = [...letters];
    const i = Math.floor(Math.random() * arr.length);
    const j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    const candidate = arr.join("");

    if (candidate !== word) wrong.add(candidate);
  }

  return [...wrong];
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function SpellingGame() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const current = WORDS[index];

  /* BUILD OPTIONS (4 cards, 1 correct) */
  useEffect(() => {
    if (!current) return;

    const wrong = generateWrongSpellings(current.word);
    const all = shuffle([current.word, ...wrong]);

    setOptions(all);
    setSelected(null);
    setTime(15);
  }, [index]);

  /* ⏱ TIMER */
  useEffect(() => {
    if (gameOver) return;

    if (time === 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, gameOver]);

  /* HANDLE CARD CLICK */
  const handleSelect = (option) => {
    if (selected) return;

    setSelected(option);

    if (option === current.word) {
      setScore((s) => s + 10);
    }

    setTimeout(nextQuestion, 900);
  };

  /* NEXT QUESTION */
  const nextQuestion = () => {
    if (index + 1 === WORDS.length) {
      setGameOver(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000); // ⏱️ stop after 10s
    } else {
      setIndex((i) => i + 1);
    }
  };

  /* GAME OVER SCREEN */
  if (gameOver) {
    return (
      <div className="win-screen dark-bg">

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

        <h1>🎉 Excellent!</h1>
        <h2>🏆 Score: {score}</h2>

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
    <div className="spelling-wrapper dark-bg">
      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="title">📝 Spelling Game</h1>
      <p className="level">Level {index + 1}</p>

      <div className="status">⏱ {time}s &nbsp; ⭐ {score}</div>

      <p className="hint">Hint: {current.hint}</p>

      {/* 4 SPELLING CARDS */}
      <div className="options">
        {options.map((opt, i) => {
          let className = "option-card";

          if (selected) {
            if (opt === current.word) className += " correct";
            else if (opt === selected) className += " wrong";
          }

          return (
            <div
              key={i}
              className={className}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpellingGame;

