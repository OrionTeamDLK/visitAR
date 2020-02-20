import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';
import * as Progress from 'react-native-progress';

const PickUpTokenButton = (props) => {
    const {top} = props
    return (
        <View
        style={{
            position: "absolute",
            left: 0,
            right: 0,
            top:top,
            alignItems: "center"
        }}>
        <TouchableOpacity
            onPress={props.pickUpTokenGame}
            >
            <View style={{
                //  backgroundColor: 'none',
                //  justifyContent: 'center',
                //  alignItems: 'center',
                  borderRadius: 120,
                  borderWidth: 5,
                  borderColor: "#4c6294",
                 // width:"100%"
              }}>
                <Text style={{ color: "#4c6294", fontSize:35}}>
                    Pick up Token
                </Text>
                </View>
        </TouchableOpacity>
        <Progress.Bar progress={2 / 6} width={200}  height={10}>
        <Text style = {{textAlign:"center"}}>Tokens Collected {props.num}/ 6</Text>
        </Progress.Bar>
        </View>
    );

        }


        PickUpTokenButton.defaultProps = {
            num: 2
        }

    export default withNavigation(PickUpTokenButton);



/*



const PickUpTokenButton = (props) => {

    return (
        <TouchableOpacity
        style={{
            position: "absolute",
            alignSelf: 'center',
         //   bottom: "20%",
//            left:"10%",
   //         width:"80%"
        }}>
        <View style={{
          //  backgroundColor: 'none',
          //  justifyContent: 'center',
          //  alignItems: 'center',
           // borderRadius: 120,
           // borderWidth: 5,
           // borderColor: "#4c6294",
           // width:"100%"
        }}>
            <Text style={{ color: "#4c6294",fontSize: 35, fontWeight: "bold"}}>
            pick up token              
            </Text>
        </View>
    </TouchableOpacity>

    );
}


export default PickUpTokenButton;
*/

/*
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from 'react-navigation';


const PickUpTokenButton = (props) => {

    const radius = 80;
    return (

        <TouchableOpacity
            onPress={alert("token picked up")}
            style={{
                position: "absolute",
                right: 10,
                alignSelf: 'center',
                top: 150,
            }}>
            <View style={{
                overflow: 'hidden',
                backgroundColor: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 120,
                borderWidth: 5,
                borderColor: "#4c6294",
                height: radius,
                width: radius
            }}>
                <Text style={{ color: "#4c6294", fontSize: 70, fontWeight: "bold"}}>
                    token
                </Text>
            </View>
        </TouchableOpacity>

    );
}

export default PickUpTokenButton;

/*<TouchableHighlight
style={{   
         justifyContent: 'center',
alignItems: 'center',
height: 60,
backgroundColor: '#4B6296',
margin: 10,
top:10,}}
onPress={() => {
    this.distnaceBetweenLocationAndTokens();
}}>
<Text style={{top:5, color:"white"}}>Pick up token</Text>

</TouchableHighlight>

<Progress.Bar progress={num_of_tokens / 4} width={200} />









            {`
            Pick up
            Token
            `}








*/




