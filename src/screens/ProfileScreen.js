import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component{

  componentDidMount(){
    //this.checkIfLoggedIn()
    this.getUserDetails();

  }

  constructor(props){
    super(props)
  }

  getUserDetails = () => {
    const user = firebase.auth().currentUser;

    console.log(user);
    const name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
  }

  logOut = () => {
    firebase.auth().signOut().then( () => {
      console.log('Signed Out');
      this.props.navigation.navigate('Index');
    }, function(error) {
      console.error('Sign Out Error', error);
    });

  }

  checkIfLoggedIn = () => {
    console.log('called');
    firebase.auth().onAuthStateChanged( user => {
      console.log(user);
      if(!user){
        this.props.navigation.navigate('Index');
      }
    })
  }

  render() {
    return (

      <Container style={styles.container} >

        <Text>{name}</Text>

        <NavigationButton
        style={ styles.Button }
        data-test = "ProfileScreen_button"
        title="Home"
        icon = "home"
        navName = "Index"/>

        <NavigationButton
        style={ styles.Button }
        data-test = "ProfileScreen_button"
        title="Update Profile"
        icon = "edit"
        navName = "EditProfile"/>


        <Button style={ styles.Button }
          full
          rounded
          success
          onPress={() => this.logOut()}
        >
        <Text style={{ color: '#fff' }}>Log out</Text>
        </Button>

      </Container>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  Button: {
    marginTop: 10
  },
});
