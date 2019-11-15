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
				autoplayDelay={3}
				autoplayLoop
			>
				<HelpInfo num='1' />
				<HelpInfo num='2' />
				<HelpInfo num='3' />
				<HelpInfo num='4' />

			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});
