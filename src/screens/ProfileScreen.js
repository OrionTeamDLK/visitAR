import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';


const ProfileScreen = ({ navigation }) => {
    return (
        <View>
        <Text>VisitAR</Text>
        <Text>profile screen</Text>
        <Text>Profile data</Text>
        <NavigationButton 
        title="Home"
        icon = "home"
        navName = "Index"/>
        <NavigationButton 
        title="Update Profile"
        icon = "edit"
        navName = "EditProfile"/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;