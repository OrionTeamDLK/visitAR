import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity, Button} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { withNavigation } from 'react-navigation';

const EndTourScreen =(props)=>{
    return (
        <View data-test = "EndTourScreen_view">
        <Image style={styles.image} source={require('../../assets/carl1.jpeg')}/>
        <Text style={styles.textHeader}>Congratulations on completing the Carlingford Tour!</Text>
        <Text style={styles.textMain}>You spent 1:15:24 on this historic tour</Text>
        <Text style={styles.textMain}>we hope you had a wonderful time</Text>
        <View style={styles.viewBar} />
        <Text style={styles.textList}>You have visted:</Text>
        <Text style={styles.textList}>-Carlingford Castle</Text>
        <Text style={styles.textList}>-The Spout</Text>
        <Text style={styles.textList}>-The Mint</Text>
        <Text style={styles.textList}>-Carlingford Priory</Text>
        <View style={styles.viewBar} />
        <Text style={styles.textMain}>You have collected 4 out of 5 tokens! well done!</Text>
        <Text style={styles.textMain}>How many can you and your friends collect next time?</Text>
        <Button
        style={{marginTop:20}} 
        onPress={()=> props.navigation.navigate("GMaps")}
        title="Go to map screen"
        accessibilityLabel="Go to map screen"
        />
        <Button
        style={{marginTop:20}} 
        title="Add tour to favourites"
        />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  Button: {
    marginTop: 10
  },
  textHeader:{
    textAlign:"center",
    fontSize: 30

  },
  textMain:{
    textAlign:"center",
    fontSize:20
  },
  textList:{
    fontWeight:"bold",
    textAlign:"center",
    fontSize:20
  },
  viewBar:{
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    marginTop: 20,
    marginBottom:20
  },
  image:{
      width: "80%",
      height: 250,
      left: "10%",
      resizeMode: 'stretch'
  }
});

export default withNavigation(EndTourScreen);






{/*}
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavigationButton from '../Components/NavigationButton';


export default class EndTourScreen extends React.Component {

  componentWillMount() {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Image source={require('../../assets/carl1.jpeg')}/>
        <Text>Congratulations on completing the Carlingford Tour!</Text>
        <Text>You spent 1:15:24 on this historic tour</Text>
        <Text>we hope you had a wonderful time</Text>
        <Text>===================</Text>
        <Text>-Carlingford Castle</Text> 
        <Text>You have viisted:</Text>
        <Text>-Carlingford Castle</Text>
        <Text>-The Spout</Text>
        <Text>-The Mint</Text>
        <Text>-Carlingford Priory</Text>
        <Text>===================</Text>
        <Text>You have collected 4 out of 5 tokens! well done!</Text>
        <Text>How many can you and your friends collect next time?</Text>
        <NavigationButton
        data-test="Tour_screen_button"
        title="Back to map screen"
        icon="globe"
        navName="GMaps"
        styleText={{ color: "white", fontSize: 50 }} />

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
*/}



