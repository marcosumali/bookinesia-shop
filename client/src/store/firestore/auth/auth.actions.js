export const authSignIn = (email, password) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    let firebase = getFirebase()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log('login success', response)
    })
    .catch(err => {
      console.log('login error', err)
    })
  }
}
