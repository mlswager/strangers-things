import React, {useEffect} from "react"
import axios from "axios"
import {BrowserRouter as Router,Route, Link} from "react-router-dom"


import Logout from "./Logout";
import Login from "./Logout";


const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`


const Title = (props) => {

    let{token,setToken}=props

    return(
        <Router>
        <div id = "title">
            <h1>Stranger's Things</h1>
            
            <div id="login/out">
                {token ? <Logout
                token = {token}
                setToken = {setToken}
                /> : <Link to = "/login">Login</Link>}

            //use render and use history

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
        </Router>
    )


}

export default Title;