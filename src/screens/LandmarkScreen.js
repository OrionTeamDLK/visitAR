import React from "react";
import { TouchableHighlight,View, Text, StyleSheet, Image, FlatList, Button, Alert, SafeAreaView } from "react-native";
import * as Speech from 'expo-speech';



export default class LandmarkScreen extends React.Component {
  
  state = {
    volume: 0
  }

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
        <Button
            title="Speech"
          
            onPress={() =>  Speech.speak(title + ". " + description)}
        />
        <Button
            title="Stop speech"
            onPress={() => Speech.stop()}
        />
       





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
