import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./DialogueGame.css";

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

const CONVERSATIONS = [
  {
    question: "What's your plan for the weekend?",
    correct: "I'm thinking of going hiking",
    wrong: "I am think go hiking yesterday"
  },
  {
    question: "How was your exam?",
    correct: "It went really well",
    wrong: "It go very badly well"
  },
  {
    question: "What do you usually do in the evening?",
    correct: "I usually read books",
    wrong: "I reading books every evening"
  },
  {
    question: "Do you like online classes?",
    correct: "Yes, they are very convenient",
    wrong: "Yes, they is convenience"
  },
  {
    question: "How do you go to college?",
    correct: "I go to college by bus",
    wrong: "I going college by bus"
  },
  {
    question: "What motivates you to study?",
    correct: "My future career motivates me",
    wrong: "My future career motivating me"
  },
  {
    question: "What do you do during holidays?",
    correct: "I visit my relatives",
    wrong: "I visiting my relatives"
  },
  {
    question: "How do you manage stress?",
    correct: "I take short breaks",
    wrong: "I taking short breaks yesterday"
  },
  {
    question: "Do you enjoy teamwork?",
    correct: "Yes, I enjoy working in a team",
    wrong: "Yes, I enjoy work team"
  },
  {
    question: "What are you doing these days?",
    correct: "I am preparing for my exams",
    wrong: "I prepare exams yesterday"
  }
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function DialogueGame() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const current = CONVERSATIONS[index];

  /* SHUFFLE OPTIONS */
  useEffect(() => {
    if (current) {
      setOptions(
        shuffle([
          { text: current.correct, correct: true },
          { text: current.wrong, correct: false }
        ])
      );
    }
  }, [index]);

  /* HANDLE ANSWER */
  const handleSelect = (opt) => {
    if (selected) return;

    setSelected(opt.text);
    if (opt.correct) setScore((s) => s + 10);

    setTimeout(() => {
      setSelected(null);

      if (index + 1 === CONVERSATIONS.length) {
        setShowPopup(true);
        setShowConfetti(true);

        // 🛑 STOP CONFETTI AFTER 10 SECONDS
        setTimeout(() => setShowConfetti(false), 10000);
      } else {
        setIndex((i) => i + 1);
      }
    }, 700);
  };

  return (
    <div className="dialogue-wrapper">

      {/* 🎉 FULL-SCREEN TOP SHOWER CONFETTI */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={650}
          gravity={0.35}
          recycle={false}
          initialVelocityY={10}
          initialVelocityX={0}
          confettiSource={{
            x: 0,
            y: 0,
            w: width,   // 🔥 ENTIRE SCREEN WIDTH
            h: 10
          }}
        />
      )}

      <button className="back-button" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="dialogue-title">💬 Dialogue Game</h1>

      {!showPopup && (
        <>
          {/* QUESTION */}
          <div className="chat-row left">
            <div className="avatar">👦</div>
            <div className="chat-bubble question">
              {current.question}
            </div>
          </div>

          {/* ANSWER PREVIEW */}
          <div className="chat-row right">
            <div className="avatar">👧</div>
            <div className="chat-bubble answer">
              {selected || ""}
            </div>
          </div>

          {/* OPTIONS */}
          <div className="options">
            {options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${
                  selected === opt.text
                    ? opt.correct
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <p className="score">Score: {score}</p>
        </>
      )}

      {/* 🎊 POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h1>🎉 HURRAY!</h1>
            <p>You completed the Dialogue Game 🌸</p>
            <h2>🏆 Score: {score}</h2>

            <button onClick={() => navigate("/games")}>
              Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DialogueGame;


