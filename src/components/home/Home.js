//Fetches news
import React,{Component} from "react";
import NewsList from "../news/NewsList";
import {connect} from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';
import {readNews} from "../../store/actions/newsAction";
import {withRouter} from "react-router-dom"

class Home extends Component{
    componentDidMount() {
        this.props.readNews(this.props.match.params.category)
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.pathname!==prevProps.location.pathname){
            this.props.readNews(this.props.match.params.category)
        }
    }
    render(){
        const {news,isFetching} = this.props;
        return (
            <React.Fragment>
                {!isFetching?
                <div>
                    <NewsList news={news}/>
                </div> :
                <LinearProgress color="secondary"/>
                }
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        readNews: (category) => {
            dispatch({type:'REQUEST_NEWS'})
            dispatch(readNews(category))
        }
    }
}

const mapStateToProps = (state) => {
    return{
        news: state.news.news,
        isFetching: state.news.newsFetching
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))