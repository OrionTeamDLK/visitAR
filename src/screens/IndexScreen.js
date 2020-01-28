import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationButton from '../Components/NavigationButton';

const theme = {
	Button: {
		raised: true
	}
};

const IndexScreen = ({ navigation }) => {
	return (
		<View data-test = "index_view" style={{flex: 1}} >
			<NavigationButton data-test = "index_nav_button"
			title="Maps View"
			icon = "map-o"
			navName = "GMaps"
			/>
			<NavigationButton data-test = "index_nav_button"
			title="Menu View"
			icon = "cogs"
			navName = "Menu"
			/>
			<NavigationButton data-test = "index_nav_button"
			title="Help"
			icon = "question-circle"
			navName = "Help"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 30
	},
	NavigationButton: {
        flex: 2

    },
    iconStyle:{
        marginHorizontal:10
    }
});

export default IndexScreen;
