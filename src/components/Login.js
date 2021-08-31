import React, {useState} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`





const Login = (props) => {

    let{token,setToken}=props

    //console.log(token)//the state token

    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

    async function loginCheck(){
        let user = {"username":username,
                    "password":password
                }
        //console.log(user)
        try{
            const response = await axios.post(`${APIURL}/users/login`,{user})
            //console.log(response.data.data)
            setToken(response.data.data.token)
            localStorage.setItem("token",response.data.data.token)
        }
        catch(error){
            console.log("error with login: "+error)
            alert("There was an error with the login")
        }
        
    }



    function handleSubmit(event){
        event.preventDefault()
        
        //this is where I am calling the function above to submit the username/password
        loginCheck()
        //setUserName("")
        //setPassword("")
    }

    return(
        <div if="login-screen">
            <h2>Login</h2>
            <form id="registerID" onSubmit={handleSubmit}>
                <label htmlFor = "username">Username</label>
                <input type="text" name="username" value={username} onChange={function(event){setUserName(event.target.value)}}/>
                <label htmlFor = "password">Password</label>
                <input type="text" name="password" value={password} onChange={function(event){setPassword(event.target.value)}}/>
                <button type="Login">Login</button>
            </form>
        </div>
    )
}
export default Login;
