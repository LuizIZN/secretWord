/* CSS */
import "./App.css";

/* Components */
import Home from "./components/Home";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

/* React */
import { useCallback, useEffect, useState } from "react";

/* Dados */
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [letters, setLetters] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(4);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();
    setGameStage(stages[1].name);

    // array das letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setCategory(category);
    setWord(word);
    setLetters(wordLetters);
    setScore(0);
  }, [pickWordAndCategory]);

  const rightWord = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();

    // array das letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setCategory(category);
    setWord(word);
    setLetters(wordLetters);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const restartGame = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      rightWord();
    }
  }, [guessedLetters, letters, startGame, rightWord]);

  return (
    <div className="App">
      {gameStage === "start" && <Home startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          tip={category}
          pickedWord={word}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && (
        <GameOver score={score} word={word} restartGame={restartGame} />
      )}
    </div>
  );
}

export default App;
