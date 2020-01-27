import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Animated,
    Image,
    Easing,
    TouchableOpacity
} from "react-native";
import { GOOGLE_MAPS_APIKEY, JWT_SECRET } from "../../config/config.js"
import NavigationButton from "../Components/NavigationButton";
import AnimatedLoadingBar from "../Components/AnimatedLoadingBar"
import Spinner from "react-native-loading-spinner-overlay";
import MapView, {
    Marker
} from "react-native-maps";
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions'
import JWT from "expo-jwt";
import Axios from "axios";
import { withTheme } from "react-native-elements";
import UserInterface from "../Components/UserInterface"
import { HitTestResultTypes } from "expo/build/AR";

export default class GoogleMapsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
            coords: [],
            origin: null,
            destination: null,
            waypoints: null,
            showLoader: false,
            uiState: 0
        }
    }

    async componentDidMount() {
        //set Axios Request Auth Header with JWT Token
        let access_token = JWT.encode({ foo: "bar" }, JWT_SECRET);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        //Declaring a variable, status. to ask for permission for location services.
        let {
            status
        } = await Permissions.askAsync(Permissions.LOCATION);

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
            this.setState({
                proximity: "yes"
            })
        }
    }

    setCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            this.setState({
                latitude,
                longitude
            })
        },
            (error) => console.log('Error:', error), {
            timeout: 2000
        }
        )
    }

    recenter = () => {
        console.log("Re Centering the User")

        const {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        } = this.state;

        this.mapView.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        }, 1000)
    }

    toStart = () => {

        console.log("Setting the start point")

        this.setState({uiState: 1})

        this.showLoader();

        const tourId = 1;

        Axios({
            method: "get",
            url: `https://orion-visitar.herokuapp.com/tourData?id=${tourId}`
        }).then((results) => {
            console.log("Tour Data Request Response: Fn toStart")

            let waypointArr = [];
            let markerArr = [];

            for(let waypoint of results.data.tourStops){
              waypointArr.push({
                "title": waypoint.name,
                "description": waypoint.history,
                "location": {
                  "latitude": waypoint.location._latitude,
                  "longitude": waypoint.location._longitude
                }
              })

              markerArr.push({
                "latitude": waypoint.location._latitude,
                "longitude": waypoint.location._longitude
              })
            }

            this.setState({
                origin: {
                    "latitude": this.state.latitude,
                    "longitude": this.state.longitude
                },
                destination: {
                    "latitude": results.data.starting_point._latitude,
                    "longitude": results.data.starting_point._longitude
                },
                waypoints: waypointArr,
                markers: markerArr
            })
            console.log("To Start Call Finished: Fn toStart: ", this.state)
            this.hideLoader();
        })
    }

    showLoader = () => this.setState({ showLoader: true });

    hideLoader = () => this.setState({ showLoader: false });


    render() {

        let {
            destination,
            origin,
            waypoints,
            markers
        } = this.state

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
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            waypoints={markers}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={2.5}
                            strokeColor="#4d99e6"
                            mode="WALKING"
                        />

                      {destination && waypoints.map((waypoint, index) =>

                        <Marker
                          coordinate={waypoint.location}
                          title={waypoint.title}
                          description={waypoint.description}
                          styles={styles.marker}
                        >
                        </Marker>
                      )}


                    </MapView>

                    {this.state.showLoader && (
                        <Spinner
                            visible={true}
                            textContent={"Getting Route..."}
                            textStyle={styles.spinnerTextStyle}
                        />
                    )}

                    {/* AR View Button  */}
                    <View data-test="ButtonView" style={{
                        position: "absolute", //use absolute position to show button on top of the map
                        top: "0%", //for center align
                        alignSelf: 'center'
                    }}>

                        <NavigationButton
                            data-test="Screen_Nav_Button"
                            title="AR View"
                            icon="globe"
                            navName="Index"
                            style={styles.ovewrlayView}
                        />
                    </View>

                    <UserInterface
                    CallStartTour={this.toStart.bind(this)}
                    CallReCenter={this.recenter.bind(this)}
                    status={this.state.uiState}
                    />

                </View >
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} data-test="Alt_View">
                    <AnimatedLoadingBar data-test="Loading_Bar" />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e4d9c0",
        alignItems: "center",
        justifyContent: "center"

    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    marker: {
      backgroundColor: "#550bbc",
      margin:20
      padding: 5,
      borderRadius: 5,
  },
    overlayButton: {
        position: "absolute",
        bottom: 140,
        alignSelf: 'center'
    },
    ovewrlayView: {
        position: "absolute", //use absolute position to show button on top of the map
        top: "0%", //for center align
        alignSelf: 'center'
    }
});

const mapStyle = [{
    elementType: "geometry",
    stylers: [{
        color: "#e4d9c0"
    }]
},
{
    elementType: "labels.text.fill",
    stylers: [{
        color: "#523735"
    }]
},
{
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#f5f1e6"
    }]
},
{
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#c9b2a6"
    }]
},
{
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#dcd2be"
    }]
},
{
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#ae9e90"
    }]
},
{
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{
        color: "#e4d9c0"
    }]
},
{
    featureType: "poi",
    elementType: "geometry",
    stylers: [{
        color: "#e4d9c0"
    }]
},
{
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#93817c"
    }]
},
{
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{
        color: "#a5b076"
    }]
},
{
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#447530"
    }]
},
{
    featureType: "road",
    elementType: "geometry",
    stylers: [{
        color: "#f5f1e6"
    }]
},
{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
        color: "#fdfcf8"
    }]
},
{
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{
        color: "#f8c967"
    }]
},
{
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#e9bc62"
    }]
},
{
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{
        color: "#e98d58"
    }]
},
{
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [{
        color: "#db8555"
    }]
},
{
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#806b63"
    }]
},
{
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{
        color: "#e4d9c0"
    }]
},
{
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#8f7d77"
    }]
},
{
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [{
        color: "#ebe3cd"
    }]
},
{
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{
        color: "#e4d9c0"
    }]
},
{
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{
        color: "#b9d3c2"
    }]
},
{
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{
        color: "#92998d"
    }]
}
];
