import './../App.css';

const Home = () => {
  return (
    <div className="App">
    <h1 style={{ textAlign: 'center' }}>JavaScript DCR Graphs Engine</h1>

    <p style={{ textAlign: 'center' }}>
      <a href="creator.html"><button id="btn-front-page">Creator</button></a>
      <a href="solver.html"><button id="btn-front-page">Solver</button></a>
      <button id="btn">Test Export</button>
    </p>

    <script src="js/Control/exercise_logic.js"></script>
    </div>
  );
}

export default Home;
