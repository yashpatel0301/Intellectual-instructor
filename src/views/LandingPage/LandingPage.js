import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import SectionScroll from "views/Components/Sections/SectionScroll.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="II"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
              One-to-one learning works. We’ve believed that from day one. But we also knew it would work better if it were accessible, affordable, and more convenient for everyone. So that’s what we’ve built—an easier way to connect people who need to know with the experts that can teach them. And we’ve changed the way people think about education in the process.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="#id1"
                rel="noopener noreferrer"
              >
                Explore how
              </Button>
            </GridItem >
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} id="id1">
        <div className={classes.container} >
          <ProductSection />
          <TeamSection />
          <WorkSection />
          <SectionScroll />
        </div>
      </div>
      <Footer />
    </div>
  );
}
