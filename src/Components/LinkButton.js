import React from "react";
import { StyleSheet, TouchableOpacity, Text, View,Linking,Dimensions } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';

const LinkButton = (props) => {
    return (

        <TouchableOpacity
            onPress={ ()=>{ Linking.openURL(props.link)}}
            style={styles.button}>
            <Text style={styles.text}>
                <Icon name="link" size={30} color="white" style={styles.iconStyle} />
                <Text>  </Text>
                {props.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
      marginBottom:5
    },
    iconStyle: {
      width: 22,
      height: 22,

    },
    text:{
      color:"white",
      fontSize:22
    }
});

export default withNavigation(LinkButton);
