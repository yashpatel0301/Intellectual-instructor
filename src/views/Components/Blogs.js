import React,{ useState, useEffect, useRef} from "react";
import { db } from "../Components/firebase";
import { Link, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import HeaderLinks from "../../components/Header/HeaderLinks";
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
import HeaderLinks3 from "../../components/Header/HeaderLinks3";
import Header from "components/Header/Header.js";
import image1 from "../../assets/img/404.png"
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import zoom from 'react-reveal/Zoom';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../Components/auth';

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
// import ReactTextCollapse from 'react-text-collapse';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400 ,
      margin: 'auto',
      boxShadow: 'none',
      borderRadius: 0,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  }));


export default function Blogs(props) {

    const { ...rest } = props;
    const history = useHistory();
     const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const {currentUser} = useAuth();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  const [open, setOpen] = React.useState(false);

const myForm = useRef(null)
    
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [link, setLink] = useState("");
  const [setuser, setuserDetails] = useState([]);

  const [loader, setLoader] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("Blogs")
      .add({
        title: title,
        content: content,
        name: name,
        identity: identity,
        link: link,
        createdAt: new Date(), 
      })
      .then(() => {
        setLoader(false);
        alert("Your Blog has been submitted👍");
        window.location.href='/blogs';
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setTitle("");
    setContent("");
    setName("");
    setLink("");
    setIdentity("");

    myForm.current.reset();
    // history.push('/blogs')
  };

  const fetchUserDetails = () => {
    const StudentUsers=[]
    db.collection("Blogs").orderBy("createdAt","desc").get().then(
      (snapshot) => {
      //   console.log("All");
        snapshot.docs.forEach((userSnapshot) => {
          var currentID = userSnapshot.id
          console.log(currentID)
          StudentUsers.push(userSnapshot.data())
          var userData = userSnapshot.data()
        });
        setuserDetails(StudentUsers)
    });
}
useEffect(() => {
  fetchUserDetails();
}, [])


const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };


    return (
        <div>
            {!currentUser ? 
            <Header
                brand="II"
                rightLinks={<HeaderLinks />}
                fixed
                color="white"
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
            />: 
            <Header
                brand="II"
                rightLinks={<HeaderLinks2 />}
                fixed
                color="white"
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
                {...rest}
                />
            }
            <br/>
            <br/>
            <br/>
            <Fab color="secondary" aria-label="edit" style={{position:"fixed",bottom:20,right:40}} onClick={handleOpen}>
                 <EditIcon />
            </Fab>
             <div className={classes.section}>
                <GridContainer justify="center">
                    <GridItem cs={12} sm={12} md={8}>
                    <h2 className={classes.title} style={{textAlign:"center"}}>Latest Blogs</h2>
                   
          </GridItem>
          </GridContainer>
          </div>
          <hr/>
          {
                setuser && setuser.map(user=>{
                return(
                <div>
          {/* 
          <h4 style={{ fontWeight:"bold"}}>Post: <h4 style={{ display:'inline'}}>{user.identity}</h4></h4>
          <h4 style={{ fontWeight:"bold"}}>Subtitle: <h4 style={{ display:'inline'}}>{user.subtitle}</h4></h4 */}
          <Card className={cx(styles.root, shadowStyles.root)} style={{paddingRight:15}}>
            <CardMedia
                classes={mediaStyles}
                image={ (user.identity)=="Student" ? 
                image1 :
                'https://images.unsplash.com/photo-1468774871041-fc64dd5522f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80'
                }
            />
            <CardContent className={styles.content}>
            <Typography color="textPrimary" gutterBottom>{user.name}</Typography>
            <Typography color="textSecondary" gutterBottom>{user.identity}</Typography>
                <TextInfoContent
                classes={textCardContentStyles}
                overline={new Date(user.createdAt.seconds * 1000).toLocaleDateString("en-US")}
                heading={user.title}
                body={user.content}
                />
                {console.log(typeof(user.link))}
                {user.link==""?' ':<Button color={'primary'} fullWidth className={styles.cta} onClick={() => {window.open(user.link.trim(),'_blank');}}>
                Find Out More <ChevronRightRounded />
                </Button>}
            </CardContent>
            </Card>
            <br/>
        </div>
        )
    })
  }
  
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Write a Blog</DialogTitle>
        <DialogContent>
                    <CustomInput
                        id="regular"
                        labelText="Your Name"
                        value={name}
                        inputProps={{
                        // placeholder: "name",
                        // defaultValue:`${currentUser.displayName}`,
                        }}
                        formControlProps={{
                        fullWidth: true,
                        required: true,
                        onChange: (e) => setName(e.target.value)
                        }}
                    />
                    <FormControl className={classes.formControl} style={{marginLeft:0}}>
                        <InputLabel id="demo-simple-select-label">Identity</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        >
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"Instructor"}>Instructor</MenuItem>
                        </Select>
                        </FormControl>
                            <CustomInput
                            labelText="Blog title"
                            required
                            id="name"
                            value={title}
                            formControlProps={{
                                fullWidth: true,
                                onChange:(e) => setTitle(e.target.value),
                                required: true
                            }}
                            />
              <CustomInput
                labelText="Content"
                id="message"
                value={content}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                  required: true
                }}
                inputProps={{
                  multiline: true,
                  onChange:(e) => setContent(e.target.value),
                  rows: 5
                }}
              />
                            <CustomInput
                            labelText="Provide external link for more info."
                            required
                            id="name"
                            value={link}
                            formControlProps={{
                                fullWidth: true,
                                onChange:(e) => setLink(e.target.value),
                                // required: true
                            }}
                            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="danger" disabled={
              name=="" || content=="" || title=="" || identity=="" ? true : false
          }>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
</div>  
    )
}
