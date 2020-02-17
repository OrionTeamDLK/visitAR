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
    requireNativeComponent,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar
} from "react-native";

import {
    GOOGLE_MAPS_APIKEY,
    JWT_SECRET
} from "../../config/config.js"
import NavigationButton from "../Components/NavigationButton";
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
import {
    withTheme
} from "react-native-elements";
import UserInterface from "../Components/UserInterface";
import {
    HitTestResultTypes
} from "expo/build/AR";
import {
    getDistance,
    getPreciseDistance,
    geolib
} from "geolib";
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import * as Progress from 'react-native-progress';
import InfoPopUp from "../Components/InfoPopUp";
import CustomMarker from "../Components/CustomMarker";
import PickUpTokenButton from "../Components/PickUpTokenButton";
import { Notifications } from 'expo'



var closestToken;
var num_of_tokens = 0;
var token1 = 0;
var token2 = 0;
var token3 = 0;
var token4 = 0;

var tokens = [token1, token2, token3, token4];
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
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
            coords: [],
            showLoader: false,
            uiState: 0,
            waypoints: null,
            tour: {
                tourStarted: false,
                origin: null,
                destination: null,
                nextLocation: 1
            }
        }
    }

    async componentDidMount() {
        this.registerForPushNotifications();
        //set Axios Request Auth Header with JWT Token
        let access_token = JWT.encode({ foo: "bar" }, JWT_SECRET);
        Axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        //Declaring a variable, status. to ask for permission for location services.
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        //If Permissions were not given, error message to display.
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        this.setCurrentLocation();

        //Comparing Current psoition with passable objects, set to 0 for now
        if (this.state.latitude == 0 && this.state.longitude == 0) {
            this.setState({
                proximity: "yes"
            })
        }

        this.setTokens();

        this.getWaypoints();

        Location.watchPositionAsync(LOCATION_SETTINGS, location => {

            let {
                waypoints
            } = this.state;

            let {
                origin,
                destination,
                tourStarted,
                nextLocation
            } = this.state.tour


            if (waypoints != null && tourStarted) {

                let distance = getDistance(location.coords, waypoints[nextLocation - 1].location);
                console.log(distance);

                if ((distance < 20) && (waypoints[nextLocation - 1].id == nextLocation) && (!waypoints[nextLocation - 1].visited)) {

                    const newState = JSON.parse(JSON.stringify(this.state));

                    if (nextLocation != waypoints.length) {
                        alert(`${waypoints[nextLocation - 1].title} Landmark Triggered`);

                        newState.waypoints[nextLocation - 1].visited = true;
                        newState.tour.nextLocation++;
                        newState.tour.destination = newState.waypoints[newState.tour.nextLocation - 1].location;
                        this.setState(newState);

                    } else {
                        alert(`${waypoints[nextLocation - 1].title} Landmark Triggered`);
                        newState.waypoints[nextLocation - 1].visited = true;
                        this.setState(newState);
                    }
                }
            }

            let tourCopy = { ...this.state.tour }
            if (tourCopy.tourStarted) {
                tourCopy.origin = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
                this.setState({ tour: tourCopy })
            }

        });

    }

    setCurrentLocToCarlingford = () => {

        const latitudeCarlingford= 54.041000
        const longitudeCarlingford= -6.185922
        let timer= null

        let coordCheck = false;
        if (latitudeCarlingford != this.state.latitude) {
            timer = setTimeout(() => this.showLoader, 1000);
            coordCheck == true;
        }


        console.log("Continuing")

        this.setState({
            latitude: latitudeCarlingford,
            longitude: longitudeCarlingford
        });
        clearTimeout(timer);
        this.hideLoader();
        //wait timer
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

    setCurrentLocation = async () => {
        console.log('alert')
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
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
            console.log("Tour Data Request Response: Fn getWaypoints")

            let waypointArr = [];

            for (let waypoint of results.data.tourStops) {
                waypointArr.push({
                    "id": waypoint.id,
                    "visited": false,
                    "title": waypoint.name,
                    "description": waypoint.history,
                    "image": waypoint.image,
                    "fact": waypoint.fact,
                    "location": {
                        "latitude": waypoint.location._latitude,
                        "longitude": waypoint.location._longitude
                    }
                })
            }

            // let tour = {
            //     ...this.state
            // }
            // tour.waypoints = waypointArr;
            this.setState({
                waypoints: waypointArr
            })

            this.hideLoader();
        })
    }

    recenter = () => {
        console.log("Re Centering the User")
        this.setCurrentLocation();
        let coordCheck = false;
        if (latitude == this.state.latitude) {
            this.showLoader();
            coordCheck == true;
        }
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
        if (coordCheck == true) {setTimeout(this.hideLoader, 2000);}
    }

    endTour = () => {
        //alert("This is the end tour screen");
        this.showLoader();
        let tour = {
            ...this.state.tour
        }
        tour.origin = null;
        tour.destination = null;
        tour.tourStarted = false;

        this.setState({
            tour,
            uiState: 0
        })

        {/*this.setState({
            uiState: 1
        })*/}

        this.hideLoader();
        this.props.navigation.navigate("EndTour");
    
    }

    toStart = () => {
        this.showLoader();
        //alert("start tour stuff and things");
        console.log("Setting the start point")

        let tour = { ...this.state.tour }
        tour.origin = {
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
        }
        tour.destination = this.state.waypoints[0].location;
        tour.tourStarted = true;

        this.setState({
            tour,
            uiState: 1
        })
        this.hideLoader();
    }

    showLoader = () => this.setState({ showLoader: true });

    hideLoader = () => this.setState({ showLoader: false });

    
    setTokens = ()  => 
    {
        navigator.geolocation.getCurrentPosition(
            position => { 	
                //comparring my current geo location with the location of the tokens in Carlingford.
              if(tokens[0]!=99999999){
                tokens[0] = getPreciseDistance(
      
                { latitude: position.coords.latitude, longitude: position.coords.longitude },
                { latitude: 54.041875, longitude: -6.18777778 }
              );    			 
              this.setState({token1});
            
               }
      
               if(tokens[1]!=99999999){
                tokens[1] = getPreciseDistance(
      
                { latitude: position.coords.latitude, longitude: position.coords.longitude },
                { latitude: 54.04219, longitude: -6.187161 }
              );      
               this.setState({token2});
            
               }
  
               if(tokens[2]!=99999999){
                tokens[2] = getPreciseDistance(
      
                  { latitude: position.coords.latitude, longitude: position.coords.longitude },
                  { latitude: 54.03935278, longitude: -6.18638889 }
                );      
              this.setState({token3});
           
               }
  
               if(tokens[3]!=99999999){
                tokens[3] = getPreciseDistance(
      
                  { latitude: position.coords.latitude, longitude: position.coords.longitude },
                  { latitude: 54.03803889, longitude: -6.185 }
                );      
              this.setState({token4});
         
               }



               error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            }
        )
        
    }


    TokenGame = () => {
             
this.setTokens();
console.log(tokens);

             
			//calculating what the closts token is
			 closestToken = Math.min(...tokens) // 1
            this.setState({closestToken});
            
			 //num_of_tokens=0;	

             //for each token , check that the closest token is less than 5 meters( for testing i use a larger number)
             if(closestToken>800){
                 alert("You must be Carlingford town to pick up tokens.")
             }
             else if (closestToken <5 && num_of_tokens<=4 )                    
             {
             //for loop to run through all of the tokens, to see if there is a token that matches the closest token            
				for( var i=0; i<tokens.length; i++)
				{
					
						//match the closest distance with the relevant token  
						if(tokens[i]==closestToken)
						{
							//add a token to the count of tokens
							num_of_tokens++;
                            this.setState({num_of_tokens});
                            
                            var token_number=tokens.indexOf(closestToken);
                            if(num_of_tokens<4){
                            Speech.speak('congratulations! you have found ' + num_of_tokens +' of 4 tokens');
                            }
                            else if(num_of_tokens==4)
                            {
                                Speech.speak('congratulations! you have found all 4 tokens!');
                            }
							
							//reset the token distance to 9999999 (a number that should always be bigger than the rest)and so that it will never be the minimum as above
							const index = tokens.indexOf(tokens[i]);
							if (index !== -1) 
							{
   							 tokens[index] = 99999999;
							}	
							
                            this.setState({tokens})	;
                            console.log("tokens modified")
                            this.setTokens();
                            console.log(tokens);
						}
                    }                  
                    
                }

                else{
                    if(num_of_tokens<4){
                    //nearest_token=("you are " + closestToken + " from the closest token!")
                    alert("you are " + closestToken + " from the closest token!");
                    }
                    else{
                        alert("you have found all 4 tokens!");

                    }
                    
       // this.setState({nearest_token});
                }
            
           
                
		
		
	  }


    registerForPushNotifications = async () =>{
        //check for permissions...
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;

        //if no existing permissions, ask user for permissions...
        if(status != 'granted'){
            const {status} = await Permissions.askAsync.NOTIFICATIONS;
            finalStatus = status;
        }

        //if no permissions, exit the function....
        if(finalStatus != 'granted') {return}

        //get push notification token...
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
    }

    render() {
        let {
            latitude,
            longitude,
            waypoints
        } = this.state

        let {
            origin,
            destination,
            tourStarted
        } = this.state.tour

        return (
            this.state.latitude ?
                <View data-test="GoogleMaps_ScreenView" style={styles.container}>


                    <View>
                        <StatusBar hidden={true} />
                    </View>


                    
                    <TouchableHighlight
                        style={{   
                                 justifyContent: 'center',
                        alignItems: 'center',
                        height: 60,
                        backgroundColor: '#4B6296',
                        margin: 10,
                        top:10,}}
                        onPress={() => {
                            this.TokenGame();
                        }}>
                        <Text style={{top:5, color:"white"}}>Pick up token</Text>

                    </TouchableHighlight>
                    <Progress.Bar progress={num_of_tokens / 4} width={200} />









                    <MapView
                        ref={(ref) => this.mapView = ref}
                        showsUserLocation
                        data-test="MapView"
                        style={styles.mapStyle}
                        customMapStyle={mapStyle}
                        initialRegion={{
                            latitude: 54.041000,
                            longitude: -6.185922,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta}}
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

                        {//destination && <MapView.Marker
                            //    coordinate={destination}
                            //  icon={require('../../assets/PointOfInterestIcon.png')}/>
                        }

                        {tourStarted && waypoints.map((waypoint, index) =>
                            <Marker
                                coordinate={waypoint.location}
                                key={waypoint.title}
                                icon={waypoint.visited ?
                                    require('../../assets/PointOfInterestIconVisited.png')
                                    :
                                    require('../../assets/PointOfInterestIcon.png')
                                }
                            >
                                <Callout
                                    onPress={e => {
                                        this.props.navigation.navigate('Landmark', { landmark: waypoint });
                                    }
                                    }>
                                    <InfoPopUp title={waypoint.title} description={waypoint.description} />
                                </Callout>
                            </Marker>)}
                    </MapView>

                    {this.state.showLoader && (
                        <Spinner
                            visible={true}
                            textContent={"Getting Route..."}
                            textStyle={styles.spinnerTextStyle}
                        />
                    )}

                    <UserInterface
                        CallStartTour={this.toStart.bind(this)}
                        CallReCenter={this.recenter.bind(this)}
                        endTour = {this.endTour.bind(this)}
                        setCurrentLocToCarlingford={this.setCurrentLocToCarlingford.bind(this)}
                        status={this.state.uiState}
                        //distnaceBetweenLocationAndTokens={this.distnaceBetweenLocationAndTokens.bind(this)}
                    />
                </View >
                :
                <View style={{ flex: 1, alignItems: 'center' }} data-test="Alt_View">
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
    overlayButton: {
        position: "absolute",
        bottom: 140,
        alignSelf: 'center'
    },
    ovewrlayView: {
        position: "absolute", //use absolute position to show button on top of the map
        top: "0%", //for center align
        alignSelf: 'center'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#4B6296',
        margin: 10,
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
},


];
