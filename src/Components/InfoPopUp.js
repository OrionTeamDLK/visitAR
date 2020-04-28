import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, FlatList,ScrollView} from "react-native";

const castleText = ()=> {
  return(
  <Text style={styles.titleStyle}>"Carlingford Castle" </Text>
  );
}

const InfoPopUp = (props) => {
    const desc = props.description;
    return (
      <View style={styles.boxStyle}>
          {props.title === {castleText} ?
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
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: "white",
    width:Dimensions.get('window').width * 0.83,
    height: "auto",
    alignItems: "center",
    alignContent: "center",
  },
  titleStyle:{
    fontSize: 25,
    textAlign:"center",
    fontWeight:"bold",
    alignItems: "center",
    alignContent: "center"
  },
  contentStyle:{
    fontSize: 18,
    textAlign:"center",
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
