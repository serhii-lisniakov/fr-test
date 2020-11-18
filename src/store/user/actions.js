import firebase from "firebase/app";
import "firebase/auth";

export const registerAction = (user) => async dispatch => {

    const {email, password} = user
    
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          const userId = firebase.auth().currentUser.uid;
          const dbUser = {}
            firebase.database().ref('users/' + userId).set(user);
            firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
              dbUser.name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
              dbUser.email = (snapshot.val() && snapshot.val().email) || 'no-email';
              dbUser.desktopTimer = (snapshot.val() && snapshot.val().desktopTimer) || 0;
              dbUser.mobileTimer = (snapshot.val() && snapshot.val().mobileTimer) || 0;
            })

            dispatch ({
              type: 'REGISTER',
              payload: dbUser
            })
        }
      })
      .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
    });
}

export const loginAction = (user) => async dispatch => {

    const {email, password} = user
    
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      if (res) {
        const userId = firebase.auth().currentUser.uid;
        const dbUser = {}
        firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
          dbUser.name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
          dbUser.email = (snapshot.val() && snapshot.val().email) || 'no-email';
          dbUser.desktopTimer = (snapshot.val() && snapshot.val().desktopTimer) || 0;
          dbUser.mobileTimer = (snapshot.val() && snapshot.val().mobileTimer) || 0;
        })
        
        dispatch ({
            type: 'LOGIN',
            payload: dbUser
        })
      }
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
    });
}

export const logoutAction = async () => {
 
  await firebase.auth().signOut().then(function() {
    
  }).catch(function(error) {
    console.log(error);
  });

}

export const updateTimersAction = (timers) => async dispatch => {
  
  const userId = firebase.auth().currentUser.uid;

  var updates = {};
  updates['/users/' + userId + '/desktopTimer'] = timers.desktopTime;
  updates['/users/' + userId + '/mobileTimer'] = timers.mobileTime;
  
  await firebase.database().ref().update(updates);

}