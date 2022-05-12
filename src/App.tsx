import { createRoot } from 'react-dom/client';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Creator from './Pages/Creator';
import Solver from './Pages/Solver';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/creator" element={<Creator/>}></Route>
        <Route path="/solver" element={<Solver/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
