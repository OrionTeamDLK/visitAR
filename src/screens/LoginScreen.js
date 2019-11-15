import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>VisitAR</Text>
            <Text>login Screen!</Text>
            <Text>Google login details</Text>
            <Text>Faceboks login details</Text>
            <Text>Cstom login details</Text>
            <NavigationButton 
            title="Login"
            icon = "sign-in"
            navName = "Profile"/>
            <NavigationButton 
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