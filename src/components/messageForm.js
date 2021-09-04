import React, {useState} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`





const MessageForm = (props) => {
    let{token,setToken,selectPost}=props

    const[message,setMessage]=useState("")

    let sendMessage = {message: {content: message}}

    async function handleSubmit(event){
        event.preventDefault()
        console.log(`${APIURL}/posts/${selectPost}/messages`)
        let response =await axios.post(`${APIURL}/posts/${selectPost}/messages`,sendMessage,{
            headers: {Authorization: `Bearer ${token}`,}
        })
        props.history.push("/")
        console.log(response.data.success)
        console.log(response.data.data.post)

    }

    return (
            <form id="message-form" onSubmit={handleSubmit}>
                {/* <label htmlFor = "Enter your message Here">Username</label> */}
                <input type="text" name="message" value={message} onChange={function(event){setMessage(event.target.value)}}/>
                <button type="Submit">Submit Message</button>
            </form>

    )

}

export default MessageForm