import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path = 'register' element = {<Register />} />
        <Route path = 'login' element = {<Login />} />
        <Route path = 'home' element = {<Home />} />
        <Route path = 'profile' element = {<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
