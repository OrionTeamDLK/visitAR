import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';

const SwitchModeButton = (props) => {

    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.navName)}
            style={{
                overflow: 'hidden',
                backgroundColor: '#4c6294',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                top: 0
            }}>
            <View>
                <Text style={props.styleText}>
                    <Icon name={props.icon} size={30} color="white" />
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(SwitchModeButton);
