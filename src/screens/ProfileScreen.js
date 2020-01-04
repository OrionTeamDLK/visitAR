import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component{

  // componentDidMount(){
  //   this.checkIfLoggedIn()

  // }

  constructor(props){
    super(props)
  }

  // checkIfLoggedIn = () => {
  //   console.log('called');
  //   firebase.auth().onAuthStateChanged( user => {
  //     console.log(user);
  //     if(!user){
  //
  //       this.props.navigation.navigate('Login');
  //     }
  //   })
  // }

  render() {
    return (

      <Container style={styles.container} >

      <Button style={ styles.Button }
        full
        rounded
        info
        onPress={()=>this.loginUser(this.state.email, this.state.password)}>

        <NavigationButton
        data-test = "ProfileScreen_button"
        title="Home"
        icon = "home"
        navName = "Index"/>

        <NavigationButton
        data-test = "ProfileScreen_button"
        title="Update Profile"
        icon = "edit"
        navName = "EditProfile"/>


      </Container>


    );
  }

}




const styles = StyleSheet.create({});
