import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCeSh7quCHCFvxURvncO6N49lbNqFQFhNA",
    authDomain: "blog-post-c702b.firebaseapp.com",
    projectId: "blog-post-c702b",
    storageBucket: "blog-post-c702b.appspot.com",
    messagingSenderId: "436681212510",
    appId: "1:436681212510:web:6808382ed3f43e94a26acf"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
