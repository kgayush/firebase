import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { db } from '../firebaseConfig';
import DeleteBlog from './DeleteBlog';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]); 
  useEffect(() => {
      const blogRef = collection(db, "Blogs");
      const q = query(blogRef, orderBy("createdAt", "desc"));
      onSnapshot(q,(snapshot) => {
          const blogs = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setBlogs(blogs);
          console.log(blogs);
      });
  }, []); 
  return (
    <div>
        {blogs.length === 0 ? (
            <p>No Blogs found.</p>
        ) : (
            blogs.map(({id, title, body, imageUrl, createdAt}) => (
                <div className='border mt-3 p-3 bg-light' key={id}>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={imageUrl} alt='title' style={{height: 180, width: 180}}/>
                        </div>
                        <div className="col-9 ps-3">
                            <h2>{title}</h2>
                            <p>{createdAt.toDate().toDateString()}</p>
                            <h6>{body}</h6>
                            <DeleteBlog id={id} imageUrl={imageUrl} />
                        </div>
                    </div>
                </div>
                ))
            )
        }
    </div>
  )
}
