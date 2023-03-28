import React,{ useState } from "react";
import { firebase, db } from "../firebase";
import { makeStyles,withStyles } from "@material-ui/core/styles";
// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Email from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useAuth } from '../../Components/auth';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Media from '../Media.js';
import image from "assets/img/bg7.jpg";
import profileImage from "assets/img/faces/avatar.jpg";
import '../index.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HeaderLinks2 from "components/Header/HeaderLinks2.js";
import Slide from '@material-ui/core/Slide';
import './search.css';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link, useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.text.secondary,
  },
}))(MuiDialogContent);



export default function SearchBar2(props) {
  const classes = useStyles();
  const {...rest} = props;
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [online, Online]= useState("");
  const [place, Place]= useState([]);
  const [level, Level]= useState("");
  const [time, Time]= useState("");
  const history = useHistory();
  const {currentUser} = useAuth();

  const handleClickOpen1 = () => {
    if(document.getElementById('input').value==''){
      setOpen1(false);
      document.getElementById('validate').innerHTML="<p>Please enter the subject</p>"
    }
    else{
      let expertise = document.getElementById('input').value;
      db.collection("Students").where("email","==",currentUser.email).get().
    then(snapshot => {
      snapshot.forEach(function(doc){
        console.log(doc.id)
        db.collection("Students").doc(doc.id).
        update({Expertise:expertise})
      })
    }
    ).catch((error) => {
        alert(error.message);
      });
      document.getElementById('validate').innerHTML="";
      setOpen2(false);
      setOpen1(true);
    }
  };
  const handleClickOpen2 = () => {
    setOpen3(false);
    setOpen2(true);
  };
  const handleClickOpen3 = () => {
    setOpen4(false);
    setOpen3(true);
  };
  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const results = () => {
    // const StudentUsers=[];
    // var keyword = document.getElementById('input').value;
    // db.collection("Instructors").where("expertise","==",keyword).get().then((snapshot)=>{
    //   snapshot.docs.forEach((userSnapshot) => {
    //     let currentID = userSnapshot.id
    //     let appObj = {...userSnapshot.data(), ['id']: currentID}
    //     // StudentUsers.push(appObj)
    //     // StudentUsers.push(userSnapshot.data())
    //     console.log(userSnapshot.data());
    //     // let name = userSnapshot.data().name;
    // })
    console.log(online,level,time,place);
    db.collection("Students").where("email","==",currentUser.email).get().
    then(snapshot => {
      snapshot.forEach(function(doc){
        console.log(doc.id)
        db.collection("Students").doc(doc.id).
        update({Filters:{
        online: online,
        level: level,
        time: time,
        place: place,
        }})
      })
    }
    ).catch((error) => {
        alert(error.message);
      });
    Online("");
    Level("");
    Time("");
    Place([]);
    history.push("/searchresults");
  };

const getValue=(e)=>{
  let data=place;
  if(e.target.checked == true){
  data.push(e.target.value);
  Place(data);
  }
  else{
    var x = data.indexOf(e.target.value);
    data.splice(x,1);
  }
  // studentTypes(data);
  // console.log(data);
}
  return (
    <div className={classes.section}>
        <div id="navbar" className={classes.navbar}>
        <div
          className={classes.navigation}
          style={{ backgroundImage: "url(" + image + ")"}}
        >
          <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                  <div className="search-style">
                      <Fade top>
                      <h1>Hire an instructor today.</h1>
                      <h3>Private, 1–on–1 lessons with the expert instructor of your choice. Meet online or in-person. Decide how much you pay and who you want to work with. The choice is yours.</h3>
                      </Fade>
                     <div className="container">
                        <Zoom bottom>
                         <h5>What would you like to learn?</h5>
                          <Media name="search"/>
                        <Button color="danger" onClick={handleClickOpen1} >Search</Button>
                        <div id="validate"></div>
                        </Zoom>
                    </div>
                  </div>
                </div>
                </GridItem>
                </GridContainer>
                </div>
        </div>
      </div>
      <Dialog fullScreen open={open1}>
          <Header
            brand="II"
            rightLinks={<HeaderLinks2 />}
            color="white"
            {...rest}
          /> 
          <DialogContent>
          <div id="loginform">
            <h2 id="headerTitle">Would you rather meet your tutor online or in person?</h2>
            <div class="row">
               <FormControl component="fieldset">
              {/* <FormLabel component="legend">Experience</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="online" control={<Radio />} label="online" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Online(e.target.value)}/>
                <FormControlLabel value="in-person" control={<Radio />} label="in-person" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Online(e.target.value)}/>  
                {/* <FormControlLabel value="i'm not sure yet" control={<Radio />} label="i'm not sure yet" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Online(e.target.value)}/>   */}
                </RadioGroup>
              </FormControl>
            </div>
            <div id="button" class="row">
              <Button onClick={handleClose1}>Close</Button>
              <Button onClick={handleClickOpen2} disabled={ online =='' ? true: false}>Next</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog fullScreen open={open2}>
          <Header
            brand="II"
            rightLinks={<HeaderLinks2 />}
            color="white"
            {...rest}
          /> 
          <DialogContent>
          <div id="loginform">
            <h2 id="headerTitle">what level is this for?</h2>
            <div class="row">
               <FormControl component="fieldset">
              {/* <FormLabel component="legend">Experience</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="Adult" control={<Radio />} label="Adult" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Level(e.target.value)}/>
                <FormControlLabel value="College" control={<Radio />} label="College" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Level(e.target.value)}/>  
                <FormControlLabel value="HighSchool" control={<Radio />} label="HighSchool" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Level(e.target.value)}/>  
                <FormControlLabel value="PrimarySchool" control={<Radio />} label="PrimarySchool" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Level(e.target.value)}/>  
                </RadioGroup>
              </FormControl>
            </div>
            <div id="button" class="row">
              <Button onClick={handleClickOpen1}>PREV</Button>
              <Button onClick={handleClickOpen3} disabled={ level ==='' ? true: false}>Next</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


       <Dialog fullScreen open={open3}>
          <Header
            brand="II"
            rightLinks={<HeaderLinks2 />}
            color="white"
            {...rest}
          /> 
          <DialogContent>
          <div id="loginform">
            <h2 id="headerTitle">when do you need help?</h2>
            <div class="row">
               <FormControl component="fieldset">
              {/* <FormLabel component="legend">Experience</FormLabel> */}
                <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="today" control={<Radio />} label="today" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Time(e.target.value)}/>
                <FormControlLabel value="within few days" control={<Radio />} label="within few days" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Time(e.target.value)}/>  
                <FormControlLabel value="within two weeks" control={<Radio />} label="within two weeks" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Time(e.target.value)}/>  
                <FormControlLabel value="sometime this month" control={<Radio />} label="sometime this month" style={{ color: 'black', marginLeft: '10%', width:'100%'}} onChange= {(e) => Time(e.target.value)}/>  
                </RadioGroup>
              </FormControl>
            </div>
            <div id="button" class="row">
              <Button onClick={handleClickOpen2}>Prev</Button>
              <Button onClick={handleClickOpen4} disabled={ time ==='' ? true: false}>Next</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog fullScreen open={open4}>
          <Header
            brand="II"
            rightLinks={<HeaderLinks2 />}
            color="white"
            {...rest}
          /> 
          <DialogContent>
          <div id="loginform">
            <h2 id="headerTitle">where do you prefer having lessons?</h2>
            <div class="row">
              <FormControl component="fieldset">
      <FormGroup row>
        <FormControlLabel
          style={{ color: 'black', marginLeft: '10%', width:'100%'}}
          value="Student's Location"
          onChange={(e)=>Place.bind(getValue(e))}
          control={<Checkbox />}
          label="Student's Location"
          labelPlacement="end"
        />
        <FormControlLabel
          style={{ color: 'black', marginLeft: '10%', width:'100%'}}
          value="Library"
          onChange={(e)=>Place.bind(getValue(e))}
          control={<Checkbox />}
          label="Library"
          labelPlacement="end"
        />
        <FormControlLabel
          style={{ color: 'black', marginLeft: '10%', width:'100%'}}
          value="Location Instructor select"
          onChange={(e)=>Place.bind(getValue(e))}
          control={<Checkbox />}
          label="Location Instructor select"
          labelPlacement="end"
        />
        {/* <FormControlLabel
          style={{ color: 'black', marginLeft: '10%', width:'100%'}}
          value="Online"
          onChange={(e)=>Place.bind(getValue(e))}
          control={<Checkbox />}
          label="Online"
          labelPlacement="end"
        /> */}
      </FormGroup>
    </FormControl>
            </div>
            <div id="button" class="row">
              <Button onClick={handleClickOpen3}>Prev</Button>
              <Button onClick={results}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
