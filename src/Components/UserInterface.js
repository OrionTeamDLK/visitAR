import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Button, Image } from 'react-native'
import HelpInfoButton from "../Components/HelpInfoButton"
import MenuButton from "../Components/MenuButton"
import { withNavigation } from 'react-navigation';
import PickUpTokenButton from "../Components/PickUpTokenButton";

HideStartedTourReCenterButton = (props) => {
    if (props.status == 0) {
        return (
            <View data-test="ButtonView" style={{
                position: "absolute",
                bottom: 150,
                alignSelf: 'center'
            }}>

                <Button
                    title="Re-Center"
                    data-test="Screen_Recenter_Button"
                    onPress={props.CallReCenter}
                />

            </View>
        )
    } else {
        return null
    }

}

ShowEndTourButton = (props) => {
    if (props.status == 1) {
        return (
            <TouchableOpacity
                onPress={props.endTour}
                //onPress={props.navigation.navigate("EndTourScreen")}
               // onPress={() => props.navigation.navigate("EndTourScreen")}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top:0,
                    alignItems: "center"
                }}
               // onPress={()=>{alert("this is the end screen")}}
                //      || props.navigation.navigate("EndTourScreen")
                >                

                <View
                    style={{
                        height: 50,
                        width: 100,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 1,
                        borderWidth: 0.1,
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center"
                    }}>End Tour
                </Text>
                </View>

            </TouchableOpacity>
        )
    } else {
        return null
    }

}


class UserInterface extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uiState:
                [{
                    onPress: this.props.CallStartTour,
                    height: 150,
                    width: 150,
                    color: "white",
                    text: "Start Tour",
                    fontsize: 25,
                    showView: true,
                    right: null
                },
                {
                    onPress: this.props.CallReCenter,
                    height: 70,
                    width: 70,
                    color: "white",
                    text: "",
                    fontsize: 22,
                    showView: false,
                    right: 20
                }]
        }
    }



    render(props) {
        return (
            <>

                <HelpInfoButton style={{
                    position: "absolute",
                    top: 0,
                    alignSelf: 'right'
                }} navName="Help" />
                <MenuButton style={{
                    position: "absolute",
                    top: 0,
                    alignSelf: 'left'
                }} navName="Menu" />


                <PickUpTokenButton 
                top="5%"/>


                {/* <HideStartedTourReCenterButton status={this.props.status} CallStartTour={this.props.CallStartTour} /> */}
                <ShowEndTourButton status={this.props.status} endTour={this.props.endTour} />

                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 30,
                    alignSelf: 'center',
                    left: 20
                }}
                    onPress={this.props.setCurrentLocToCarlingford}
                >
                    <View data-test="Screen_Recenter_Button"
                        style={{
                            borderWidth: 0.1,
                            borderColor: '#e4d9c0',
                            borderRadius: 75,
                            overflow: 'hidden',
                            height: 70,
                            width: 70,
                            backgroundColor: '#4c6294',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 3,
                            borderColor: "black"
                        }}>
                            <Image
                                style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center" }}
                                source={require('../../assets/home.png')}
                            />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 30,
                    alignSelf: 'center',
                    right: this.state.uiState[this.props.status].right
                }}
                    onPress={this.state.uiState[this.props.status].onPress}
                >

                    <View data-test="Screen_Recenter_Button"
                        style={{
                            borderWidth: 0.1,
                            borderColor: '#e4d9c0',
                            borderRadius: 75,
                            overflow: 'hidden',
                            height: this.state.uiState[this.props.status].height,
                            width: this.state.uiState[this.props.status].width,
                            backgroundColor: '#4c6294',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 3,
                            borderColor: "black"
                        }}>
                        {/* Global Text props should be used here!! */}
                        {this.props.status == 0 ?
                            <Text style={{
                                color: this.state.uiState[this.props.status].color,
                                fontSize: this.state.uiState[this.props.status].fontsize
                            }}>{this.state.uiState[this.props.status].text}</Text> :
                            <Image
                                style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
                                source={require('../../assets/recenter.png')}
                            />}
                    </View>
                </TouchableOpacity>
            </>
        )
    }
}
export default withNavigation(UserInterface)