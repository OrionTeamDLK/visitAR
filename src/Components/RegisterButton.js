import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';



const RegisterButton = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(props.navName)}
            style={{
                backgroundColor: '#808080',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderTopColor: "#d9d9d9",
                borderTopWidth: 2
            }}>
            <View>
                <Text style={props.styleText}>
                    {props.title}
                </Text>
            </View>
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

export default withNavigation(RegisterButton);
