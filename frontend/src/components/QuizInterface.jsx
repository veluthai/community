import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function QuizInterface() {
  const navigate = useNavigate();
  const { quizName } = useParams();
  
  // Convert quiz name from URL to proper format
  const quizTitle = quizName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Quiz descriptions and icons
  const quizDescriptions = {
    'Web Development': 'Test your knowledge of HTML, CSS, and JavaScript',
    'React': 'Challenge yourself with React concepts and best practices',
    'Node.js': 'Questions about server-side JavaScript with Node.js',
    'Database': 'Test your knowledge of SQL and NoSQL databases',
    'Python': 'Python programming concepts and libraries',
    'Machine Learning': 'Fundamentals of machine learning and AI',
    'Cloud Computing': 'AWS, Azure, and Google Cloud platform concepts',
    'DevOps': 'CI/CD, Docker, Kubernetes, and more',
    'Cybersecurity': 'Security best practices and common vulnerabilities'
  };

  const quizIcons = {
    'Web Development': '🌐',
    'React': '⚛️',
    'Node.js': '🟢',
    'Database': '🗄️',
    'Python': '🐍',
    'Machine Learning': '🤖',
    'Cloud Computing': '☁️',
    'DevOps': '🔧',
    'Cybersecurity': '🔒'
  };

  // Sample questions for each quiz topic
  const quizQuestions = {
    'Web Development': [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which CSS property is used to change the text color of an element?',
        options: [
          'text-color',
          'font-color',
          'color',
          'text-style'
        ],
        correctAnswer: 2
      },
      {
        question: 'What is the correct JavaScript syntax to change the content of an HTML element?',
        options: [
          'document.getElement("p").innerHTML = "Hello World!";',
          'document.getElementById("p").innerHTML = "Hello World!";',
          '#p.innerHTML = "Hello World!";',
          'document.getElementByName("p").innerHTML = "Hello World!";'
        ],
        correctAnswer: 1
      }
    ],
    'React': [
      {
        question: 'What is React?',
        options: [
          'A database management system',
          'A JavaScript library for building user interfaces',
          'A backend framework',
          'A CSS framework'
        ],
        correctAnswer: 1
      },
      {
        question: 'What is JSX?',
        options: [
          'A JavaScript XML syntax extension',
          'A styling language for React',
          'A testing framework for React',
          'A state management library'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which method is used to update state in a React component?',
        options: [
          'updateState()',
          'setState()',
          'changeState()',
          'modifyState()'
        ],
        correctAnswer: 1
      }
    ],
    'Node.js': [
      {
        question: 'What is Node.js?',
        options: [
          'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          'A database for JavaScript applications',
          'A frontend framework',
          'A CSS preprocessor'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which module is used to create a web server in Node.js?',
        options: [
          'http',
          'server',
          'web',
          'createServer'
        ],
        correctAnswer: 0
      },
      {
        question: 'What is NPM?',
        options: [
          'Node Package Manager',
          'New Programming Method',
          'Node Performance Monitor',
          'Network Protocol Manager'
        ],
        correctAnswer: 0
      }
    ]
  };

  // Initialize quiz when component mounts
  useEffect(() => {
    // Get questions for the current quiz or use default questions
    const quizQuestionsData = quizQuestions[quizTitle] || quizQuestions['Web Development'];
    setQuestions(quizQuestionsData);
  }, [quizTitle]);

  const handleBackToQuizzes = () => {
    navigate('/tech-quiz');
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setSelectedAnswers(new Array(questions.length).fill(null));
  };

  const handleAnswerSelect = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let calculatedScore = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={handleBackToQuizzes}>← Back</button>
          <h1>{quizTitle} Quiz</h1>
        </div>
        <div className="game-start-screen">
          <div className="game-icon-large">{quizIcons[quizTitle]}</div>
          <h2>{quizTitle} Quiz</h2>
          <p>{quizDescriptions[quizTitle]}</p>
          <p>This quiz contains {questions.length} questions.</p>
          <button className="start-game-btn" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={handleBackToQuizzes}>← Back</button>
          <h1>{quizTitle} Quiz Results</h1>
        </div>
        <div className="quiz-results-container">
          <div className="quiz-score-circle">
            <div className="score-value">{score}/{questions.length}</div>
            <div className="score-label">Score</div>
          </div>
          <h2>Quiz Complete!</h2>
          <p>You answered {score} out of {questions.length} questions correctly.</p>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
          <div className="quiz-results-buttons">
            <button className="restart-quiz-btn" onClick={handleRestartQuiz}>Retake Quiz</button>
            <button className="back-to-quizzes-btn" onClick={handleBackToQuizzes}>Back to Quizzes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-interface-container">
      <div className="game-interface-header">
        <button className="back-button" onClick={handleBackToQuizzes}>← Back</button>
        <h1>{quizTitle} Quiz</h1>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      
      <div className="quiz-container">
        <div className="quiz-progress-bar">
          <div 
            className="quiz-progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="quiz-question-container">
          <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
          
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <div 
                key={index} 
                className={`quiz-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="option-marker">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="option-text">{option}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="quiz-navigation">
          <button 
            className="quiz-nav-btn prev-btn" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button 
            className="quiz-nav-btn next-btn" 
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === null}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizInterface;