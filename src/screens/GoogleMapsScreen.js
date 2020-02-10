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
import SwitchModeButton from "../Components/SwitchModeButton"
import AnimatedLoadingBar from "../Components/AnimatedLoadingBar"
import Spinner from "react-native-loading-spinner-overlay";
import MapView, {
    Marker,
    Callout
} from "react-native-maps";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions'
import JWT from "expo-jwt";
import Axios from "axios";
import { withTheme } from "react-native-elements";
import UserInterface from "../Components/UserInterface"
import { HitTestResultTypes } from "expo/build/AR"
import * as Geolib from 'geolib';

const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 200,
  distanceInterval: 0,
};

export default class GoogleMapsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
            showLoader: false,
            uiState: 0,
            tour: {
              tourStarted: false,
              origin: null,
              destination: null,
              waypoints: null,
              nextLocation: 1
            }
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

        this.setCurrentLocation();

        this.getWaypoints();

        Location.watchPositionAsync(LOCATION_SETTINGS, location => {

          //console.log(`User position : ${Date.now()} - [${location.coords.latitude},${location.coords.longitude}]`)
          //let {waypoints} = this.state;
          // this.setState({
          //  latitude: location.coords.latitude,
          //  longitude: location.coords.longitude
          // })

          let tour = {...this.state.tour}
          if(tour.tourStarted){
            tour.origin = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            };
          }
          this.setState({tour})

        //   let distance = Geolib.getDistance(location.coords, tour.waypoints[0].location)
        //   console.log(distance);

          //console.log(waypoints)
          //if(waypoints[0].location == ), xz
          //this.setState(location.coords)

        });
    }

    setCurrentLocation = async () => {

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      console.log(`User position Lat,Long : ${this.state.latitude},${this.state.longitude}`)
    };

    getWaypoints = async () => {

      this.showLoader();

      const tourId = 1;

      Axios({
          method: "get",
          url: `https://orion-visitar.herokuapp.com/tourData?id=${tourId}`
      }).then((results) => {
          console.log("Tour Data Request Response: Fn toStart")

          let waypointArr = [];

          for (let waypoint of results.data.tourStops) {
              waypointArr.push({
                  "id": waypoint.id,
                  "title": waypoint.name,
                  "description": waypoint.history,
                  "image": waypoint.image,
                  "fact": waypoint.fact,
                  "location": {
                      "latitude": waypoint.location._latitude,
                      "longitude": waypoint.location._longitude
                  },
                  "visited":false
              })
          }

          let tour = {...this.state.tour}
          tour.waypoints = waypointArr;
          this.setState({tour})

          this.hideLoader();
      })

    }

    recenter = () => {
        console.log("Re Centering the User")
        this.setCurrentLocation();
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

    endTour = () => {
        this.showLoader();


        let tour = {...this.state.tour}
        tour.origin = null;
        tour.destination = null;
        tour.tourStarted = null;

        this.setState({
          tour,
          uiState: 0
        })

        this.hideLoader();
    }

    toStart = () => {
        this.showLoader();
        console.log("Setting the start point")

        let tour = {...this.state.tour}
        tour.origin = {
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
        }
        tour.destination = tour.waypoints[0].location;
        tour.tourStarted = true;

        this.setState({
          tour,
          uiState: 1
        })


        this.hideLoader();

    }

    showLoader = () => this.setState({ showLoader: true });

    hideLoader = () => this.setState({ showLoader: false });


    render() {

        let {
            latitude,
            longitude
        } = this.state

        let {
          origin,
          destination,
          tourStarted,
          waypoints
        } = this.state.tour

        return (
            this.state.latitude ?
                <View data-test="GoogleMaps_ScreenView" style={styles.container}>

                    <MapView
                        ref={(ref) => this.mapView = ref}
                        showsUserLocation
                        data-test="MapView"
                        style={styles.mapStyle}
                        customMapStyle={mapStyle}
                        initialRegion={this.state}
                    >
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            resetOnChange={false}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={2.5}
                            strokeColor="#4d99e6"
                            mode="WALKING"
                            precision="low"
                        />

                      {destination && waypoints.map((waypoint, index) =>
                            <Marker
                              coordinate={waypoint.location}
                              key={waypoint.title}
                            >
                              <Callout
                                onPress={ e => {
                                  this.props.navigation.navigate('Landmark', {landmark: waypoint} );
                                }
                               }>
                                <View >
                                  <Text>{waypoint.title}</Text>
                                  <Text>{waypoint.description}</Text>
                                  <Text>Click For More Information...</Text>
                                </View>
                              </Callout>
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
                    {/* <View data-test="ButtonView" style={{
                        position: "absolute", //use absolute position to show button on top of the map
                        top: "0%", //for center align
                        alignSelf: 'center'
                    }}>

                        <SwitchModeButton
                            data-test="Screen_Nav_Button"
                            title="AR View"
                            icon="globe"
                            navName="Index"
                            style={styles.ovewrlayView}
                            styleText={{
                                color: "white",
                                fontSize: 20,
                                padding: 10
                            }}
                        />


                    </View> */}

                    <UserInterface
                        CallStartTour={this.toStart.bind(this)}
                        CallReCenter={this.recenter.bind(this)}
                        status={this.state.uiState}
                        endTour={this.endTour.bind(this)}
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
        margin: 20,
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
        top: 100, //for center align
        alignSelf: 'center',
        width: 20

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
