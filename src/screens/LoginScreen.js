import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../Components/NavigationButton';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD76GKd6cJwFZuSDdJsFUnJmL31xEG5Iaw",
  authDomain: "orion-57b76.firebaseapp.com",
  databaseURL: "https://orion-57b76.firebaseio.com",
  projectId: "orion-57b76",
  storageBucket: "orion-57b76.appspot.com",
  messagingSenderId: "943400221085",
  appId: "1:943400221085:web:25c1b2ddce16b9fbd71774",
  measurementId: "G-56R04KRSTK"
};

firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = async (email, password) => {
    try{
      if(this.state.password.length<6){
        alert("Enter More Than 6 Characters");
        return;
      }

      const userData = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await userData.user.sendEmailVerification().then(function() {
        console.log(`Email Sent To ${email}`);
      }).catch(function(error) {
        console.log(error);
      });
    } catch(error){
      console.log(error.toString());
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

          <Button style={ styles.loginButton }
            full
            rounded
            info
            onPress={()=>this.signUpUser(this.state.email, this.state.password)}
          >
          <Text style={{ color: '#fff' }}>Sign Up</Text>
          </Button>
        </Form>
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
  loginButton: {
    marginTop: 10
  },
});



// const LoginScreen = ({ navigation }) => {
//
//   constructor(props){
//     super(props)
//
//     this.state = ({
//       email: '',
//       password: ''
//     })
// }
//
//   loginUser = (email, password) => {
//
//     alert(email);
//     alert(password);
//       // try{
//       //   firebase.auth().signInWithEmailAndPassword(email, password).then( (user)=> {
//       //     console.log(user);
//       //     console.log(firebase.auth.currentUser.getIdToken());
//       //   })
//       // } catch(error){
//       //   conosle.log(error.toString());
//       // }
//     }
//
//     return (
//         // <View data-test = "LoginScreen_view">
//         //     <Text data-test = "LoginScreen_text">VisitAR</Text>
//         //     <Text data-test = "LoginScreen_text">login Screen!</Text>
//         //     <Text data-test = "LoginScreen_text">Google login details</Text>
//         //     <Text data-test = "LoginScreen_text">Faceboks login details</Text>
//         //     <Text data-test = "LoginScreen_text">Cstom login details</Text>
//         //     <NavigationButton
//         //     data-test = "LoginScreen_button"
//         //     title="Login"
//         //     icon = "sign-in"
//         //     navName = "Profile"/>
//         //     <NavigationButton
//         //     data-test = "LoginScreen_button"
//         //     title="Register"
//         //     icon = "pencil-square-o"
//         //     navName = "Register"/>
//         // </View>
//     <Container style={styles.container} >
//       <Form>
//         <Item floatingLabel>
//           <Label>Email: </Label>
//           <Input
//             autoCorrect={false}
//             autoCapitalize="none"
//             onChangeText={(email) => this.setState({email})}
//           />
//         </Item>
//         <Item floatingLabel>
//           <Label>Password: </Label>
//           <Input
//             secureTextEntry={true}
//             autoCorrect={false}
//             autoCapitalize="none"
//             onChangeText={(password) => this.setState({password})}
//           />
//         </Item>
//         <Button style={ styles.loginButton }
//           full
//           rounded
//           success
//           onPress={()=>this.loginUser(this.state.email, this.state.password)}
//         >
//         <Text style={{ color: '#fff' }}>Login</Text>
//         </Button>
//       </Form>
//     </Container>
//     );
// };
//
// const styles = StyleSheet.create({
//     iconStyle:{
//         marginHorizontal:10
//     },
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       justifyContent: 'center',
//     },
//     loginButton: {
//       marginTop: 10
//     }
// });
//
// export default LoginScreen;
