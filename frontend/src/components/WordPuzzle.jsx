import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

/* ✅ GENERAL WORDS */
const WORDS = [
  { word: "JOURNEY", hint: "A long trip or travel" },
  { word: "BALANCE", hint: "State of being steady" },
  { word: "CAPTURE", hint: "To catch or record" },
  { word: "WHISPER", hint: "Speak very softly" },
  { word: "MYSTERY", hint: "Something unknown" },
  { word: "COURAGE", hint: "Bravery in fear" },
  { word: "FREEDOM", hint: "State of being independent" },
  { word: "HARMONY", hint: "Peaceful agreement" },
  { word: "FORTUNE", hint: "Luck or wealth" },
  { word: "EXPLORE", hint: "To discover new places" },
  { word: "INSPIRE", hint: "To motivate someone" },
  { word: "REFLECT", hint: "To think deeply" },
  { word: "STRATEGY", hint: "A planned approach" },
  { word: "CONFIDENCE", hint: "Belief in oneself" },
  { word: "DISCOVER", hint: "Find something new" }
];

const shuffleWord = (word) =>
  word.split("").sort(() => Math.random() - 0.5).join("");

/* 📐 WINDOW SIZE FOR CONFETTI */
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

function WordPuzzle() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [level, setLevel] = useState(1);
  const [current, setCurrent] = useState(null);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [usedWords, setUsedWords] = useState([]);

  /* 🎉 CONFETTI */
  const [showConfetti, setShowConfetti] = useState(false);

  /* LOAD WORD (NO REPEAT) */
  const loadWord = () => {
    const available = WORDS.filter(
      (w) => !usedWords.includes(w.word)
    );

    if (available.length === 0) {
      setGameOver(true);
      triggerConfetti();
      return;
    }

    const next = available[Math.floor(Math.random() * available.length)];
    setCurrent(next);
    setScrambled(shuffleWord(next.word));
    setUsedWords((u) => [...u, next.word]);
    setInput("");
    setMessage("");
    setTime(30);
  };

  /* CONFETTI HANDLER (6s) */
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  /* TIMER */
  useEffect(() => {
    if (gameOver) return;

    if (time === 0) {
      setGameOver(true);
      triggerConfetti();
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, gameOver]);

  /* INITIAL LOAD */
  useEffect(() => {
    loadWord();
  }, []);

  /* SUBMIT */
  const handleSubmit = () => {
    if (!current || !input) return;

    if (input.toUpperCase() === current.word) {
      setScore((s) => s + 10);
      setLevel((l) => l + 1);
      setMessage("correct");

      triggerConfetti();
      setTimeout(loadWord, 800);
    } else {
      setMessage("wrong");
    }
  };

  /* GAME OVER */
  if (gameOver) {
    return (
      <div className="win-screen">
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            gravity={0.35}
            recycle={false}
          />
        )}

        <h1>🎉 Congratulations!</h1>
        <p>You completed the Word Puzzle</p>
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
    <div className="word-game dark-bg">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          gravity={0.35}
          recycle={false}
        />
      )}

      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="title">🧩 Word Puzzle</h1>
      <p className="level">Level {level}</p>

      <div className="timer">⏱ {time}s</div>

      <div className="letters">
        {scrambled.split("").map((l, i) => (
          <div key={i} className="letter-box">{l}</div>
        ))}
      </div>

      <p className="hint">Hint: {current?.hint}</p>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the word"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {message === "correct" && <p className="success">✅ Correct!</p>}
      {message === "wrong" && <p className="error">❌ Wrong Answer</p>}

      <p className="score">Score: {score}</p>
    </div>
  );
}

export default WordPuzzle;
