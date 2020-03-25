import * as firebase from "firebase";
import JWT from "expo-jwt";
import Axios from "axios";
import {AsyncStorage} from 'react-native';

const initializeAuth = async () => {
  const result = await Axios({
    method: "get",
    url: 'https://orion-visitar.herokuapp.com/auth'
  });

  console.log(`Token: ${result.data}`);

  await storeToken(result.data);
}

storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('JWT',token);
  } catch (error) {
    console.log(error);
  }
};

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

export {
  initializeAuth,
  isUserLoggedIn,
  getUser,
  getUserID
};
