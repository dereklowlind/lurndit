import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore';
import {Button, Drawer, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TopicList from '../molecules/TopicList'
import '../css/coursepage.scss'
import StarBorderIcon from '@material-ui/icons/StarBorder'; // replace with rating from mui

const useStyles = makeStyles((theme) => ({
  topicTextArea: {
    width: '400px',
    
  },
  textAreaFont: {
    fontSize: '16pt',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600
  },
  favStarIcon: {
    marginLeft: '5px',
    color: '#ff6d75',
  }
}))

function newTopic(db, title, docId, numTopics){
  console.log(numTopics)
    db.collection(`test1/${docId}/topics`).add({
      datetime: new Date(),
      title: title,
      resources: [],
      position: numTopics
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

function newResource(db, docId, topic, title, description, url){
  db.collection(`test1/${docId}/topics`).doc(topic).update({
    resources: firebase.firestore.FieldValue.arrayUnion({
      datetime: new Date(),
      title: title,
      description: description,
      url: url
    })
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
  
<<<<<<< HEAD
function addToFavList(db, courseId, courseTitle){
  db.collection('testUserList').doc(firebase.auth().currentUser.uid).set({
    favourites: firebase.firestore.FieldValue.arrayUnion({
      datetime: new Date(),
      courseId: courseId,
      courseTitle: courseTitle
    })
  }, {merge: true})
  .then(function() {
    console.log("Document successfully written!");
    alert("successfully added to favourites!")
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function sortDate(list) {
  list.sort(function(a,b) {
    return new Date(a.timeStamp) - new Date(b.timeStamp)
  })
  return list
}

function sortField(list) {
  list.sort(function(a,b) {
    return a.position - b.position
  })
  return list
}

function updatePositions(db, rows, id) {

  db.collection("test1").doc(id).set({
    useForcedOrder: true
  }, {merge: true})

  for(var i = 0; i < rows.length; i++) {
    console.log(rows[i].docId)
    console.log(rows[i].title)
    db.collection("test1").doc(id).collection("topics").doc(rows[i].docId).set({
      position: i
    }, {merge: true}).catch(function(error) {
      console.log("Error setting new positions.")
=======
  function addToFavList(db, courseId, courseTitle){
    db.collection('testUserList').doc(firebase.auth().currentUser.uid).set({
      favourites: firebase.firestore.FieldValue.arrayUnion({
        datetime: new Date(),
        courseId: courseId,
        courseTitle: courseTitle
      })
    }, {merge: true})
    .then(function() {
      console.log("Document successfully written!");
      alert("successfully added to favourites!")
>>>>>>> 122c6a987bf0196222f4e5a5de8c03d28dd547c3
    })
  }
}

function autoSave(db, topics, id) {
  db.collection("test1").doc(id).set({
    useForcedOrder: true
  }, {merge: true})

  for(var i = 0; i < topics.length; i++) {
    console.log(topics[i].docId)
    console.log(topics[i].title)
    db.collection("test1").doc(id).collection("topics").doc(topics[i].docId).set({
      position: i
    }, {merge: true}).catch(function(error) {
      console.log("Error setting new positions.")
    })
  }
}

function CoursePage(props){
    const db = props.db;
    const [courseTitle, setCoursetitle] = useState("")
    const [courseSubtitle, setCourseSubtitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState([]);
    const [topicTitle, setTopicTitle] = useState("");
    const [updated, setUpdated] = useState(false)

    const classes = useStyles()

    useEffect(() => {
      console.log("saving!")
      autoSave(props.db, topics, props.id)
    }, [updated])

    useEffect(() => {
      console.log("useEffect");

      db.collection('test1').doc(props.id).get().then(function(doc) {
        console.log(doc.data())
        const docData = doc.data()
        setCoursetitle(docData.title)
        if(docData.description) {
          setCourseSubtitle(docData.description)
        }

<<<<<<< HEAD
        console.log(docData.useForcedOrder)
        var localForceOrdering = (docData.useForcedOrder!=undefined) ? true : false

        if (localForceOrdering==true) {
          localForceOrdering = (docData.useForcedOrder) ? true : false
        }

        db.collection(`test1/${props.id}/topics`).onSnapshot((dataEntries) => {
          let rows = []
          dataEntries.forEach(doc => {
            const timeStamp = doc.data().datetime.toDate().toString()
            rows.push({
              docId: doc.id,
              timeStamp: timeStamp,
              title: doc.data().title,
              resources: doc.data().resources,
              position: doc.data().position
            })
          }); // data entries for each
          if(rows.length > 1) {
              rows = sortField(rows)
          }
          
          setTopics(rows);
        });  
      })
       // db collect topics
=======
      db.collection(`test1/${props.id}/topics`).onSnapshot((dataEntries) => {
        let rows = []
        dataEntries.forEach(doc => {
          const timeStamp = doc.data().datetime.toDate().toString()
          rows.push({
            docId: doc.id,
            timeStamp: timeStamp,
            title: doc.data().title,
            resources: doc.data().resources
          })
        }); // data entries for each
        setTopics(rows);
      }); // db collect topics
>>>>>>> 122c6a987bf0196222f4e5a5de8c03d28dd547c3
    }, [props.id]); // when id in link /courses/:id changes it causes a "reload" of the page

    const getContent = (id) => {
      console.log(id)
    }

    const handleSubmit = e => {
      e.preventDefault();
      newTopic(db, topicTitle, props.id, topics.length);
      setTopicTitle("");
    }

<<<<<<< HEAD
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }

    const onDragEnd = (result) => {
      
      if (!result.destination) {
        return;
      }
  
      if (result.destination.index === result.source.index) {
        return;
      }
  
      const rows = reorder(
        topics,
        result.source.index,
        result.destination.index
      );

      setTopics(rows);
      setUpdated(!updated)

      //putting this function here breaks dnd, so maybe just let it end
      // updatePositions(props.db, rows, props.id)

    }

=======
>>>>>>> 122c6a987bf0196222f4e5a5de8c03d28dd547c3
    const handleAddToFavList = () => {
      if(firebase.auth().currentUser){ // check if uid is null
        addToFavList(db, props.id, courseTitle)
      }else{
        alert("please sign in to add to favourites")
      }
      
    }

    return(
        <div className="coursePage">
          <div className="courseHeader">
            <div className="courseTitle">
              {courseTitle}
              <StarBorderIcon className={classes.favStarIcon}/>
              <Button onClick={handleAddToFavList}>Add to favourites</Button>
            </div>
            <div className="courseSubtitle">
              {courseSubtitle}
            </div>
          </div>
          <div className="courseButtons">
            <form onSubmit={handleSubmit} className="courseButtons">
              <TextField 
                placeholder="New Topic" 
                className={classes.topicTextArea} 
                value={topicTitle} 
                InputProps={{
                  classes: {
                    input: classes.textAreaFont
                  }
                }}
                onChange={(e) => setTopicTitle(e.target.value)}/>
              <Button variant="outlined" type='submit'
              style={{marginLeft: '10px'}}
              >Add Topic</Button>
            </form>
          </div>

          <TopicList 
            db={db} 
            topics={topics} 
            newResource={newResource} 
            docId={props.id} 
            switchTopic={getContent}
            onDragEnd={onDragEnd}
          />
         

        </div>
        
    )
}

export default CoursePage
