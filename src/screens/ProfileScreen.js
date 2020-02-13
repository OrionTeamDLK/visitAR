import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
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
import axios from "axios";

export default class ProfileScreen extends React.Component {

  componentWillMount() {
    const user = firebase.auth().currentUser;
    if (user != null) {
      const ref = firebase.storage().ref(user.photoURL);
      const url = ref.getDownloadURL().then( result => this.setState({ image: result }) );

      this.setState({ name: user.displayName });
      this.setState({ email: user.email });
      this.setState({ emailVerified: user.emailVerified });
      this.setState({ photoURL: user.photoURL });
      this.setState({ uid: user.uid });
    }

    let key = "XVSHDsTWogsEszjM";
    let access_token = JWT.encode({ foo: "bar" }, key);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    axios({
      method: "get",
      url: `https://orion-visitar.herokuapp.com/favourite?uid=${user.uid}`
    }).then( (results) => {

      const result = results.data.map(obj => obj.tour_id );
      this.setState({ favourite: result });
    })

    axios({
      method: "get",
      url: `https://orion-visitar.herokuapp.com/history?uid=${user.uid}`
    }).then( (results) => {
        //console.log(results.data)
        // const result = results.data.map(obj => (
        //   {
        //     name: obj.tour_taken,
        //     completed: obj.completed,
        //     time_started: obj.time_started
        //
        //   }
        // ) );

        //console.log(result)
        this.setState({ history: results.data });
    })
  }


  constructor(props) {
    super(props);
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Signed Out");
          this.props.navigation.navigate("Index");
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  };


  render() {
    let { image, favourite, history } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <Image source={{ uri: image }} style={styles.profile_pic} />
          <Text>Name: {this.state.name && null}</Text>
          <Text>Email: {this.state.email}</Text>
          <Text>User ID: {this.state.uid}</Text>
          <Text>Photo URL: {this.state.photoURL}</Text>

          <Text style={styles.heading}>Favourite</Text>
          <View >
          { favourite && favourite.map((item, key)=>(
           <Text key={key}>Tour ID:  { item } </Text>)
          )}
          </View>

          <Text style={styles.heading}>History</Text>

          { history && history.map((item, key)=>(
              <View >
               <Text key={key}>Name:{ item.tour_taken } </Text>
               <Text key={key}>Completed:{ item.completed } </Text>
               <Text key={key}>Time Started:{ item.time_started[0] } </Text>
               <Text key={key}>Time Finished:{ item.time_started[1] } </Text>
             </View>)
          )}




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
    marginBottom: 10,
    justifyContent: 'center'
  },
  heading: {
    margin:20,
    fontSize:20
  }
});
