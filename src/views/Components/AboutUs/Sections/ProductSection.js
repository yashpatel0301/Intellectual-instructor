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
          <h2 className={classes.title}>About Us</h2>
          <h5 className={classes.description}>
          One-to-one learning works. We’ve believed that from day one. But we also knew it would work better if it were accessible, affordable, and more convenient for everyone. So that’s what we’ve built—an easier way to connect people who need to know with the experts that can teach them. And we’ve changed the way people think about education in the process.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Clever experts"
              description="Compare qualifications, hourly rates, and reviews to find the right expert for you."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Contact Freely"
            description="Collaborate with your tutor in Wyzant's free, browser based online learning tool."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Pay after experience"
              description="Only pay for the time you need. No subscriptions, no upfront payments. Just affordable results."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
        
      </div>
    </div>  
    </Zoom>
  );
}
