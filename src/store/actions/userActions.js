export const updateAccount = (details) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firestore = getFirestore();
        const authorID = getState().firebase.auth.uid
        firestore.collection('users').doc(authorID).update({
            ...details
        }).then(()=>{
            dispatch({type: 'DETAILS_UPDATED', details})
        }).catch((err)=>{
            dispatch({type:'DETAILS_ERROR',err})
        })
    }
};