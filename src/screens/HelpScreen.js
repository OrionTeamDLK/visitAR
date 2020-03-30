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
				style={{padding: 5}}
			>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen1.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen2.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen3.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen4.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen5.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen6.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen7.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/HelpScreen8.png')}/>

			</Swiper>
		);
	}
}

const styles = StyleSheet.create({});
