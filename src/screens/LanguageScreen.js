import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LanguageScreen = () => {
    return (
        <View data-test = "LanguageScreen_view">
        <Text data-test = "LanguageScreen_text">VisitAR</Text>
        <Text data-test = "LanguageScreen_text">Language screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default LanguageScreen;
