import React, {useState} from 'react'
import {Grid, Paper, Input} from '@material-ui/core'
import { Link } from 'react-router-dom'
import '../css/search.css'

function CourseSearch(props) {

    console.log(props.lists)
    const [searchTerm, setSearchTerm] = useState("")

    
    const updateSearch = (event) => {
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }

    

    var regex = new RegExp('^' + searchTerm)

    if (searchTerm == "") {
        regex = /^.{0}$/
    }
    
    var filteredIds = []
    var filteredText = []

    for(var i=0; i < props.lists.length; i++) {
        const found = regex.test(props.lists[i].title)
        if(found) {
            filteredIds.push(props.lists[i].docId)
            filteredText.push(props.lists[i].title)
        }

        if(filteredText.length == 9) {
            break
        }
    }

    var displayResults = filteredText.map((result, index) => {
        return (
            <Grid item xs={4} key={index}>
                <Link to={'/list/' + filteredIds[index]}>
                    <div className="searchResult">{result}</div>
                </Link>
            </Grid>
        )
    })
    
    var isEmpty = filteredText.length == 0
    
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