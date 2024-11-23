import './App.css'
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import OffTrip from './components/OffTrip/OffTrip.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/offtrip" element={<OffTrip />} />
      </Routes>
    </>
  )
}

export default App;
