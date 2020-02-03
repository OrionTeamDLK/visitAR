import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Button } from 'react-native'
import HelpInfoButton from "../Components/HelpInfoButton"

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
                style={{ position: "absolute", left: 10, top: 10 }}>

                <View
                    style={{
                        height: 80,
                        width: 80,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        padding: 10,
                        borderWidth: 0.1,
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                    <Text style={{
                        color: "white",
                        fontSize: 25,
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
                    showView: true
                },
                {
                    onPress: this.props.CallReCenter,
                    height: 120,
                    width: 120,
                    color: "white",
                    text: "Recenter",
                    fontsize: 22,
                    showView: false
                }]
        }
    }



    render() {
        return (
            <>

                <HelpInfoButton style={{
                    position: "absolute",
                    top: 0,
                    alignSelf: 'right'
                }} navName="Help" />
                <HideStartedTourReCenterButton status={this.props.status} CallReCenter={this.props.CallReCenter} />
                <ShowEndTourButton status={this.props.status} endTour={this.props.endTour} />
                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 20,
                    alignSelf: 'center'
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
                        <Text style={{
                            color: this.state.uiState[this.props.status].color,
                            fontSize: this.state.uiState[this.props.status].fontsize
                        }}>{this.state.uiState[this.props.status].text}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
}
export default UserInterface