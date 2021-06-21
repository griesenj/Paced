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

export function storeDataItem(userId, item) {
  firebase.database().ref(`users/${userId}/pacedData/`).set(item);
}

export function signUp(email, password, logUserId) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      firebase.database().ref(`users/${response.user.uid}`).set({
        id: response.user.uid,
        email: email,
        pacedData: sampleData,
      });
      logUserId(response.user.uid);
    })
}

export function signIn(email, password, logUserId) {
  if (email == "" || email == undefined || password == "" || password == undefined) {
    console.log('returned');
    return;
  };
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response.user.uid);
      logUserId(response.user.uid);
    })
    .catch(error => {
      console.log(error);
    });
};

// export function getExistingUserId(email, logUserId) {
//   const ref = firebase.database().ref('users');
//   ref.on('value', (snapshot) => {
//     var data = snapshot.val();
//     for (var i in data) {
//       if (data[i]["email"] == email) {
//         logUserId(data[i]["id"]);
//       }
//     }
//   });
// };
