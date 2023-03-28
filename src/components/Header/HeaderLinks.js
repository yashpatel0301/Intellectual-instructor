/*eslint-disable*/
import React from "react";
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
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import "views/Components/index.css";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
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
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      <Link to={"/login-page"} className={classes.navLink} style={{padding: "0", margin: "0"}}>
        <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >Login
        </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Register"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          // buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   As a Student
            // </Link>
            <a onClick="scroll()" className="scroll"><Link to={"Register-page"} className={classes.dropdownLink}>As a Student</Link></a>,
            // <a
            //   href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
            //   target="_blank"
            //   className={classes.dropdownLink}
            // >
            //   As an Instructor
            // </a>
            <a onClick="scroll()" className="scroll"><Link to={"Register-page2"} className={classes.dropdownLink} >As an Instructor</Link></a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
      {/* <Button
          // href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        ><Link to={"/AboutUs"} className={classes.navLink} style={{padding: "0", margin: "0"}}>About us</Link> */}
        {/* </Button> */}<Link to={"/AboutUs"} className={classes.navLink} >About us</Link>
      </ListItem>
      
    </List>
  );
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
