import React, {useState} from "react"
import axios from "axios"
import {BrowserRouter as Router,Route, Link, Redirect} from "react-router-dom"
import PostsView from "./Postsview";

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`





//title, description, price, location, willing to deliver
const AddPost = (props) => {

    let{token}=props

    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[location,setLocation]=useState("")
    const[willDeliver,setWillDeliver]=useState(false)
    
    async function addpost(){
        //took my forever to figure out that it needed to be an object with post in it as the key and then another object with the data in it inside
        let addpost = {post: {
                    title:title,
                    description:description,
                    price:price,
                    location:location,
                    willDeliver:willDeliver
        }}
        //console.log(user)
        try{
            //user is inside of an object because that is how the API is expecting it according to the documentation and lecture video
            console.log(addpost)
            //console.log(token)
            let response =await axios.post(`${APIURL}/posts`,addpost,{
                headers: {Authorization: `Bearer ${token}`,}
            })
            console.log(response.data.success)
            console.log(response.data.data.post)

        }
        catch(error){
            console.log("error with adding post: "+error)
            alert("There was an problem adding your post")
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        addpost()
    }

    return(
    <>
    {
        token ? <div id="addpost">
            <form id="registerID" onSubmit={handleSubmit}>
                <label htmlFor = "title">Title</label>
                <input type="text" name="title" value={title} onChange={function(event){setTitle(event.target.value)}}/>
                <label htmlFor = "description">Description</label>
                <input type="text" name="description" value={description} onChange={function(event){setDescription(event.target.value)}}/>
                <label htmlFor = "price">Price</label>
                <input type="text" name="price" value={price} onChange={function(event){setPrice(event.target.value)}}/>
                <label htmlFor = "location">Location</label>
                <input type="text" name="location" value={location} onChange={function(event){setLocation(event.target.value)}}/>
                <label htmlFor = "willdeliver">Willing to Deliver?</label>
                <input type="checkbox" name="willdeliver" value={willDeliver} onChange={function(){setWillDeliver(!willDeliver)}}/>
                <button type="Submit">Add Post</button>
            </form>
       </div>
    : <div id="not-logged-in">
        <h2>Please Log In</h2>
        <Link to = "/login">Login</Link>
    </div>
    }
    </>
    )
}

export default AddPost

//this still needs to be finished
