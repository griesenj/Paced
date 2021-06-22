import * as firebase from "firebase";

import { firebaseConfig } from "./fb-credentials";
import { sampleData } from "../data/SampleData";

// FIXME: Started realtime DB in test mode - will need to update read/write rules eventually (30 day limit)

export function initPacedDB() {
  firebase.initializeApp(firebaseConfig);
}

export function initLocalData(userId, updateFunc) {
  const ref = firebase.database().ref(`users/${userId}/`);
    ref.on('value', (snapshot) => {
      updateFunc(snapshot.val().pacedData);
    });
}

export function storeDataItem(userId, item) {
  firebase.database().ref(`users/${userId}/pacedData/`).set(item);
}

export function signIn(email, password, logUserId, logError) {
  if (email == "" || email == undefined || password == "" || password == undefined) {
    logError('INVALID');
    return;
  };
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      logUserId(response.user.uid);
      logError();
    })
    .catch(error => {
      logError(error);
    });
};

export function signUp(email, password, logUserId, logError) {
  if (email == "" || email == undefined || password == "" || password == undefined) {
    logError('INVALID');
    return;
  };
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      firebase.database().ref(`users/${response.user.uid}`).set({
        id: response.user.uid,
        email: email,
        pacedData: sampleData,
      });
      logUserId(response.user.uid);
    })
    .catch(error => {
      logError(error);
    });
}
