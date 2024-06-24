const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updUser - functions.firestore
  .document('user/{userId}')
  .onUpdate((change, context) => {
    const userId = context.params.userId;

    const newUserName = change.after.data().userName;
    const newEmail = change.after.data().userEmail;

    admin.auth().updateUser(userId, {
      email: newEmail,
      displayName: newUserName,
    })
      .then((userRec) => {
        console.log('User Updated', userRec);
      })
      .catch(error => {
        console.log(error.message);
      });

  });
