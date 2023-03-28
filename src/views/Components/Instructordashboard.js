import React,{useEffect, useState} from 'react';
import HeaderLinks3 from "../../components/Header/HeaderLinks3";
import Header from "components/Header/Header.js";
import {db, storage, db1} from "../Components/firebase";
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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Footer2 from "components/Footer/Footer2.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(styles);
export default function Instructordashboard(props) {
    const classes = useStyles();
    const history = useHistory();
    const { ...rest } = props;
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = useState("");
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState("");
    const [selectedDate, setSelectedDate] = React.useState(
        new Date().toString()
      );
    
      const handleDateChange = (date) => {
        setSelectedDate(date);
      };
        
const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e,emailid,name,message,additional) => {
    const obj = {
      emailid: emailid,
      name: name,
      message: message,
      additional: additional,
    }
    const meetStudent = {
      studentemail: emailid,
      name: name,
      url: url,
      time: selectedDate
    }

    const meetInstructor = {
      instructoremail: currentUser.email,
      url: url,
      time: selectedDate
    }
  
    e.preventDefault();
    db.collection("Instructors").where("email","==",currentUser.email).get().
    then(snapshot => {
      snapshot.forEach(function(doc){
        db.collection("Instructors").doc(doc.id).
        update({
          requests: db1.firestore.FieldValue.arrayRemove(obj),
          meetstudents: db1.firestore.FieldValue.arrayUnion(meetStudent)
          })
          if(doc.data().requests.length==1){
            db.collection("Instructors").doc(doc.id).
            update({
                requests: db1.firestore.FieldValue.delete()
            })
        }
        })
      }).then(()=>{
        db.collection("Students").where("email","==",emailid).get().
        then(snapshot=>{
          snapshot.forEach(function(doc){
            db.collection("Students").doc(doc.id).
            update({
              requests_pending: db1.firestore.FieldValue.arrayRemove(currentUser.email),
              requests_accepted: db1.firestore.FieldValue.arrayUnion(meetInstructor),
              }).then(()=>{
                alert("Request Accepted!!!!!Please wait for student confirmation about session details.");
                handleClose();
                window.location.reload();
              })
              if(doc.data().requests_pending.length==1){
                db.collection("Students").doc(doc.id).
                update({
                    requests_pending: db1.firestore.FieldValue.delete()
                })
            }
          })
        })
      }
      )
    }

    const rejectRequest = (email,name,content,additional) =>{
        const obj={
            emailid: email,
            name: name,
            message: content,
            additional: additional,
        }
        db.collection("Instructors").where("email","==",currentUser.email).get().
    then(snapshot => {
      snapshot.forEach(function(doc){
        db.collection("Instructors").doc(doc.id).
        update({
          requests: db1.firestore.FieldValue.arrayRemove(obj)
          })
        if(doc.data().requests.length==1){
            db.collection("Instructors").doc(doc.id).
            update({
                requests: db1.firestore.FieldValue.delete()
            })
        }
        })
      }).then(()=>{
        db.collection("Students").where("email","==",email).get().
        then(snapshot=>{
          snapshot.forEach(function(doc){
            db.collection("Students").doc(doc.id).
            update({
              requests_pending: db1.firestore.FieldValue.arrayRemove(currentUser.email)
              }).then(()=>{
                  alert("Request Rejected!!!!")
                  window.location.reload();
            })
            if(doc.data().requests_pending.length==1){
              db.collection("Students").doc(doc.id).
              update({
                  requests_pending: db1.firestore.FieldValue.delete()
              })
          }
          })
        })
      }
      )
    }

     const onFileChange = async (e) => {

      const file = e.target.files[0];
      var storageRef = storage.ref(currentUser.displayName+"/"+"DEMO"+"/"); 
      var thisRef = storageRef.child(file.name);
      await thisRef.put(file).then(()=>{
        alert("uploaded a file!!!")
      }).catch((error)=>{
          alert(error.message);
      })
     }

    // const DemoLecture =  async () => {
    //     storage.ref(currentUser.displayName+"/"+"DEMO"+"/").listAll().then((list)=>{
    //     //    history.push("/instructordashboard")
    //         return list._delegate.items.length
    //     });
    // }

    const Changefile = () => {
        history.push("/videos");
    }

    const fetchUserDetails = () => {
            const StudentUsers=[]
            db.collection("Instructors").where("email","==",currentUser.email)
            .get().then(
              (snapshot) => {
                snapshot.docs.forEach((userSnapshot) => {
                  var currentID = userSnapshot.id
                  StudentUsers.push(userSnapshot.data().requests)
                  console.log(userSnapshot.data())
                  var userData = userSnapshot.data()
                });
                setuserDetails(StudentUsers)
            });
    }

    useEffect(() => {
        fetchUserDetails();
      }, [])

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
            <br/>
            <div className={classes.sections}>
            <div className={classes.container}>
                { (setuser[0]) ? setuser[0].map((user) => {
                    return(<div>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" className={classes.title} component="h2">
                                        Request From: {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Message from {user.name} : { user.message}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Purpose of learning: {user.additional}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="success" onClick={()=>handleOpen()}>
                                    Accept and Contact
                                    </Button>
                                    <Button size="small" color="danger" onClick={()=>{rejectRequest(user.emailid,user.name,user.message,user.additional)}}>
                                    Reject
                                    </Button>
                                </CardActions>
                            </Card>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center'}}>Send meeting url to {user.name} about lecture</DialogTitle>
                        <DialogContent>
                            <CustomInput
                            labelText="Meeting Url"
                            id="name"
                            value={url}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                                required: true
                            }}
                            inputProps={{
                              multiline: true,
                              onChange:(e) => setUrl(e.target.value),
                              rows: 2
                            }}
                            />
                              <TextField
                              style={{ cursor: 'pointer'}}
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    // defaultValue="2021-01-01T10:30"
                                    defaultValue={setSelectedDate}
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="danger">
                                    Cancel
                                </Button>
                                <Button onClick={(e) => {handleSubmit(e,user.emailid,user.name,user.message,user.additional)}} color="danger"
                                disabled={ url=='' ? true: false}
                                >
                                    Confirm
                                </Button>
                                </DialogActions>
                            </Dialog>
                    </div>)
                }):
                <Card className={classes.root} variant="outlined">
             <CardContent>
                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                Hello { currentUser.displayName }, There is no any request YET!!!!
                </Typography>
                <Typography variant="body2" component="p">
                    Wait And Watch!!!
                    <br />
                    {'"Have a Good Day"'}
                </Typography>
             </CardContent>
             <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
            </CardActions>  
            </Card>
                }
            <br/>
            <hr/>
            <Card className={classes.root} variant="outlined" style={{ borderColor: 'black'}}>
             <CardContent>
                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                Upload your first DEMO Lecture
                </Typography>
                <Typography variant="body2" component="p">
                    Upload it so we can show your profile to more students
                    <br />
                    {'"if completed then do not worry"'}
                </Typography>
             </CardContent>
             <CardActions>
               <input
                      accept="video/*"
                      name="files[]"
                      className={classes.input}
                      id="contained-button-file"
                      onChange={onFileChange}
                      // multiple
                      type="file"
                      style={{display:"none"}}
                    />
                <label htmlFor="contained-button-file" >
                     <Button variant="contained" size="small" color="danger" component="span">
                        Upload Demo Lecture
                      </Button>
                 </label>
                 <Button variant="contained" size="small" color="danger" component="span" onClick={Changefile}>
                        View Demo Lecture
                </Button>
            </CardActions>  
             </Card>
             <br/>
             <Card className={classes.root} variant="outlined">
             <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                View Your Details
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    In case if you haven't completed your profile,complete/update it from HERE👇
                </Typography>
             </CardContent>
             <CardActions>
                <Link to="/profile"><Button size="small" color="danger">Profile</Button></Link>
            </CardActions>  
             </Card>
             </div>
             <marquee><h3>You can write a blog from below link</h3></marquee>
             </div> 
             <Footer2 />
        </div>
    )
}
