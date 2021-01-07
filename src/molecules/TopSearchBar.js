import React from 'react'
import TextField from '@material-ui/core/TextField'
import AutoComplete from '@material-ui/lab/Autocomplete'
import {useHistory} from 'react-router-dom'
import '../css/header.scss'

function TopSearchBar(props){
    
    let history = useHistory()
    
    const handleSelection = (newVal) => {
        if (typeof newVal === "string") {
            return
        }

        if (newVal==null) {
            console.log("skipping")
        } else {

            history.push("/course/"+newVal.docId)
            props.triggerRender()
        }
    }

    return(
        <div style={{ width: 175}}>
            <AutoComplete
                id="top-search-bar"
                options={props.courseList}
                autoHighlight={true}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        size="small" 
                        label="Search Courses" 
                        margin="normal" 
                        variant="outlined"
                    />
                )}
                getOptionLabel={(option)=>option.title}
                onChange={(e, newValue)=> {
                    handleSelection(newValue)
                }}
            >
            </AutoComplete>
        </div>
    )
}
export default TopSearchBar