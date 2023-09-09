import {addDoc,getDocs,deleteDoc,doc,collection,query,where} from "firebase/firestore";
import {auth, db} from "../../config/firebase"
// import {Post as IPost} from "./Home"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect,useState } from "react";
import "../../../src/App.css"
// imported the interface


// interface for get users who like the post {

export const PostComponent=(props)=>{
// learn more about this concept
const {post} = props;
const [user] = useAuthState(auth);
const [likes,setLikes] = useState(null);
const likeRef = collection(db,"likes")


// ============ fetching likes logic starts from here ============


// get all the like docs where the postId(already stored in firebase == to current post.id(that is being liked))
const likeDoc = query(likeRef, where("postId","==",post.id))
const getLike = async ()=>{
const data =await getDocs(likeDoc);
// using this we can get all the ids that like and number of ids using array length.
setLikes(data.docs.map((doc)=>({ id:doc.data().id,likeId:doc.id})));
// setLike(data.docs);
}

// we are adding an empty list as an argument, so that useEffect will only run when the component is mounting, not when
// updating.
useEffect(()=>{
getLike();
},[])


// alert();


// ============ fetching likes logic ends from here ============

// ============ adding the like functionality starts from here ============



const addLike=async ()=>{
try{
const newDoc = await addDoc(likeRef,{id:user?.uid, postId:post?.id})
if(user){
setLikes((prev)=>
prev ? [...prev, {id : user.uid, likeId:newDoc.id }] : [{id : user.uid ,likeId:newDoc.id}]);
// prev && [...prev ,{id:user.uid}]);
}
}
catch(error){
console.log(error);
}

}
// ============ adding the like functionality ends here ===============


// ============ remove like function is going to start here ==========
const removeLike =async()=>{
try{
const deleteQuery = query(likeRef, where("postId","==",post?.id),where("id","==",user?.uid));
const deleteData = await getDocs(deleteQuery);
const likedId = deleteData.docs[0].id
const likeToDelete = doc(db,"likes",likedId);

await deleteDoc(likeToDelete);
// updating the likes list
if(user){
setLikes((prev)=>prev && prev.filter((like)=>like.likeId !== likedId));
}

}catch(error){

}

}
// ============ remove like function is going to ends here ==========


const hasUserLiked = likes?.find((like)=> like.id === user?.uid)
return (

    <>
    
    <div class="card border-success mb-5 post">
        <div class="card-header bg-transparent border-success">@{post.username}</div>
        <div class="card-body text-success">
            <h5 class="card-title">{post.title}</h5>
            <p class="card-text">{post.description}</p>
        </div>
        <div class="card-footer bg-transparent border-success post-footer"><button class="btn btn-primary" onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
        {likes && <p>Likes :{likes.length} </p>}</div>

    </div>
    
    
    
    {/* <div>
            <div className="title">
                <h3>{post.title}</h3>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                {likes && <p>Likes :{likes.length} </p>}

            </div>
        </div> */}
        
        
        </>);
}
