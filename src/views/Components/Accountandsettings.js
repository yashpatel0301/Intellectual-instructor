import React, { useState, useEffect } from 'react';
import HeaderLinks3 from "../../components/Header/HeaderLinks3";
import Header from "components/Header/Header.js";
import {db, storage, firebase} from "../Components/firebase";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(styles);
export default function Accountandsettings(props) {
    const { ...rest } = props;
    const classes = useStyles();
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = useState([]);
    const [newemail, setEmail] = useState('');
    const [newname, setName] = useState('');
    const [newpass, setPass] = useState('');
    const [ProvidedPassword, setProvidedPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    // then((url)=>{
    //   var cv = document.getElementById('mycv');
    //   cv.setAttribute('src', url);
    // }).catch((error) => {
    //   // Handle any errors
    // });
    // return path;
    
    
    // var x = ref.getDownloadURL();
    // const user = firebase.auth().currentUser;
    
    // const user = db.collection("Instructors").get().then();

    // const reauthenticate = (ProvidedPassword) => {
    //     var user = firebase.auth().currentUser;
    //     var cred = firebase.auth.EmailAuthProvider.credential(
    //         user.email, ProvidedPassword);
    //     return user.reauthenticateWithCredential(cred);
    //   }
    const fetchUserDetails = () => {
        const StudentUsers=[]
        db.collection("Instructors").where("email","==",currentUser.email).get().then(
          (snapshot) => {
          //   console.log("All");
            snapshot.docs.forEach((userSnapshot) => {
              var currentID = userSnapshot.id
              console.log(currentID)
              // var appObj = {...userSnapshot.data(), ['id']: currentID}
              // StudentUsers.push(appObj)
              StudentUsers.push(userSnapshot.data())
              var userData = userSnapshot.data()
              // console.log(userSnapshot.data().bio);
              // let name = userSnapshot.data().name;
              // console.log(name);
            });
            setuserDetails(StudentUsers)
        });
    }
    useEffect(() => {
      fetchUserDetails();
    }, [])
      // console.log(StudentUsers);
      const changeEmail = () => {
          if(ProvidedPassword !=''){
            setOpen(false);
            firebase.auth().signInWithEmailAndPassword(currentUser.email, ProvidedPassword).then(()=>{
                db.collection("Instructors").where("email","==",currentUser.email).get().
                then(snapshot => {
                  snapshot.forEach(function(doc){
                    db.collection("Instructors").doc(doc.id).
                    update({
                      email: newemail,
                    })
                  })
                }
                ).catch((error) => {
                    alert(error.message);
                  });
                currentUser.updateEmail(newemail).then(() => {
                    alert("Email updated!");
                  }).catch((error) => { alert("Email not Valid!!!Not updated,Try again"); });
            });
          }
        else{
            setOpen(false);
        }
      }
      const changePass = () => {
        if(ProvidedPassword !=''){
          setOpen2(false);
          firebase.auth().signInWithEmailAndPassword(currentUser.email, ProvidedPassword).then(()=>{
            db.collection("Instructors").where("pass","==",ProvidedPassword).get().
            then(snapshot => {
              snapshot.forEach(function(doc){
                db.collection("Instructors").doc(doc.id).
                update({
                  pass: newpass,
                })
              })
            }
            ).catch((error) => {
                alert(error.message);
              });
              currentUser.updatePassword(newpass).then(() => {
                  alert("Password updated!");
                }).catch((error) => { alert(error+ "," + "not Updated!!!Try again"); });
          });
        }
      else{
          setOpen2(false);
      }
    }
      const changePassword = () => {
        setOpen(true);
      }
      const handleOpen = () => {
        setOpen(true);
      }
      const handleClose = () => {
        setOpen(false);
      };
      const handleOpen2 = () => {
        setOpen2(true);
      }
      const handleClose2 = () => {
        setOpen2(false);
      };
      const changeName = () => {
        db.collection("Instructors").where("name","==",currentUser.displayName).get().
        then(snapshot => {
          snapshot.forEach(function(doc){
            db.collection("Instructors").doc(doc.id).
            update({
              name: newname,
            })
          })
        }
        ).catch((error) => {
            alert(error.message);
          });
        console.log(newname)
        currentUser.updateProfile({displayName:newname}).then(() => {
          alert("Name updated!");
        }).catch((error) => { alert(error); });
        }
        return (
        <div>
          {
            setuser && setuser.map(user=>{
              return(
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
                <h3 style={{ fontWeight:"bold"}}>Account And Settings</h3>
                <h4 style={{ fontWeight:"bold"}}>Personal Details</h4>
                <Card className={classes.root} variant="outlined" style={{ borderColor:"black"}}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <h4 style={{ fontWeight:"bold"}}>Your Name:</h4>
                    <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                        id="regular"
                        value={newname}
                        inputProps={{
                        placeholder: "name",
                        defaultValue:`${currentUser.displayName}`,
                        }}
                        formControlProps={{
                        fullWidth: true,
                        onChange: (e) => setName(e.target.value)
                        }}
                    />
                    <Button size="small" color="danger" onClick={changeName}>Update Name</Button>
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Your Email:</h4>
                    <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                        id="regular"
                        value={newemail}
                        inputProps={{
                        placeholder: "email",
                        defaultValue:`${currentUser.email}`,
                        }}
                        formControlProps={{
                        fullWidth: true,
                        onChange: (e) => setEmail(e.target.value)
                        }}
                    />
                    <Button size="small" color="danger" onClick={handleOpen}>Update Email</Button>
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Update your password:</h4>
                    <GridItem xs={12} sm={4} md={4} lg={3}>
                    <CustomInput
                        id="regular"
                        value={newpass}
                        inputProps={{
                        placeholder: "Type Password",
                        type:"password"
                        }}
                        formControlProps={{
                        fullWidth: true,
                        onChange: (e) => setPass(e.target.value)
                        }}
                    />
                    <Button size="small" color="danger" onClick={handleOpen2}>Update Password</Button>
                    </GridItem>
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
                </CardActions>  
             </Card>
            </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm Password</DialogTitle>
        <DialogContent>Please Type Your Current Password For Confirmation</DialogContent>
        <DialogContent>
          <CustomInput
             id="currentPassword"
            value={ProvidedPassword}
            inputProps={{
                placeholder: "Type Password",
                type:"password"
            }}
            formControlProps={{
                fullWidth: true,
                onChange: (e) => setProvidedPassword(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={changeEmail} color="danger">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm Password</DialogTitle>
        <DialogContent>Please Type Your Current Password For Confirmation</DialogContent>
        <DialogContent>
          <CustomInput
             id="currentPassword"
            value={ProvidedPassword}
            inputProps={{
                placeholder: "Type Password",
                type:"password"
            }}
            formControlProps={{
                fullWidth: true,
                onChange: (e) => setProvidedPassword(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="danger">
            Cancel
          </Button>
          <Button onClick={changePass} color="danger">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
            </div>
              )
            })
          }
        </div>
    )
}
