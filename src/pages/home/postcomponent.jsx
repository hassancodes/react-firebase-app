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
// this hook is to either show
const [showComment, setShowComment] = useState();
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


const clickedCommentSection = ()=>{
    if(showComment){
        setShowComment(false);
        return showComment;
    }
    setShowComment(true)
    return showComment;

}


// CommentSection started here
const commentSection=()=>{
    return (
    <div>
        <div class="media">
        <img class="align-self-start mr-3" src={user.photoURL} alt="Generic placeholder image"/>
        <div class="media-body">
            <p class="mt-0">{user.displayName}</p>
            <p>Comment goes here</p>
        </div>
    </div>

    <form >
        <div class="form-group">
            <label for=""></label>
            <input type="text" id="comment"  placeholder="Enter Comment"/>
            <button type="submit" class=""><i class="fa-solid fa-location-arrow"></i></button>
        </div>
    </form>
    </div>
    )
}

// Comment Section Ends Here

return (

    <>
    
    <div class="card  mb-5 post border-secondary">
        <div class="card-header bg-secondary text-white"><img class="post-profile" src={post.profileUrl || "" } />@{post.username}</div>
        
        <div class="card-body">
            <h5 class="card-title">{post.title}</h5>
            <p class="card-text">{post.description}</p>
        </div>
        
        <div class="card-footer bg-transparent  post-footer">
            <button  onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <i class="fa-solid fa-heart fa-lg" style={{color: "#c80000;"}}></i> : <><i class="fa-regular fa-lg fa-heart"></i></>}</button>
            {likes && <p> &#160;&#160;{likes.length} </p>}
            
            &nbsp;&nbsp;&nbsp;
            <button onClick={clickedCommentSection}><i class="fa-regular fa-comment fa-lg"></i></button>
            {likes && <p> &#160;&#160;  {likes.length-likes.length} </p>}


            &nbsp;&nbsp;&nbsp;
            <button><i class="fa-regular fa-share-from-square"></i></button>
            {likes && <p> &#160;&#160;  </p>}

            
        </div>

        <div class="card-footer bg-transparent  post-footer">
            {showComment ? commentSection() : ""} 
            
        </div>

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
