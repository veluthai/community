import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import AlphabetGame from "./AlphabetGame";
import MemoryGame from "./MemoryGame";
import WordPuzzle from "./WordPuzzle";
import MatchingPairs from "./MatchingPairs";
import FillInTheBlanks from "./FillInTheBlanks";
import WordScramble from "./WordScramble";
import SpellingGame from "./SpellingGame";
import Slides from "./Slides";
import DialogueGame from "./DialogueGame";

function GameInterface() {
  const { gameName } = useParams();
  const navigate = useNavigate();

  switch (gameName) {
    case "alphabet":
      return <AlphabetGame />;

    case "memory":
      return <MemoryGame />;

    case "word-puzzle":
      return <WordPuzzle />;

    case "matching-pairs":
      return <MatchingPairs />;

    case "fill-in-the-blanks":
      return <FillInTheBlanks />;

    case "word-scramble":
      return <WordScramble />;

    case "spelling":
      return <SpellingGame />;

    case "slides":
      return <Slides />;

    case "dialogue":   // ✅ FIXED
      return <DialogueGame />;

    default:
      return (
        <div className="game-interface-container">
          <button onClick={() => navigate("/games")}>← Back</button>
          <h2>🚧 Game Coming Soon</h2>
        </div>
      );
  }
}

export default GameInterface;
