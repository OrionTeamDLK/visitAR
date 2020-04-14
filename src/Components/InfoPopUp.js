import React from "react";
import { View, Text, StyleSheet, Image, FlatList,ScrollView} from "react-native";


const InfoPopUp = (props) => {
    const desc = props.description;
    return (
      <View style={styles.boxStyle}>
          {props.title ==="Carlingford Castle" ?
            <Text style={styles.titleStyle}>{props.title}<Text>  </Text>
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
    height:130
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
    fontSize: 18,
    fontWeight:"bold",
     textAlign:"center",
     textDecorationLine:'underline'
  },
  tinyLogo: {
  width: 40,
  height: 40
},
imgText:{
  fontSize:72
}
});
