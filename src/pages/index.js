import React, { createRef, useState } from "react";
import { Link } from "gatsby";
import { useFirebase, useCollection } from "../firebase";

const IndexPage = () => {
  const [task, setTask] = useState("");
  const [uploadText, setUpload] = useState("Upload");
  const fileInput = createRef(null);
  const { firebase } = useFirebase();
  let { data } = useCollection("track");
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
        alert("done");
      })
    })
    setTask("")
    setUpload("Upload")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        value={task}
        onChange={event => setTask(event.target.value)}
      />
      <input type="file" ref={fileInput} />
      <button onClick={upload}>{uploadText}</button>
      {data.map(({ id, task, picture }) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }} key={id}>
            <img src={picture} width="130px" height="150px" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {task}
              <button>
                <Link to={`/track?task=${id}`}>Track</Link>
              </button>
              <button><Link to={`/result?task=${id}`}>Result</Link></button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default IndexPage
