import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import fbConfig from './config'

// Initialize Firebase
firebase.initializeApp(fbConfig);
firebase.firestore().settings({});

export default firebase