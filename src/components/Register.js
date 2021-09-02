import React, {useState} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`





const Register = (props) => {

    let{token,setToken}=props

    //console.log(token)//the state token

    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

    async function registration (){
        //console.log("username: "+username)
        //console.log("password: "+password)
        let user = {"username":username,
                    "password":password
                    }
        //console.log(user)
        try{
            //user is inside of an object because that is how the API is expecting it according to the documentation and lecture video
            const response = await axios.post(`${APIURL}/users/register`,{user})
            setToken(response.data.data.token)
            //console.log(response.data.data.token)//the token gained in response
            //state may not be set yet
            localStorage.setItem("token",response.data.data.token)
        }
        catch(error){
            console.log("error with registration: "+error)
            alert("There was an error with the registration")
        }
    }


    //below is form stuff
    function handleSubmit(event){
        event.preventDefault()
        
        //this is where I am calling the function above to submit the username/password
        registration()
        //setUserName("")
        //setPassword("")
    }

    if(token){
        return(
            <Redirect to ="/"/>
        )
    }

    return(
        <div if="registration-screen">
            <h2>Register</h2>
            <form id="registerID" onSubmit={handleSubmit}>
                <label htmlFor = "username">Username</label>
                <input type="text" name="username" value={username} onChange={function(event){setUserName(event.target.value)}}/>
                <label htmlFor = "password">Password</label>
                <input type="password" name="password" value={password} onChange={function(event){setPassword(event.target.value)}}/>
                <button type="Submit">Register</button>
            </form>
        </div>
    )



}
export default Register;