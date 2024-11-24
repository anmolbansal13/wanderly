import './App.css'
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import OffTrip from './components/OffTrip/OffTrip.jsx';
import OnTrip from './components/OnTrip/OnTrip';
function App() {
  return (<>
      <Navbar/>
      {/* <Homepage/> */}
      {/* <OffTrip/> */}
      <OnTrip />
    </>)
}

export default App;
