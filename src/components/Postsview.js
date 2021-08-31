import React, {useEffect} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const PostsView = (props) => {

    let{posts,setPosts}=props

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await axios.get(APIURL+"/posts");
            //for some reason this has to go down multiple levels to get to the array (axios put it into an object so the first data is to get into that object, then there was an object element called data anyways, then I had to go into posts to get the data in the posts)
            let data = response.data.data.posts
            setPosts(data)
            //console.log(posts)
        }
        fetchPosts()
    },[])
    //console.log to check that it is pulling the data correctly. Strange thing where it returns 2 logs. The first one is an empty array because it is logging what it remembers the array was at the beginning. The second is the array with data because it is logging what the array is.
    //console.log(posts)

    return(
        <div className="posts-class">
            {
                posts.map(function(element){
                    return(
                        <div key={element.id} className="post-class">
                            <h2>{element.title}</h2>
                            <p>{element.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default PostsView;