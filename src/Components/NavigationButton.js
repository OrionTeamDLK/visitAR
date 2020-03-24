import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
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
            <View>
                <Text style={props.styleText}>
                    <Icon name={props.icon} size={30} color="white" style={styles.iconStyle} />
                    <Text>  </Text>
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

export default withNavigation(NavigationButton);
