import firebase from "firebase/app";
import "firebase/auth";

export const registerAction = (user) => async dispatch => {
    const {email, password} = user
    
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
      if (res) {
            const userId = firebase.auth().currentUser.uid
            const dbUser = {}
            firebase.database().ref('users/' + userId).set(user);
            firebase.database().ref('users/' + userId).once('value').then(snapshot => {
              dbUser.name = (snapshot.val() && snapshot.val().name) || 'Anonymous'
              dbUser.email = (snapshot.val() && snapshot.val().email) || 'no-email'
              dbUser.desktopTimer = (snapshot.val() && snapshot.val().desktopTimer) || 0
              dbUser.mobileTimer = (snapshot.val() && snapshot.val().mobileTimer) || 0
            })
            localStorage.setItem('token', JSON.stringify(userId))

            dispatch ({
              type: 'LOGGING',
              payload: dbUser
            })
      }
    })
    .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/weak-password') alert('The password is too weak.')
        else alert(errorMessage)
    });
}

export const loginAction = (user) => async dispatch => {
    const {email, password} = user
    
    await firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        if (res) {
          const userId = firebase.auth().currentUser.uid
          const dbUser = {}
          firebase.database().ref('users/' + userId).once('value').then(snapshot => {
            dbUser.name = (snapshot.val() && snapshot.val().name) || 'Anonymous'
            dbUser.email = (snapshot.val() && snapshot.val().email) || 'no-email'
            dbUser.desktopTimer = (snapshot.val() && snapshot.val().desktopTimer)
            dbUser.mobileTimer = (snapshot.val() && snapshot.val().mobileTimer)
          })
          localStorage.setItem('token', JSON.stringify(userId))
          
          dispatch ({
              type: 'LOGGING',
              payload: dbUser
          })
        }
    })
    .catch(function(error) {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/wrong-password') alert('Wrong password.')
        else alert(errorMessage)
    })
}

export const logoutAction = async () => {
  await firebase.auth().signOut()
  .then(() => localStorage.removeItem('token'))
  .catch(err => console.log(err))
}