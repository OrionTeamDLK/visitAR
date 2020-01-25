import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationButton from '../Components/NavigationButton';

const theme = {
	Button: {
		raised: true
	}
};

export default class ArTestScreen extends React.Component {

	render() {
		return (
			<View data-test = "index_view">
				<Text data-test = "index_text">VisitAR</Text>
				<Text data-test = "index_text">Test AR Screen</Text>

			</View>
		)
	}
}

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
