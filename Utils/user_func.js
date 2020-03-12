import * as firebase from "firebase";

const isUserLoggedIn = () => {
  const user = firebase.auth().currentUser;
  return (user!=null)
    ? true
    : false;
}

const getUser = () => {
  const user = firebase.auth().currentUser;
  return (user!=null)
    ? user
    : null;
}

const getUserID = () => {
  const user = firebase.auth().currentUser;
  return (user!=null)
    ? user.uid
    : null;
}

export default {
  isUserLoggedIn,
  getUser,
  getUserID
};
