import React, {useState} from 'react'
import { 
    Accordion, AccordionSummary, AccordionDetails, Button, TextField,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {makeStyles} from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import PreviewCard from './PreviewCard'

const useStyles = makeStyles((theme) => ({
    accordion: {
        marginLeft: '50px',
        marginRight: '50px',
        marginTop: '30px',
        fontFamily: "'Montserrat', sans-serif",
    },
    accordianTitle: {
        fontWeight: 600,
        fontSize: 32,
        marginTop: '30px'
    },
    expanded:{
        marginTop:'30px'
    },
    details:{
        display: "block",
        textAlign: "left"
    },
    resourceTitle:{
        fontFamily: 'Circular Std',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '25px'
    },
    resourceDesc:{
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '20px'
    }
}))

function TopicList(props){  
    const [open, setOpen] = useState(false); 
    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceDesc, setResourceDesc] = useState("");
    const [resourceUrl, setResourceUrl] = useState(""); 
    const [resourceTopicId, setResourceTopicId] = useState("");
    
    const classes = useStyles()

    const handleAdd = () => {
        setOpen(false);
        props.newResource(props.db, props.docId, resourceTopicId, resourceTitle, resourceDesc, resourceUrl);
        setResourceTitle("");
        setResourceDesc("");
        setResourceUrl("");
        setResourceTopicId("");
    }
    
    const onDragEnd = (result) => {
        props.onDragEnd(result)
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    // console.log("in showtopictable", props.topics);
    if(props.topics === []){
        return <div>No topics found</div>
    }

    function Topic({topic, index}) {
        return(
            <Draggable draggableId={topic.docId} index={index}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Accordion key={topic.docId} className={classes.accordion}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon style={{fill: "green"}}/>}
                                id={topic.docId} 
                                className={classes.accordianTitle}
                            >
                                <DragIndicatorIcon fontSize="inherit" style={{colour: "#E5E5E5"}}/>
                                {topic.title}
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <div>
                                <Button variant="outlined" color="primary" onClick={() => {
                                    setOpen(true);
                                    setResourceTopicId(topic.docId);
                                }}>
                                    Add Content
                                </Button>
                                </div>  
                                {topic.resources.map((resource) => (
                                        <div key={resource.resourceId}>
                                            <div className={classes.resourceTitle}>{resource.title}</div>
                                            <div className={classes.resourceDesc}>{resource.description}</div>
                                            {/* <div>{resource.url}</div> */}
                                            <Link onClick={() => openInNewTab(resource.url)}>{resource.url}</Link>
                                            <PreviewCard url={resource.url} />
                                            <div>
                                            </div>
                                        </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </Draggable>
        )
    }

    const accordianList = props.topics.map((topic, index) => (
        <Topic topic={topic} key={index} index={index}/>
    ))
    

    return(
        <div>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Resource</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the new resource below
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                fullWidth
                value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)}
            />
            <TextField
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                value={resourceDesc} onChange={(e) => setResourceDesc(e.target.value)}
            />
            <TextField
                margin="dense"
                id="url"
                label="URL"
                type="url"
                fullWidth
                value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={(e) => {
                setOpen(false);
                setResourceTitle("");
                setResourceDesc("");
                setResourceUrl("");
                setResourceTopicId("");
            }} color="primary">
                Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="topiclist">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {accordianList}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        </div>

    )

}
export default TopicList