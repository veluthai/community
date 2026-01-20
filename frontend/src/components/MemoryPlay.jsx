import React, { useEffect, useState } from 'react';

const tiles = Array(9).fill(null);

function getRandomTile() {
  return Math.floor(Math.random() * 9);
}

function MemoryPlay() {
  const [sequence, setSequence] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [activeTile, setActiveTile] = useState(null);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState('show');

  useEffect(() => {
    const newSeq = [...sequence, getRandomTile()];
    setSequence(newSeq);
    showSequence(newSeq);
  }, [level]);

  const showSequence = async (seq) => {
    setStatus('show');
    for (let i of seq) {
      setActiveTile(i);
      await new Promise(res => setTimeout(res, 600));
      setActiveTile(null);
      await new Promise(res => setTimeout(res, 200));
    }
    setStatus('play');
  };

  const handleClick = (index) => {
    if (status !== 'play') return;

    const newUserSeq = [...userSeq, index];
    setUserSeq(newUserSeq);

    if (sequence[newUserSeq.length - 1] !== index) {
      setStatus('fail');
      return;
    }

    if (newUserSeq.length === sequence.length) {
      setUserSeq([]);
      setTimeout(() => setLevel(level + 1), 800);
    }
  };

  if (status === 'fail') {
    return (
      <div className="game-complete">
        <h1>❌ Oops!</h1>
        <p>You reached Level {level}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="memory-container">
      <h2>Level {level}</h2>
      <p>{status === 'show' ? 'Watch carefully...' : 'Your turn!'}</p>

      <div className="memory-grid">
        {tiles.map((_, index) => (
          <div
            key={index}
            className={`memory-tile ${activeTile === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryPlay;
