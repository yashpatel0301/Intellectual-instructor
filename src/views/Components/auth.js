import React, { useEffect,useState,createContext, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {firebase} from './firebase'; 
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(30),
      },
    },
  }));
  
export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser] = useState(null);
    const [ pending, setPending] = useState(true);
    const classes = useStyles();

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            // console.log(user);
            setCurrentUser(user)
            setPending(false)
        });
    },[])

    if(pending){
        return <div className={classes.root}>Redirecting...<CircularProgress color="secondary"/></div>
    }
    
    return(
        <AuthContext.Provider 
        value={{
            currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
