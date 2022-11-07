import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  tip,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{tip}</span>
      </h3>
      <p>
        Você ainda tem {guesses} {guesses === 1 ? "tentativa" : "tentativas"}.
      </p>
      <div className="word-container">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letter-container">
        <p>Tente adivinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required
          />
          <button type="submit">Jogar!</button>
        </form>
      </div>
      <div className="wrongLetters-container">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
