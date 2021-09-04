import React, {useEffect} from "react"

import PostsView from "./Postsview";

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`





const Logout = (props) => {

    let{token,setToken}=props

    //console.log(token)//the state token

    function logoutSet(){
        setToken("")
        localStorage.removeItem("token")
    }


    function handleClick(event){
        event.preventDefault()
        
        //this is where I am calling the function above to submit the username/password
        logoutSet()
        console.log("done")
    }

    return(
        <button id="logout" onClick={handleClick}>Logout</button>
    )

}
export default Logout;