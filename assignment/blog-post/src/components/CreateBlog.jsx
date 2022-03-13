import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';

export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    imageUrl: "",
    createdAt: Timestamp.now().toDate(),
  })

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const handleImageChange = (e) => {
    setFormData({...formData, image: e.target.files[0] });
  }
  const handlePost = () => {
    if(!formData.title || !formData.body || !formData.image) {
      alert('Please fill the all fields.');
      return;
    }

    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on('state_changed',
    (snapshot) => {
      const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progressPercent);
    },
    (err) => {
      console.log(err);
    },
    () => {
      setFormData({
        title: "",
        body: "",
        image: ""
      });

      getDownloadURL(uploadImage.snapshot.ref)
      .then((url) => {
        const blogRef = collection(db, "Blogs");
        addDoc(blogRef, {
          title: formData.title,
          body: formData.body,
          imageUrl: url,
          createdAt: Timestamp.now().toDate()
        })
        .then(() => {
          toast("Blog posted successfully", {type: "success"});
          setProgress(0);
        })
        .catch((err) => {
          toast("Something went wrong", {type: "error"});
          console.log(err.message);
        })
      })
    });
    
  };
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
      <h2>Post Blog</h2>
      <label htmlFor=''>Title </label>
      <input type='text' name='title' className='form-control' value={formData.title} onChange={(e) => handleChange(e)}></input>
      <label htmlFor=''>Body </label>
      <textarea type='text' name='body' className='form-control' value={formData.body} onChange={(e) => handleChange(e)}></textarea>
      <label htmlFor=''>Image </label>
      <input type='file' name='image' accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)}></input>
      {progress === 0 ? null : (
        <div className="progress">
          <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}%`}}>
            {`uploading image ${progress}%`}
        </div>
      </div>
      )}
      
      <button className="form-control btn-primary mt-3" onClick={handlePost}>Post</button>
    </div>
  )
}
