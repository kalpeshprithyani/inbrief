import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signInWithGoogle, signUp} from "../../store/actions/authActions";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import googleLogo from '../../img/search.svg'
import LinearProgress from "@material-ui/core/LinearProgress";

class SignUp extends Component{
    state={
        signup: {
            email: '',
            password: '',
            name: ''
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
            signup: {
                ...this.state.signup,
                [e.target.name]: e.target.value
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signUp(this.state.signup)
    }

    handleClickShowPassword = () => {
        this.setState({
            values: {
                ...this.state.values,
                showPassword: !this.state.values.showPassword
            }
        });
    };
    render(){
        const {isFetching, authError} = this.props
        return(
            <React.Fragment>
            {isFetching? <LinearProgress color="secondary"/>: null}
            <Card>
                    <form onSubmit={this.handleSubmit} style={{width:600}}>
                        <div style={{padding:30}}>
                        <div onClick={this.props.handleClose} style={{float:'right',color:'#999999',cursor:'pointer'}}>
                            <i className="material-icons">
                                close
                            </i>
                        </div>
                        <div>
                            <Typography variant="h4">
                                Join InBrief
                            </Typography>
                        </div>
                        <div style={{marginTop:30}}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                type="email"
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                                InputLabelProps={{ required: false }}
                                autoFocus={true}
                            />
                        </div>
                        <div style={{marginTop:20,marginBottom:8}}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={this.state.values.showPassword ? 'text' : 'password'}
                                    value={this.state.signup.password}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    autoComplete="off"
                                    labelWidth={68}
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
                                />
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                name="name"
                                label="Full Name"
                                margin="normal"
                                variant="outlined"
                                type="text"
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                                InputLabelProps={{ required: false }}
                            />
                        </div>
                        </div>
                        <div style={{borderTop:'1px solid #dedede'}}>
                            <div style={{padding:'25px 30px',display:'flex',justifyContent:'space-between'}}>
                                <Button size="large" variant="contained" color="secondary" type="submit">
                                    Sign Up
                                </Button>
                                <Button variant="outlined" size="large" onClick={this.props.signInWithGoogle}>
                                    <img src={googleLogo} style={{width:25,paddingRight:10}}/>
                                    GOOGLE
                                </Button>
                            </div>
                        </div>
                        <div>
                            {authError? <p>{authError}</p> : null}
                        </div>
                    </form>
            </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => { //to pass data as props to this component
    return{
        isFetching: state.auth.isFetching,
        authError: state.auth.authError //To catch the error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => {
            dispatch({type:'REQUEST_TODOS'})
            dispatch(signUp(newUser))}, // this will be then passed to authAction, from there it will be passed on to authReducer,
        signInWithGoogle:()=>{
            dispatch({type:'REQUEST_TODOS'})
            dispatch(signInWithGoogle())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp) //HOC