import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';

const RegisterScreen = () => {
    return (
        <View data-test = "RegisterScreen_view">
        <Text data-test = "RegisterScreen_text">VisitAR</Text>
        <Text data-test = "RegisterScreen_text">Register screen</Text>
        <Text data-test = "RegisterScreen_text">inpit fields</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
