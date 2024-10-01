import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PuzzleGenerator from './components/PuzzleGenerator';
import PuzzleSolver from './components/PuzzleSolver';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Puzzle Generator</Link>
            </li>
            <li>
              <Link to="/solver">Puzzle Solver</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PuzzleGenerator />} />
          <Route path="/solver" element={<PuzzleSolver />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
