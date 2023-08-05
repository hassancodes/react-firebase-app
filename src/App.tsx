
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {Login} from "./pages/Login";
import {Home} from "./pages/Home";
import {Navbar} from "./components/Navbar";


function App() {


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
