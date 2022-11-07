import "./GameOver.css";

const GameOver = ({restartGame, score, word}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <p className="endmsg">
          Você fez <span>{score}</span> {score > 1 || score === 0 ? "pontos." : "ponto."} <br />
          A palavra era: <span>{word}</span>
        </p>
        <button onClick={restartGame}>Jogar de novo</button>
    </div>
  );
};

export default GameOver;
