/*eslint-disable*/
import React from "react";
import {firebase, db, db1} from "../../views/Components/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import HeaderLinks2 from "components/Header/HeaderLinks2.js";
import Slide from '@material-ui/core/Slide';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../views/Components/auth';
import './HeaderLinks.css'

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import CloseIcon from '@material-ui/icons/Close';
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import "views/Components/index.css";
import SmsIcon from '@material-ui/icons/Sms';
import {Table} from 'react-bootstrap';

const useStyles = makeStyles(styles);
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.text.secondary,
  },
}))(MuiDialogContent);

export default function HeaderLinks3(props) {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [setuser, setuserDetails] = React.useState("");
  const {currentUser} = useAuth();
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const fetchUserDetails = () => {
  
    const StudentUsers=[]
    db.collection("Instructors").where("email","==",currentUser.email)
    .get().then(
      (snapshot) => {
        snapshot.docs.forEach((userSnapshot) => {
          var currentID = userSnapshot.id
          StudentUsers.push(userSnapshot.data().meetstudents)
          console.log(userSnapshot.data())
          var userData = userSnapshot.data()
        });
        setuserDetails(StudentUsers)
    });
}

React.useEffect(() => {
fetchUserDetails();
}, [])

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Menu"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          // buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   As a Student
            // </Link>
            <a onClick="scroll()" className="scroll"><Link to={"/instructordashboard"} className={classes.dropdownLink}>Dashboard</Link></a>,
            // <a onClick="scroll()" className="scroll"><Link to={null} className={classes.dropdownLink}>Profile</Link></a>,
            <a onClick="scroll()" className="scroll"><Link to={"/accountandsettings"} className={classes.dropdownLink}>Account & Settings</Link></a>,
            // <a onClick="scroll()" className="scroll"><Link to={null} className={classes.dropdownLink}>Accepted Requests</Link></a>,
            <a onClick={() => firebase.auth().signOut()} className="scroll"><Link to={""} className={classes.dropdownLink}>Logout</Link></a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      {/* <Link to={"/"} className={classes.navLink} style={{padding: "0", margin: "0"}}> */}
        <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          className={classes.navLink}
          onClick={handleClickOpen1}
        >Accepted Requests
        </Button>
        {/* </Link> / */}
      </ListItem>
      <Dialog fullScreen open={open1}>
      <AppBar className={classes.appBar} style={{backgroundColor:"white",position:"relative"}}>
          <Toolbar>
            <IconButton edge="start" color="black" onClick={handleClose1} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
          <DialogContent>
          <h2>Student Requests Data</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email Id</th>
                <th>Meeting Url</th>
                <th>Time</th>
              </tr>
            </thead>
           {(setuser[0]) ? setuser[0] && setuser[0].map(user=>{
             return(
              <tr>
                <td>{user.name}</td>
                <td>{user.studentemail}</td>
                <td><Button color="danger" onClick={ ()=>{window.open(user.url,'_blank')}}>{user.url}</Button></td>
                <td>{user.time}</td> 
                {/* overline={new Date(user.createdAt.seconds * 1000).toLocaleDateString("en-US")} */}
              </tr>
             )
           }
           ):
           <tr>
                <td>NO Request Accepted yet</td>
                <td>NO Request Accepted yet</td>
                <td>NO Request Accepted yet</td>
                <td>NO Request Accepted yet</td> 
                {/* overline={new Date(user.createdAt.seconds * 1000).toLocaleDateString("en-US")} */}
              </tr>
           }   
          </table>
        </DialogContent>
      </Dialog>
    </List>
  );
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
