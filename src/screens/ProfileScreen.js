import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const ProfileScreen = ({ navigation }) => {
    return (
        <View data-test = "ProfileScreen_view">
        <Text data-test = "ProfileScreen_text">VisitAR</Text>
        <Text data-test = "ProfileScreen_text">profile screen</Text>
        <Text data-test = "ProfileScreen_text">Profile data</Text>
        <NavigationButton
        data-test = "ProfileScreen_button"
        title="Home"
        icon = "home"
        navName = "Index"/>
        <NavigationButton
        data-test = "ProfileScreen_button"
        title="Update Profile"
        icon = "edit"
        navName = "EditProfile"/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
