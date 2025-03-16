import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Homepage} from './pages/Homepage';
import Poins from './pages/Poins';
import Upgrade from './pages/Upgrade';

function App() {
  console.log("Rendering App");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="poins" element={ <Poins />} />
        <Route path="upgrade" element={ <Upgrade />} />
      </Routes>
    </div>
  );
}

export default App;
