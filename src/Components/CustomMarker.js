import React from "react";
import { StyleSheet, TouchableOpacity, Text, View,Image,Dimensions } from "react-native";
import MapView, {
    Marker,
    Callout
} from "react-native-maps";




const CustomMarker = (props) => {
    return (
      <View style={styles.boxStyle}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <Text style={styles.contentStyle}>{props.description}</Text>
      <Image source={require('../../assets/mapIcons/vc.png')}style={{height: 64, width:64 }} />
      </View>
    );
};

export default CustomMarker;

const styles = StyleSheet.create({
  boxStyle: {
    width:Dimensions.get("window").width*.7,
    height:Dimensions.get("window").height*.14
  },
  titleStyle:{
    fontSize: 30,
    textAlign:"center",
    fontWeight:"bold"
  },
  contentStyle:{
    fontSize: 22,
    textAlign:"center",
  },
  linkStyle:{
    fontSize: 14,
     textAlign:"center",
     textDecorationLine:'underline'
  },
});
