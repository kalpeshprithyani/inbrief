export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({type:'LOGIN_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'LOGIN_ERROR',err})
        })
    }
};

export const signInWithGoogle = () => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore()
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=>{
            firestore.collection('users').doc(result.user.uid).get().then(doc=>{
                if(!doc.exists){
                    const user = result.user;
                    const fullName = user.displayName.split(' ')
                    const firstName = fullName[0]
                    const lastName = fullName[fullName.length-1]
                    return firestore.collection('users').doc(result.user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        initials: firstName[0] + lastName[0],
                        email:result.user.email,
                        url:result.user.photoURL,
                        isJournalist:false
                    })
                }else{
                    if(!doc.data().url){
                        return firestore.collection('users').doc(result.user.uid).set({
                            url:result.user.photoURL
                        })
                    }
                }
            })
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch((error)=>{
            dispatch({type:'LOGIN_ERROR',error})
            /*
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...*/
        });
    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        setTimeout(function() { //delay set deliberately before logout
            firebase.auth().signOut().then(()=>{
                firebase.logout();
                dispatch({type: 'SIGNOUT_SUCCESS'})
            })
        }, 1000);
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase,getFirestore}) => { //getFirebase to signup a new user using firebase auth, getfirestore to communicate with firebase DB
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res)=>{ // this will fire after the above method is complete, res will contain info about the new user
            return firestore.collection('users').doc(res.user.uid).set({  // if the collection doesn't exists firestore will create the collection
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                email:newUser.email,
                isJournalist:false
            })
        }).then(()=>{
            dispatch({type:'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type:'SIGNUP_ERROR',err})
        })
    }
}

