import React, {useState,useEffect} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const UserProfile = (props) => {

    const[dataPosts,setDataPosts]=useState([])

    let{token,selectPost,setSelectPost}=props
    
    useEffect(()=>{
        const fetchPostsTokenYes = async () =>{
                const response = await axios.get(APIURL+"/users/me",{
                    headers: {Authorization: `Bearer ${token}`,}
                });
                //console.log(token)
                setDataPosts(response.data.data.posts)
                    //console.log(posts)
        }
        token ? fetchPostsTokenYes() : null
    },[token,selectPost],)

    console.log("this is the posts: ",dataPosts)
    return(
        <div className="posts-class">
            <h1>Your Posts</h1>
            {
                dataPosts.map(function(element,index){
                    return(
                        <>
                        {element.active ? <div key={index} className="post-class">
                            <h2>{element.title}</h2>
                            <p>{element.description}</p>
                            <p>{element.location}</p>
                            <p>{element.price}</p>
                            <p>{element.willDeliver ? "Will Deliver" : "No Delivery"}</p>
                            <div classname="message-box">
                                <h3>Messages</h3>
                                {element.messages.length>0 ? element.messages.map(function(messageElement,index){
                                    return(
                                        <div key={index} className="message-class">
                                            <p>{messageElement.content}</p>
                                            <p>{messageElement.fromUser.username}</p>
                                            
                                        </div>
                                    )
                                }):<p>there are no messages for this post</p>}
                            </div>
                        </div> : null}
                        </>
                    )
                    })
            }
        </div>
        )
                
                

}

export default UserProfile