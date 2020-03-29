import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NavigationButton from '../Components/NavigationButton';
import * as firebase from 'firebase';

export default class MenuScreen extends React.Component {

	async componentWillMount() {
		await this.checkIfLoggedIn()
	}

	checkIfLoggedIn = async () => {
		await firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('Called. Logged In');
				this.setState({ loggedIn: true })
			}
		});
	}

	constructor(props) {
		super(props)

		this.state = ({
			loggedIn: false
		})
	}

	render() {
		return (
			<View data-test="MenuScreen_view" style={{ flex: 1 }}>

				{this.state.loggedIn ?
					<NavigationButton
						data-test="MenuScreen_button"
						title="Profile"
						icon="address-card"
						navName="Profile"
						styleText={{ color: "white", fontSize: 30 }}/>
					:
					<NavigationButton
						data-test="MenuScreen_button"
						title="Login/Register"
						icon="sign-in"
						navName="Login"
						styleText={{ color: "white", fontSize: 30 }}/>
				}

{/*				<NavigationButton
					data-test="MenuScreen_button"
					title="Language"
					icon="language"
					navName="Language"
					styleText={{ color: "white", fontSize: 30 }}/>
*/}

				<NavigationButton
					data-test="MenuScreen_button"
					title="Settings"
					icon="cog"
					navName="Settings"
					styleText={{ color: "white", fontSize: 30 }}/>

					<NavigationButton
					data-test="MenuScreen_button"
					title="Tutorial"
					icon="question"
					navName="Help"
					styleText={{ color: "white", fontSize: 30 }}/>

				<NavigationButton
					data-test="Tour_screen_button"
					title="TourScreen"
					icon="globe"
					navName="GMaps"
					styleText={{ color: "white", fontSize: 30 }} />

			</View>
		)
	}
}

const styles = StyleSheet.create({
	iconStyle: {
		marginHorizontal: 10
	}
});
