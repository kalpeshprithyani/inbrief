import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {connect} from 'react-redux'
import LogoIcon from '../../img/logo2.png'

import AppBar from '@material-ui/core/AppBar';
import {Toolbar} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SecondaryNavbar from "./SecondaryNavbar";
import {withRouter} from "react-router-dom"
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        cursor: 'pointer',
        marginRight:10
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor:'pointer',
        marginTop:3
    },
    inputContainer:{
        cursor:'pointer',
        marginTop:3
    },
    inputInput: {
        padding: theme.spacing(1, 0, 1, 0),
        transition: theme.transitions.create('width'),
        marginLeft:30,
        fontSize:14,
        width: 0,
        '&:focus': {
            width: 200,
        }
    },
    root: {
        height:35,
        textDecoration:'none',
        color:'black',
    },
    anchor: {
        verticalAlign: 8,
        marginLeft:10
    },
    sticky:{
        position:'sticky',
        top:0,
        backgroundColor:'white',
        zIndex:2,
        borderBottom:'1px solid #dedede',
    }
}))

const Navbar = (props) => {
    const classes=useStyles()
    const [search, setsearch] = React.useState([]);
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile} location={props.location}/> : <SignedOutLinks/>
    const rendSecondNav = props.location.pathname ==='/' || props.location.pathname.substring(0, 10) === '/category/'


    const handleChange = (e) => {
        console.log(search)
        setsearch(e.target.value)
    }
    const handleSubmit = (e) => {
        console.log(search)
        e.preventDefault()
        props.history.push(`/search/${search}`)
    }

    return (
        <React.Fragment>
            <AppBar position="static" elevation={0} className={!rendSecondNav? classes.sticky : null}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters={true} style={{position:'initial'}}>
                            <Link to='/' className={classes.root}>
                                <img src={LogoIcon} style={{height:'100%'}} alt=""/>
                                <Typography variant="h5" display="inline" className={classes.anchor}>Inbrief</Typography>
                            </Link>
                            <div style={{flexGrow:1}}></div>
                            {rendSecondNav?
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <Typography variant="body2" color="textSecondary">
                                            <i className="material-icons">search</i>
                                        </Typography>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                    <InputBase
                                        placeholder="Search News"
                                        classes={{
                                            root: classes.inputContainer,
                                            input: classes.inputInput
                                        }}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                    </form>
                                </div>:""}
                            {auth.isLoaded && links}
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={rendSecondNav? classes.sticky : null} style={{padding:'12px 0 15px 0'}}>
                {rendSecondNav? <SecondaryNavbar/> : null}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))