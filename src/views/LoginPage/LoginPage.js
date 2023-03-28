import React, { useCallback, useContext,useEffect,useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Components/auth";
import {firebase, provider, fbprovider, db} from "../Components/firebase";
import { withRouter, Redirect } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new2.gif";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {

  const history = useHistory()
  const [setuser, setuserDetails] = useState([]);

  // useEffect(() => {
  //   // fetchData();
  //   const StudentUsers=[]
  //   db.collection("Students").get().then(
  //     (snapshot) => {
  //       console.log("All");
  //       snapshot.docs.forEach((userSnapshot) => {
  //         let currentID = userSnapshot.id
  //         let appObj = {...userSnapshot.data(), ['id']: currentID}
  //         StudentUsers.push(appObj)
  //         StudentUsers.push(userSnapshot.data())
  //         console.log(userSnapshot.data());
  //       });
  //       setuserDetails(StudentUsers)
  //   });
  // }, [])
  
  useEffect(() => {
    // fetchData();
    
  }, [])


  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, pass } = event.target.elements;
      try {
        await firebase.auth().signInWithEmailAndPassword(email.value, pass.value);
        db.collection("Instructors").get().then(
          (snapshot) => {
            snapshot.docs.forEach((userSnapshot) => {
              if(userSnapshot.data().email==email.value)
              {
                history.push("/instructordashboard");
              }
            });
        }).catch((e)=> alert("Credentials wrong"));
        db.collection("Students").get().then(
          (snapshot) => {
            snapshot.docs.forEach((userSnapshot) => {
              if(userSnapshot.data().email==email.value)
              {
                history.push("/dashboard");
              }
            });
        }).catch((e)=> alert("Credentials wrong"));

        // console.log(db.collection("Instructors"));
        // if((await db.collection("Instructors").doc("Instructor").get("email")).exists ==  true){
        //   history.push('/instructorfilters');
        //   console.log("2");
        // }
        // else if(db.collection("Students").isEqual().valueOf(email)){
        //   history.push("/dashboard");
        //   console.log("3");
        // }
        // await firebase.auth().currentUser.getIdTokenResult()
        // .then((idTokenResult)=>{
        //   if(idTokenResult.claims.instructor){
        //     history.push('/instructorfilters')
        //   }
        //   else{
        //     history.push("/dashboard");
        //   }
        // })
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);

  const signIn = useCallback(async event=> {
    event.preventDefault();

    try{
      await firebase.auth().signInWithPopup(provider);
      db.collection("Instructors").get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            if(userSnapshot.data().email==currentUser.email)
            {
              history.push("/instructordashboard");
            }
          });
      }).catch((e)=> alert("Credentials wrong"));
      db.collection("Students").get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            if(userSnapshot.data().email==currentUser.email)
            {
              history.push("/dashboard");
            }
          });
      }).catch((e)=> alert("Credentials wrong"));
    }catch(error){
      alert(error);
    }
  })

  const fbsignIn = useCallback(async event=> {
    event.preventDefault();

    try{
      await firebase.auth().signInWithPopup(fbprovider);
      db.collection("Instructors").get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            if(userSnapshot.data().email==currentUser.email)
            {
              history.push("/instructordashboard");
            }
          });
      }).catch((e)=> alert("Credentials wrong"));
      db.collection("Students").get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            if(userSnapshot.data().email==currentUser.email)
            {
              history.push("/dashboard");
            }
          });
      }).catch((e)=> alert("Credentials wrong"));
    }catch(error){
      alert(error);
    }
  })

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  // if (currentUser) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="II"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleLogin}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      {/* <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button> */}
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={fbsignIn}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={signIn}
                      >
                        <i className={"fab fa-google"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or</p>
                  <CardBody>
                    {/* <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    /> */}
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Login
                    </Button>
                    <Button simple color="primary" size="lg">
                      <Link to="/forgot-password">
                      Forget Password?
                      </Link>
                    </Button>
                  </CardFooter>
                  <hr/>
                  <CardFooter className={classes.cardFooter}>
                    Haven't Registered Yet?
                    <Button simple color="primary" size="lg">
                    <Link to={"Register-page"} className={classes.dropdownLink} >Register</Link>
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
                               
}
