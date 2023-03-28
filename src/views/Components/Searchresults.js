import React,{ useState, useEffect} from 'react';
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
import Header from "components/Header/Header.js";
import {db, storage} from "../Components/firebase";
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from '../Components/auth';
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import Button from "components/CustomButtons/Button.js";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import ComputerIcon from '@material-ui/icons/Computer';
import EmojiPeopleOutlinedIcon from '@material-ui/icons/EmojiPeopleOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Router, Switch, Route } from "react-router-dom";


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      margin: 'auto',
      borderRadius: spacing(2), // 16px
      transition: '0.3s',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      position: 'relative',
      maxWidth: 700,
      marginLeft: 'auto',
      overflow: 'initial',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing(2),
      [breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingTop: spacing(2),
      },
    },
    media: {
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(-3),
      height: 0,
      paddingBottom: '48%',
      borderRadius: spacing(2),
      backgroundColor: '#fff',
      position: 'relative',
      [breakpoints.up('md')]: {
        width: '60%',
        marginLeft: spacing(-3),
        marginTop: 0,
        transform: 'translateX(-8px)',
      },
      '&:after': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
        borderRadius: spacing(2), // 16
        opacity: 0.5,
      },
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
  }));
  
// const useStyles = makeStyles(styles);
export default function Searchresults(props) {
    const {
        button: buttonStyles,
        ...contentStyles
      } = useBlogTextInfoContentStyles();
      const shadowStyles = useOverShadowStyles();
    const history = useHistory();
    const { ...rest } = props;
    const {currentUser} = useAuth();
    const styles = useStyles();
    const [setuser, setuserDetails] = useState("");
    const [setuser2, setuserDetails2] = useState("");
    const [lastDoc,setLastDoc] = useState("");

    const fetchUserDetails = () => {
      let Online;
      let Level;
      let Time;
      let Expertise;
      let Place=[];
      const StudentUsers2=[]
      db.collection("Students").where("email","==",currentUser.email).get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            var currentID = userSnapshot.id
            Online = userSnapshot.data().Filters.online;
            Level = userSnapshot.data().Filters.level;
            Time = userSnapshot.data().Filters.time;
            Place = userSnapshot.data().Filters.place;
            Expertise = userSnapshot.data().Expertise.toLowerCase();
            StudentUsers2.push(userSnapshot.data())
          });
          setuserDetails2(StudentUsers2);

          const StudentUsers=[]
          db.collection("Instructors").where("expertise","==",Expertise)
          .where("online","==",Online)
          .where("studenttypes","array-contains",Level)
          .where("place","in",Place)
          .limit(2)
          .get().then(
            (snapshot) => {
              const last = snapshot.docs[snapshot.docs.length-1];
              setLastDoc(last);
              snapshot.docs.forEach((userSnapshot) => {
                var currentID = userSnapshot.id
                StudentUsers.push(userSnapshot.data())
                console.log(userSnapshot.data())
                var userData = userSnapshot.data()
              });
              setuserDetails(StudentUsers)
          });
        });
  }
  const fetchMore = ()=>{
    let Online;
    let Level;
    let Time;
    let Expertise;
    let Place=[];
      db.collection("Students").where("email","==",currentUser.email).get().then(
        (snapshot) => {
          snapshot.docs.forEach((userSnapshot) => {
            var currentID = userSnapshot.id
            var appObj = {...userSnapshot.data(), ['id']: currentID}
            Online = userSnapshot.data().Filters.online;
            Level = userSnapshot.data().Filters.level;
            Time = userSnapshot.data().Filters.time;
            Place = userSnapshot.data().Filters.place;
            Expertise = userSnapshot.data().Expertise;
          });
          const StudentUsers= setuser;
          db.collection("Instructors").where("expertise","==",Expertise)
          .where("online","==",Online)
          .where("studenttypes","array-contains",Level)
          .where("place","in",Place)
          // .startAfter(lastDoc)
          .limit(10)
          .get().then(
            (snapshot) => {
              const last = snapshot.docs[snapshot.docs.length-1];
              setLastDoc(last);
              snapshot.docs.forEach((userSnapshot) => {
                var currentID = userSnapshot.id
                StudentUsers.push(userSnapshot.data())
                setuserDetails(StudentUsers);
                console.log(userSnapshot.data())
                var userData = userSnapshot.data()
              });
          });
        });
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

     
    return (
        <div>
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
            <br/>
            <br/>
            <br/>
            <br/>
            {setuser2 && setuser2.map(user2=>{
              return(<div>
            <h3 style={{marginLeft: "38%", fontWeight:"bold"}}>{ user2.Expertise == null? 'No match found': "Showing results for "}"{user2.Expertise}":</h3>
            </div>)})}
            <hr/>
            <br/>
            { 
          setuser && setuser.map((user)=>{
              return(
                <div>
            <Card className={cx(styles.root, shadowStyles.root)} >
              {/* {console.log(index)} */}
                <CardMedia 
                    style={{  border: '1px solid pink'}}
                    className={styles.media}
                    image={ user.url == '' ?  'http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp' :
                    user.url
                    }
                />
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    {user.expertise} Expert
                    </Typography>
                    <TextInfoContent
                    classes={contentStyles}
                    overline={user.fee + "₹/Hour"}
                    heading={user.name}
                    body={
                        user.expertisedetail.slice(0,100) + '...'
                    }
                    />
                    <Typography color="textSecondary" gutterBottom>  
                    {user.bio.slice(0,100) + '...'}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom style={{ color: 'black'}}>
                    <ComputerIcon style={{ paddingTop:'2.6%'}}/>{user.online == 'online' ?  'Offers Online Tutoring' : ' Offers In-person Tutoring '}  
                    {/* Offers {user.online} Tutoring */}
                    </Typography>
                    <hr/>
                    <Button className={buttonStyles} onClick={()=> { history.push("/searchresults/"+user.email)}}>Show Details</Button>
                </CardContent>
                </Card>
             <br/>
              </div>)})}
             <Button style={{marginLeft: "40%"}} variant="contained" color="danger" size="large" onClick={fetchMore}>Load more instructors</Button>
             {/* <Router>
               <Switch>
                  <Route path="/:id" children={<currentInstructor />} />
               </Switch>
             </Router> */}
        </div>
    )
}
