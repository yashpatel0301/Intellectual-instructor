import React,{ useState, useEffect, useRef} from "react";
import { db } from "../../Components/firebase";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import zoom from 'react-reveal/Zoom';

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {

  const myForm = useRef(null)
    
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setMessage("");

    myForm.current.reset();
  };
  
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contact us</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form ref={myForm} onSubmit={handleSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  required
                  id="name"
                  value={name}
                  formControlProps={{
                    fullWidth: true,
                    onChange:(e) => setName(e.target.value),
                    required: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  // type="email"
                  value={email}
                  formControlProps={{
                    fullWidth: true,
                    onChange:(e) => setEmail(e.target.value),
                    required: true,
                    type: "email"
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                value={message}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                  required: true
                }}
                inputProps={{
                  multiline: true,
                  onChange:(e) => setMessage(e.target.value),
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" type="submit"
                style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
