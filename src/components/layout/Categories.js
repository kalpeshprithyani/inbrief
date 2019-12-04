import React, {Component} from "react";
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import article from "../../img/categories/article.jpg"
import election from "../../img/categories/election.jpg"
import ayodhaya from "../../img/categories/ayodhaya.jpg"
import india from "../../img/categories/india.jpg"
import business from "../../img/categories/business.jpg"
import politics from "../../img/categories/politics.jpg"
import sports from "../../img/categories/sports.jpg"
import technology from "../../img/categories/technology.jpg"
import startup from "../../img/categories/startup.jpg"
import entertainment from "../../img/categories/entertainment.jpg"
import hatke from "../../img/categories/hatke.jpg"
import international from "../../img/categories/international.jpg"
import automobile from "../../img/categories/automobile.jpg"
import science from "../../img/categories/science.jpg"
import travel from "../../img/categories/travel.jpg"
import misci from "../../img/categories/miscelleneous.jpg"
import fashion from "../../img/categories/fashion.jpg"
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import categoriesData from '../../data/categories'

const CustomMedia = withStyles({
    root: props => ({
        background:`linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(255,255,255,0.8) 100%),url(${props.image}) !important`,
        backgroundSize:'cover !important',
        height:350
    })
})(CardMedia);

const useStyle={
    card:{
        position:'relative',
        height:350
    },
    type:{
        position:'absolute',
        bottom:20,
        marginLeft:20
    }
}

class Categories extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="h4" style={{marginTop:30}}>
                    Categories
                </Typography>
                <div style={{marginTop:50, display:'flex',flexWrap:'wrap'}}>
                    <div style={{flexBasis:'23%',margin:'0 1% 30px 1%'}}>
                        <Link to={'/'}>
                            <Card className={this.props.classes.card}>
                                <Typography variant="h4" color="primary" style={{textAlign:"center",marginTop:'50%'}}>
                                    All
                                </Typography>
                            </Card>
                        </Link>
                    </div>
                    {categoriesData.categories.map(cat=> {
                        console.log(cat.title)
                        return(
                            <div key={cat.id} style={{flexBasis:'23%',margin:'0 1% 30px 1%'}}>
                            <Link to={'/category/' + cat.link}>
                            <Card className={this.props.classes.card}>
                                <CardActionArea>
                                    <CustomMedia image={require('../../img/categories' + cat.img)}/>
                                </CardActionArea>
                                <Typography variant="h6" className={this.props.classes.type}>{cat.title}</Typography>
                            </Card>
                        </Link>
                            </div>
                        )})}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyle)(Categories)