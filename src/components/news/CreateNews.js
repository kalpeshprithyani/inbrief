import React, {Component} from "react";
import {connect} from 'react-redux'
import {createNews} from "../../store/actions/newsAction";
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from "@material-ui/core/styles";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChipInput from 'material-ui-chip-input'
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = {
    formControl: {
        minWidth: 120,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    }
};


class CreateNews extends Component{
    state={
        news:{
            title: '',
            content: '',
            category:'',
            url:'',
            moreURL:'',
            hashtags:[]
        },
        picture:null,
        pictureURL:null,
        labelWidth:''
    }

    /*
    componentDidMount() {
        document.body.style.background = "#F4F4F4";
    }
    componentWillUnmount() {
        document.body.style.background = "#ffffff";
    }*/

    handleChange = (e) => {
        if(e.target){
            this.setState({
                    news:{
                        ...this.state.news,
                    [e.target.name]: e.target.value
                }
            })
        }else if(this.state.news.hashtags.length<5){
            this.setState({
                news:{
                    ...this.state.news,
                    hashtags: e
                }
            })
        }
        console.log("event",e)
        console.log(this.state.news.hashtags)
    }

    handleDeleteChip = (c,i) => {
        this.setState((prev)=>{
            prev.news.hashtags.splice(i,1)
            return {
            news:{
            ...this.state.news,
                    hashtags:prev.news.hashtags
            }
        }})
    }

    handleAddChip = (c) => {
        if(this.state.news.hashtags.length<5){
            this.setState({
                news:{
                    ...this.state.news,
                    hashtags: [...this.state.news.hashtags,c]
                }
            })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const storage = firebase.storage()
        const storageRef = storage.ref()
        const uploadTask = storageRef.child('images/'+new Date().getTime()+'-'+this.state.picture.name)
        uploadTask.put(this.state.picture).then((snap)=>{
            snap.ref.getDownloadURL().then((url)=>{
                this.setState({
                    news:{
                        ...this.state.news,
                        url:url
                    }
                })
            }).then(()=>{
                this.props.createNews(this.state.news)
            }).then(()=>{
                this.props.history.push('/')
            })
        })
    }


    handleImage = (event) => {
        this.setState({
            picture: event.target.files[0],
            pictureURL: URL.createObjectURL(event.target.files[0])
        })
    }


    render(){
        const {auth,isFetching} = this.props;
        if(auth.isLoaded === true && !auth.isJournalist){
            return <Redirect to={'/'}/>
        }
        console.log(isFetching)
        if(auth.isJournalist===true){
            return(
                <div>
                {!isFetching? null : <LinearProgress color="secondary"/>}
                    <Paper elevation={4} style={{width:600,margin:'auto',marginTop:100,padding:30,marginBottom:100}}>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <Typography variant="h4">
                                    Compose News
                                </Typography>
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <TextField
                                    name="content"
                                    placeholder="Content (400 characters)"
                                    multiline={true}
                                    rows={8}
                                    rowsMax={8}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    autoComplete="off"
                                    fullWidth
                                    inputProps={{ maxLength: 400 }}
                                />
                            </div>
                            <div>
                                <FormControl variant="outlined" className={this.props.classes.formControl}>
                                    <div><InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={this.state.news.category}
                                        onChange={this.handleChange}
                                        name="category"
                                        labelWidth={70}
                                        style={{width:250}}
                                    >
                                        <MenuItem value="article370"><Typography variant="body2">Article 370</Typography></MenuItem>
                                        <MenuItem value="elections2019"><Typography variant="body2">Elections 2019</Typography></MenuItem>
                                        <MenuItem value="ayodhyaverdict"><Typography variant="body2">Ayodhya Verdict</Typography></MenuItem>
                                        <MenuItem value="india"><Typography variant="body2">India</Typography></MenuItem>
                                        <MenuItem value="business"><Typography variant="body2">Business</Typography></MenuItem>
                                        <MenuItem value="politics"><Typography variant="body2">Politics</Typography></MenuItem>
                                        <MenuItem value="sports"><Typography variant="body2">Sports</Typography></MenuItem>
                                        <MenuItem value="technology"><Typography variant="body2">Technology</Typography></MenuItem>
                                        <MenuItem value="startups"><Typography variant="body2">Startups</Typography></MenuItem>
                                        <MenuItem value="entertainment"><Typography variant="body2">Entertainment</Typography></MenuItem>
                                        <MenuItem value="hatke"><Typography variant="body2">Hatke</Typography></MenuItem>
                                        <MenuItem value="international"><Typography variant="body2">International</Typography></MenuItem>
                                        <MenuItem value="automobile"><Typography variant="body2">Automobile</Typography></MenuItem>
                                        <MenuItem value="science"><Typography variant="body2">Science</Typography></MenuItem>
                                        <MenuItem value="travel"><Typography variant="body2">Travel</Typography></MenuItem>
                                        <MenuItem value="miscellaneous"><Typography variant="body2">Miscelleneous</Typography></MenuItem>
                                        <MenuItem value="fashion"><Typography variant="body2">Fashion</Typography></MenuItem>
                                    </Select>
                                    </div>
                                    <div>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        onChange={this.handleImage}
                                        required
                                    />
                                    <label htmlFor="raised-button-file">
                                        <Button variant="outlined" component="span" style={{height:56,width:250}}>
                                            {this.state.pictureURL? "Change Image" : "Upload" }
                                        </Button>
                                    </label>
                                    </div>
                                </FormControl>
                            </div>
                            {this.state.pictureURL?
                                <div style={{position:'relative', marginTop:20}}>
                                    <i onClick={()=>this.setState(()=> {
                                        document.getElementById("raised-button-file").value=""
                                        return {
                                            pictureURL:null,
                                            picture:null
                                        }
                                    })} className="material-icons" style={{position:'absolute',right:0,top:0,color:'white',backgroundColor:'rgba(0,0,0,0.3)',borderRadius:10,cursor:'pointer',margin:'10px 10px 0 0',padding:2}}>
                                        close
                                    </i>
                                    <img src={this.state.pictureURL} style={{width:'100%',borderRadius:5}} alt=""/> </div>: null }
                            <div style={{marginTop:5}}>
                                <TextField
                                    name="moreURL"
                                    label="URL"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    fullWidth
                                />
                            </div>
                            <div style={{marginTop:15}}>
                                <ChipInput
                                    name="hashtags"
                                    value={this.state.news.hashtags}
                                    onAdd={(chips)=>this.handleAddChip(chips)}
                                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                                    placeholder="#Hashtags (max 5)"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div style={{textAlign:'right',marginTop:15}}>
                                <Button variant="contained" color="secondary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </div>)
        }else{
            console.log(auth)
            return <div></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNews: (news) => {
            dispatch({type: 'REQUEST_NEWS'})
            dispatch(createNews(news))
        }
    }
}

const mapStateToProps = (state) => {
    return{
        auth:state.firebase.profile,
        isFetching: state.news.newsFetching
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(useStyles)
)(CreateNews)