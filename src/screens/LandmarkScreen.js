import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";


export default class LandmarkScreen extends React.Component {

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {

    let { title, description, location } = this.props.navigation.state.params.landmark;


    return (
      <View>
        <Text>LandMark Page</Text>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{location.latitude}</Text>
        <Text>{location.longitude}</Text>
      </View>
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
  }
});
