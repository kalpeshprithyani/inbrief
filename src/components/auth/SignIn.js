import React, {Component} from "react";
import {connect} from 'react-redux'
import {signIn, signInWithGoogle} from "../../store/actions/authActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import {Redirect} from 'react-router-dom'
import Card from "@material-ui/core/Card";
import googleLogo from "../../img/search.svg";
import LinearProgress from "@material-ui/core/LinearProgress";

class SignIn extends Component{
    state={
        signin:{
            email: '',
            password: ''
        },
        values:{
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false
        }
    }

    handleChange = (e) => {
        this.setState({
            signin:{
                ...this.state.signin,
                [e.target.name]: e.target.value
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state.signin)
    }

    handleClickShowPassword = () => {
        this.setState({
            values: {
                ...this.state.values,
                showPassword: !this.state.values.showPassword
            }
            });
    };
    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    render(){
        const {authError, isFetching,auth} = this.props
        console.log("auth",auth)
        if(auth.uid) return <Redirect to='/'/>
        else if(auth.isLoaded === false) return <div></div>
        return(
            <React.Fragment>
                {isFetching? <LinearProgress color="secondary"/>: null}
            <Card style={{width:600,margin:'auto'}}>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{padding:30}}>
                            <div onClick={this.props.handleClose} style={{float:'right',color:'#999999',cursor:'pointer'}}>
                                <i className="material-icons">
                                    close
                                </i>
                            </div>
                            <Typography variant="h4">
                                Log In
                            </Typography>
                            <div style={{marginTop:30}}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    autoComplete="off"
                                    autoFocus={true}
                                    InputLabelProps={{ required: false }}
                                />
                            </div>
                            <div style={{marginTop:20}}>
                                <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={this.state.values.showPassword ? 'text' : 'password'}
                                    value={this.state.signin.password}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    autoComplete="off"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.values.showPassword ? <i className="material-icons">
                                                    visibility
                                                </i> : <i className="material-icons">
                                                    visibility_off
                                                </i>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={60}
                                />
                                </FormControl>
                            </div>
                        </div>
                        <div style={{borderTop:'1px solid #dedede'}}>
                            <div style={{padding:'25px 30px',display:'flex',justifyContent:'space-between'}}>
                                <Button variant="contained" color="secondary" type="submit" size="large">
                                    LOGIN
                                </Button>
                                <Button variant="outlined" size="large" onClick={this.props.signInWithGoogle}>
                                    <img src={googleLogo} style={{width:25,paddingRight:10}}/>
                                    GOOGLE
                                </Button>
                            </div>
                        </div>
                        <div>{authError? <p>{authError}</p> : null}</div>
                    </form>
            </Card>
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        isFetching: state.auth.isFetching,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn:(creds) => {
            dispatch({type:'REQUEST_TODOS'})
            dispatch(signIn(creds))},
        signInWithGoogle:()=>{
            dispatch({type:'REQUEST_TODOS'})
            dispatch(signInWithGoogle())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)