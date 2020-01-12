import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';


export default class Register extends React.Component {

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: '',
      confirmPassword: '',
      image: null
    })
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  signUpUser = async (email, password, confirmPassword) => {
    try{

      const storageRef = firebase.storage().ref();


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

    let { image } = this.state;

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
            onPress={this._pickImage}
          >
          <Text style={{ color: '#fff' }}>Upload</Text>
          </Button>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <Button style={ styles.Button }
            full
            rounded
            success
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
