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
    TouchableHighlight
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
import { getDistance, getPreciseDistance, geolib } from "geolib";
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import * as Progress from 'react-native-progress';


var closestToken;
var num_of_tokens=0;
var token1=0;
var token2=0;
var token3=0;
var token4=0;

var tokens=[token1, token2,token3,token4];
  
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


        this.setTokens();
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
            console.log(results.data.starting_point)

            this.setState({
                origin: {
                    "latitude": this.state.latitude,
                    "longitude": this.state.longitude
                },
                destination: {
                    "latitude": results.data.starting_point._latitude,
                    "longitude": results.data.starting_point._longitude
                }
            })
            console.log("To Start Call Finished: Fn toStart: ", this.state)
            this.hideLoader();
        })
    }

    showLoader = () => {
        this.setState({ showLoader: true });
    };

    hideLoader = () => {
        this.setState({ showLoader: false });
    };

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


    distnaceBetweenLocationAndTokens = () => {
             
this.setTokens();
console.log(tokens);
console.log(this.state.longitude);
console.log(this.state.latitude);
             
			//calculating what the closts token is
			 closestToken = Math.min(...tokens) // 1
            this.setState({closestToken});
            
			 //num_of_tokens=0;	

			 //for each token , check that the closest token is less than 5 meters( for testing i use a larger number)
             if(closestToken <5 && num_of_tokens<=4 )                    
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


    render() {

        let {
            destination,
            origin
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
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={2.5}
                            strokeColor="#4d99e6"
                            mode="WALKING"
                        />


                        {destination && <MapView.Marker
                            coordinate={destination}
                            icon={require('../../assets/PointOfInterestIcon.png')}
                        />}

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

<TouchableHighlight
                style={styles.buttonStyle}
                onPress={() => {
                  this.distnaceBetweenLocationAndTokens();
                }}>
		<Text>Pick up token</Text>
				
        </TouchableHighlight>

       

        <Progress.Bar  progress={num_of_tokens/4} width={200} />

        

        
                    </View>

                    {/* ReCenter Button  */}

                    

                    {/* Start Tour Button  */}
                    <UserInterface 
                    CallStartTour={this.toStart.bind(this)} 
                    CallReCenter={this.recenter.bind(this)} 
                    status={this.state.uiState}
                    />
                    



                    
                </View >
                :
                <View style={{ flex: 1, justifyContent: 'left', alignItems: 'center' }} data-test="Alt_View">
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
		backgroundColor: 'blue',
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
