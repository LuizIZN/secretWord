import "./Home.css";

const Home = ({startGame}) => {
  return (
    <div>
      <h2>Secret Word</h2>
      <p className="title">Adivinhe as palavras corretamente!</p>
      <button className="start" onClick={startGame}>VAMOS COMEÇAR</button>
    </div>
  );
};

export default Home;
