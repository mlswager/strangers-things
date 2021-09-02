import React, {useState,useEffect} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router,Route, Link} from "react-router-dom"

import PostsView from './components/Postsview';
 
import Register from './components/Register';

import Login from "./components/Login";

import Title from "./components/Title"

import AddPost from "./components/addpost"

const App = () => {
    const[posts,setPosts]=useState([])
    const[token,setToken]=useState("")

    //the below useEffect is used if the page is refreshed and there is no token in state, but there is a token in local storage it puts the token from local storage into state
    useEffect(()=>{
    localStorage.getItem("token") ? setToken(localStorage.getItem("token")):setToken("")
    },[])


    return <div id="app">
        <Router>
            <Title
            token={token}
            setToken={setToken}
            />

            <Route
            path="/add-post"
            render={() => <AddPost
                token = {token}/>}
            />

            <Route
            path="/login"
            render={() => <Login
                token = {token}
                setToken = {setToken}/>}
            />

            <Route
            path="/register"
            render={() => <Register
                token = {token}
                setToken = {setToken}/>}
            />

            <Route
            exact path="/"
            render={() => <PostsView
                posts = {posts}
                setPosts = {setPosts}
                token = {token}/>}
            />
        </Router>

    </div>
}




ReactDOM.render(<App/>,document.getElementById('app'))

//figure out what the makeheaders thing is about