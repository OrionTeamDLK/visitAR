import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";


const InfoPopUp = (props) => {
    const desc = props.description;
    return (
        <View style={styles.boxStyle}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <Text style={styles.contentStyle}>{desc.substring(0, 60) + "..."}</Text>
        <Text style={styles.linkStyle}>Click For More Information...</Text>
        </View>
    );
};

export default InfoPopUp;


const styles = StyleSheet.create({
  boxStyle: {
    width:350,
    height:100
  },
  titleStyle:{
    fontSize: 25,
    textAlign:"center",
    fontWeight:"bold"
  },
  contentStyle:{
    fontSize: 16
  },
  linkStyle:{
    fontSize: 14,
     textAlign:"center",
     textDecorationLine:'underline'
  },
});
