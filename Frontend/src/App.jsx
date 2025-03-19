import Header from './components/Header'
// import UserRegister from './components/Register'
import Home from './components/Home'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HealthRoute from './components/HealthRecords/HealthRoute'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records/*" element={<HealthRoute />} />
      </Routes>
    </Router>
  )
}

export default App
