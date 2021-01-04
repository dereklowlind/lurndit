import React, { useRef, useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import {Button, Dialog, DialogContent, DialogContentText, 
  DialogTitle, AutoComplete, TextField, DialogActions, 
  CircularProgress, IconButton, Snackbar} 
from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import CourseSearch from '../molecules/CourseSearch'
import { useHistory } from 'react-router-dom'
import '../css/mainpage.scss'

function Mainpage(props){
  const db = props.db;
  let history = useHistory()

  //state
  //const [lists, setLists] = useState([]);
  const [open, setOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("")
  const [courseSubject, setCourseSubject] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [university, setUniversity] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  //const [submitSuccess, setSubmitSuccess] = useState(false)
  // const [recentTitle, setRecentTitle] = useState("")
  // const [recentId, setRecentId] = useState("")

  // //on component mount
  // useEffect(() => {
  //   db.collection("test1").onSnapshot((dataEntries) => {
  //     let rows = []
  //     dataEntries.forEach(doc => {
  //       if(doc.data().title == undefined) {
  //         return
  //       }
  //       if(doc.data().title == recentTitle) {
  //         setRecentId(doc.id)
  //       }
  //       rows.push({
  //         docId: doc.id,
  //         title: doc.data().title,
  //         subtitle: doc.data().description
  //       })
  //     })
      
  //     rows.sort(function(a, b) {
  //       return (a.title < b.title) ? -1 : 1
  //     })
  //     setLists(rows);
  //     console.log(rows)
  //   });
  // }, [submitSuccess]); 
  // run use effect only once and when we course is created so we can immediately access our course in search

  //request functions
  const handleAdd = () => {
    setSubmitting(true)
    db.collection("test1").add({
      datetime: new Date(),
      title: courseCode,
      university: university,
      description: courseTitle,
      subject: courseSubject
    })
    .then(function() {
      props.setRecentTitle(courseCode)
      setCourseTitle("");
      setCourseSubject("");
      setUniversity("");
      setCourseCode("");
      setOpen(false)
      setSubmitting(false)
      props.setSubmitSuccess(true)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        setSubmitError(true)
        setSubmitting(false)
    });
  }

  const closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setSubmitSuccess(false);
  }

  const snackGo = () => {
    history.push("/course/" + props.recentId)
    closeSnack()
  }

  //state sharing components seperated for clarity
  const courseDialog = (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new course below
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Course Code"
          fullWidth
          value={courseCode}
          placeholder="eg. MATH101"
          onChange={(e) => setCourseCode(e.target.value)}
        />
        {/* Should be autocomplete when we have a list of valid subjects */}
        <TextField
          margin="dense"
          id="subject"
          label="Course Subject"
          fullWidth
          value={courseSubject}
          placeholder="eg. Math"
          onChange={(e) => setCourseSubject(e.target.value)}
        />
        <TextField
          margin="dense"
          id="title"
          label="Course Title"
          fullWidth
          value={courseTitle}
          placeholder="eg. Introductory Calculus"
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="university"
          label="University"
          fullWidth
          value={university}
          placeholder="eg. University of Victoria"
          onChange={(e) => setUniversity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {
              setOpen(false);
              setCourseTitle("");
              setCourseSubject("");
              setUniversity("");
              setCourseCode("");
          }} color="primary">
              Cancel
        </Button>
        <Button 
          onClick={handleAdd} 
          color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )

  const submitSnack = (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.submitSuccess}
        autoHideDuration={10000}
        onClose={closeSnack}
        message="Course Created!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={snackGo}>
              {props.recentTitle}
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
  )
    return(
        <div className="mainPageContainer">
          {courseDialog}
          {submitSnack}
          <div className="titleSection">
            <div className="pageTitleContainer">
              <h1 className="pageTitle">
                Curated content that will help you study better.
              </h1>
            </div>
          </div>
          <div className="commandSection">
            <Button 
              variant="outlined"
              color="primary" 
              onClick={() => setOpen(true)}
            >
              Add Course +
            </Button>
          </div>
          <div className="courseSection">
            <CourseSearch lists={props.lists} />
          </div> 
        </div>
    )
}
export default Mainpage
