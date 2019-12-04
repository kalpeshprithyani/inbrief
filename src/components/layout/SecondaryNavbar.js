import React from 'react';
import {NavLink} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft:20,
    },
    noMargin:{
        textDecoration:'none',
        color:'#707070',
        letterSpacing:1,
        '&:hover':{
            color:'black'
        },
        textTransform: 'uppercase'
    },
    active:{
        color:'black'
    }
}))

const SecondaryNavbar = () => {
    const classes=useStyles()
    return (
        <Container maxWidth="lg">
            <NavLink activeStyle={{color:'black'}} exact to='/' className={classes.noMargin}>HOME</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/article370' className={`${classes.root} ${classes.noMargin}`}>ARTICLE 370</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/elections2019' className={`${classes.root} ${classes.noMargin}`}>ELECTIONS 2019</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/ayodhyaverdict' className={`${classes.root} ${classes.noMargin}`}>AYODHYA VERDICT</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/india' className={`${classes.root} ${classes.noMargin}`}>INDIA</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/business' className={`${classes.root} ${classes.noMargin}`}>BUSINESS</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/politics' className={`${classes.root} ${classes.noMargin}`}>POLITICS</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/sports'  className={`${classes.root} ${classes.noMargin}`}>SPORTS</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/technology'  className={`${classes.root} ${classes.noMargin}`}>TECHNOLOGY</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/startups'  className={`${classes.root} ${classes.noMargin}`}>STARTUPS</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/category/entertainment'  className={`${classes.root} ${classes.noMargin}`}>ENTERTAINMENT</NavLink>
            <NavLink activeStyle={{color:'black'}} to='/more'  className={`${classes.root} ${classes.noMargin}`}>MORE</NavLink>
        </Container>
    )
}

export default SecondaryNavbar