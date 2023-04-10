import "./Home.scss";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";

import storage from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Home() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("pdf");
  const [waiting, setWaiting] = useState(false);

  const upload = async () => {
    var filename = "current.pdf";
    if (mode == "jpg") {
      filename = "current.jpg";
    } else if (mode == "png") {
      filename = "current.png";
    }
    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, file);
    var fileUrl = await getDownloadURL(fileRef).then((url) => {
      return url;
    });
    return fileUrl;
  };

  const submit = async () => {
    setWaiting(true);
    const url = await upload();
    var body = {
      path: url,
    };
    var posturl = "http://127.0.0.1:5000/pdf";
    if (mode != "pdf") {
      posturl = "http://127.0.0.1:5000/img";
    }

    await axios({
      method: "post",
      url: posturl,
      data: body,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setWaiting(false);
  };
  return (
    <div className="Home">
      <div className="d-flex flex-column justify-content-center align-items-center p-5">
        <h5>Upload bank records here</h5>
        <label className="pdfinput m-3">
          <input
            type="file"
            accept="pdf"
            className="hideinput"
            onChange={(event) => {
              var ext = event.target.value.match(/\.([^\.]+)$/)[1];
              if (ext == "pdf" || ext == "jpg" || ext == "png") {
                setFile(event.target.files[0]);
                setMode(ext);
              } else {
                alert("Please select a pdf or an image file.");
              }
            }}
          />
          {file ? "Change" : "Browse"}
        </label>
        {waiting ? (
          <Spinner className="m-3" />
        ) : (
          <button className="btn btn-dark m-3" onClick={submit}>
            Send
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
