import React, {useEffect} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const PostsView = (props) => {

    let{posts,setPosts,token,selectPost,setSelectPost}=props

    //console.log(posts)
    //console.log(token)

    useEffect(()=>{
        const fetchPostsTokenYes = async () =>{
                const response = await axios.get(APIURL+"/posts",{
                    //askTravis: for some reason it seems to be doing the step to move the token from local storage to state after it is fetching the post. I fixed it here by having it check local storage instead
                    headers: {Authorization: `Bearer ${token}`,}
                });
    
                let data = response.data.data.posts
                //console.log("this is the data: ",data)
                //console.log(token)
                setPosts(data)
                    //console.log(posts)
                }
        const fetchPostsTokenNo = async () =>{
                const response = await axios.get(APIURL+"/posts",{
                });
    
                let data = response.data.data.posts
                //console.log("this is the data: ",data)
                //console.log(token)
                setPosts(data)
                    //console.log(posts)
                }
                token ? fetchPostsTokenYes() : fetchPostsTokenNo
                console.log("this ran")
    },[token,selectPost])
    //console.log(posts)

    const deletefunc = async (deleteId) => {
        
        try{
        const response = await axios.delete(APIURL+"/posts/"+deleteId,{
            headers: {Authorization: `Bearer ${token}`,}
        });
        //console.log (response.data.success)
        setSelectPost(deleteId)
        //console.log("selectPost: ",selectPost)
        }
        catch(error){
            console.log("there was an error: ",error)
        }
    }



    return(
        <div className="posts-class">
            {
                posts.map(function(element,index){
                    return(
                        <div key={index} className="post-class">
                            <h2>{element.title}</h2>
                            <p>{element.description}</p>
                            {/* When I log out it doesn't refresh the page to not show the messages */}
                            <p>{element.isAuthor ? "This is your post!":"this is not your post"}</p>
                            <p>{element.messages.length>0 && element.isAuthor ? element.messages:"you have no messages"}</p>
                            {element.isAuthor ? <button className="delete-button" onClick={()=>{deletefunc(element._id)}}>Delete Post</button> : null}
                        </div>
                        
                    )
                })
            }
        </div>
    )
}
export default PostsView;