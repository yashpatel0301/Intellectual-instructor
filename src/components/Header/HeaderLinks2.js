/*eslint-disable*/
import React from "react";
import {firebase, db} from "../../views/Components/firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import SmsIcon from '@material-ui/icons/Sms';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../views/Components/auth';

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import "views/Components/index.css";

const useStyles = makeStyles(styles);

export default function HeaderLinks2(props) {
  const classes = useStyles();
  const {currentUser} = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setuser, setuserDetails] = React.useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const fetchUserDetails = () => {
  
    const StudentUsers=[]
    db.collection("Students").where("email","==",currentUser.email)
    .get().then(
      (snapshot) => {
        snapshot.docs.forEach((userSnapshot) => {
          var currentID = userSnapshot.id
          StudentUsers.push(userSnapshot.data().requests_accepted)
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
        {/* <CustomDropdown
          noLiPadding
          buttonText="Services"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Scroll className={classes.dropdownLink} activeClass="active" to="test1" spy={true} smooth={true} duration={0}>
              Find an Instructor
            </Scroll>,
             <Link to={"Register-page2"} className={classes.dropdownLink} >Become an Instructor</Link>
          ]}
        /> */}
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
            <a onClick="scroll()" className="scroll"><Link to={"/dashboard"} className={classes.dropdownLink}>Dashboard</Link></a>,
            // <a onClick="scroll()" className="scroll"><Link to={null} className={classes.dropdownLink}>Profile</Link></a>,
            <a onClick="scroll()" className="scroll"><Link to={"/accountandsettingsstudent"} className={classes.dropdownLink}>Account & Settings</Link></a>,
            <a onClick="scroll()" className="scroll"><Link to={"/chatroom"} className={classes.dropdownLink}>Next Sessions</Link></a>,
            <a onClick={() => firebase.auth().signOut()} className="scroll"><Link to={""} className={classes.dropdownLink}>Logout</Link></a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      {/* <Link to={"/chatroom"} className={classes.navLink} style={{padding: "0", margin: "0"}}> */}
        <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleClick}
        >Notifications <SmsIcon fontSize='large'/>
        </Button>
       
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
             { (setuser[0]) ? setuser[0] && setuser[0].map( user => {
            return(
            <Typography style={{ padding: '10px'}} className={classes.typography}>Request Accepted by {user.instructoremail},
            <br/>Please check Next sessions for more details.
            <hr/>
            </Typography>
             )}):
            <Typography style={{ padding: '10px'}} className={classes.typography}>No any response from instructor, check later</Typography>
            }
          </Popover>
      </ListItem>
    </List>
  );
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
