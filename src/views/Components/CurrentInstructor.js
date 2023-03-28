import React, { useState, useEffect, useRef } from 'react';
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import { Avatar } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useParams } from "react-router";
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedIn from "@material-ui/icons/LinkedIn"
import { Upload } from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(styles);
export default function CurrentInstructor(props) {
    let id = useParams();
    const { ...rest } = props;
    const history = useHistory();
    const classes = useStyles();
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = useState([]);
    const [request, UploadRequest] = useState(0);
    const [setuser2, setuserDetails2] = useState("");
    const [content,setContent] = useState("");
    const [additional,setAdditional] = useState("");
    // const [name, setName] = useState("");
    const [open, setOpen] = React.useState(false);

    async function pathReference(){
        db.collection("Instructors").where("email","==",id.id).get().then(
            (snapshot) => {
                snapshot.docs.forEach((userSnapshot) => {
                  var currentID = userSnapshot.id
                  var userData = userSnapshot.data()
                  storage.ref(userData.name+"/CV/").listAll().then(
                      (path)=>{
                        path = path._delegate.items[0]._location.path_;
                        storage.ref(path).getDownloadURL().then(
                        (url)=>{
                          window.open(url,'_blank');
                        }
                      );
                      }
                  );
                   
                })
                }
          )
    }
    const fetchUserDetails = () => {
        let Online;
        let Level;
        let Time;
        let Expertise;
        let Place=[];
        const StudentUsers2=[]
        db.collection("Students").where("email","==",currentUser.email).get().then(
          (snapshot) => {
            snapshot.docs.forEach((userSnapshot) => {
              var currentID = userSnapshot.id
              var appObj = {...userSnapshot.data(), ['id']: currentID}
              Online = userSnapshot.data().Filters.online;
              Level = userSnapshot.data().Filters.level;
              Time = userSnapshot.data().Filters.time;
              Place = userSnapshot.data().Filters.place;
              Expertise = userSnapshot.data().Expertise;
              StudentUsers2.push(userSnapshot.data())
            });
            setuserDetails2(StudentUsers2);
  
            const StudentUsers=[]
            db.collection("Instructors").where("expertise","==",Expertise)
            .where("online","==",Online)
            .where("studenttypes","array-contains",Level)
            .where("place","in",Place)
            .get().then(
              (snapshot) => {
                snapshot.docs.forEach((userSnapshot) => {
                  var currentID = userSnapshot.id
                  StudentUsers.push(userSnapshot.data())
                  console.log(userSnapshot.data())
                  var userData = userSnapshot.data()
                });
                setuserDetails(StudentUsers)
            });
          });
    }
    useEffect(() => {
      fetchUserDetails();
    }, [])
    
const handleOpen = () => {
  setOpen(true);
}
const handleClose = () => {
  setOpen(false);
};
const handleSubmit = (e) => {
  const obj = {
    emailid: currentUser.email,
    name: currentUser.displayName,
    message: content,
    additional: additional,
  }

  e.preventDefault();
  db.collection("Instructors").where("email","==",id.id).get().
  then(snapshot => {
    snapshot.forEach(function(doc){
      db.collection("Instructors").doc(doc.id).
      update({
        requests: db1.firestore.FieldValue.arrayUnion(obj)
        })
      })
    }).then(()=>{
      db.collection("Students").where("email","==",currentUser.email).get().
      then(snapshot=>{
        snapshot.forEach(function(doc){
          db.collection("Students").doc(doc.id).
          update({
            requests_pending: db1.firestore.FieldValue.arrayUnion(id.id)
            }).then(()=>{
              alert("Request Sent, Now Hire button will be disabled")
              history.push("/searchresults")})
        })
      })
    }
    )
  }
        return (
        <div>
          {
            setuser && setuser.map(user=>{
                if(user.email==id.id){
              return(
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
            <div className={classes.sections}>
            <div className={classes.container}>
              <h3 style={{marginLeft: "34%", fontWeight:"bold"}}>{user.name}'s Profile:</h3>
              <Card className={classes.root} style={{maxWidth:345,marginLeft: "34%"}}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        style={{height:240}}
                        image= {!user.url? "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp" : user.url} 
                        title="Instructor's Profile Photo"
                      />
                    </CardActionArea>
                </Card>
             <h4 style={{fontWeight:"bold"}}>{user.name}'s Details</h4>
             <Card className={classes.root} variant="outlined" style={{ borderColor:"black"}}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's Country, region and city:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.country}, {user.region}, {user.city}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Phone number: <h4 style={{ display:'inline'}}>{user.phone}</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Online Tutoring Interest: <h4 style={{ display:'inline'}}> {user.online} </h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>is she/he an Instructor before? : <h4 style={{ display:'inline'}}>{ user.isinstructorBefore }</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's fees are: <h4 style={{ display:'inline'}}>{ user.fee }Rs./HOUR</h4></h4>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's Expertises: <h4 style={{ display:'inline'}}>{ user.expertise }</h4></h4>
                    {/* <h4>which kind of students do you prefer?: {user.studenttypes[0]}</h4> */}
                    <h4 style={{ fontWeight:"bold"}}>which kind of students do he/she prefer?:</h4>
                    {(user.studenttypes.map((item, index) =>
                      <h4><li key={index}>{item}</li></h4>
                    ))}
                    <h4 style={{ fontWeight:"bold"}}>which place for tutoring do he/she prefer?: <h4 style={{ display:'inline'}}>{user.place}</h4></h4>
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
                </CardActions>  
             </Card>
             <h4 style={{fontWeight:"bold"}}>{user.name}'s Bio</h4>
             <Card className={classes.root} variant="outlined" style={{ borderColor:"black"}}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's Bio:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.bio}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's Expertise Details:</h4>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <h4>{user.expertisedetail}</h4>
                        {/* <h4>`{db.collection("Instructors").where("email","==",currentUser.email)}`</h4> */}
                    </GridItem>
                    <h4 style={{ fontWeight:"bold"}}>Instructor's social Accounts:  </h4>
                    <GitHubIcon fontSize='large' onClick={()=>{window.open(user.Social1,'_blank')}} style={{ cursor: "pointer"}}/> 
                    {user.Social2 == ""? <h4> Facebook haven't added yet!!! </h4> : <FacebookIcon onClick={()=>{window.open(user.Social2,'_blank')}} fontSize='large' style={{ cursor: "pointer"}}/> }
                    {user.Social3 == ""? <h4> Instagram haven't added yet!!! </h4> : <InstagramIcon onClick={()=>{window.open(user.Social3,'_blank')}} fontSize='large'  style={{ cursor: "pointer"}}/>}
                    <h4 style={{ fontWeight:"bold"}}>Instructor's LinkedIn account OR Resume/CV:</h4>
                    {user.linkedin == ""? <h4> Linkedin haven't added yet!!! </h4> : <LinkedIn onClick={()=>{window.open(user.linkedin,'_blank')}} fontSize='large' style={{ cursor: "pointer"}}/> }
                    <h4 style={{ fontWeight:"bold"}}>Check Instructor's CV:
                      <br/> 
                      { (!user.linkedin)?
                       <Button size="small" color="danger" onClick={pathReference}>Check it HERE</Button>:
                       <h4>Instructor haven't added CV because Instructor added Linkedin</h4>
                      }
                    </h4>
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Link to="/instructorfilters"><Button size="small" color="danger">Update Profile</Button></Link> */}
                </CardActions>  
             </Card>
             {setuser2 && setuser2.map(user2=>{
              return(<div>
             <Button size="small" color="danger" style={{ float: 'right'}} onClick={handleOpen} disabled={ user2.requests_pending == id.id ? true: false}>Hire</Button></div>)})}
             <Button size="small" color="danger" style={{ float: 'right'}} onClick={()=> { history.push("/videorefer/"+user.email)}}>View demo Lecture</Button>
            </div>
            </div>
            {setuser2 && setuser2.map(user2=>{
              return(<div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center'}}>Send a request to {user.name}</DialogTitle>
        <DialogContent>
                    <CustomInput
                        id="regular"
                        labelText="Subject"
                        // value={name}
                        inputProps={{
                        placeholder: "Subject",
                        defaultValue:`${user.expertise}`,
                        }}
                        formControlProps={{
                        fullWidth: true,
                        required: true,
                        // onChange: (e) => setName(e.target.value)
                        }}
                    />
                     <h5>Lession Type:<Input style={{ color: 'black', display: 'inline'}} defaultValue={`${user2.Filters.online} - ${user.fee} Rs/HOUR`} disabled inputProps={{ 'aria-label': 'description' }} /> </h5>
                     <h5>Student's Level:<Input style={{ color: 'black', display: 'inline'}} defaultValue={`${user2.Filters.level}`} disabled inputProps={{ 'aria-label': 'description' }} /> </h5>
                     <h5>Begin Lession:<Input style={{ color: 'black', display: 'inline'}} defaultValue={`${user2.Filters.time}`} disabled inputProps={{ 'aria-label': 'description' }} /> </h5>
              <CustomInput
                labelText={`Message to ${user.name} (Required)`}
                id="message"
                value={content}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  onChange:(e) => setContent(e.target.value),
                  rows: 5
                }}
              />
                            <CustomInput
                            labelText="Purpose of Learning"
                            id="name"
                            value={additional}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea,
                                // required: true
                            }}
                            inputProps={{
                              multiline: true,
                              onChange:(e) => setAdditional(e.target.value),
                              rows: 5
                            }}
                            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="danger" disabled={ content==='' || additional==='' ? true : false}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </div>)}) }
            </div>
              )
            }
            })
          }
          
        </div>
    )
}
