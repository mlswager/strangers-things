import React, {useState,useEffect} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router,Route, Link} from "react-router-dom"

import PostsView from './components/Postsview';
 
import Register from './components/Register';

import Login from "./components/Login";

import Title from "./components/Title"

import AddPost from "./components/addpost"

import MessageForm from "./components/messageForm"

import UserProfile from "./components/userProfile";

import Search from "./components/search";


const App = () => {
    const[posts,setPosts]=useState([])
    const[token,setToken]=useState("")
    const[selectPost,setSelectPost]=useState("")
    const[searchState,setSearchState]=useState("")

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
            render={(renderprops) => <AddPost {...renderprops}
                token = {token}/>}
            />

            <Route
            path="/login"
            render={(renderprops) => <Login {...renderprops}
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
            path="/message-form"
            render={(renderprops) => <MessageForm {...renderprops}
                token = {token}
                setToken = {setToken}
                selectPost = {selectPost}/>}
            />

            <Route
            path="/user-profile"
            render={(renderprops) => <UserProfile {...renderprops}
                posts = {posts}
                setPosts = {setPosts}
                token = {token}
                setToken = {setToken}
                selectPost = {selectPost}/>}
            />

            <Route
            exact path="/"
            render={(renderprops) => <PostsView {...renderprops}
                posts = {posts}
                setPosts = {setPosts}
                token = {token}
                selectPost={selectPost}
                setSelectPost={setSelectPost}
                searchState={searchState}
                setSearchState={setSearchState}
                />}
            />
        </Router>

    </div>
}




ReactDOM.render(<App/>,document.getElementById('app'))

//figure out what the makeheaders thing is about