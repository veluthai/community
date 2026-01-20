import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./Slides.css";

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

const SLIDES = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra"
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    options: ["Lungs", "Brain", "Heart", "Kidney"],
    answer: "Heart"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which instrument is used to measure temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Anemometer"],
    answer: "Thermometer"
  },
  {
    question: "Which country is famous for the Eiffel Tower?",
    options: ["Italy", "Spain", "France", "Germany"],
    answer: "France"
  },
  {
    question: "How many days are there in a leap year?",
    options: ["364", "365", "366", "367"],
    answer: "366"
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Cheetah"],
    answer: "Lion"
  }
];

function Slides() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const slide = SLIDES[index];
  const progress = Math.round(((index + 1) / SLIDES.length) * 100);

  const handleOptionClick = (option) => {
    if (feedback) return;

    setSelected(option);
    if (option === slide.answer) {
      setScore((s) => s + 10);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  const handleNext = () => {
    setSelected("");
    setFeedback("");

    if (index + 1 === SLIDES.length) {
      setCompleted(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    } else {
      setIndex((i) => i + 1);
    }
  };

  /* 🎉 COMPLETION SCREEN */
  if (completed) {
    return (
      <div className="slides-wrapper dark-bg">

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

        <h1>🎉 Slides Completed!</h1>
        <p>You learned something new today 🚀</p>
        <h2>🏆 Score: {score}</h2>

        <div className="actions">
          <button onClick={() => navigate("/games")}>
            Back to Games
          </button>
          <button onClick={() => window.location.reload()}>
            Replay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="slides-wrapper dark-bg">
      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="title">📊 Learning Slides</h1>

      {/* PROGRESS */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-text">
        Slide {index + 1} / {SLIDES.length}
      </p>

      {/* QUESTION CARD */}
      <div className="slide-card">
        <h2 className="question">{slide.question}</h2>

        <div className="options">
          {slide.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${
                selected === opt
                  ? opt === slide.answer
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback === "correct" && (
          <p className="success">✅ Correct!</p>
        )}
        {feedback === "wrong" && (
          <p className="error">❌ Wrong Answer</p>
        )}
      </div>

      {feedback && (
        <button className="next-btn" onClick={handleNext}>
          Next →
        </button>
      )}

      <p className="score">Score: {score}</p>
    </div>
  );
}

export default Slides;
