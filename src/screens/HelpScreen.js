import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import HelpInfo from '../Components/HelpInfo';

const window = Dimensions.get("window");

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			outerScrollEnabled: true
		};
	}

	render() {
		return (
			<Swiper
				loop
				showsPagination={false}
				index={0}
				showsButtons
				scrollEnabled={this.state.outerScrollEnabled}
				height={window.height}
				width={window.width}
				autoplay
				autoplayDelay={5}
				autoplayLoop
			>
				<HelpInfo num='1' text='Click start tour button, follow blue line for your suggested route' />
				<HelpInfo num='2' text='click the markers for more information, text to speech is available too' />
				<HelpInfo num='3' text='Collect tokens at various landmarks' />
				<HelpInfo num='4' text='Click end tour to finish and view your stats' />

			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});
