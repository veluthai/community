import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function AlphabetGame() {
  const navigate = useNavigate();
  
  // --- Game State ---
  const [gameStarted, setGameStarted] = useState(false);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [targetWords, setTargetWords] = useState([]);

  // --- Game Data ---
  // In a real app, this would come from an API
  const allPossibleWords = [
    { word: 'REACT', letters: ['R', 'E', 'A', 'C', 'T'] },
    { word: 'CODE', letters: ['C', 'O', 'D', 'E'] },
    { word: 'TECH', letters: ['T', 'E', 'C', 'H'] },
    { word: 'LEARN', letters: ['L', 'E', 'A', 'R', 'N'] },
    { word: 'BUILD', letters: ['B', 'U', 'I', 'L', 'D'] },
    { word: 'CREATE', letters: ['C', 'R', 'E', 'A', 'T', 'E'] },
    { word: 'DESIGN', letters: ['D', 'E', 'S', 'I', 'G', 'N'] },
  ];

  // --- Game Logic ---
  const startGame = () => {
    // Select a random word to be the main target
    const randomWordObj = allPossibleWords[Math.floor(Math.random() * allPossibleWords.length)];
    const mainWordLetters = randomWordObj.letters;
    
    // Add some random "distractor" letters
    const distractorLetters = ['X', 'Z', 'J', 'Q', 'V', 'K', 'M', 'P', 'W', 'Y', 'F', 'G', 'H', 'B', 'N', 'D', 'S'];
    const randomDistractors = [];
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * distractorLetters.length);
      randomDistractors.push(distractorLetters[randomIndex]);
    }
    
    // Combine and shuffle the letters
    const allLetters = [...mainWordLetters, ...randomDistractors];
    const shuffledLetters = allLetters.sort(() => Math.random() - 0.5);
    
    // Find all possible words from the full list that can be made with these letters
    const possibleWords = allPossibleWords.filter(wordObj =>
      wordObj.letters.every(letter => shuffledLetters.includes(letter))
    );

    setAvailableLetters(shuffledLetters);
    setTargetWords(possibleWords.map(w => w.word));
    setSelectedLetters([]);
    setFoundWords([]);
    setScore(0);
    setMessage('');
    setGameStarted(true);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetters(prev => [...prev, letter]);
    setMessage(''); // Clear message on new selection
  };

  const handleSubmitWord = () => {
    const currentWord = selectedLetters.join('').toUpperCase();
    
    if (currentWord.length < 3) {
      setMessage('Word must be at least 3 letters long!');
      return;
    }

    if (foundWords.includes(currentWord)) {
      setMessage('You already found that word!');
      return;
    }
    
    if (targetWords.includes(currentWord)) {
      const points = currentWord.length * 10;
      setScore(prevScore => prevScore + points);
      setFoundWords(prev => [...prev, currentWord]);
      setMessage(`Correct! "${currentWord}" is worth ${points} points.`);
      setSelectedLetters([]); // Clear for the next word
    } else {
      setMessage('Not a valid word. Try again!');
    }
  };

  const handleClearWord = () => {
    setSelectedLetters([]);
    setMessage('');
  };

  const handleBackToGames = () => {
    navigate('/games');
  };
  
  // --- Calculate Circle Positions ---
  const letterPositions = useMemo(() => {
    const radius = 150; // Radius of the circle
    const angleStep = (2 * Math.PI) / availableLetters.length;
    
    return availableLetters.map((letter, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      return {
        letter,
        id: `${letter}-${index}`, // Unique key
        style: {
          transform: `translate(${x}px, ${y}px)`,
        }
      };
    });
  }, [availableLetters]);

  // --- Render ---
  if (!gameStarted) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={handleBackToGames}>← Back</button>
          <h1>Alphabet Game</h1>
        </div>
        <div className="game-start-screen">
          <div className="game-icon-large">🔤</div>
          <h2>Alphabet Circle</h2>
          <p>Form words using the letters in the circle. Find all the hidden words!</p>
          <button className="start-game-btn" onClick={startGame}>Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-interface-container">
      <div className="game-interface-header">
        <button className="back-button" onClick={handleBackToGames}>← Back</button>
        <h1>Alphabet Game</h1>
        <div className="game-score">Score: {score}</div>
      </div>
      
      <div className="alphabet-game-layout">
        <div className="alphabet-circle-wrapper">
          <div className="word-display">
            <span>{selectedLetters.join('') || '...'}</span>
          </div>
          
          <div className="alphabet-circle-container">
            {letterPositions.map(({ letter, id, style }) => (
              <button
                key={id}
                className="alphabet-circle-letter"
                style={style}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="alphabet-game-sidebar">
          <div className="alphabet-game-controls">
            <div className="control-buttons">
              <button onClick={handleSubmitWord} className="submit-btn">Submit</button>
              <button onClick={handleClearWord} className="clear-btn">Clear</button>
            </div>
          </div>

          {message && <div className={`game-message ${message.includes('Correct') ? 'success' : 'error'}`}>{message}</div>}
          
          <div className="found-words">
            <h3>Found Words:</h3>
            <div className="found-words-list">
              {foundWords.length > 0 ? foundWords.map(word => <span key={word} className="found-word">{word}</span>) : <span>None yet...</span>}
            </div>
          </div>
          
          <button onClick={startGame} className="new-puzzle-btn">New Puzzle</button>
        </div>
      </div>
    </div>
  );
}

export default AlphabetGame;