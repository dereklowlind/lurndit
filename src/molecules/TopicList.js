import React, {useState} from 'react'
import { 
    Accordion, AccordionSummary, AccordionDetails, Button, TextField,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Drawer, 
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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
        props.newResource(props.docId, resourceTopicId, resourceTitle, resourceDesc, resourceUrl);
        setResourceTitle("");
        setResourceDesc("");
        setResourceUrl("");
        setResourceTopicId("");
    }
    
    const setTopic = (index) => {
        props.switchTopic(index)
    }
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    // console.log("in showtopictable", props.topics);
    if(props.topics == []){
        return <div>No topics found</div>
    }
    return(
        <div>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Content</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please enter the new content below
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
        {props.topics.map((topic, index) => (
            <div>
            <Accordion key={topic.docId} className={classes.accordion}>
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon style={{fill: "green"}}/>}
                    id={topic.docId} 
                    className={classes.accordianTitle}
                >
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
                                <div>{resource.title}</div>
                                <div>{resource.description}</div>
                                {/* <div>{resource.url}</div> */}
                                <Link onClick={() => openInNewTab(resource.url)}>{resource.url}</Link>
                                <div>
                                </div>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
            </div>
            ))}
        </div>
    )

}
export default TopicList