import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles, withStyles} from "@material-ui/core";
import {bookmarkNews, removeBookmarkNews,flagNews} from "../../store/actions/newsAction";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import { stringify,parse } from 'qs'
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

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
        verticalAlign: '-3px'
    },
    chips:{
        width: 'fit-content',
        marginRight:6
    }
});

const NewsDetails = (props) => {
    const {auth,news, bookmark} = props
    const [state, setState] = React.useState({
        open: false,
        messageInfo:undefined
    });
    const handleClickSnack = message => () => {
        setState({
            open: true,
            messageInfo:message
        });
    };
    const handleCloseSnack = (event,reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({
            ...state,
            open: false});
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    const isBookmarked = bookmark && bookmark.includes(news.id)
    const handleSubmit = () => {
        isBookmarked ? props.removeBookmarkNews(news) : props.bookmarkNews(news)
    }
    if(news){
        return(
            <Card className={classes.dialog}>
                <CardMedia
                    className={classes.cover}
                    image={news.url}
                    title="Live from space album cover"
                />
                <div onClick={props.handleClose} style={{position:'absolute', right:10, top:10,color:'#707070',cursor:'pointer'}}>
                    <i className="material-icons">
                        close
                    </i>
                </div>
                <div className={classes.details}>
                    <div className={classes.avatar}>
                        {props.imageURL ?
                            <Avatar alt="Remy Sharp" src={props.imageURL}/>
                            :
                            <Avatar>{props.initials}</Avatar>
                        }
                        <div style={{marginLeft:10}}>
                            <div>
                                <Typography color="textPrimary" variant="caption">
                                    {news.authorFirstName} {news.authorLastName}
                                </Typography>
                            </div>
                            <div>
                                <Typography color="textSecondary" variant="caption">
                                    {moment(news.createdAt.toDate().toISOString()).format('LLLL')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop:20}} onClick={handleClickSnack(auth.uid? !isBookmarked?"Saved":"Bookmark Removed" : "Sign in to bookmark news")}>
                        <Typography variant="h6" color="textPrimary" style={isBookmarked? {color:'#f50057',cursor:'pointer'} : {cursor:'pointer'}} onClick={auth.uid? handleSubmit:null}>
                            {news.title}
                            <Tooltip title={isBookmarked? "Remove bookmark" : "Bookmark"}><i className="material-icons" style={{verticalAlign: -5}}>{isBookmarked? 'bookmark':'bookmark_border'}</i></Tooltip>
                        </Typography>
                    </div>
                    <Typography variant="body1" color="textSecondary" style={{marginTop:10}}>
                        {news.content}
                    </Typography>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'auto',alignItems:'flex-end'}}>
                        <div>
                            <div style={{display:"flex",marginBottom:8}}>
                                {news.hashtags?
                                    news.hashtags.map((id)=><Link to={`/hashtags/${id}`} key={id} onClick={props.handleClose}><Chip clickable className={classes.chips} variant="outlined" size="small" label={`#${id}`} /></Link>)
                                    :
                                    null}
                            </div>
                            {news.moreURL &&
                        <a href={news.moreURL}>
                                <Typography variant="caption" color="secondary">
                                    <i className="material-icons" style={{verticalAlign:'-7px'}}>link</i>
                                    <div className={classes.moreURL}>{news.moreURL}</div>
                                </Typography>
                            </a>}
                        </div>
                        <div>
                            <i className="material-icons" onClick={handleClickMenu} style={{cursor:'pointer'}}>
                                more_vert
                            </i>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                <Link to={{pathname:`/search/${news.hashtags}`, state: news.hashtags}}>
                                    <span onClick={props.handleClose}><MenuItem onClick={handleCloseMenu}>Show more such news</MenuItem></span>
                                </Link>
                                {news.flagged.includes(auth.uid) ?
                                    <MenuItem disabled style={{color:'#a78c8c',opacity:1}}>Reported <i className="material-icons" style={{fontSize: 22,paddingLeft: 5}}>
                                        error_outline
                                    </i></MenuItem>
                                    :
                                    <span onClick={handleCloseMenu}>
                                        <span onClick={handleClickSnack(auth.uid? "Reported" : "Sign in to report news")}>
                                            <MenuItem onClick={auth.uid? ()=>props.flagNews(news):null} >Report as inappropriate</MenuItem>
                                        </span>
                                    </span>
                                }
                            </Menu>
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                    open={state.open}
                    onClose={handleCloseSnack}
                    autoHideDuration={3000}
                    TransitionComponent={state.Transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{state.messageInfo}</span>}
                />
            </Card>
        )
    }else{
        return(
            <div>Loading project...</div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        removeBookmarkNews: (news) => dispatch(removeBookmarkNews(news)),
        bookmarkNews: (news) => dispatch(bookmarkNews(news)),
        flagNews: (news) => dispatch(flagNews(news))
    }
}

const mapStateToProps = (state) => {
    return{
        bookmark: state.firebase.profile.bookmark,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsDetails)