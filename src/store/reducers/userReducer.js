const initState = {
    user:[
    ]
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DETAILS_UPDATED':
            console.log('details updated', action.user)
            return state;
        case 'DETAILS_ERROR':
            console.log('details update error', action.err)
            return state;
        default:
            return state;
    }
}

export default userReducer