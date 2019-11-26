import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';

const SettingsScreen =()=>{
    return (
        <View data-test = "SettingsScreen_view">
            <Text data-test = "SettingsScreen_text">Settings screen</Text>
            <Text data-test = "SettingsScreen_text">Logout</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default SettingsScreen;
