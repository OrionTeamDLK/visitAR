import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';

const HelpInfo = (props) => {
    return(
        <View data-test = "helpinfo_view" style={styles.slideDefault}>
            <Text data-test = "helpinfo_num"style={styles.text}>{props.num}</Text>
            <Text data-test = "helpinfo_text" style={styles.text}>{props.text} </Text>
            <TouchableOpacity
                onPress={ ()=>props.navigation.navigate("GMaps")}
                style={styles.button}
                >
                <Text style={styles.buttonText}>
                    <Icon name="map-signs" size={30} color="white" style={styles.iconStyle}/>
                    <Text>  </Text>
                     Onwards to VisitAR
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    slideDefault: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#9DD6EB"
	},
    text: {
		color: "white",
		fontSize: 40,
        fontWeight: "bold",
        textAlign:"center",
        marginTop:40,
        marginLeft:25,
        marginRight:25
    },
    textNum:{
        color: "white",
		fontSize: 40,
        fontWeight: "bold",
        textAlign:"center",
    },
    button: {
      borderWidth: 0.1,
      borderColor: '#e4d9c0',
      borderRadius: 20,
      height: Dimensions.get('window').height*.08,
      width: Dimensions.get('window').width * .7,
      backgroundColor: '#4c6294',
      borderBottomWidth: 3,
      borderColor: "black",
      alignItems:'center',
      justifyContent: 'center',
      marginTop:5
      },
      buttonText:{
        color:"white",
        fontSize:22
      },
      iconStyle: {
        width: 22,
        height: 22,

      },
});

export default withNavigation(HelpInfo);
