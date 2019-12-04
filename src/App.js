import React,{Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import NewsDetails from "./components/news/NewsDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateNews from "./components/news/CreateNews";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Bookmark from "./components/home/Bookmark";
import MyAccount from "./components/home/MyAccount";
import {connect} from "react-redux";
import Hashtags from "./components/layout/Hashtags";
import Search from "./components/layout/Search";
import Categories from "./components/layout/Categories";
import noInternet from "./img/emptyState2.png"
import {Button, Typography} from "@material-ui/core";

const theme = createMuiTheme({
    palette:{
        primary: { main: '#1C0F13' },
        secondary: { main: '#f44a5a' },
        background:{ default:'#fafafa'},
        text:{
            primary:'#1C0F13',
            secondary:'#707070'
        }
    },
    typography:{
        fontFamily: [
            '"Open Sans"',
            'sans-serif'
        ],
        h4:{
            fontFamily:[
                '"PT Serif"',
                'serif'
            ]
        },
        h5:{
            fontFamily:[
                '"PT Serif"',
                'serif'
            ]
        },
        body1:{
            fontFamily:[
                '"PT Serif"',
                'serif'
            ]
        },
        h6:{
            fontWeight: 600,
        },
        subtitle2:{
            fontWeight:600
        },
        subtitle1:{
            fontWeight:600
        }
    },
    overrides: {
        MuiLinearProgress:{
            root:{
                position:'absolute',
                top:0,
                width:'100%',
                left:0,
                height:3,
                zIndex:5
            }
        }
    }
});

const ProtectedRoute = ({ component: Component,props, ...rest }) => {
    return <Route {...rest} render={other => {
        if(props.auth.isLoaded === props.auth.isEmpty){
            return <Redirect to={{pathname: '/signin', state: { from: other.location }}}/>
        }
        if(props.auth.uid){
            return <Component {...other}/>
        }else {
            return null
        }
    }}/>
}

const App = (props) => {
    console.log("hello")
    return (
        <React.Fragment>
        { navigator.onLine?
      <BrowserRouter>
          <CssBaseline />
          <ThemeProvider theme={theme}>
                  <div className="App">
                    <Navbar/>
                      <Container maxWidth="lg">
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/category/:category' component={Home}/>
                            <Route path='/news/:id' component={NewsDetails}/>
                            <Route props={props} path='/search/:query' component={Search}/>
                            <ProtectedRoute props={props} path='/createnews' component={CreateNews}/>
                            <ProtectedRoute props={props} path='/bookmarks' component={Bookmark}/>
                            <ProtectedRoute props={props} path='/myAccount' component={MyAccount}/>
                            <ProtectedRoute props={props} path='/hashtags/:tags' component={Hashtags}/>
                            <Route path='/signin' component={SignIn}/>
                            <Route path='/more' component={Categories}/>
                        </Switch>
                      </Container>
                  </div>
          </ThemeProvider>
      </BrowserRouter>
                : <div style={{backgroundColor:'#F4F4F4',height:'100vh',textAlign:'center',display:'flex',justifyContent:"center",alignItems:"center"}}>
                <ThemeProvider theme={theme}>
                    <div>
                    <div style={{width: 200,margin: 'auto'}}>
                        <img src={noInternet} style={{width:'100%'}}/>
                    </div>
                        <div style={{marginTop:25}}><Typography variant="subtitle1">Connection Lost</Typography></div>
                        <Typography variant="body2" color="textSecondary">The internet connection seems to be offline</Typography>
                        <div style={{marginTop:15}}>
                            <Button variant="outlined" color="secondary" onClick={()=>window.location.reload()}>
                                RELOAD
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        }
        </React.Fragment>
    );
  }


const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps)(App);