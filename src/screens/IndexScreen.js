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
		<View data-test = "index_view">
			<Text data-test = "index_text">VisitAR</Text>
			<Text data-test = "index_text">Index Screen!</Text>
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
	button: {
        maxWidth:300,
        marginHorizontal:100,

    },
    iconStyle:{
        marginHorizontal:10
    }
});

export default IndexScreen;
