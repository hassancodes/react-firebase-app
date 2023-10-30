import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";import * as yup from "yup";
import {useForm} from "react-hook-form"
import { useEffect,useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {addDoc,getDocs,deleteDoc,doc,collection,query,where} from "firebase/firestore";
import { render } from "react-dom";


export const Comment=(props)=>{
    const[user] = useAuthState(auth);
    const [filterComments,setFilterComments] = useState(null);
    const [displayComments,setDisplayComments]=useState(false);
    const commentRef = collection(db,"Comments")


    // ######### retrieving FilterComments #########
    const filterCommentDoc = query(commentRef, where("postIDComment","==",props.PostId))

    const getFilterComments =async()=>{

        try{
            const commentData = await getDocs(filterCommentDoc)
            setFilterComments(commentData.docs.map((data)=>(
               { 
                commentText : data.get("commentText").toString(),
                commentTime : data.get("commentTime").toString(),
                postIdComment : data.get("postIDComment").toString(),
                profileUrl : data.get("profileUrl").toString(),
                userName : data.get("username").toString()
                
               }
                )));
            
            } 
        catch(error){
            console.log(error);
        }
    
    }


useEffect(()=>{
    getFilterComments();
},[filterComments])


    // ####### defining schema for comment and adding the comment to Db ########
    
    const commentSchema = yup.object().shape({
        commentText :yup.string().required("You must add a comment").max(100),

    })

    const {register, handleSubmit, formState:{errors}} =useForm({
        resolver:yupResolver(commentSchema),
        })
        

      
    const postComment= async (data)=>{
        await addDoc(commentRef,{
            ...data,
            postIDComment:props.PostId,
            username: user?.displayName,
            profileUrl: user?.photoURL,
            commentTime: `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`
            
          });
        // getFilterComments();
          
    }





    return (
        <div >
            <div>
            {/* {filterComments ? filterComments.map((items) => (
                items.map((key,value)=>(
                    <li key={key}>{value}</li> 
                ))
        )) : ""} */}

            <li>{filterComments}</li>
            </div>
            <div class="media">
                <img class="align-self-start mr-3" src={user.photoURL} alt="Generic placeholder image"/>
                <div class="media-body">
                    <p class="mt-0">{user.displayName}</p>
                    <p>Comment goes here</p>
                </div>
            </div>

        {/* This is the form to input comments for the post */}
        <form onSubmit={handleSubmit(postComment)} >
            <div class="form-group">
                <label htmlFor="commentText"></label>
                {/* <input type="text" id="commentText"  class="form-control" placeholder="Enter Comment" autoComplete="off" {...register("commmentText")}/> */}
                <input type="text" class="form-control" id="commentText" aria-describedby="title" placeholder="Enter Post Title" {...register("commentText")}/>
                <p style={{color:"red"}}>{errors.commentText?.message}</p>
                
            </div>
        <button type="submit" class=""><i class="fa-solid fa-location-arrow"></i></button>
        </form>
        </div>

        )
}
