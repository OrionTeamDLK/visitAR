import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import * as Google from 'expo-google-app-auth';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';

export default class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })

  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {

  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      console.log('Called signInWithGoogleAsync')
      const result = await Google.logInAsync({
        androidClientId: '943400221085-vge945ckhl05c3c9gbt7bpvpr3mhkjfv.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        this.props.navigation.navigate('Profile');
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then( (user)=> {

        if(user){
          this.props.navigation.navigate('Profile');
        }


      })
    } catch(error){
      conosle.log(error.toString());
      alert("Login Error Try Again");
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
          <Button style={ styles.Button }
            full
            rounded
            info
            onPress={()=>this.loginUser(this.state.email, this.state.password)}
          >
          <Text style={{ color: '#fff' }}>Email Login</Text>
          </Button>
        </Form>

        <Form>
          <Button style={ styles.Button }
            full
            rounded
            success
            onPress={()=>this.signInWithGoogleAsync()}
          >
          <Text style={{ color: '#fff' }}>Google Login</Text>
          </Button>
        </Form>

        <NavigationButton
        data-test = "LoginScreen_button"
        title="Register"
        icon = "pencil-square-o"
        navName = "Register"/>
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
    marginTop: 10,
    marginBottom: 15
  },
  FacebookButton: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#4267B2'
  }
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
