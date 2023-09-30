import {Link} from "react-router-dom";
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

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"><strong>Idiya.</strong></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/">Home</a>

                <a class="nav-item nav-link" href={!user ? "/login" : "/createPost" }>{!user ? "Login" :
                    "CreatePost"}</a>
                <a class="nav-item nav-link text-right">
                    <p>{user?.displayName}</p>
                </a>

                {/* <a class="nav-item nav-link"><img width="28px" height="28px" class="img-fluid float-right"
                        src={user?.photoURL || "" } /></a> */}
                {user && <button role="button" class="btn btn-outline-success" onClick={sighUserOut}>LogOut</button>}



            </div>
        </div>
    </nav>

</div>
)
}


const NAVBAR=(props)=>{
return (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#"><strong>Idiya</strong></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/">Home</a>
            <a class="nav-item nav-link" href="/"></a>
        </div>
    </div>
</nav>
)
}