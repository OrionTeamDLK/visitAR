import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationButton from '../Components/NavigationButton';


const MenuScreen = ({ navigation }) => {
	return (
		<View data-test = "MenuScreen_view">
			<Text data-test = "MenuScreen_text">VisitAR</Text>
			<Text data-test = "MenuScreen_text">Menu Screen!</Text>
			<NavigationButton
			data-test = "MenuScreen_button"
			title="Profile"
			icon = "address-card"
			navName = "Profile"/>
			<NavigationButton
			data-test = "MenuScreen_button"
			title="Login"
			icon = "sign-in"
			navName = "Login"/>
			<NavigationButton
			data-test = "MenuScreen_button"
			title="Language"
			icon = "language"
			navName = "Language"/>
			<NavigationButton
			data-test = "MenuScreen_button"
			title="Settings"
			icon = "cog"
			navName = "Settings"/>
		</View>
	);
};

const styles = StyleSheet.create({
    iconStyle:{
        marginHorizontal:10
    }
});

export default MenuScreen;
