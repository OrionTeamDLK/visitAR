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
		<View>
			<Text>VisitAR</Text>
			<Text>Index Screen!</Text>
			<NavigationButton 
			title="Maps View"
			icon = "map-o"
			navName = "GMaps"
			/>
			<NavigationButton 
			title="Menu View"
			icon = "cogs"
			navName = "Menu"
			/>
			<NavigationButton 
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
