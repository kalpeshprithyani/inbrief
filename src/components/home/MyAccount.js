import React, {Component} from "react";
import {connect} from 'react-redux'
import {compose} from 'redux'

import FormControl from "@material-ui/core/FormControl";
import {withStyles} from "@material-ui/core/styles";
import firebase from "firebase";
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {updateAccount} from "../../store/actions/userActions";
import Avatar from "@material-ui/core/Avatar";

const useStyles = {
    formControl: {
        minWidth: 120,
    }
};

class myAccount extends Component{
    state={
        image:{
            url:''
        },
        picture:null,
        pictureURL:null
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.picture!==null){
            const storage = firebase.storage()
            const storageRef = storage.ref()
            if(this.props.profile.url){
                const deleteFile = storage.refFromURL(this.props.profile.url)
                deleteFile.delete()
            }
            const uploadTask = storageRef.child('user/'+ new Date().getTime() + '-' + this.state.picture.name)
            uploadTask.put(this.state.picture).then((snap)=>{
                snap.ref.getDownloadURL().then((url)=>{
                    this.setState({
                        image:{
                            ...this.state.image,
                            url:url
                        }
                    })
                }).then(()=>{
                    this.props.updateAccount(this.state.image)
                    this.props.history.push('/')
                })
            })
        }else this.props.history.push('/')
    }

    handleImage = (event) => {
        this.setState({
            picture: event.target.files[0],
            pictureURL: URL.createObjectURL(event.target.files[0])
        })
    }


    render(){/*
        const firebase = useFirebase()
        const auth2 = useSelector(state => state.firebase.auth)*/
        /*const {auth} = this.props;
        if(isEmpty(auth)) return <Redirect to='/signin'/>*/
        /*if(!auth.uid) return <Redirect to='/signin'/>*/
        return(
            <div style={{backgroundColor:'#F4F4F4',width:'100%',position:'absolute',left:0,
                bottom: 0,
                top: 65}}>
                <Paper elevation={4} style={{width:600,margin:'auto',marginTop:100,padding:30}}>
                    {this.state.pictureURL || this.props.profile.url ?
                        <Avatar alt="Profile pic" src={this.state.pictureURL? this.state.pictureURL : this.props.profile.url} style={{width:200,height:200,margin:'100px auto'}}/> :
                        <Avatar alt="profile pic" style={{width:200,height:200,fontSize:90,margin:'100px auto'}}>{this.props.profile.initials}</Avatar>
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div style={{display:'flex',marginTop:20,justifyContent:'space-between'}}>
                            <FormControl variant="outlined" className={this.props.classes.formControl}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={this.handleImage}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="outlined" component="span">
                                        Upload image
                                    </Button>
                                </label>
                            </FormControl>
                            <div>
                                <Button variant="contained" color="secondary" type="submit">
                                    SAVE
                                </Button>
                            </div>
                        </div>

                    </form>
                </Paper>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAccount: (image) => dispatch(updateAccount(image))
    }
}

const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(myAccount)