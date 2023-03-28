import React, { useCallback, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Components/auth";
import {firebase} from "../Components/firebase";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/new2.gif";

const useStyles = makeStyles(styles);

export default function ForgotPassword(props) {

  const myForm = useRef(null)
     
  function resetpassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
}
  
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, pass } = event.target.elements;
      try {
        await resetpassword(email.value);
        alert("check your inbox for further instructions");
      } catch (error) {
        alert("failed to reset, Create an Account first if it's not created.");
      }
      myForm.current.reset();
    },
  );

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Link to="/">
      <Header
        absolute
        color="transparent"
        brand="II"
        rightLinks={<HeaderLinks />}
        {...rest}
      /></Link>
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
                <form className={classes.form} onSubmit={handleLogin} ref={myForm}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Forgot Password???</h4>
                  </CardHeader>
                  <p className={classes.divider}>You can Reset your Password from here!!!</p>
                  <CardBody>
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit" onSubmit={resetpassword}>
                      Reset Password
                    </Button>
                    <Button simple color="primary" size="lg">
                      <Link to="/login-page">
                      Login
                      </Link>
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
