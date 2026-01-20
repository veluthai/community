import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const QUESTIONS = [
  {
    sentence: "The largest desert in the world is the ____ Desert.",
    answer: "antarctic",
    hint: "Cold desert"
  },
  {
    sentence: "The currency used in Japan is the ____.",
    answer: "yen",
    hint: "Asian country"
  },
  {
    sentence: "The human body has ____ pairs of chromosomes.",
    answer: "23",
    hint: "Biology"
  },
  {
    sentence: "The first artificial satellite launched into space was ____.",
    answer: "sputnik",
    hint: "Soviet Union"
  },
  {
    sentence: "The gas most abundant in Earth's atmosphere is ____.",
    answer: "nitrogen",
    hint: "Not oxygen"
  },
  {
    sentence: "The longest bone in the human body is the ____.",
    answer: "femur",
    hint: "Leg bone"
  },
  {
    sentence: "The national animal of Australia is the ____.",
    answer: "kangaroo",
    hint: "Jumps"
  },
  {
    sentence: "The device used to measure earthquakes is called a ____.",
    answer: "seismograph",
    hint: "Earth movement"
  },
  {
    sentence: "The smallest continent by land area is ____.",
    answer: "australia",
    hint: "Oceania"
  },
  {
    sentence: "The author of 'Romeo and Juliet' is ____.",
    answer: "shakespeare",
    hint: "English playwright"
  },
  {
    sentence: "The planet with the most moons is ____.",
    answer: "saturn",
    hint: "Ringed planet"
  },
  {
    sentence: "The SI unit of electric current is ____.",
    answer: "ampere",
    hint: "Physics unit"
  },
  {
    sentence: "The largest ocean on Earth is the ____ Ocean.",
    answer: "pacific",
    hint: "Covers most area"
  },
  {
    sentence: "The metal that is liquid at room temperature is ____.",
    answer: "mercury",
    hint: "Thermometer"
  },
  {
    sentence: "The headquarters of the United Nations is located in ____.",
    answer: "new york",
    hint: "USA city"
  },
  {
    sentence: "The country known as the Land of the Rising Sun is ____.",
    answer: "japan",
    hint: "Asia"
  },
  {
    sentence: "The hardest natural substance found on Earth is ____.",
    answer: "diamond",
    hint: "Gemstone"
  },
  {
    sentence: "The process of converting water vapor into liquid is called ____.",
    answer: "condensation",
    hint: "Water cycle"
  },
  {
    sentence: "The largest mammal on Earth is the ____.",
    answer: "blue whale",
    hint: "Ocean giant"
  },
  {
    sentence: "The instrument used to measure atmospheric pressure is called ____.",
    answer: "barometer",
    hint: "Weather"
  }
];

function FillInTheBlanks() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(30);
  const [completed, setCompleted] = useState(false);

  /* 🎉 CONFETTI */
  const [showConfetti, setShowConfetti] = useState(false);

  /* ⏱ TIMER */
  useEffect(() => {
    if (completed) return;

    if (time === 0) {
      setCompleted(true);

      /* 🎉 FINAL CONFETTI */
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, completed]);

  /* SUBMIT */
  const handleSubmit = () => {
    setAttempts((a) => a + 1);

    if (input.toLowerCase() === QUESTIONS[index].answer) {
      setScore((s) => s + 10);
      setMessage("correct");
      setInput("");

      /* 🎉 CONFETTI FOR EACH CORRECT */
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);

      setTimeout(() => {
        if (index === QUESTIONS.length - 1) {
          setCompleted(true);

          /* 🎉 FINAL CONFETTI */
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 6000);
        } else {
          setIndex((i) => i + 1);
          setMessage("");
          setTime(30);
        }
      }, 800);
    } else {
      setMessage("wrong");
    }
  };

  /* 🎉 COMPLETED SCREEN */
  if (completed) {
    return (
      <div className="fib-container">
        {showConfetti && (
          <Confetti
            numberOfPieces={400}
            gravity={0.4}
            recycle={false}
          />
        )}

        <h1>🎉 Congratulations!</h1>
        <p>You completed Fill in the Blanks</p>
        <h2>🏆 Score: {score}</h2>

        <div className="fib-actions">
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

  const q = QUESTIONS[index];

  return (
    <div className="fib-container">
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          gravity={0.4}
          recycle={false}
        />
      )}

      <button className="back-btn" onClick={() => navigate("/games")}>
        ← Back
      </button>

      <h1 className="fib-title">✏️ Fill in the Blanks</h1>
      <p className="fib-level">Level {index + 1}</p>

      <div className="fib-timer">⏱ {time}s</div>

      <div className="fib-question">
        {q.sentence.replace("____", "_____")}
      </div>

      <p className="fib-hint">Hint: {q.hint}</p>

      <div className="fib-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {message === "correct" && <p className="correct">✅ Correct!</p>}
      {message === "wrong" && <p className="wrong">❌ Wrong Answer</p>}

      <div className="fib-stats">
        <span>Score: {score}</span>
        <span>Attempts: {attempts}</span>
      </div>
    </div>
  );
}

export default FillInTheBlanks;
