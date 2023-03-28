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
import { Avatar } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Input } from '@material-ui/core';
const useStyles = makeStyles(styles);
export default function Profile(props) {
    const { ...rest } = props;
    const history = useHistory();
    const classes = useStyles();
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = useState([]);
    const [photourl, UploadPhoto] = useState("");

    async function pathReference(){
      var lis = await storage.ref(currentUser.displayName+"/CV/").listAll();
      var path = lis._delegate.items[0]._location.path_;
      storage.ref(path).getDownloadURL().then(
        (url)=>{
          window.open(url,'_blank');
        }
      );
    }

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
      db.collection("Instructors").where("email","==",currentUser.email).get().
      then(snapshot => {
        snapshot.forEach(function(doc){
          db.collection("Instructors").doc(doc.id).update({
            url: fileUrl,
          })
            try{      
      firebase.auth().currentUser.updateProfile({
        photoURL: fileUrl,
      }).then(()=>{
        history.push("/profile");
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
        history.push("/profile");
      })     

    }
  //     console.log(storage.ref(currentUser.displayName+"/Photo/"));
  //     if(false){
  //       var lis = await storage.ref(currentUser.displayName+"/Photo/").listAll();
  //       var path = lis._delegate.items[0]._location.path_;
  //     storage.ref(path).delete().then(()=>{
  //       var storageRef = storage.ref(currentUser.displayName+"/Photo/"); 
  //       var file = document.getElementById("contained-button-file").files[0];
  //       var thisRef = storageRef.child(file.name);
  //       var ref = storageRef.child(file.name).getDownloadURL();
  //       console.log(ref);
  //       thisRef.put(file).then(
  //         function(snapshot){
  //           console.log('Uploaded a blob or file!');
  //           const fileurl = thisRef.getDownloadURL
  //           // history.push("/instructordashboard");     
  //         }
  //       ).catch(
  //         (error) => {
  //           alert(error.message);
  //         }
  //       )
  //     }).catch((error)=>{
  //       console.log(error)
  //   });
  // }
  //   else{
  //     var storageRef = storage.ref(currentUser.displayName+"/Photo/"); 
  //       var file = document.getElementById("contained-button-file").files[0];
  //       var thisRef = storageRef.child(file.name);
  //       var ref = storageRef.child(file.name).getDownloadURL();
  //       console.log(ref);
  //       thisRef.put(file).then(
  //         function(snapshot){
  //           console.log('Uploaded a blob or file!');
  //           // const fileurl = thisRef.getDownloadURL
  //           // history.push("/instructordashboard");     
  //         }
  //       ).catch(
  //         (error) => {
  //           alert(error.message);
  //         }
  //       )
  //   }
  // }
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
              <h3 style={{marginLeft: "34%", fontWeight:"bold"}}>Instructor's Profile:</h3>
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
             <h4 style={{fontWeight:"bold"}}>Your Instructor Details</h4>
             <Card className={classes.root} variant="outlined" style={{ borderColor:"black"}}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <h4 style={{ fontWeight:"bold"}}>Your Country, region and city:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.country}, {user.region}, {user.city}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Phone number: <h4 style={{ display:'inline'}}>{user.phone}</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Online Tutoring Intrest: <h4 style={{ display:'inline'}}> {user.online} </h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Are you an Instructor before? : <h4 style={{ display:'inline'}}>{ user.isinstructorBefore }</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Your fees are: <h4 style={{ display:'inline'}}>{ user.fee }$</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Your Expertises: <h4 style={{ display:'inline'}}>{user.expertise}</h4></h4>
                    {/* <h4>which kind of students do you prefer?: {user.studenttypes[0]}</h4> */}
                    <h4 style={{ fontWeight:"bold"}}>which kind of students do you prefer?:</h4>
                    {(user.studenttypes.map((item, index) =>
                      <h4><li key={index}>{item}</li></h4>
                    ))}
                    <h4 style={{ fontWeight:"bold"}}>which place for tutoring do you prefer?:{user.place}</h4>
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
                </CardActions>  
             </Card>
             <h4 style={{fontWeight:"bold"}}>Your Instructor Bio</h4>
             <Card className={classes.root} variant="outlined" style={{ borderColor:"black"}}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <h4 style={{ fontWeight:"bold"}}>Your Bio:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.bio}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Your Expertise Details:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.expertisedetail}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Your social Accounts:  </h4>
                    <h4 style={{ fontWeight:"bold"}}>Account1: <h4> { user.Social1} </h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Account2: { (user.Social2 === "")? <h4> You haven't added yet!!! </h4> : <h4> {user.Social2} </h4> }</h4>
                    <h4 style={{ fontWeight:"bold"}}>Account3: { (user.Social3 === "")? <h4> You haven't added yet!!! </h4> : <h4> {user.Social3} </h4> }</h4>
                    <h4 style={{ fontWeight:"bold"}}>Your LinkedIn account OR Resume/CV:</h4>
                    <h4 style={{ fontWeight:"bold"}}>LinkedinAccount: { (user.linkedin === "")? <h4> You haven't added Linkedin because you added CV </h4> : <h4> {user.linkedin} </h4> }</h4>
                    <h4 style={{ fontWeight:"bold"}}>Check your CV:
                      <br/> 
                      { (!user.linkedin)?
                       <Button size="small" color="danger" onClick={pathReference}>Check it HERE</Button>:
                       <h4>You haven't added CV because you added Linkedin</h4>
                      }
                    </h4>
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
                </CardActions>  
             </Card>
             <br/>
             <Card className={classes.root} variant="outlined">
             <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Want to update your details
                </Typography>
                <Typography variant="body2" component="p">
                    Update it so we can show your profile to more students
                    <br />
                    {'"if completed then do not worry"'}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Update it from HERE👇
                </Typography>
             </CardContent>
             <CardActions>
                <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link>
            </CardActions>  
             </Card>
            </div>
            </div>
            </div>
              )
            })
          }
        </div>
    )
}
