import React,{useState} from 'react';
import {db, storage} from "../Components/firebase";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import HeaderLinks3 from "../../components/Header/HeaderLinks3";
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { useAuth } from '../Components/auth';
import { TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { Link, useHistory } from "react-router-dom";
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(styles);
export default function Instructorbio(props) {
    const classes = useStyles();
    const history = useHistory();
    const { ...rest } = props;
    const {currentUser} = useAuth();
    const [bio, Biodata]= useState("");
    const [expertisedetail, Details]= useState("");
    const [Social1, Social1Acc]= useState("");
    const [Social2, Social2Acc]= useState("");
    const [Social3, Social3Acc]= useState("");
    const [linkedin, LinkedIn] = useState("");
    const [fee, Fees] = useState("");
    const [files, CV] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(function(){
      if(typeof(currentUser)=='object'){
        db.collection("Instructors").where("email","==",currentUser.email).get().
        then(snapshot => {
          snapshot.forEach(function(doc){
            db.collection("Instructors").doc(doc.id).
            update({
              bio: bio,
              expertisedetail: expertisedetail,
              linkedin: linkedin,
              Social1: Social1,
              Social2: Social2,
              Social3: Social3,
              fee: fee,
              files : files,
            })
          })
        }
        ).catch((error) => {
            alert(error.message);
          });
        Biodata("");
        Details("");
        Social1Acc("");
        Social2Acc("");
        Social3Acc("");
        Fees("");
        // console.log(file);
        if(linkedin.match("(.+)(www.)?linkedin.com/(.+)$")){
          LinkedIn("");
          // history.push("/instructordashboard");
        }
        else if(file != ""){
          var storageRef = storage.ref(currentUser.displayName+"/"+"CV"+"/"); 
          var file = document.getElementById("files").files[0];
          var thisRef = storageRef.child(file.name);
          var ref = storageRef.child(file.name).getDownloadURL();
          console.log(ref);
          thisRef.put(file).then(
            function(snapshot){
              console.log('Uploaded a blob or file!');
              const fileurl = thisRef.getDownloadURL
              // history.push("/instructordashboard");     
            }
          ).catch(
            (error) => {
              alert(error.message);
            }
          )
        }
        else
        {
          alert("linkedin Link not matched OR cv not added!! Try again");
        }
        // var storageRef = storage.ref();
        // var file = document.getElementById("files").files[0];
        // // console.log(file);
        // var thisRef = storageRef.child(file.name);
        // thisRef.put(file).then(function(snapshot) {
        // console.log('Uploaded a blob or file!');
      // });
      history.push("/instructordashboard");
      }
    },2000);
  }
    return (
        <div>
        <Header
        brand="II"
        rightLinks={<HeaderLinks3 />}
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <div className={classes.sections}>
        <div className={classes.container}>
            <div className={classes.title}>
                <h4>Hello {currentUser.displayName}, Write your Bio here!!!(So that we suggest you to more & more Students)</h4>
            </div>
            <div id="inputs">
                <h4>1. Write about you</h4>
                <TextField
                 id="outlined-full-width"
                 label="Tell us about yourself(1000 characters allowed)"
                 style={{ margin: 10 }}
                 value={bio}
                 onChange= {(e) => Biodata(e.target.value.slice(0,1000))}
                 placeholder="Write about yourself"
                 helperText="mention your academics, proffesional certificates! etc..."
                 fullWidth
                 required="true"
                 multiline="true"
                 rows="5"
                 margin="normal"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 variant="outlined"
                ></TextField>
                <h4>2. Write about your expertise</h4>
                <TextField
                 id="outlined-full-width"
                 label="your Expertise(s)(1000 characters allowed)"
                 style={{ margin: 10 }}
                 value={expertisedetail}
                 onChange= {(e) => Details(e.target.value.slice(0,1000))}
                 placeholder="Write about your expertises"
                 helperText="mention your projects, proffesional certificates! etc..."
                 fullWidth
                 required="true"
                 multiline="true"
                 rows="5"
                 margin="normal"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 variant="outlined"
                ></TextField>
                <h4>3. Mention Your website Or Github Or Any social Profile's Link</h4>
                <TextField
                 id="outlined-full-width"
                 label="your social profile link 1 of Github or WEBSITE or Youtube videos(required)"
                 style={{ margin: 10 }}
                 placeholder="copy and paste link of your social handles!!! OR website!!!"
                 helperText="Feel free to mention your Github Account!!!"
                 fullWidth
                 value={Social1}
                 onChange= {(e) => Social1Acc(e.target.value)}
                 margin="normal"
                 required="true"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 variant="outlined"
                ></TextField>
                 <TextField
                 id="outlined-full-width"
                 label="your social profile link 2 of Facebook(optional)"
                 style={{ margin: 10 }}
                 placeholder="copy and paste link of your social handles!!! OR website!!!"
                 helperText="Feel free to mention your Facebook!!!"
                 fullWidth
                 value={Social2}
                 onChange= {(e) => Social2Acc(e.target.value)}
                 margin="normal"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 variant="outlined"
                ></TextField>
                 <TextField
                 id="outlined-full-width"
                 label="your social profile link 3 of Instagram(optional)"
                 style={{ margin: 10 }}
                 placeholder="copy and paste link of your social handles OR website"
                 helperText="Feel free to mention your Instagram!!!"
                 fullWidth
                 value={Social3}
                 onChange= {(e) => Social3Acc(e.target.value)}
                 margin="normal"
                 InputLabelProps={{
                   shrink: true,
                 }}
                 variant="outlined"
                ></TextField>
                <h4>4. Add your LinkedIn Account OR Resume</h4>
                <TextField
                 id="outlined-full-width"
                 label="your linkedin link 1(required)"
                 style={{ margin: 10 }}
                 placeholder="copy and paste link of your linkedin Account"
                 helperText="Feel free to mention your Linkedin Account OR resume"
                 fullWidth
                 margin="normal"
                 required="true"
                //  pattern="^https?://((www|\w\w)\.)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((\w|\d)+/?){3}))$"
                 onChange= {(e) => LinkedIn(e.target.value)}
                 InputLabelProps={{
                   shrink: true,
                   required: true
                 }}
                 variant="outlined"
                ></TextField> OR
                <Button
                variant="contained"
                component="label"
                style={{ margin: 10, color: "black"}}
                >
                <input
                    type="file"
                    // onchange="uploadFile()" 
                    id="files" 
                    name="files[]"
                    accept=".pdf,image/*"
                    value={files}
                    onChange={(e)=> CV(e.target.value)}
                />
                </Button>
                <h4>5. How much is your Instructor Fees?</h4>
                <FormControl fullWidth className={classes.margin} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">₹/HOUR</InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    value={fee}
                    onChange={(e)=> Fees(e.target.value)}
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                  />
                </FormControl>
            </div>
            <h4>to enable button please fill all the feilds correctly</h4>
            <Button
                color="danger"
                size="lg"
                rel="noopener noreferrer"
                disabled={
                  bio==="" || expertisedetail==="" ||  Social1==="" || (linkedin==="" && files==="")? true : false
                }
                onClick={handleSubmit}
              > Next 
             </Button>
        </div>
      </div> 
            
        </div>
    )
}
