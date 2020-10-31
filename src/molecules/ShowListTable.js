import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography  } from '@material-ui/core'
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
                    {topic.title}
                </AccordionDetails>
            </Accordion>
            ))}

        </div>
    )
}
export default ShowtopicTable