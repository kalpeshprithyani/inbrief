import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from "../../store/actions/authActions";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

const SignedInLinks = (props) => {
    const [state, setState] = React.useState({
        open: false,
        Transition: Slide,
    });
    const handleClickSnack = Transition => () => {
        setState({
            open: true,
            Transition,
        });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {isFetching} = props
    return (
        <React.Fragment>
        {isFetching? <LinearProgress color="secondary"/>: null}
        <div style={{display: 'flex'}}>
            {props.profile.isJournalist ?
                <NavLink to='/createnews'>
                <Button variant="outlined" style={{marginRight: 14,padding: '0px 10px', height:35,marginTop: 3}}>
                    Write
                </Button></NavLink> : ""}
            {props.profile.url?
                <Avatar alt="Remy Sharp" style={{cursor:'pointer', width:35,height:35}} onClick={handleClick} src={props.profile.url} />: <Avatar style={{cursor:'pointer'}} onClick={handleClick}>{props.profile.initials}</Avatar>}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={1}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to='/myAccount'>
                        <div style={{display:'flex',alignItems:'center',padding:'10px 0'}}>
                        {props.profile.url?
                            <Avatar alt="Remy Sharp" style={{cursor:'pointer'}} onClick={handleClick} src={props.profile.url} />: <Avatar style={{cursor:'pointer'}} onClick={handleClick}>{props.profile.initials}</Avatar>}
                        <Typography variant="subtitle2" style={{paddingLeft:8}}>{props.profile.firstName} {props.profile.lastName}</Typography>
                        </div>
                    </NavLink>
                    </MenuItem>
                <NavLink to='/bookmarks'>
                    <MenuItem onClick={handleClose}>
                            <Typography variant="body2" color="textSecondary">Bookmark</Typography>
                    </MenuItem>
                </NavLink>
                <span onClick={handleClickSnack(TransitionRight)}>
                <MenuItem onClick={props.signOut}>
                    <Typography variant="body2" color="textSecondary">Log Out</Typography>
                </MenuItem>
                </span>
            </Menu>
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return{
        isFetching: state.auth.isFetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => {
            dispatch({type:'REQUEST_TODOS'})
            dispatch(signOut())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedInLinks)