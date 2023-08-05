import {auth,provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth";


export const Login=()=>{

    const signInWithGoogle=async ()=>{
        const result = await signInWithPopup(auth,provider);
        console.log(result);
    }
    return (
    <div>
    <h1>Sign in using Google Auth</h1>
    <button onClick={signInWithGoogle}>Sign in </button>
    </div>
    )
}
