import  {Link} from "react-router-dom";
import {auth} from "../config/firebase";

// used to manage the current user
import {useAuthState} from "react-firebase-hooks/auth"
// using this to sign out the current user.
import {signOut} from "firebase/auth";

export const Navbar= ()=>{
    const [user] = useAuthState(auth);
    const sighUserOut=async ()=>{
       await signOut(auth)
    }
    return (
        <div>
        <div>
    <Link to="/">Home  </Link>
    {!user ? <Link to="/login">Login </Link> : <Link to="/createPost">Create Post  </Link> 
    }
    <br />
    {user && <button onClick={sighUserOut}>LogOut</button>}
    
    </div>

    <div>
        {user &&
        <>        
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""}/>
        {/* <button onClick={sighUserOut}>LogOut</button> */}
        </>
        }
    </div>

    </div>
    )
}