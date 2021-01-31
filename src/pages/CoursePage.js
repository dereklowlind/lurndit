import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore';
import {Button, TextField, Tooltip} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TopicList from '../molecules/TopicList'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useAuthState} from 'react-firebase-hooks/auth'
import {Link} from 'react-router-dom'
import '../css/coursepage.scss'


const useStyles = makeStyles((theme) => ({
  topicTextArea: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {width: '80%'}
  },
  textAreaFont: {
    fontSize: '16pt',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600
  },
  favStarIcon: {
    marginLeft: '5px',
    marginBottom:'-7px',
    color: '#ff6d75',
  },
  favButton: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    color: 'gray'

  }
}))

function newTopic(db, title, docId, numTopics, user){
  console.log(numTopics)
    db.collection(`Lists/${docId}/topics`).add({
      datetime: new Date(),
      title: title,
      resources: [],
      position: numTopics,
      creatorId: user.uid,
      creatorName: user.displayName
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

function newResource(db, docId, topic, title, description, url, creatorID, creatorName){
  db.collection(`Lists/${docId}/topics`).doc(topic).update({
    resources: firebase.firestore.FieldValue.arrayUnion({
      datetime: new Date(),
      title: title,
      description: description,
      url: url,
      creatorID: creatorID,
      creatorName: creatorName 
    })
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
  
function addToFavList(db, courseId, courseTitle, props){

  db.collection(`UserList`).doc(firebase.auth().currentUser.uid).collection('favouritesList').add({
    courseId: props.id,
    courseTitle: courseTitle,
    datetime: new Date()
  })
  .then(function() {
    const newList = [...props.favList]
    const insert = {
      datetime: new Date(),
      courseId: courseId,
      courseTitle: courseTitle
    }
    newList.push(insert)
    props.setFavList(newList)
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function removeFromFavList(db, courseTitle, props) {

  //delete from db, needs error handling
  var deleteCourseQuery = db.collection(`UserList/${firebase.auth().currentUser.uid}/favouritesList`).where('courseId', '==', props.id)
  
  deleteCourseQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete()
    })
  })

  //delete locally without having to reload the page
  var newList = [...props.favList]
  newList = newList.filter(element => element.courseId!==props.id)
  props.setFavList(newList)

}

// function sortDate(list) {
//   list.sort(function(a,b) {
//     return new Date(a.timeStamp) - new Date(b.timeStamp)
//   })
//   return list
// }

function sortField(list) {
  list.sort(function(a,b) {
    return b.position - a.position
  })
  return list
}

// function updatePositions(db, rows, id) {

//   db.collection("Lists").doc(id).set({
//     useForcedOrder: true
//   }, {merge: true})

//   for(var i = 0; i < rows.length; i++) {
//     console.log(rows[i].docId)
//     console.log(rows[i].title)
//     db.collection("Lists").doc(id).collection("topics").doc(rows[i].docId).set({
//       position: i
//     }, {merge: true}).catch(function(error) {
//       console.log("Error setting new positions.")
//     })
//   }
// }

function autoSave(db, topics, id) {
  db.collection("Lists").doc(id).set({
    useForcedOrder: true
  }, {merge: true})

  for(var i = 0; i < topics.length; i++) {
    console.log(topics[i].docId)
    console.log(topics[i].title)
    db.collection("Lists").doc(id).collection("topics").doc(topics[i].docId).set({
      position: (topics.length - i - 1)
    }, {merge: true}).catch(function(error) {
      console.log("Error setting new positions.")
    })
  }
}

function CoursePage(props){
    const db = props.db;
    const [courseTitle, setCoursetitle] = useState("")
    const [courseSubtitle, setCourseSubtitle] = useState("")
    const [pageLoading, setLoading] = useState(true)
    const [topics, setTopics] = useState([]);
    const [topicTitle, setTopicTitle] = useState("");
    const [updated, setUpdated] = useState(false)
    const [maxError, setMaxError] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [courseOwner, setCourseOwner] = useState("")
    const [user, loading, error] = useAuthState(firebase.auth())
    const [forceOrder, setForceOrder] = (useState(false))
    const [docError, setDocError] = useState("none")
    const classes = useStyles()

    useEffect(() => {
      console.log("saving!")
      autoSave(props.db, topics, props.id)
    }, [updated])

    useEffect(() => {
      if (!favorite) {
        if (props.favList.length > 0) {
          for(var i = 0; i < props.favList.length; i++) {
            if (props.favList[i].courseId === props.id) {
              setFavorite(true)
              break
            }
          }
        }
      }
    }, [props.favList])

    useEffect(() => {      
      db.collection('Lists').doc(props.id).get().then(function(doc) {
        const docData = doc.data()
        if (docData.title == undefined) {
          setDocError("notFound")
        }
        setCoursetitle(docData.title)
        setCourseOwner(docData.creatorId)
        if(docData.description) {
          setCourseSubtitle(docData.description)
        }

        console.log(docData.useForcedOrder)
        var localForceOrdering = (docData.useForcedOrder!==undefined) ? true : false

        if (localForceOrdering===true) {
          localForceOrdering = (docData.useForcedOrder) ? true : false
          setForceOrder(localForceOrdering)
        }
        
        if(docError=="none") {
          db.collection(`Lists/${props.id}/topics`).onSnapshot((dataEntries) => {
            let rows = []
            dataEntries.forEach(doc => {
              const timeStamp = doc.data().datetime.toDate().toString()
              rows.push({
                docId: doc.id,
                timeStamp: timeStamp,
                title: doc.data().title,
                resources: doc.data().resources,
                position: doc.data().position,
                creatorID: doc.data().creatorId,
                creatorName: doc.data().creatorName
              })
            }); // data entries for each
            if(rows.length > 1) {
                rows = sortField(rows)
            }
            
            setTopics(rows);
            setLoading(false);
          });
        }
      }).catch(function(error){
        console.log(error)
        setDocError("notFound")
        setLoading(false)
      })
       // db collect topics
    }, [props.id]); // when id in link /courses/:id changes it causes a "reload" of the page

    const getContent = (id) => {
      console.log(id)
    }

    const handleCourseDelete = () => {
      const proceed = openConfirmation();
      if(proceed) {
        setLoading(true)
        removeFromFavList(db, "", props)
        db.collection('Lists').doc(props.id).collection('topics').get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          })
        })
        db.collection('Lists').doc(props.id).delete().then(function(){
          console.log("Delete success.")
          setDocError("deleted")
          setLoading(false)
        }).catch(function(error) {
          console.warn(error)
        })
      }
    }

    const deleteTopic = (id) => {
      
      const newList = topics.filter((element) => {
        return element.id != id
      })
      setTopics(newList)

      db.collection('Lists').doc(props.id).collection('topics').doc(id).delete()

    }

    const deleteResource = (resource, topicID) => {
      console.log(resource)
      const newList = topics.filter((element) => {
        return element.resources.title != resource.title
      })
      setTopics(newList)
      db.collection('Lists').doc(props.id).collection('topics').doc(topicID).update({
        "resources": firebase.firestore.FieldValue.arrayRemove(
          {
            "creatorID": resource.creatorID,
            "creatorName": resource.creatorName,
            "datetime": resource.datetime,
            "description": resource.description,
            "title": resource.title,
            "url": resource.url
          }
        )
      }).catch((error)=>{
        console.log(error)
        
      })

    }

    const handleSubmit = e => {
      e.preventDefault();

      if (!props.isSignedIn) {
        props.setOpenSigninDialog(true)
        return
      }

      if (topicTitle === "") {
        setMaxError(true)
        return
      }
      newTopic(db, topicTitle, props.id, topics.length, user);
      setTopicTitle("");
      setMaxError(false)
    }

    const reorder = (list, startIndex, endIndex) => {
      console.log(list)
      const result = [...list]
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      console.log(result)
      result.forEach((element, index)=> {
        element.position = (result.length-index-1)
      })
      console.log(result)

      return result
    }

    const onDragEnd = (result) => {
      
      if (!result.destination) {
        return;
      }
  
      if (result.destination.index === result.source.index) {
        return;
      }
      setForceOrder(true)

      const rows = reorder(
        topics,
        result.source.index,
        result.destination.index
      );

      setTopics(rows);
      setUpdated(!updated);
      //putting this function here breaks dnd, so maybe just let it end
      // updatePositions(props.db, rows, props.id)

    }

    const handleAddToFavList = () => {
      if(firebase.auth().currentUser){ // check if uid is null
        if(favorite) {
          alert("Already in favorites list!")
        } else {
          addToFavList(db, props.id, courseTitle, props)
        }
      }else{
        alert("please sign in to add to favourites")
      } 
    }

    const handleRemoveFromFavList = () => {
      if(firebase.auth().currentUser) {
        if (favorite) {
          removeFromFavList(db, courseTitle, props)
          setFavorite(false)
        } else {
          alert("this is not a favorite")
        }
      }
    }

    const openConfirmation = () =>{
      return window.confirm("Are you sure you want to delete this course?")
    }

    if(docError=="notFound") {
      return (
        <div className="coursePage">
          <div className="courseHeader">
            <div className="courseTitles">
              <div className="courseTitle">
                {"404 Not Found"}
              </div>
              <div className="courseSubtitle">
                {"We couldn't find what you were looking for, or it doesn't exist!"}
              </div>
            </div>
          </div>
        </div>
      )
    } else if (docError=="deleted") {
      return(
        <div className="coursePage">
          <div className="courseHeader">
            <div className="courseTitles">
              <div className="courseTitle">
                {"Resource deleted"}
              </div>
              <div className="courseSubtitle">
                <Link to="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
      {(pageLoading===true) ?
        (
          <div className="loadingPage">
            <CircularProgress/>
          </div>
        )
        :
        (
          <div className="coursePage">
            <div className="courseHeader">
              <div className="courseTitles">
                <div className="courseTitle">
                  {courseTitle}
                </div>
                <div className="courseSubtitle">
                  {courseSubtitle}
                </div>
              </div>

              {firebase.auth().currentUser!=null && 
                ( !favorite ?
                  (<div className="favouriteIndicator" onClick={handleAddToFavList}>
                      <Tooltip title={<div style={{fontSize: "20px", padding: "5px"}}>Add list to favourites list</div>} 
                        placement="right" arrow
                      >
                        <BookmarkBorderIcon className={classes.favStarIcon} />
                      </Tooltip>
                  </div>)
                  :
                  (
                    <div className="favouriteIndicator" onClick={handleRemoveFromFavList}>
                      <Tooltip title={<div style={{fontSize: "20px", padding: "5px"}}>Remove list from favourites list</div>} 
                        placement="right" arrow
                      >
                        <BookmarkIcon className={classes.favStarIcon}/>
                      </Tooltip>
                    </div>
                  )
                )
              }
              
            </div>
          <div className="courseButtons">
            <form onSubmit={handleSubmit} className="courseButtons">
              <TextField 
                placeholder="New Topic" 
                error={maxError}
                className={classes.topicTextArea} 
                value={topicTitle} 
                InputProps={{
                  classes: {
                    input: classes.textAreaFont
                  }
                }}
                onChange={(e) => {
                  if(e.target.value.length > 30) {
                    setMaxError(true)
                  } else if (maxError) {
                    setMaxError(false)
                    setTopicTitle(e.target.value)
                  } else {
                    setTopicTitle(e.target.value)
                  }
                }}/>
              <Button variant="outlined" type='submit'
                style={{marginLeft: '10px'}}
              >Add Topic</Button>
              {user &&
              <div>
                {(user.uid === courseOwner) &&
                <Button variant="outlined" color="secondary" onClick={handleCourseDelete}>
                  Delete Course
                </Button>
                }
              </div>
              }
            </form>
          </div>

          <TopicList 
            db={db} 
            topics={topics} 
            isSignedIn={props.isSignedIn}
            setOpenSigninDialog={props.setOpenSigninDialog}
            newResource={newResource}
            deleteResource={deleteResource}
            deleteTopic={deleteTopic}
            docId={props.id} 
            switchTopic={getContent}
            onDragEnd={onDragEnd}
          />
        </div>
        )
      }
      </div>    
    )
}


export default CoursePage
