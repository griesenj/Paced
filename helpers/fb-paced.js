import "firebase/database";

import * as firebase from "firebase";

import { firebaseConfig } from "./fb-credentials";

// FIXME: STARTED REALTIME DB IN TEST MODE - WOULD NEED TO UPDATE READ/WRITE RULES (30 day limit)
// TODO: Should look into user authentication --> Create different DB branch for each user's data

export function initPacedDB() {
  firebase.initializeApp(firebaseConfig);
}

export function initLocalData(updateFunc) {
  const ref = firebase.database().ref('pacedData/');
  ref.on('value', (snapshot) => {
    updateFunc(snapshot.val());
  });
}

export function storeDataItem(item) {
  // console.log('storing ...', item)
  firebase.database().ref("pacedData/").set(item);
}
