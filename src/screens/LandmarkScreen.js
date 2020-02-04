import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";


export default class LandmarkScreen extends React.Component {

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.navigation.state.params.landmark)
    let { title, description, location, image} = this.props.navigation.state.params.landmark;


    return (
      <View>
        <Image source={ {uri: image } } style={{width: 500, height: 300}}/>
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
