import './App.css'
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from './pages/HomePage/Homepage';
import OffTrip from './pages/OffTrip/OffTrip.jsx';
import OnTrip from './pages/OnTrip/OnTrip';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/offtrip" element={<OffTrip />} />
        <Route path="/ontrip" element={<OnTrip />} />
      </Routes>
    </>
  )
}

export default App;
