import {useForm} from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// firestore
import {addDoc,collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../../src/App.css"

// creating this interface to tell TypeScript the datatype of the "data" that is being passed into the onSubmit function


export const CreateForm = ()=>{
const navigate= useNavigate();

const [user] = useAuthState(auth);

// using yup.object().shape() to create a schema for the form.
const schema = yup.object().shape({
title:yup.string().required("you must add a title").max(100),
description:yup.string().required("you must add a description").max(500),


});

// specifying form datatypes
const {register, handleSubmit, formState:{errors}} =useForm({
resolver:yupResolver(schema),
})

const postRef = collection(db,"posts")

// once the user click on submit, this function will be called.
const onCreatePost=async (data)=>{

  await addDoc(postRef,{
    ...data,
    username: user?.displayName,
    id:user?.uid,
    profileUrl: user?.photoURL


  })
  // we can create a success page here later.
  navigate("/");

}
return (
<>


<form onSubmit={handleSubmit(onCreatePost)} class="createpost-form">
<div class="form-group">
  <label for="title">Enter Title</label>
  <input type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter Post Title" {...register("title")}/>
  <p style={{color:"red"}}>{errors.title?.message}</p>
</div>
<div class="form-group">
  <label for="description">Description</label>
  <textarea rows="10" type="text" class="form-control" id="description" placeholder="Enter Description" {...register("description")}></textarea>
  <p style={{color:"red"}}>{errors.description?.message}</p>

</div>
<input type="submit" class="btn btn-primary"/>
</form>
</>
    
    )
}