import React, { useRef,useState,useCallback } from "react";
// import { Link, useHistory } from "react-router-dom";
import {firebase, provider, fbprovider, db} from '../Components/firebase';
import { Link, useHistory } from "react-router-dom";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new2.gif";
// import { Link } from "react-router-dom";
import { Phone } from "@material-ui/icons";
import { useAuth } from '../Components/auth';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const useStyles = makeStyles(styles);

export default function RegisterPage2(props) {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [phone, setPhone] = useState('');
  const {currentUser} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoader(true);
    setTimeout(function(){
      if(typeof(currentUser)=='object'){
        db.collection("Instructors")
          .add({
            name: name,
            email: email,
            phone: phone,
            pass: pass,
            cpass: cpass,
          })
          .then(() => {
                  // admin.initializeApp({
                  //   credential: admin.credential.cert('../Components/intellectual-instructor-firebase-adminsdk-wcp7n-61e5df7813.json'),
                  //   databaseURL: "https://intellectual-instructor-default-rtdb.firebaseio.com"
                  // });
                  // const user = admin.auth().getUserByEmail(email);
                  // console.log('hey,',user);
                  // if(user.customClaims && (user.customClaims).instructor === true){
                  //     return;
                  // }
                  // return admin.auth().setCustomUserClaims(user.uid, {
                  //     instructor: true,
                  // }).then(()=>{
                  //   admin.auth().createCustomToken(user.uid);
                  // });
          })
          .catch((error) => {
            // alert(error.message);
          });

        setName("");
        setEmail("");
        setPhone("");
        setPass("");
        setCpass("");
      }
    },2000);
  }

  const handleSignUp = useCallback(async event=> {
    event.preventDefault();
    const { email, pass, first } = event.target.elements;

    try{
      const x = await firebase.auth().createUserWithEmailAndPassword(email.value, pass.value);
      firebase.auth().currentUser.updateProfile({
        displayName: first.value
      }).then(()=>{
        history.push("/instructorfilters");
      });
       }
     catch(error){
      alert(error);
    }
  }, [history]);

  
  const signIn = useCallback(async event=> {
    event.preventDefault();

    try{
      await firebase.auth().signInWithPopup(provider);
      Googledata();
      history.push("/instructorfilters");
    }catch(error){
      alert(error);
    }
  })
  function Googledata(){
    db.collection("Instructors").add({
      email: currentUser.email,
    })
}

  const fbsignIn = useCallback(async event=> {
    event.preventDefault();

    try{
      await firebase.auth().signInWithPopup(fbprovider);
      FBdata();
      history.push("/instructorfilters");
    }catch(error){
      alert(error);
    }
  })
  function FBdata(){
    db.collection("Instructors").add({
      email: currentUser.email,
    })
}
  
  // const emailRef = useRef();
  // const nameRef = useRef();
  // const phoneRef = useRef();
  // const passRef = useRef();
  // const cpassRef = useRef();
  // const { signup } = useAuth();
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  // const history = useHistory()

  // async function handleSubmit(e){
  //   e.preventDefault();
  //   if (passRef.current.value !== cpassRef.current.value) {
  //     return setError("Passwords do not match")
  //   }
  //   try {
  //     setError("")
  //     setLoading(true)
  //     await signup(emailRef.current.value, passRef.current.value)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to create an account")
  //   }
  //   setLoading(false)
  // }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
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
                {/* { error }; */}
                <form className={classes.form} 
                onSubmit={handleSignUp}
                // onSubmit={handleSubmit}
                >
                  <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register as an Instructor <br/> Direct With</h4>
                    <div className={classes.socialLine}>
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
                    <CustomInput
                      labelText="Name..."
                      id="first"
                      type='text'
                      value={name}
                      // onChange={ e => setName(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => setName(e.target.value)
                      }}
                      inputProps={{
                        type: "text",
                        // ref: {nameRef},
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      type="email"
                      value={email}
                      // onChange={ e => setEmail(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => setEmail(e.target.value)
                      }}
                      inputProps={{
                        type: "email",
                        // ref: {emailRef},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                     <CustomInput
                      labelText="Phone Number"
                      id="Phone"
                      value={phone}
                      // onChange={ e => setPhone(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => setPhone(e.target.value)
                      }}
                      inputProps={{
                        type: "Mobile Number",
                        // ref: {phoneRef},
                        endAdornment: (
                          <InputAdornment position="end">
                            <Phone className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={pass}
                      // onChange={ e => setPass(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => setPass(e.target.value)
                      }}
                      inputProps={{
                        type: "password",
                        // ref: {passRef},
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
                     <CustomInput
                      labelText="Confirm Password"
                      id="cpass"
                      value={cpass}
                      // onChange={ e => setCpass(e.target.value)}
                      formControlProps={{
                        fullWidth: true,
                        onChange: (e) => setCpass(e.target.value)
                      }}
                      inputProps={{
                        type: "password",
                        // ref: {cpassRef},
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
                  <p className={classes.divider}>To enable Start button please fill out all fields correctly.</p>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg"  type="submit"
                    disabled={
                      name === "" || email === "" || pass === "" || phone ==="" || cpass==="" || (pass!=cpass) ? true : false
                  }
                    // onClick={onRegister}
                    // disabled={loading}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                    <Link to={"Register-page"} className={classes.dropdownLink} >Become a Student</Link>
                    </Button>
                  </CardFooter>
                  </form>
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
