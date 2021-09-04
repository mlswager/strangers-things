import React, {useEffect} from "react"
import axios from "axios"

import Search from "./search";

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const PostsView = (props) => {

    let{posts,setPosts,token,selectPost,setSelectPost,searchState,setSearchState}=props

    //console.log(posts)
    //console.log(token)

    useEffect(()=>{
        const fetchPostsTokenYes = async () =>{
                const response = await axios.get(APIURL+"/posts",{
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
        token ? fetchPostsTokenYes() : fetchPostsTokenNo()
        console.log("this ran")
    },[token,selectPost],)
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

    const messagefunc = (messageId) => {
        try{
            setSelectPost(messageId)
            props.history.push("/message-form")
            
        }
        catch(error){
            console.log("there was an error navigating to the message screen: ",error)
        }
    }


    const postMatches = (post,text)=>{
        console.log("title is: ",post.title)
        console.log("text is: ",text)
        return post.title.toLowerCase().includes(text.toLowerCase())
        
    }

    //still trying to fully understand the .filter thing. looked on MDN
    const filteredPosts=posts.filter(post =>postMatches(post,searchState))
    const postsToDisplay = searchState.length ? filteredPosts: posts





    return(
        <div className="posts-class">
            <Search
            searchState={searchState}
            setSearchState={setSearchState}
            />
            {
                postsToDisplay.map(function(element,index){
                    return(
                        <div key={index} className="post-class">
                            <h2>{element.title}</h2>
                            <p>{element.description}</p>
                            {/* When I log out it doesn't refresh the page to not show the messages */}
                            <p>{element.isAuthor ? "This is your post!":null}</p>
                            <p>{element.isAuthor ? `messages: ${element.messages.length}`: null}</p>
                            {element.isAuthor ? <button className="delete-button" onClick={()=>{deletefunc(element._id)}}>Delete Post</button> : null}
                            {!element.isAuthor ? <button className="message-button" onClick={()=>{messagefunc(element._id)}}>Send a Message</button> : null}
                        </div>
                        
                    )
                })
            }
        </div>
    )
}
export default PostsView;