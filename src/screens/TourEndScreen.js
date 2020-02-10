import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";


export default class EndTourScreen extends React.Component {

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>tour end page Page</Text>
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