import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

export default class Register extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  signUpUser = async (email, password, confirmPassword) => {
    try{
      if(this.state.password.length<7){
        alert("Enter More Than 6 Characters");
        return;
      } else if (this.state.password !== this.state.confirmPassword){
        alert("Passwords Do Not Match");
        return;
      }

      const userData = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await userData.user.sendEmailVerification().then(function() {
        console.log(`Email Sent To ${email}`);
        alert(`Email Sent To ${email}`);
        this.props.navigation.navigate('Profile');
      }).catch(function(error) {
        console.log(error);
      });

    } catch(error){
      console.log(error.toString());
      alert(error.toString());
    }
  }

  render() {
    return (
      <Container style={styles.container} >
        <Form>
          <Item floatingLabel>
            <Label>Email: </Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password: </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Confirm Password: </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
          </Item>

          <Button style={ styles.Button }
            full
            rounded
            info
            onPress={()=>this.signUpUser(this.state.email, this.state.password, this.state.confirmPassword)}
          >
          <Text style={{ color: '#fff' }}>Sign Up</Text>
          </Button>
        </Form>
      </Container>

    );
  }

}

// const RegisterScreen = () => {
//     return (
//         <View data-test = "RegisterScreen_view">
//         <Text data-test = "RegisterScreen_text">VisitAR</Text>
//         <Text data-test = "RegisterScreen_text">Register screen</Text>
//         <Text data-test = "RegisterScreen_text">inpit fields</Text>
//         </View>
//     );
// };

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
