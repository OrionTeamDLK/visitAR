import React from "react";
import { StyleSheet, Dimensions, Image, View, TouchableOpacity, Text } from "react-native";
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
		<>
			<Swiper
				loop
				showsPagination={false}
				index={0}
				showsButtons
				scrollEnabled={this.state.outerScrollEnabled}
				height={window.height}
				width={window.width}
				style={{paddingHorizontal: 10}}
			>

					
				<Image style={{width:"100%", height:"90%"}}
					source={require('../../assets/helpScreen/HelpScreen0.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen1.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen2.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen3.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen4.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen5.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen6.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen7.png')}/>
				<Image style={{width:"100%", height:"100%"}}
					source={require('../../assets/helpScreen/HelpScreen8.png')}/>

			</Swiper>
		</>
		);
	}
}

const styles = StyleSheet.create({});
