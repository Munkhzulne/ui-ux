import React, { createRef, useState } from "react"
import { Link } from "gatsby"
import { useFirebase, useCollection } from "../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import testtext from "../images/testtext.png"

import uploadtext from "../images/uploadtext.png"

import "../css/index.css"
const IndexPage = () => {
  const [task, setTask] = useState("")
  const [uploadText, setUpload] = useState("Upload")
  const fileInput = createRef(null)
  const { firebase } = useFirebase()
  let { data } = useCollection("track")
  const upload = async () => {
    let storage = firebase.storage().ref()
    const file = fileInput.current.files[0]
    var thisRef = storage.child(file.name)
    setUpload("Uploading")
    await thisRef.put(file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        firebase.firestore().collection(`track`).add({
          picture: downloadURL,
          task: task,
        })
        alert("done")
      })
    })
    setTask("")
    setUpload("Upload")
  }

  const showTasks = () => {
    document.getElementById("test").style.width = "100vw"
    document.getElementById("test").style.marginLeft = "0vw"
    document.getElementById("right").style.display = "inline"
    document.getElementById("testBtn").style.display = "none"
    document.getElementById("taskList").style.display = "flex"
  }
  const showUpload = () => {
    document.getElementById("file").style.width = "100vw"
    document.getElementById("file").style.display = "flex"
    document.getElementById("test").style.marginLeft = "100vw"
    document.getElementById("left").style.display = "inline"
    document.getElementById("upBtn").style.display = "none"
    document.getElementById("upForm").style.display = "flex"
  }
  const hideUpload = () => {
    document.getElementById("file").style.width = "50vw"
    document.getElementById("test").style.width = "50vw"
    document.getElementById("test").style.marginLeft = "50vw"
    document.getElementById("left").style.display = "none"
    document.getElementById("upBtn").style.display = "flex"
    document.getElementById("upForm").style.display = "none"
  }
  const hideTasks = () => {
    document.getElementById("test").style.width = "50vw"
    document.getElementById("test").style.marginLeft = "50vw"
    document.getElementById("right").style.display = "none"
    document.getElementById("testBtn").style.display = "flex"
    document.getElementById("taskList").style.display = "none"
  }

  return (
    <>
      <div id="file">
        <div id="upBtn" onClick={showUpload}>
          <img src={uploadtext} style={{width: "80%"}}/>
          {/* <h1 style={{ color: "#f56a47" }}>Upload your sketch</h1> */}
          <button className="aa">Upload</button>
        </div>
        <div id="upForm">
          <h3>Task</h3>
          <input
            className="input"
            type="text"
            value={task}
            onChange={event => setTask(event.target.value)}
          />
          <h3>Sketch</h3>
          <input type="file" ref={fileInput} />
          <button onClick={upload} className="aa">{uploadText}</button>
        </div>
      </div>
      <div id="test">
        <div id="testBtn">
          <img src={testtext} style={{width: "80%", marginLeft: "20px"}}/>
          <button onClick={showTasks} class="bb">
            Test
          </button>
        </div>
        <div
          id="taskList"
          style={{ display: "flex", flexDirection: "column", display: "none" }}
        >
          {data.map(({ id, task, picture }) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }} key={id}>
                <img src={picture} width="130px" height="150px" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {task}
                  <button>
                    <Link to={`/track?task=${id}`}>Track</Link>
                  </button>
                  <button>
                    <Link to={`/result?task=${id}`}>Result</Link>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <button id="left" onClick={hideUpload} style={{ background: "none" }}>
        <FontAwesomeIcon icon={faChevronLeft} color="#f56a47" />
      </button>
      <button id="right" onClick={hideTasks} style={{ background: "none" }}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  )
}

export default IndexPage
