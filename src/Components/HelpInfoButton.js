import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';


const HelpInfoButton = (props) => {

    return (

        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.navName)}
            style={{
                position: "absolute",
                right: 20,
                alignSelf: 'center',
                top: 5,

            }}>
            <View style={{
                overflow: 'hidden',
                backgroundColor: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 120,
                borderWidth: 5,
                borderColor: "#4c6294",
                height: 60,
                width: 60
            }}>
                <Text style={{ color: "#4c6294", fontSize: 40, fontWeight: "bold"}}>
                    ?
                </Text>
            </View>
        </TouchableOpacity>

    );
}

export default withNavigation(HelpInfoButton);
