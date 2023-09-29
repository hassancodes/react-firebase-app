import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {Login} from "./pages/Login";
import {Home} from "./pages/home/Home";
import {Navbar} from "./components/Navbar";
import {CreatePost} from "./pages/create-post/CreatePost";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from './config/firebase';



function App() {
  const [user] = useAuthState(auth);

  
  return (
    
    <div class="navbar-div">
  <Router>
    {/* const navigate = useNavigate(); */}
    <Navbar />
    
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />}/>
      <Route path="/login" element={user ? <Home /> : <Login />}/>
      <Route path="/CreatePost" element={user ? <CreatePost /> : <Login/>}/>
    </Routes>
  </Router>
</div>
)
}

export default App;