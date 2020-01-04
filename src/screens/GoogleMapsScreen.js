import React from "react";
import { StyleSheet, Text, View, Dimensions, Button, Animated, Image, Easing, requireNativeComponent } from "react-native";
import NavigationButton from "../Components/NavigationButton";
import AnimatedLoadingBar from "../Components/AnimatedLoadingBar"
import MapView from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default class GoogleMapsScreen extends React.Component {
export default class GoogleMapsScreen extends React.Component
{

	//Setting Default values for Lat and Long
	state = {
	state =
	{
		latitude: null,
		longitude: null,
		latitudeDelta: 0.004,
		longitudeDelta: 0.004
	}

	//AS class is run, ensure permissions have been gotten.
	async componentDidMount() {
	async componentDidMount()
	{

		//Declaring a variable, status. to ask for permission for location services.
		let { status } = await Permissions.askAsync(Permissions.LOCATION);

		//If Permissions were not given, error message to display.
		if (status !== 'granted') {
		if (status !== 'granted')
		{
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		//Takes two arguments, both callbacks, one for sucess, one for error
		navigator.geolocation.getCurrentPosition(
		navigator.geolocation.getCurrentPosition
		(
			({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
			(error) => console.log('Error:', error)
		)

		//Comparing Current psoition with passable objects, set to 0 for now
		if (this.state.latitude == 0 && this.state.longitude == 0) {
		if (this.state.latitude == 0 && this.state.longitude == 0)
		{
			this.setState({ proximity: "yes" })
		}


	}

	//Managing Recentering the Map
	recenter = () => {
		console.log("Current State (recenter):", this.state)
		const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
		this.mapView.animateToRegion({ latitude, longitude, latitudeDelta, longitudeDelta })
	}

	render() {
	render()
	{

		console.log("Current State:", this.state)

		if (this.state.latitude) {
		if (this.state.latitude)
		{


			return (

				<View data-test="GoogleMapsScreen_view" style={styles.container}>


				<View data-test="GoogleMaps_ScreenView" style={styles.container}>

					<MapView
						ref={(ref) => this.mapView = ref}
						showsUserLocation
						data-test="GoogleMapsScreen_map_view"
						data-test="MapView"
						style={styles.mapStyle}
						customMapStyle={mapStyle}
						region={this.state}
						

					/>

					<View
						style={styles.ovewrlayView}>

					data-test="ButtonView"
					style={styles.ovewrlayView}>

						<NavigationButton
							data-test="GoogleMapsScreen_button"
							data-test="Screen_Nav_Button"
							title="AR View"
							icon="globe"
							navName="Index"
							style={{ position: "absolute", bottom: 250 }}
						/>

						<Button
						title="Press me"
						onPress={() => this.recenter()}
					/>
						data-test="Screen_Recenter_Button"
						onPress={() => this.recenter()} />

					</View>
					

				</View>

			);
		} else {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<AnimatedLoadingBar />

		}
		else
		{
			return
			(
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} data-test="Alt_View">
					<AnimatedLoadingBar data-test = "Loading_Bar" />
				</View>
			);

		}
	}
}





const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	mapStyle: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	overlayButton: {
		position: "absolute",
		bottom: 50
	},
	ovewrlayView: {
		position: "absolute", //use absolute position to show button on top of the map
		top: "0%", //for center align
		alignSelf: 'center'
	}
});

// export default GoogleMapsScreen;

const mapStyle = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#ebe3cd"
			}
		]
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#523735"
			}
		]
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#f5f1e6"
			}
		]
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#c9b2a6"
			}
		]
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#dcd2be"
			}
		]
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#ae9e90"
			}
		]
	},
	{
		featureType: "landscape.natural",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#93817c"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#a5b076"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#447530"
			}
		]
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#f5f1e6"
			}
		]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{
				color: "#fdfcf8"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#f8c967"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#e9bc62"
			}
		]
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry",
		stylers: [
			{
				color: "#e98d58"
			}
		]
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#db8555"
			}
		]
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#806b63"
			}
		]
	},
	{
		featureType: "transit.line",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae"
			}
		]
	},
	{
		featureType: "transit.line",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#8f7d77"
			}
		]
	},
	{
		featureType: "transit.line",
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#ebe3cd"
			}
		]
	},
	{
		featureType: "transit.station",
		elementType: "geometry",
		stylers: [
			{
				color: "#dfd2ae"
			}
		]
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#b9d3c2"
			}
		]
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#92998d"
			}
		]
	}
];
