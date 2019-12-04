import React from "react";
import moment from 'moment'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserIcon from '../../img/few2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import NewsDetails from "./NewsDetails";
import firebase from "firebase";

const useStyles = makeStyles({
    card: {
        marginTop:40
    },
    media: {
        height: 330,
    },
    dialog:{
        display:'flex',
        height:450
    },
    cover:{
        flex:4
    },
    details:{
        flex:5,
        display:'flex',
        flexDirection:'column',
        padding:20
    },
    avatar:{
        display:'flex'
    },
    followButton:{
        padding:5,
        backgroundColor:'#F4F4F4',
        color:'#707070',
        marginLeft:10
    },
    newsHead:{
        fontSize:18,
        lineHeight:'25px',
        fontWeight:400
    },
    moreURL:{
        paddingLeft: 6,
        width: 250,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        lineHeight: '10px'
    }
});

const NewsSummary = (props) => {
    const {news} = props
    const [open, setOpen] = React.useState(false);
    const [imageURL, setimageURL] = React.useState(false);
    const [initials, setinitials] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const db = firebase.firestore()
    db.collection("users")
            .doc(news.authorId)
            .get()
            .then(querySnapshot => {
                setimageURL(querySnapshot.data().url)
                setinitials(querySnapshot.data().initials)
            })
    return(<div>
            <Card className={classes.card} onClick={handleClickOpen}>
                <CardActionArea>
                    {news.url ? (
                        <CardMedia
                            className={classes.media}
                            image={news.url}
                            title="Contemplative Reptile"
                        />
                    ) : (
                        <p>loading...</p>
                    )}
                    <CardContent>
                        <Typography className={classes.newsHead} variant="h6" color="textPrimary">
                            {news.title}
                        </Typography>
                        <div style={{marginTop:10, display:'flex', alignItems:'center'}}>
                            {imageURL ?
                                <Avatar alt="author image" style={{cursor:'pointer',marginRight:7, width:25,height:25}} src={imageURL}/>
                                :
                                <Avatar style={{cursor:'pointer',marginRight:7, width:25,height:25,fontSize:14}}>{initials}</Avatar>
                            }
                            <Typography variant="caption" color="textSecondary">
                                {news.authorFirstName} {news.authorLastName} / {moment(news.createdAt.toDate().toISOString()).format('lll')}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
            >
                <NewsDetails handleClose={handleClose} news={news} imageURL={imageURL} initials={initials}/>
            </Dialog>
        </div>
    )
}



export default NewsSummary