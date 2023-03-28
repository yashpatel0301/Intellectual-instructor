import React from 'react';
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
import Header from "components/Header/Header.js";
import {db, storage} from "../Components/firebase";
import { useAuth } from '../Components/auth';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router";

const useStyles = makeStyles(styles);
export default function VideoRefer(props) {
    let id = useParams();
    const classes = useStyles();
    const history = useHistory();
    const { ...rest } = props;

    const showVideos = async () => {
        db.collection("Instructors").where("email","==",id.id).get().then(
            (snapshot) => {
                snapshot.docs.forEach((userSnapshot) => {
                  var currentID = userSnapshot.id
                  var userData = userSnapshot.data()
                  storage.ref(userData.name+"/DEMO/").listAll().then((out)=>{
                    out._delegate.items.forEach(result=>{
                        storage.ref(result._location.path_).getDownloadURL().then(
                          (url)=>{
                            var a = document.getElementById('DemoVideos');
                            var video = document.createElement("video");
                            var source = document.createAttribute("src");
                            var control = document.createAttribute("controls");
                            source.value = url;
                            video.style.cssText='width:80%; height:400px; margin-bottom:10%'
                            video.setAttributeNode(source);
                            video.setAttributeNode(control);
                            a.appendChild(video);
                          });
                        }
                        );
                    });
                })
                }
          )
    }
    
    return (
        <div>
            <Header
                brand="II"
                rightLinks={<HeaderLinks2 />}
                fixed
                color="white"
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />
            <br/>
            <br/>
            <br/>
            <Card className={classes.root} variant="outlined">
             <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                View Demo Lectures of this instructor
                </Typography>
                <Typography className={classes.pos} color="textSecondary" id='DemoVideos' onLoad={showVideos()}>
                </Typography>
             </CardContent> 
             </Card>
            </div>
    )
}
