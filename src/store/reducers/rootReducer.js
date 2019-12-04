import authReducer from "./authReducer";
import newsReducer from "./newsReducer";
import userReducer from "./userReducer";
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer, //authReducer stores data in auth property of state
    news: newsReducer,
    user: userReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer