import React, {useState} from 'react'
import { 
    Accordion, AccordionSummary, AccordionDetails, Button, TextField,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, 
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'


function ShowtopicTable(props){  
    const [open, setOpen] = useState(false); 
    const [resourceTitle, setResourceTitle] = useState("");
    const [resourceDesc, setResourceDesc] = useState("");
    const [resourceUrl, setResourceUrl] = useState(""); 
    const [resourceTopicId, setResourceTopicId] = useState("");
    
    const handleAdd = () => {
        setOpen(false);
        props.newResource(props.docId, resourceTopicId, resourceTitle, resourceDesc, resourceUrl);
        setResourceTitle("");
        setResourceDesc("");
        setResourceUrl("");
        setResourceTopicId("");
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
                            <Link onClick={() => openInNewTab(resource.url)}>{resource.url}</Link>
                            <div>
                            </div>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            ))}
        </div>
    )

}
export default ShowtopicTable