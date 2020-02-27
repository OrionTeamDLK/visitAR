import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavigationButton from '../Components/NavigationButton';

const SettingsScreen =()=>{
    return (
        <View data-test = "SettingsScreen_view">
            <Text style={{fontWeight:"bold", fontSize: 30}}data-test = "SettingsScreen_text">Settings screen</Text>
            <Text style={styles.textStyle} data-test = "SettingsScreen_text">-Permissions</Text>
            <Text style={styles.textStyle} data-test = "SettingsScreen_text">-Terms and conditions</Text>
            <Text style={styles.textStyle}  data-test = "SettingsScreen_text">-Logout</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize:25
    }
});

export default SettingsScreen;
