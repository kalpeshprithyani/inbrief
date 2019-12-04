import React, {useEffect, useRef} from "react";
import NewsList from "../news/NewsList";
import {connect} from 'react-redux'
import {compose} from 'redux'
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import emptyState from '../../img/emptyState.png'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const usePrevious=(value)=>{
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

const Bookmark = (props) => {
    const [mapData, setmapdata] = React.useState(null);
/*
    function yourFunction(){
        // do whatever you like here
        console.log(mapData)
        setTimeout(yourFunction, 5000);
    }
    yourFunction();*/
    const {bookmarks} = props
    const prevAmount = usePrevious(bookmarks);
    useEffect(()=>{
        if(prevAmount !== bookmarks) {
            updateDatabase()
        }if(bookmarks){
            updateDatabase()
        }
    },[bookmarks])


    const updateDatabase = () => {
        console.log(bookmarks.length)
        let items= []
        const db = firebase.firestore()
        if(bookmarks.length){
        bookmarks.map((id)=>{
            db.collection("news")
                .doc(id)
                .get()
                .then(querySnapshot => {
                    let data = querySnapshot.data()
                    data.id = querySnapshot.id
                    items.push(data)
                    setmapdata(items)
                })
        })}else{
            setmapdata(null)
        }
    }

/*
    componentDidUpdate(prevProps, prevState){
        if(this.props !== prevProps) {
            let items= []
            const db = firebase.firestore()
            this.props.bookmarks.map((id)=>{
                db.collection("news")
                    .doc(id)
                    .get()
                    .then(querySnapshot => {
                        let data = querySnapshot.data()
                        data.id = querySnapshot.id
                        items.push(data)
                        this.setState(({
                            mapData:items
                        }))
                    })
            })
            console.log(Object.prototype.toString.call(this.state.mapData))
        }
    }*/
/*

    static getDerivedStateFromProps(props, state){
        if(props.bookmarks){
            let items= this.state.mapData
            const db = firebase.firestore()
            props.bookmarks.map((id)=>{
                db.collection("news")
                    .doc(id)
                    .get()
                    .then(querySnapshot => {
                        let data = querySnapshot.data()
                        data.id = querySnapshot.id
                        items.push(data)
                    })
            })
            console.log(items)
            console.log(items.length)
            return{
                mapData: items
            }
        }else return null
    }*/

/*
        if(this.state.mapData==='' && this.props.bookmarks){
            let items= []
            const db = firebase.firestore()
            this.props.bookmarks.map((id)=>{
                db.collection("news")
                    .doc(id)
                    .get()
                    .then(querySnapshot => {
                        let data = querySnapshot.data()
                        data.id = querySnapshot.id
                        items.push(data)
                        this.setState(({
                            mapData:items
                        }))
                    })
            })
        }*/
console.log("bookmarks",bookmarks)
        return(
            <div>
                {bookmarks?
                    bookmarks.length!==0?
                        mapData? <React.Fragment><div><Typography variant="h4">Bookmarks</Typography></div><NewsList news={mapData}/></React.Fragment>
                            : <LinearProgress color="secondary"/>
                        : <div style={{width: 300,margin: 'auto',marginTop: 200,textAlign:'center'}}><img src={emptyState} alt="No bookmarks to show" style={{width:'100%'}}/>
                        <Typography variant="body2" style={{padding:'30px 0 15px 0'}} color="textSecondary">
                            No bookmarks to show
                        </Typography>
                        <Link to="/">
                            <Button variant="outlined" color="secondary">
                                HOME
                            </Button>
                        </Link>
                    </div>
                    :<LinearProgress color="secondary"/>}
            </div>
        )
}

const mapStateToProps = (state) => {
    return{
        bookmarks: state.firebase.profile.bookmark
    }
}

export default compose(
    connect(mapStateToProps)
)(Bookmark)