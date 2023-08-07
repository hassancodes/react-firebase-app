import {Post as IPost} from "./Home"

// imported the interface
interface Props{
post:IPost;
}
export const PostComponent=(props:Props)=>{
// learn more about this concept 
    const {post} = props;
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
          <button>&#128077;</button>
        </div>
    </div>
    </>)

}