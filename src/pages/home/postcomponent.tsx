import {Post as IPost} from "./Home"
import {addDoc,collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
// imported the interface
interface Props{
post:IPost;
}
export const PostComponent=(props:Props)=>{
// learn more about this concept 
    const {post} = props;
    const [user] = useAuthState(auth);
    // adding the like functionality
    const likeRef = collection(db,"likes")
    
    const addLike=async ()=>{
        await addDoc(likeRef,{id:user?.uid, postId:post?.id})

    }



    
    return (<>
    
    <div>
        <div className="title">
            <h3>{post.title}</h3>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
          <button onClick={addLike}>&#128077;</button>
          <p>Likes : </p>

        </div>
    </div>
    </>)

}