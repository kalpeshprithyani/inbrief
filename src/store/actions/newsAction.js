export const createNews = (news) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firestore = getFirestore();
        const profile = getState().firebase.profile //getState returns the state
        const authorID = getState().firebase.auth.uid
        firestore.collection('news').add({
            ...news,
            authorFirstName:profile.firstName,
            authorLastName:profile.lastName,
            authorId: authorID,
            createdAt: new Date(),
            flagged:[],
            flagged_count:0
        }).then(()=>{
            dispatch({type: 'CREATE_NEWS', news})
        }).catch((err)=>{
            dispatch({type:'CREATE_NEWS_ERROR',err})
        })
    }
};

export const readNews = (category) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firestore = getFirestore();
        const query = category? firestore.collection('news').where("category","==",category).orderBy("createdAt","desc") : firestore.collection('news').orderBy("createdAt","desc")
        const items= []
        query.get().then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                let data = doc.data()
                data.id = doc.id
                items.push(data)
            })
            dispatch({type:'READ_NEWS',items})
        }).catch((err)=>{
            dispatch({type:'CREATE_NEWS_ERROR',err})
        })
    }
};


export const removeBookmarkNews = (news) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firebase = getFirebase();
        const firestore = getFirestore();
        const authorID = getState().firebase.auth.uid
        firestore.collection('users').doc(authorID).update({
            bookmark: firebase.firestore.FieldValue.arrayRemove(news.id)
        }).then(()=>{
            dispatch({type: 'BOOKMARK_REMOVED', news})
        }).catch((err)=>{
            dispatch({type:'BOOKMARK_REMOVE_ERROR',err})
        })
    }
}

export const bookmarkNews = (news) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firebase = getFirebase();
        const firestore = getFirestore();
        const authorID = getState().firebase.auth.uid
        firestore.collection('users').doc(authorID).update({
            bookmark: firebase.firestore.FieldValue.arrayUnion(news.id)
        }).then(()=>{
            dispatch({type: 'BOOKMARKED', news})
        }).catch((err)=>{
            dispatch({type:'BOOKMARKED_ERROR',err})
        })
    }
}

export const flagNews = (news) => {
    return(dispatch, getState, {getFirebase,getFirestore})=>{
        // make async call
        const firebase = getFirebase();
        const firestore = getFirestore();
        const authorID = getState().firebase.auth.uid
        firestore.collection('news').doc(news.id).update({
            flagged: firebase.firestore.FieldValue.arrayUnion(authorID),
            flagged_count: firebase.firestore.FieldValue.increment(1)
        }).then(()=>{
            dispatch({type: 'NEWS_FLAGGED', authorID,news})
        }).catch((err)=>{
            dispatch({type:'FLAG_ERROR',err})
        })
    }
}
