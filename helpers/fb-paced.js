import "firebase/database";

import * as firebase from "firebase";

import { firebaseConfig } from "./fb-credentials";

// FIXME: STARTED REALTIME DB IN TEST MODE - WOULD NEED TO UPDATE READ/WRITE RULES (30 day limit)

export function initPacedDB() {
    firebase.initializeApp(firebaseConfig);
  }

export function storeDataItem(item) {
    console.log('storing ...', item)
    firebase.database().ref("pacedData/").push(item);
  }

// TODO: Determine best way to structure data (nested JSON) --> Can write to specific paths, etc.
// https://firebase.google.com/docs/database/unity/save-data

// In theory, to create the "game" -> Should just call function in this helper that calls FB "push()'
// Can look into using other methods "SetValueAsync()" to write in specific nested areas
// TODO: Should look into user authentication --> Create different DB branch for each user's data