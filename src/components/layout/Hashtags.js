import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import NewsList from "../news/NewsList";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    root: {
        color:'#707070',
        backgroundColor:'#F4F4F4',
        padding:'5px 12px',
        borderRadius:20,
        '&:hover':{
            color:'black'
        }
    }
}))

const Hashtags = (props) => {
    const [news, setnews] = React.useState(null);
    useEffect(()=>{
    const db = firebase.firestore()
        let items=[]
    db.collection("news")
        .where("hashtags", "array-contains", props.match.params.tags)
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
    return (
        <div>
            {news? null:<LinearProgress color="secondary"/>}
            <Typography variant="h4">
                #{props.match.params.tags}
            </Typography>
            <NewsList news={news}/>
        </div>
    )
}

export default Hashtags