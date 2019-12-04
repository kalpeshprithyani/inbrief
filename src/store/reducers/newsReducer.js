const initState = {
    news:[],
    newsFetching:false
}

const newsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REQUEST_NEWS':
            return {
                ...state,
                newsFetching: true
            }
        case 'READ_NEWS':
            console.log(state.news)
            return {
                news:action.items,
                newsFetching:false
            }
        case 'CREATE_NEWS':
            console.log('create news', action.news)
            return {
                ...state,
                newsFetching: false
            }
        case 'NEWS_FLAGGED':
            console.log('news reported',action.news)
            console.log('state',state)
            return {
                news:state.news.map(news=>{
                    if(news.id===action.news.id)
                        return {
                            ...action.news,
                            flagged:[...action.news.flagged,action.authorID]
                        }
                    return news
                })
            }
        case 'FLAG_ERROR':
            console.log('cannot report')
            return state
        case 'CREATE_NEWS_ERROR':
            console.log('create project error',action.err)
            return state;
        case 'BOOKMARKED':
            console.log('bookmarked')
            return state;
        case 'BOOKMARKED_ERROR':
            console.log('bookmarked error')
            return state;
        case 'BOOKMARK_REMOVED':
            console.log('remove bookmarked')
            return state;
        case 'BOOKMARK_REMOVE_ERROR':
            console.log('remove bookmarked error')
            return state;
        default:
            return state;
    }
}

export default newsReducer