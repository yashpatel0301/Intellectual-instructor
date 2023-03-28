import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addAdmin = functions.https.onCall((data, context)=>{
    if(context.auth.token.instructor !== true){
        return{
            error: "you are not instructor"
        }
    }
    const email = data.email;
    return grantModeratorRole(email).then(()=>{
        return{
            result: "you are instructor"
        }
    })
})

async function grantModeratorRole(email){
    const user = await admin.auth().getUserByEmail(email);
    if(user.customClaims && (user.customClaims).instructor === true){
        return;
    }
    return admin.auth().setCustomUserClaims(user.uid, {
        instructor: true,
    });
}