import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import NavigationButton from "../Components/NavigationButton";
import AnimatedLoadingBar from "../Components/AnimatedLoadingBar";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import JWT from "expo-jwt";
import axios from "axios";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.signUpUser = this.signUpUser.bind(this);
    let key = "XVSHDsTWogsEszjM";
    let access_token = JWT.encode({ foo: "bar" }, key);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
      blob: null,
      photoURL: null,
      showLoader: false
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  showLoader = () => {
    this.setState({ showLoader: true });
  };
  hideLoader = () => {
    this.setState({ showLoader: false });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const { height, width, type, uri } = result;
      this.setState({ image: uri }); // will follow later
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  uploadImage = async (uri, imageName) => {
    console.log("Upload IMage Called");

    const res = await fetch(uri);
    const blob = await res.blob();

    const ref = firebase
      .storage()
      .ref()
      .child("profile_pictures/" + imageName);
    return ref.put(blob);
  };

  signUpUser = async (email, password, confirmPassword) => {
    try {
      if (this.state.password.length < 7) {
        alert("Enter More Than 6 Characters");
        return;
      } else if (this.state.password !== this.state.confirmPassword) {
        alert("Passwords Do Not Match");
        return;
      }

      this.showLoader();

      const userData = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (this.state.image != null) {
        const res = await this.uploadImage(
          this.state.image,
          userData.user.uid + ".jpg"
        );
        this.setState({
          photoURL: "profile_pictures/" + userData.user.uid + ".jpg"
        });
      } else {
        this.setState({ photoURL: "profile_pictures/default_profile.jpg" });
      }

      await userData.user.updateProfile({
        photoURL: this.state.photoURL
      });

      await userData.user.sendEmailVerification();

      const res = await axios({
        method: "post",
        url: "https://orion-visitar.herokuapp.com/user",
        data: {
          uid: userData.user.uid
        }
      });

      this.props.navigation.navigate("Profile");
      this.hideLoader();
    } catch (error) {
      this.hideLoader();
      alert(error);
      console.log(error.toString());
    }
  };

  render() {
    let { image } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          {image && (
            <Image source={{ uri: image }} style={styles.profile_pic} />
          )}
          <Form>
            <Item floatingLabel>
              <Label>Email: </Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password: </Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Confirm Password: </Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
              />
            </Item>

            <Button
              style={styles.Button}
              full
              rounded
              info
              onPress={this._pickImage}
            >
              <Text style={{ color: "#fff" }}>Upload</Text>
            </Button>

            <Button
              style={styles.Button}
              full
              rounded
              success
              onPress={() =>
                this.signUpUser(
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword
                )
              }
            >
              <Text style={{ color: "#fff" }}>Sign Up</Text>
            </Button>
          </Form>
          {this.state.showLoader && (
            <Spinner
              visible={true}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  Button: {
    marginTop: 10
  },
  profile_pic: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 10
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});
