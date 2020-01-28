import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';



const NavigationButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.navName)}
            style={{
                flex: 2,
                overflow: 'hidden',
                backgroundColor: '#4c6294',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2
            }}>
            <Text style={{ color: "white", fontSize: 30}}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        //height: (Dimensions.get('window').height/ 3),
    },
    iconStyle: {
        marginHorizontal: 10
    }
});

export default withNavigation(NavigationButton);
