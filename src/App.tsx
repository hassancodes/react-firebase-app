
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {Login} from "./pages/Login";
import {Home} from "./pages/home/Home";
import {Navbar} from "./components/Navbar";
import {CreatePost} from "./pages/create-post/CreatePost";


function App() {


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/CreatePost" element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
