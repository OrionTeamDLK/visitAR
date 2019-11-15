import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationButton from '../Components/NavigationButton';


const MenuScreen = ({ navigation }) => {
	return (
		<View>
			<Text>VisitAR</Text>
			<Text>Menu Screen!</Text>
			<NavigationButton 
			title="Profile"
			icon = "address-card"
			navName = "Profile"/>
			<NavigationButton 
			title="Login"
			icon = "sign-in"
			navName = "Login"/>
			<NavigationButton 
			title="Language"
			icon = "language"
			navName = "Language"/>
			<NavigationButton 
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
