import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

/* ✅ EASY–MEDIUM GENERAL WORDS */
const WORDS = [
  { word: "FRIEND", hint: "A person you like and trust" },
  { word: "SUCCESS", hint: "Achieving what you want" },
  { word: "LEARN", hint: "Gain knowledge or skill" },
  { word: "FOCUS", hint: "Pay close attention" },
  { word: "CREATE", hint: "Make something new" },
  { word: "ENERGY", hint: "Strength to do work" },
  { word: "CONFIDENCE", hint: "Belief in yourself" }
];

const EXTRA_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function WordScramble() {
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState(null);
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  /* 🎉 CONFETTI */
  const [showConfetti, setShowConfetti] = useState(false);

  /* LOAD WORD */
  const loadWord = () => {
    const wordObj = WORDS[level - 1];
    setCurrent(wordObj);

    const correctLetters = wordObj.word.split("");
    const extra = shuffle(EXTRA_LETTERS.split("")).slice(0, 2);

    setLetters(shuffle([...correctLetters, ...extra]));
    setAnswer([]);
    setAttempts(3);
    setTimeLeft(40);
    setMessage("");
  };

  useEffect(() => {
    loadWord();
  }, [level]);

  /* TIMER */
  useEffect(() => {
    if (gameOver) return;

    if (timeLeft === 0) {
      nextLevel();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  /* PICK LETTER */
  const pickLetter = (letter, index) => {
    if (answer.length >= current.word.length) return;

    setAnswer([...answer, letter]);

    const newLetters = [...letters];
    newLetters.splice(index, 1);
    setLetters(newLetters);
  };

  /* SUBMIT */
  const submitAnswer = () => {
    const formed = answer.join("");

    if (formed === current.word) {
      setScore((s) => s + 20);
      setMessage("✅ Correct!");

      /* 🎉 CONFETTI FOR CORRECT */
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);

      setTimeout(nextLevel, 800);
    } else {
      setAttempts((a) => a - 1);
      setAnswer([]);
      setMessage("❌ Try again");

      if (attempts - 1 === 0) {
        setTimeout(nextLevel, 1000);
      }
    }
  };

  /* NEXT LEVEL */
  const nextLevel = () => {
    if (level === WORDS.length) {
      setGameOver(true);

      /* 🎉 FINAL CONFETTI */
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    } else {
      setLevel((l) => l + 1);
    }
  };

  /* GAME OVER */
  if (gameOver) {
    return (
      <div className="win-screen">
        {showConfetti && (
          <Confetti
            numberOfPieces={400}
            gravity={0.4}
            recycle={false}
          />
        )}

        <h1>🎉 Well Done!</h1>
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
    <div className="word-scramble dark-bg">
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          gravity={0.4}
          recycle={false}
        />
      )}

      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="title">🔀 Word Scramble</h1>
      <p className="level">Level {level}</p>

      <div className="top-info">
        <span>⏱ {timeLeft}s</span>
        <span>❤️ {attempts}</span>
      </div>

      <p className="hint">Hint: {current?.hint}</p>

      {/* ANSWER */}
      <div className="answer-box big">
        {answer.map((l, i) => (
          <div key={i} className="answer-tile big">{l}</div>
        ))}
      </div>

      {/* LETTERS */}
      <div className="letters big">
        {letters.map((l, i) => (
          <button
            key={i}
            className="letter-btn big"
            onClick={() => pickLetter(l, i)}
          >
            {l}
          </button>
        ))}
      </div>

      <button className="submit-btn big" onClick={submitAnswer}>
        Submit
      </button>

      {message && <p className="message">{message}</p>}

      <p className="score">Score: {score}</p>
    </div>
  );
}

export default WordScramble;
