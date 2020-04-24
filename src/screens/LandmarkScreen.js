import React from "react";
import { TouchableHighlight,View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Button, Alert, SafeAreaView,ScrollView } from "react-native";
import * as Speech from 'expo-speech';
import Icon from "react-native-vector-icons/FontAwesome";
import LinkButton from "../Components/LinkButton";




export default class LandmarkScreen extends React.Component {
  componentWillMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      volume:0,
      played:false}
  }
  playPress = () => {
    this.setState({
      played:!this.state.played
    })
  }

  playText = (title, description) => {
    Speech.speak("Landmark: " + title);
    Speech.speak("Information: " + description);
  }
  stopSpeech = () => {
    Speech.stop();
  }


  render() {
    //console.log(this.props.navigation.state.params.landmark)
    let { title, description, location, image, link} = this.props.navigation.state.params.landmark;




    return (
      <View style={{flex:1}}>
        <Image source={ {uri: image } } style={{width: 500, height: 300}}/>
        {title ==="Carlingford Castle" ?
        <Text style={styles.textTitle}>{title}<Text>  </Text>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/acessNo.png')}
            resizeMode="stretch"
          />
        </Text>
          :
          <Text style={styles.textTitle}>{title}</Text>
        }
        <ScrollView style={styles.scroll}>
        <Text style={styles.textContent}>{description}</Text>
        <View style={styles.centerView}>
        {this.state.played?
          <TouchableOpacity
            style={styles.buttonStop}
            onPress={() => { this.playPress(); this.stopSpeech(); }}
          >
            <Icon name='stop-circle' size={30} color="white" style={styles.iconStyle} />
          </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.buttonPlay}
          onPress={() => { this.playPress(); this.playText(title, description); }}
          >
          <Icon name='play' size={30} color="white" style={styles.iconStyle} />
        </TouchableOpacity>
        }
        <Text style={{marginBottom:5}}>Play text to speech</Text>
        <LinkButton icon="link" name="More Info" link={link}/>
        </View>
        </ScrollView>
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
  textTitle:{
    fontWeight:'bold',
    fontSize:32,
    textAlign:'center'
  },
  textContent:{
    fontSize:18
  },
  buttonPlay: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#63db4b',
    padding: 20,
    width:120,
    borderRadius:55
  },
  buttonStop: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#eb4034',
    padding: 20,
    width:120,
    borderRadius:55
  },
  iconStyle: {
      marginHorizontal: 20,
  },
  centerView:{
    marginTop:10,
    alignItems:'center',
    justifyContent:'center'
  },
  tinyLogo: {
  width: 40,
  height: 40
},
});
