import "firebase/database";

import * as firebase from "firebase";

import { firebaseConfig } from "./fb-credentials";

export function initPacedDB() {
    firebase.initializeApp(firebaseConfig);
  }

export function storeDataItem(item) {
    console.log('storing ...', item)
    firebase.database().ref("pacedData/").push(item);
  }