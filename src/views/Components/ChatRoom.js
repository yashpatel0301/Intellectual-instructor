import React from 'react';
import { db, firebase } from "../Components/firebase";
import { AuthContext, useAuth } from '../Components/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/analytics';
import HeaderLinks2 from "../../components/Header/HeaderLinks2";
import Header from "components/Header/Header.js";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.js";
import './ChatRoom.css';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

export default function ChatRoom(props) {
    const classes = useStyles();
    const {currentUser} = useAuth();
    const [setuser, setuserDetails] = React.useState("");
    const fetchUserDetails = () => {
  
        const StudentUsers=[]
        db.collection("Students").where("email","==",currentUser.email)
        .get().then(
          (snapshot) => {
            snapshot.docs.forEach((userSnapshot) => {
              var currentID = userSnapshot.id
              StudentUsers.push(userSnapshot.data().requests_accepted)
              console.log(userSnapshot.data())
              var userData = userSnapshot.data()
            });
            setuserDetails(StudentUsers)
        });
    }
    
    React.useEffect(() => {
    fetchUserDetails();
    }, [])

//     const nodemailer = require("nodemailer");

//     const main = async(recipient,message) => {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         auth: {
//         user: "intellectualinstructor@gmail.com",
//         pass: "1234intins"
//         },
//     });

//     transporter.verify((error, success) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Server is ready to take messages');
//         }
//       });

//     let info = await transporter.sendMail({
//         from: 'Intellectual Instructor', 
//         to: recipient.trim(),
//         subject: "Regarding Meeting", 
//         text: message, 
//         html: "<b>"+message+"</b>",
//     })

//     console.log("Message sent: %s", info.messageId);

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//     }


    const { ...rest } = props;
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
            <h4 style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold'}}>Your upcoming session's details</h4>
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Instructor Email</StyledTableCell>
                          <StyledTableCell align="right">meeting URL</StyledTableCell>
                          <StyledTableCell align="right">Date for session</StyledTableCell>
                          <StyledTableCell align="right">Confirmation</StyledTableCell>
                          <StyledTableCell align="right">Cancel Session</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      { (setuser[0]) ? setuser[0] && setuser[0].map( user => {
                    return(
                      <TableBody>
                          <StyledTableRow >
                            <StyledTableCell component="th" scope="row">{user.instructoremail}</StyledTableCell>
                            <StyledTableCell align="right"><Button color="danger" onClick={ ()=>{window.open(user.url,'_blank')}} style={{textTransform:"lowercase"}}>{user.url}</Button></StyledTableCell>
                            <StyledTableCell align="right">{user.time}</StyledTableCell>
                            <StyledTableCell align="right"><a href={"mailto:" + user.instructoremail}><Button color="success" >Confirm</Button></a></StyledTableCell>
                            <StyledTableCell align="right"><a href={"mailto:" + user.instructoremail}><Button color="secondary">Cancel</Button></a></StyledTableCell>
                            {/* <StyledTableCell align="right">jkdjksjd</StyledTableCell> */}
                          </StyledTableRow>
                      </TableBody>
                        )
                    }):
                    <TableHead>
                        <TableRow>
                    <StyledTableCell>No Data</StyledTableCell>
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    <StyledTableCell align="right">No Data</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    } 
                    </Table>
                  </TableContainer>
        </div>
    )
}

