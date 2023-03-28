import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/completedStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function SectionCompletedExamples() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2>Let's Begin Your Journey with US!!!</h2>
            <h4>
            Sometimes engineering teams just need an extra boost. 
            </h4>
            <a onClick="scroll()"><Button color="danger"><Link to={"Register-page"} className={classes.dropdownLink} style={{color:"white"}}>Join US Today!</Link></Button></a>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
