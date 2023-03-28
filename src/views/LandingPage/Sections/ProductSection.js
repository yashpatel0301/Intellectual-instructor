import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import Zoom from 'react-reveal/Zoom';

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <Zoom left>
    <div className={classes.section}> 
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          {/* <h2 className={classes.title}>Let{"'"}s talk product</h2> */}
          <h2 className={classes.title}>Student</h2>
          <h5 className={classes.description}>
          Intellectual Instructor is the best way to learn anything. No matter what you’re interested in, we’ll help you find, book lessons and stay in touch with the perfect instructor. You can spend more time learning, and we’ll handle the rest.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="TELL US WHERE YOU’RE STRUGGLING"
              description="Connect with experts in more than 300 skills and subjects."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="CHOOSE THE TUTOR YOU WANT"
              description="Search online for a tutor with the right qualifications and hourly rates."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="BOOK YOUR LESSON"
              description="Tell your tutor when you’d like to meet, and only pay for the time you need."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Instructor</h2>
          <h5 className={classes.description}>
          Set your own rate and provide live 1:1 mentorship to help fellow developers on your own schedule.Set your hiring availability and express interest in projects.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Live 1:1 Mentorship"
              description="Provide live 1:1 help by answering questions and doing code reviews online via screen sharing, video, and text."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Get Paid, Stress-Free"
              description="Unlike consulting projects requiring significant time commitment, being a Codementor can be a low-stress, high-throughput effort."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Flexible Commitment"
              description="Work whenever it suits you. You decide your own schedule and customize your availability however you'd like."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
      </div>
    </div>  
    </Zoom>
  );
}
