import React, {useState} from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router,Route, Link} from "react-router-dom"

import PostsView from './components/Postsview';
 
import Register from './components/Register';

import Login from "./components/Login";

import Title from "./components/Title"

const App = () => {
    const[posts,setPosts]=useState([])
    const[token,setToken]=useState("")


    return <div id="app">
        <Router>
            <Title
            token={token}
            setToken={setToken}
            />

            <PostsView
            posts = {posts}
            setPosts = {setPosts}
            />

            {/* ternery operators to display or not display based on whether there is a token */}
            {!token ? <Register
            token = {token}
            setToken = {setToken}
            /> : null}


            <Route
            path="/login"
            render={() => <Login
                token = {token}
                setToken = {setToken}/>}
            />
        </Router>

    </div>
}




ReactDOM.render(<App/>,document.getElementById('app'))

//figure out what the makeheaders thing is about