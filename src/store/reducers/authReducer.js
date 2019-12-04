const initState = {
    authError:null,
    isFetching:false
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'REQUEST_TODOS':
            return {
                ...state,
                isFetching: true
            }
        case 'LOGIN_ERROR':
            console.log('login error',action.error)
            return {
                ...state,
                authError:'Login failed',
                isFetching: false
            }
        case 'LOGIN_SUCCESS':
            console.log('Login success')
            return{
                    ...state,
                    authError: null,
                isFetching: false
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success')
            return {...state,
                isFetching: false}
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null,
                isFetching: false
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message,
                isFetching: false
            }
        default:
            return state
    }
}

export default authReducer