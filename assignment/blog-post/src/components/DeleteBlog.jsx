import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';

export default function DeleteBlog({id, imageUrl}) {
    const handleDelete = async() => {
        try {
            await deleteDoc(doc(db, "Blogs", id));
            toast("Blog deleted successfully", {type: "success"});
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
        } catch(error) {
            toast("Something went wrong", {typr: error});
            console.log(error);
        }
    }
  return (
    <div>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  )
}
