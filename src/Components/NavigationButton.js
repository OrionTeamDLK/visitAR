import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';



const NavigationButton =(props) => {
    return (

        <Button
        icon={<Icon name={props.icon} size={30} color="white" style={styles.iconStyle} />}
        raised
        color="white"
        buttonStyle={styles.button}
        title={props.title}onPress={() => props.navigation.navigate(props.navName)}


    />

    );
};

const styles = StyleSheet.create({
	button: {
        minWidth:150,
        alignSelf:'center',
    },
    iconStyle:{
        marginHorizontal:10
    }
});

export default withNavigation(NavigationButton);
