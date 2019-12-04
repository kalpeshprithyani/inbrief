import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import NewsList from "../news/NewsList";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import emptyState from "../../img/emptyState.png";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import { stringify,parse } from 'qs'

const useStyles = makeStyles(theme => ({
    root: {
        color:'#707070',
        padding:'5px 12px',
        borderRadius:20,
        '&:hover':{
            color:'black'
        }
    }
}))

const Search = (props) => {
    const [news, setnews] = React.useState(null);
    useEffect(()=>{
        const db = firebase.firestore()
        let items=[]
        db.collection("news")
            .where("hashtags", "array-contains-any", props.location.state? props.location.state : [props.match.params.query])
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc=>{
                    let data = doc.data()
                    data.id = doc.id
                    items.push(data)
                })
                /*
                setmapdata(querySnapshot.data().url)*/
            }).then(()=>setnews(items))
    },[props.match.params.tags])
    const classes=useStyles()
    console.log(news)
    return (
        <div>
            {news? news.length===0 ?
                <React.Fragment>
                    <div style={{width: 300,margin: 'auto',marginTop: 200,textAlign:'center'}}><img src={emptyState} alt="No bookmarks to show" style={{width:'100%'}}/>
                        <Typography variant="body2" style={{padding:'30px 0 15px 0'}} color="textSecondary">
                            No results for : {props.match.params.query}
                        </Typography>
                        <Link to="/">
                            <Button variant="outlined" color="secondary">
                                HOME
                            </Button>
                        </Link>
                    </div>
                </React.Fragment>
                : <React.Fragment>
                <Typography variant="h4">
                    Search: {props.match.params.query}
                </Typography>
                <NewsList news={news}/>
            </React.Fragment>:<LinearProgress color="secondary"/>}
        </div>
    )
}

export default Search