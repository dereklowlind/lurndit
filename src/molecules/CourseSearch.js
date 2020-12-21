import React, {useState} from 'react'
import {Grid, Paper, Input} from '@material-ui/core'
import { Link } from 'react-router-dom'
import '../css/search.css'

function CourseSearch(props) {

    const [searchTerm, setSearchTerm] = useState("")

    
    const updateSearch = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }

    var regex = new RegExp('^' + searchTerm.toLowerCase())

    var filteredResults = []

    for(var i=0; i < props.lists.length; i++) {
        var lower = props.lists[i].title.toLowerCase()
        const foundLower = regex.test(lower)
        if(foundLower) {
            filteredResults.push([props.lists[i].docId, props.lists[i].title])
        }

        if(filteredResults.length == 9) {
            break
        }
    }

    filteredResults.sort(function(a, b){
        return (a[1] < b[1]) ? -1 : 1
    })

    var displayResults = filteredResults.map((result, index) => {
        return (
            <Grid item xs={4} key={index}>
                <Link to={'/course/' + result[0]}>
                    <div className="searchResult">{result[1]}</div>
                </Link>
            </Grid>
        )
    })
    
    var isEmpty = filteredResults.length == 0
    
    return (
        <div className="searchCourseContainer">
            <div className="searchBoxContainer">
                <Input onChange={updateSearch} placeholder="Search for courses..." type='text'/>
            </div>
            <div className="searchResultContainer">
                {isEmpty ? 
                    (
                        <div>no results! :(</div>
                    ) 
                    : 
                    (
                        <Grid container spacing={3}>
                            {displayResults}
                        </Grid>
                    )
                }
                 
            </div>
        </div>
    )
}

export default CourseSearch