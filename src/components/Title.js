import React, {useEffect} from "react"
import axios from "axios"
import {BrowserRouter as Router,Route, Link, Redirect} from "react-router-dom"


import Logout from "./Logout";


const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`


const Title = (props) => {

    let{token,setToken}=props
    

    return(
        <div id = "title">
            <div id="title-words">
            <h1>Stranger's Things</h1>
            </div>
            <div id="buttons">
                {token ? <Link to = "/add-post">Add Post</Link>:null}
                {token ? <Logout
                token = {token}
                setToken = {setToken}
                /> : <Link to = "/login">Login</Link>}
                {token ? <Link to = "/user-profile">User Profile</Link>: null}
            </div>


            {/* <select
            name="user-options"
            id="user-options"
            >
                <option value="all-posts">All Posts</option>
                <option value="my-posts">My Posts</option>
                <option value="add-post">Add Posts</option>
                <option value="messages">My Messages</option>
            </select> */}
        </div>
    )


}

export default Title;