import React, {useEffect} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const PostsView = (props) => {

    let{posts,setPosts,token}=props

    console.log(posts)
    console.log(token)

    useEffect(()=>{
        const fetchPosts = async () =>{
                const response = await axios.get(APIURL+"/posts",{
                    //askTravis: for some reason it seems to be doing the step to move the token from local storage to state after it is fetching the post. I fixed it here by having it check local storage instead
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,}
                });
    
                let data = response.data.data.posts
                setPosts(data)
                    //console.log(posts)
                }
                fetchPosts()
    },[])
    //console.log(posts)

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
                        </div>
                    )
                })
            }
        </div>
    )
}
export default PostsView;