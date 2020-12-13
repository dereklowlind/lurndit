import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button  } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
function ShowtopicTable(props){
    if(props.topics == []){
        return <div></div>
    }
    return(
        <div>
        {props.topics.map((topic) => (
            <Accordion key={topic.docId} >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    id={topic.docId} 
                >
                    {topic.title}
                </AccordionSummary>
                <AccordionDetails>
                    <div>{topic.title}</div>
                    <div>
                    <Button onClick={() => props.newResource(props.docId, topic.docId, "test title", "test desc", "foobar.com")}>New Topic</Button>
                    </div>
                    {/* {topic.resources.map((resource) => (
                        <div key={resource.resourceId}>
                            <div>{resource.title}</div>
                            <div>{resource.description}</div>
                            <div>{resource.url}</div>
                            <div>
                            </div>
                        </div>
                    ))} */}
                </AccordionDetails>
            </Accordion>
            ))}

        </div>
    )
}
export default ShowtopicTable