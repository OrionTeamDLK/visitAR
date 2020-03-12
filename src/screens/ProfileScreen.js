import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import {
    JWT_SECRET
} from "../../config/config.js"
import NavigationButton from "../Components/NavigationButton";
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
import JWT from "expo-jwt";
import Axios from "axios";
import {getUserID} from '../../Utils/user_func';
import styles from "../styles/ProfileScreenStyle";


export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      name: '',
      email: '',
      emailVerified: false,
      photoURL: '',
      uid: '',
      history: ''
    })
  }

  componentWillMount() {

    const user = firebase.auth().currentUser;

    console.log(getUserID);

    // if (user != null) {
    //   const ref = firebase.storage().ref(user.photoURL);
    //   const url = ref.getDownloadURL().then( result => this.setState({ image: result }) );
    //
    //   this.setState({ name: user.displayName });
    //   this.setState({ email: user.email });
    //   this.setState({ emailVerified: user.emailVerified });
    //   this.setState({ photoURL: user.photoURL });
    //   this.setState({ uid: user.uid });
    // }

    // let key = "XVSHDsTWogsEszjM";
    // let access_token = JWT.encode({ foo: "bar" }, key);
    // axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    //
    // axios({
    //   method: "get",
    //   url: `https://orion-visitar.herokuapp.com/favourite?uid=${user.uid}`
    // }).then( (results) => {
    //
    //   const result = results.data.map(obj => obj.tour_id );
    //   this.setState({ favourite: result });
    // })

    // axios({
    //   method: "get",
    //   url: `https://orion-visitar.herokuapp.com/history?uid=${user.uid}`
    // }).then( (results) => {
    //     //console.log(results.data)
    //     // const result = results.data.map(obj => (
    //     //   {
    //     //     name: obj.tour_taken,
    //     //     completed: obj.completed,
    //     //     time_started: obj.time_started
    //     //
    //     //   }
    //     // ) );
    //
    //     //console.log(result)
    //     this.setState({ history: results.data });
    // })
  }


  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Signed Out");
          this.props.navigation.navigate("GMaps");
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  };


  render() {
    //let { image, favourite, history } = this.state;

    return (
      <Container style={styles.container}>
        <Content>

          <Text>Name: {this.state.name && null}</Text>
          <Text>Email: {this.state.email}</Text>
         {/* <Text>User ID: {this.state.uid}</Text>*/}
          {/*<Text>Photo URL: {this.state.photoURL}</Text>*/}

          <Button
            style={styles.Button}
            full
            rounded
            success
            onPress={() => this.logOut()}
          >
            <Text style={{ color: "#fff" }}>Log out</Text>
          </Button>

          <NavigationButton
            style={styles.Button}
            data-test="ProfileScreen_button"
            title="Home"
            icon="home"
            navName="GMaps"
          />

          <NavigationButton
            style={styles.Button}
            data-test="ProfileScreen_button"
            title="Update Profile"
            icon="edit"
            navName="EditProfile"
          />
        </Content>
      </Container>
    );
  }
}
