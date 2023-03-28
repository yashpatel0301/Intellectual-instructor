import React from "react";
import { Link, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Media from '../Media.js';
import image from "assets/img/bg7.jpg";
import profileImage from "assets/img/faces/avatar.jpg";
import '../index.css';

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionNavbars() {
  const classes = useStyles();
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
                        <Link to="Register-page"><Button color="danger">Search</Button></Link>
                        </Zoom>
                    </div>
                  </div>
                </div>
                </GridItem>
                </GridContainer>
                </div>
        </div>
      </div>
    </div>
  );
}
