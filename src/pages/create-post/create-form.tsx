import {useForm} from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// firestore
import {addDoc,collection} from  "firebase/firestore"
import {auth, db} from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// creating this interface to tell TypeScript the datatype of the "data" that is being passed into the onSubmit function
interface FormData{
    title:string;
    description:string;
}

export const CreateForm = ()=>{

    const [user] = useAuthState(auth);

// using yup.object().shape() to create a schema for the form.
    const schema = yup.object().shape({
        title:yup.string().required("you must add a  title").max(100),
        description:yup.string().required("you must add a description").max(500),

    });

    // specifying form datatypes
    const {register, handleSubmit, formState:{errors}} =useForm<FormData>({
        resolver:yupResolver(schema),
    })

    const postRef = collection(db,"posts")

    // once the user click on submit, this function will be called.
    const onCreatePost=async (data:FormData)=>{
       await addDoc(postRef,{
        ...data,
        username: user?.displayName,
        id:user?.uid

       })

    }
    return <form onSubmit = {handleSubmit(onCreatePost)}>
        <input type="text" placeholder="Enter the title" {...register("title")}/>
        {/* fetchingn erros from the formState */}
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Enter the Description" {...register("description")}/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="submit" />
    </form>
}