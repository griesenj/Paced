import "firebase/database";
import "firebase/auth";

import * as firebase from "firebase";

import { firebaseConfig } from "./fb-credentials";
import { sampleData } from "../defaults/SampleData";

// FIXME: STARTED REALTIME DB IN TEST MODE - WOULD NEED TO UPDATE READ/WRITE RULES (30 day limit)
// TODO: Should look into user authentication --> Create different DB branch for each user's data

export function initPacedDB() {
  firebase.initializeApp(firebaseConfig);
}

export function initLocalData(userId, updateFunc) {
  const ref = firebase.database().ref(`users/${userId}/`);
    ref.on('value', (snapshot) => {
      updateFunc(snapshot.val().pacedData);
    });
}

export function storeDataItem(item) {
  firebase.database().ref("pacedData/").set(item);
}

export function createNewUser(email, password, logUserId) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(response => {
    firebase.database().ref(`users/${response.user.uid}`).set({
      id: response.user.uid,
      email: email,
      password: password,
      pacedData: sampleData,
    })
    logUserId(response.user.uid);
  })
}
