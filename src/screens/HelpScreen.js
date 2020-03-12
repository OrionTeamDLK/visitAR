import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import Swiper from "react-native-swiper";
import HelpInfo from '../Components/HelpInfo';

const windowWidth = Dimensions.get("window").width;

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
			>
				<HelpInfo num='1' text='Click start tour button, follow blue line for your suggested route' />
				<HelpInfo num='2' text='click the markers for more information, text to speech is available too' />
				<HelpInfo num='3' text='Collect tokens at various landmarks' />
				<HelpInfo num='4' text='Click end tour to finish and view your stats' />
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/splash.png')}/>

			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});
