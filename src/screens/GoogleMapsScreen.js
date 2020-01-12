import React from "react";
import { StyleSheet, Text, View, Dimensions, Button, Animated, Image, Easing, requireNativeComponent } from "react-native";
import NavigationButton from "../Components/NavigationButton";
import AnimatedLoadingBar from "../Components/AnimatedLoadingBar"
import MapView, { Marker } from "react-native-maps";
import * as Permissions from 'expo-permissions';

const locations = require('../locations.json')
import Polyline from '@mapbox/polyline';



export default class GoogleMapsScreen extends React.Component {

	//Setting Default values for Lat and Long, latDelta and longDelta
	constructor(props) {
		super(props)
		this.state = {
			latitude: null,
			longitude: null,
			latitudeDelta: 0.004,
			longitudeDelta: 0.004,
			locations: locations,
			coords: []
		}
	}

	setCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }),
			(error) => console.log('Error:', error), { timeout: 2000 }
		)
	}

	async componentWillMount() {

		const startinglocation = locations[0].latitude.toString() + "," + locations[0].longitude.toString()

		const endingLocation = locations[locations.length - 1].latitude.toString() + "," + locations[locations.length - 1].longitude.toString()

		console.log("Current State in getDirections (start):", startinglocation, " and ", endingLocation)
		try {
			//testing api key: AIzaSyBMnobh4eBn1gM1lEetqGSLrKmvF_qecgU
			//fetches direction data from Google
			let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startinglocation}&destination=${endingLocation}&key=AIzaSyBMnobh4eBn1gM1lEetqGSLrKmvF_qecgU
			`)
			//Decoding encoded ployline data
			let respJson = await resp.json();
			//Converted decoded data into a lost of objects
			let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			//Updating state
			let coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1]
				}
			})
			this.setState({ coords: coords })
		} catch (error) {
			console.log("An Error Has occurred: ", error)
		}
		//console.log("Current State in getDirections (ENd):", this.state)

	}

	markers() {
		const { mLocations } = this.state.locations
		console.log("MarkerLocations: ", mLocations)
		// return (
		// 	<View>
		// 		{
		// 		mLocations.map((location,index) => {
		// 			const {
		// 				coords: {latitude, longitude} 
		// 			} = location

		// 			return (
		// 				<Marker
		// 				key = {index}
		// 				coordinate={{latitude, longitude}}
		// 				/>
		// 			)
		// 		})
		// 	}
		// 	</View>
		// )
	}


	//AS class is run, ensure permissions have been gotten.
	async componentDidMount() {


		//Declaring a variable, status. to ask for permission for location services.
		let { status } = await Permissions.askAsync(Permissions.LOCATION);

		//If Permissions were not given, error message to display.
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		//Takes two arguments, both callbacks, one for sucess, one for error
		this.setCurrentLocation();

		//Comparing Current psoition with passable objects, set to 0 for now
		if (this.state.latitude == 0 && this.state.longitude == 0) {
			this.setState({ proximity: "yes" })
		}




	}

	// const {locations: [sampleLocation]} = this.state

	// this.setState({
	// 	desLatitude: sampleLocation.coords.latitude,
	// 	desLongitude: sampleLocation.coords.longitude
	// }, () => console.log())




	recenter = () => {
		console.log("Current State (recenter):", this.state)
		const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state;
		this.mapView.animateToRegion({ latitude, longitude, latitudeDelta, longitudeDelta }, 1000)
	}

	//Managing Recentering the Map
	// recenterHandler = () => {
	// this.setCurrentLocation();
	// setTimeout(() => {this.recenter()}, 2000);}


	//https://medium.com/@ali_oguzhan/react-native-maps-with-google-directions-api-bc716ed7a366




	render() {

		return (
			this.state.latitude ?
				<View data-test="GoogleMaps_ScreenView" style={styles.container}>

					<MapView
						ref={(ref) => this.mapView = ref}
						showsUserLocation
						data-test="MapView"
						style={styles.mapStyle}
						customMapStyle={mapStyle}
						region={this.state}
					>

						<MapView.Polyline
							coordinates={this.state.coords}
							strokeWidth={2.5}
							strokeColor="#4d99e6" />

					</MapView>

					<View data-test="ButtonView" style={styles.ovewrlayView}>
						<NavigationButton
							data-test="Screen_Nav_Button"
							title="AR View"
							icon="globe"
							navName="Index"
							style={{ position: "absolute", bottom: 250 }}
						/>
						<Button
							title="Center"
							data-test="Screen_Recenter_Button"
							onPress={() => this.recenter()}
						/>
					</View>
				</View > :
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} data-test="Alt_View">
					<AnimatedLoadingBar data-test="Loading_Bar" />
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#c9b391",
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
