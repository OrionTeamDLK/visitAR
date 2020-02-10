import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';

//Patrick Has The RIght Version

const MenuButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.navName)}
            style={{
                backgroundColor: "#4c6294",
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderTopColor: "#d9d9d9",
                borderTopWidth: 2,
                left: 10
            }}>
            <View style={{
                height: 10,
                width: 30,
                backgroundColor: "#4c6294",
                borderRadius: 20
            }}/>
            <View style={{
                height: 10,
                width: 30,
                backgroundColor: "#4c6294",
                borderRadius: 20
            }}/>
            <View style={{
                height: 10,
                width: 30,
                backgroundColor: "#4c6294",
                borderRadius: 20
            }}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        //height: (Dimensions.get('window').height/ 3),
    },
    iconStyle: {
        marginHorizontal: 20,
    }
});

export default withNavigation(MenuButton);
