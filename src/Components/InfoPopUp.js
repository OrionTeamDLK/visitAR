import React from "react";
import { View, Text, StyleSheet, Image, FlatList} from "react-native";


const InfoPopUp = (props) => {
    const desc = props.description;
    return (
      <View style={styles.boxStyle}>
      {props.title ==="Carlingford Castle" ?
      <Text style={styles.titleStyle}>{props.title}
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/acessNo.png')}
          resizeMode="stretch"
        />
      </Text>
        :
        <Text style={styles.titleStyle}>{props.title}</Text>
      }
      <Text style={styles.contentStyle}>{desc.substring(0, 60) + "..."}</Text>
      <Text style={styles.linkStyle}>Click For More Information...</Text>


      </View>
    );
};

export default InfoPopUp;


const styles = StyleSheet.create({
  boxStyle: {
    width:350,
    height:150
  },
  titleStyle:{
    fontSize: 25,
    textAlign:"center",
    fontWeight:"bold"
  },
  contentStyle:{
    fontSize: 18
  },
  linkStyle:{
    fontSize: 16,
     textAlign:"center",
     textDecorationLine:'underline'
  },
  tinyLogo: {
  width: 64,
  height: 64,
  padding:15
},
imgText:{
  fontSize:72
}
});
