import React, { useState } from 'react';
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(styles);
export default function Accountandsettings(props) {
    const { ...rest } = props;
    const classes = useStyles();
    const history = useHistory();
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = useState([]);
    const [newemail, setEmail] = useState('');
    const [newname, setName] = useState('');
    const [newpass, setPass] = useState('');
    const [ProvidedPassword, setProvidedPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const onFileChange = async (e) => {

      const file = e.target.files[0];
      var storageRef = storage.ref(currentUser.displayName+"/"+"Photo"+"/"); 
      var thisRef = storageRef.child(file.name);
      await thisRef.put(file).then(()=>{
        console.log("uploaded a file!!!")
      }).catch((error)=>{
          alert(error.message);
      })
      const fileUrl = await thisRef.getDownloadURL();
      console.log(fileUrl);
      db.collection("Students").where("email","==",currentUser.email).get().
      then(snapshot => {
        snapshot.forEach(function(doc){
            try{      
      firebase.auth().currentUser.updateProfile({
        photoURL: fileUrl,
      }).then(()=>{
        history.push("/accountandsettingsstudent");
      });
       }
     catch(error){
      alert(error);
    }
        })
      })
     
    }
   
    const DeletePhoto = () => {
         firebase.auth().currentUser.updateProfile({
        photoURL: "",
      }).then(()=>{
        history.push("/accountandsettingsstudent");
      })     

    }

    // const user = firebase.auth().currentUser;
    
    // const user = db.collection("Instructors").get().then();

    // const reauthenticate = (ProvidedPassword) => {
    //     var user = firebase.auth().currentUser;
    //     var cred = firebase.auth.EmailAuthProvider.credential(
    //         user.email, ProvidedPassword);
    //     return user.reauthenticateWithCredential(cred);
    //   }
    
    const StudentUsers=[]
      db.collection("Students").get().then(
        (snapshot) => {
        //   console.log("All");
          snapshot.docs.forEach((userSnapshot) => {
            let currentID = userSnapshot.id
            let appObj = {...userSnapshot.data(), ['id']: currentID}
            StudentUsers.push(appObj)
            StudentUsers.push(userSnapshot.data())
            // console.log(userSnapshot.data());
            let name = userSnapshot.data().name;
            // console.log(name);
          });
          setuserDetails(StudentUsers)
      });
      const changeEmail = () => {
          if(ProvidedPassword !=''){
            setOpen(false);
            firebase.auth().signInWithEmailAndPassword(currentUser.email, ProvidedPassword).then(()=>{
                db.collection("Students").where("email","==",currentUser.email).get().
                then(snapshot => {
                  snapshot.forEach(function(doc){
                    db.collection("Students").doc(doc.id).
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
            db.collection("Students").where("pass","==",ProvidedPassword).get().
            then(snapshot => {
              snapshot.forEach(function(doc){
                db.collection("Students").doc(doc.id).
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
        db.collection("Students").where("name","==",currentUser.displayName).get().
        then(snapshot => {
          snapshot.forEach(function(doc){
            db.collection("Students").doc(doc.id).
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

        const DeleteUser = () => {
          let user = currentUser;
          console.log(user.delete())
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
            <h3 style={{marginLeft: "34%", fontWeight:"bold"}}>Student's Profile:</h3>
              <Card className={classes.root} style={{maxWidth:345,marginLeft: "34%"}}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        style={{height:240}}
                        image= {!currentUser.photoURL? "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" : currentUser.photoURL} 
                        title="Your Profile Photo"
                      />
                    </CardActionArea>
                    <CardActions style={{paddingLeft: "14%"}}>
                      <input
                      accept="image/*"
                      name="files[]"
                      className={classes.input}
                      id="contained-button-file"
                      onChange={onFileChange}
                      // multiple
                      type="file"
                      style={{display:"none"}}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" size="small" color="danger" component="span" style={{marginLeft: "28%"}}>
                        Update Photo
                      </Button>
                    </label>
                    </CardActions>
                    <Button variant="contained" size="small" color="danger" component="span" style={{marginLeft: "28%"}} onClick={DeletePhoto}>
                        Delete Photo
                      </Button>
                </Card>
            <div className={classes.sections}>
            <div className={classes.container}>
                <h3 style={{ fontWeight:"bold"}}>Account And Settings</h3>
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
                <Button size="small" color="danger" onClick={DeleteUser}>Delete Account</Button>
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
}
