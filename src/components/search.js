import React, {useState,useEffect} from "react"
import axios from "axios"

const BASE_URL = "https://strangers-things.herokuapp.com";
const COHORT = "2108-UIC-RM-WEB-FT"
const APIURL = `${BASE_URL}/api/${COHORT}`




const Search = (props) => {
    
    let{searchState,setSearchState}=props

    const searchPosts = (searchValue) =>{
        try{
            setSearchState(searchValue)
            
        }
        catch(error){
            console.log("there was an error with the search: ",error)
        }
    }
    console.log(searchState)
    return(
        <div className="search-box">
            <p>Search Title</p>
            <input type="text" name="search" value={searchState} onChange={function(event){searchPosts(event.target.value)}}/>
        </div>
    )
}

export default Search