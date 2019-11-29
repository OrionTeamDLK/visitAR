import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const LoginScreen = ({ navigation }) => {
    return (
        <View data-test = "LoginScreen_view">
            <Text data-test = "LoginScreen_text">VisitAR</Text>
            <Text data-test = "LoginScreen_text">login Screen!</Text>
            <Text data-test = "LoginScreen_text">Google login details</Text>
            <Text data-test = "LoginScreen_text">Faceboks login details</Text>
            <Text data-test = "LoginScreen_text">Cstom login details</Text>
            <NavigationButton
            data-test = "LoginScreen_button"
            title="Login"
            icon = "sign-in"
            navName = "Profile"/>
            <NavigationButton
            data-test = "LoginScreen_button"  
            title="Register"
            icon = "pencil-square-o"
            navName = "Register"/>
        </View>
    );
};

const styles = StyleSheet.create({
    iconStyle:{
        marginHorizontal:10
    }
});

export default LoginScreen;
