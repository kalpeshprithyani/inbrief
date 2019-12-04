import React from "react";
import NewsSummary from "./NewsSummary";
import {Link} from 'react-router-dom'
import {makeStyles} from "@material-ui/core";

const NewsList = ({news}) => {
    return(
        <div style={{display:'flex',flexWrap:'wrap',marginTop:10,paddingTop:30,marginBottom:150}}>
            {news && news.map(news => {
                return(
                    <div className="newsCard" key={news.id} style={{flexBasis:'30%'}}>
                        <NewsSummary news={news}/>
                    </div>
                )
            })}
        </div>
    )
}

export default NewsList