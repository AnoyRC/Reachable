import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path = 'register' element = {<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
