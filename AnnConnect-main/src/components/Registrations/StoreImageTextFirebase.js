import React, { useState } from "react";
import { imgDB } from "../firebaseFile/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function StoreImageTextFirebase(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const imgsRef = ref(imgDB, `Imgs/${v4()}`);
     
      uploadBytes(imgsRef, selectedFile).then((data) => {
        getDownloadURL(data.ref).then((url) => {
          props.setImg(url);
          props.setFlag(false);
        });
      });
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} required />
      <br />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <br />
    </div>
  );
}

export default StoreImageTextFirebase;
