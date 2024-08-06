import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://support.google.com/firebase/answer/7015592
  firebaseConfig = {
    apiKey: "AIzaSyCKzQV1KfLgWojSUywDWuvg1l_YFTV3yWk",
    authDomain: "simple-crm-a8a05.firebaseapp.com",
    projectId: "simple-crm-a8a05",
    storageBucket: "simple-crm-a8a05.appspot.com",
    messagingSenderId: "208547210431",
    appId: "1:208547210431:web:b25c838f5b259601d3120a"
  };
  // Initialize Firebase
  app = initializeApp(this.firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(this.app);



  async createUser(username: string, email: string, password: string) {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), {
        username: username,
        email: email,
        password: password
      });

      await setDoc(doc(this.db, 'users', docRef.id), {
        username: username,
        email: email,
        password: password,
        id: docRef.id
      });

      console.log("Document written and updated with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async login(email: string, password: string) {

    const q = query(
      collection(this.db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  }
}
