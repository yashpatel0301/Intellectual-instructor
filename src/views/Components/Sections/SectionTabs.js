import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { BluetoothDisabled } from "@material-ui/icons";
import Media from '../Media.js';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
          <h2 style={{textAlign: "center"}}>UTILITIES</h2>
          <Fade left>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{pointerEvents: "none"}}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Online/Offline Lessons",
                    tabContent: (
                      <p className={classes.textCenter}>
                        Meet with the expert of your choice, anywhere in the country, online or in-person.
                        Save time and easily fit lessons into your schedule.
                        Collaborate with online features built for any skill or subject
                      </p>
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}><Media name="arrow" /></GridItem>
            </GridContainer>
            </Fade>
            <Fade right>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}><Media name="arrow2" /></GridItem>
              <GridItem xs={12} sm={12} md={6} style={{pointerEvents: "none"}}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "1-on-1 Live Lectures",
                    tabContent: (
                      <p className={classes.textCenter}>
                        Interactive features and video chat make collaborating so easy, it’ll feel like you’re in the same room.
                        Skip the planning and travel. Work any time, from anywhere, to easily fit lessons into your busy schedule.
                        Find the right person to help you reach your goals–no matter where you live, or what you want to learn.
                      </p>
                    )
                  }
                ]}
              />
            </GridItem>
            </GridContainer>
            </Fade>
            <Fade left>
          <GridContainer>
          <GridItem xs={12} sm={12} md={6} style={{pointerEvents: "none"}}>
              <CustomTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Learn here, Earn here",
                    tabContent: (
                      <p className={classes.textCenter}>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers.
                      </p>
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
            <a onClick="scroll()"><Link to="landing-page" style={{color:"black"}}>
              <Media name="arrow3" />
              </Link></a>
              </GridItem>
          </GridContainer>
        </Fade>
        </div>
      </div>
    </div>
  );
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}
  
