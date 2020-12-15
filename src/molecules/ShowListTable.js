import React, {useEffect} from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button  } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
function ShowtopicTable(props){    
    console.log("in showtopictable", props.topics);
    if(props.topics == []){
        return <div>No topics found</div>
    }
    // console.log(props.topics[0].resources);
    // return(
    //     <div>
    //     {props.topics.map((topic) => (
    //             <div>
    //                 <div key={topic.docId}>{topic.title}</div>
    //                 {/* <div>
    //                 <Button onClick={() => props.newResource(props.docId, topic.docId, "test title", "test desc", "foobar.com")}>Add Content</Button>
    //                 </div> */}
    //                 {topic.resources.map((resource) => (
    //                     <div key={resource.resourceId}>
    //                         <div>{resource.title}</div>
    //                         <div>{resource.description}</div>
    //                         <div>{resource.url}</div>
    //                         <div>
    //                         </div>
    //                     </div>
    //                 ))}
    //         </div>
    //         ))}
    //     </div>
    // )

    return(
        <div>
        {props.topics.map((topic) => (
            <Accordion key={topic.docId} >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    id={topic.docId} 
                >
                    {topic.title} {topic.docId}
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                    <Button onClick={() => props.newResource(props.docId, topic.docId, "test title", "test desc", "foobar.com")}>Add Content</Button>
                    </div>
                    {/* <div>{topic.resources}</div> */}
                    {topic.resources.map((resource) => (
                        <div key={resource.resourceId}>
                            <div>{resource.title}</div>
                            <div>{resource.description}</div>
                            <div>{resource.url}</div>
                            <div>
                            </div>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            ))}

    <div>
        {props.topics.map((topic) => (
                <div>
                    <div key={topic.docId}>{topic.title}</div>
                    {/* <div>
                    <Button onClick={() => props.newResource(props.docId, topic.docId, "test title", "test desc", "foobar.com")}>Add Content</Button>
                    </div> */}
                    {topic.resources.map((resource) => (
                        <div key={resource.resourceId}>
                            <div>{resource.title}</div>
                            <div>{resource.description}</div>
                            <div>{resource.url}</div>
                            <div>
                            </div>
                        </div>
                    ))}
            </div>
            ))}
        </div>

        </div>
    )

}
export default ShowtopicTable