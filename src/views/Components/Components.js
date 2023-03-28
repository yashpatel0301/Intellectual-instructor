import React,{useRef} from "react";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import imag1 from "../../assets/img/II.png";
// @material-ui/icons
// core components
import './index.css';
import Media from './Media.js';
import TypeWriter from 'typewriter-effect';
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";
import SearchBar from "./Sections/SearchBar.js";
import SectionScroll from "./Sections/SectionScroll.js";
import { Element } from 'react-scroll';

import styles from "assets/jss/material-kit-react/views/components.js";
import { Search } from "@material-ui/icons";
// import SearchField from "react-search-field


const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;

  
  return (
    <div>
      <Link to="/">
      <Header
        brand="II"
        src={imag1}
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      /></Link>
      <Parallax image={require("assets/img/new2.gif")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <Media name="title-typo" />
                <h3 className={classes.subtitle} style={{color: "white",}} id="subtitle">
                <TypeWriter
                options={{
                  strings: ['Learning That Works','Learning That Earns'],
                  autoStart: true,
                  loop: true,
                }}
                />
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.typo} style={{textAlign: "center", padding: "18px"}} >
              <h2 className="quote">"Change your way of learning with us"</h2>
              <Link to={"Register-page"}> <Button color="danger">Discover How!</Button></Link>
            </div>
            <SectionTabs />
        <Element name="test1"><SearchBar /></Element>
        <SectionCarousel />
        <SectionCompletedExamples /><hr />
        {/* <SectionBasics /> */}
        {/* <SectionNavbars /> */}
        {/* <SectionPills /> */}
        {/* <SectionNotifications /> */}
        {/* <SectionTypography /> */}
        {/* <SectionJavascript /> */}
        
        {/* <SectionLogin /> */}
        {/* <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem> */}
        {/* <SectionExamples />
        <SectionDownload /> */}
         <marquee><h3>You can write a blog from below link</h3></marquee>
      </div>
      <Footer />
     </div>
  )
}

function  scroll() {
  setTimeout(function () {
    window.scrollTo(0,0);
  },0);
}