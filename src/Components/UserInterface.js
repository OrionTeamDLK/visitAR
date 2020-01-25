import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

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
            fontsize: 25
            },
            {
            onPress: this.props.CallReCenter,
            height: 120,
            width: 120,
            color: "white",
            text: "Recenter",
            fontsize: 22
            }]
        }
    }


    render() {
        return (
            <TouchableOpacity style={{
                position: "absolute",
                bottom: 20,
                alignSelf: 'center'
            }}
                onPress={this.state.uiState[this.props.status].onPress}
            >

                <View data-test="Screen_Recenter_Button"
                    style={{
                        borderWidth: 7,
                        borderColor: '#e4d9c0',
                        borderRadius: 75,
                        overflow: 'hidden',
                        height: this.state.uiState[this.props.status].height,
                        width: this.state.uiState[this.props.status].width,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {/* Global Text props should be used here!! */}
                    <Text style={{
                        color: this.state.uiState[this.props.status].color,
                        fontSize: this.state.uiState[this.props.status].fontsize
                    }}>{this.state.uiState[this.props.status].text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default UserInterface