// I am using get docs since we need all not just one.
import {getDocs, collection} from "firebase/firestore"
import {db} from "../../config/firebase";
import { useState,useEffect } from "react";
import { PostComponent } from "./postcomponent";

export interface Post{
    title:string;
    description:string;
    username:string;
    id:string;
}
export const Home=()=>{
    const [postsList,setPostList]=useState<Post[] | null>(null)
    const postRef = collection(db,"posts")

    const getPosts=async ()=>{
        const data = await getDocs(postRef);
        // this data is raw(mean include bs as well).
        setPostList(
            data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]
            );
            console.log(postsList);
    }
    useEffect(()=>{
        getPosts();
    },[])
    return <div>{postsList?.map((post)=> <PostComponent post={post}/>)}</div>;
}

// React query is used when you dont have control over your backend