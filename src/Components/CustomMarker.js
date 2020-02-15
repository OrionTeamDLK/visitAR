import React from "react";
import { StyleSheet, TouchableOpacity, Text, View,Image } from "react-native";
import MapView, {
    Marker,
    Callout
} from "react-native-maps";




const CustomMarker = (props) => {
    return (
            <Marker
            coordinate={{
                latitude:54.041000,
                longitude:-6.185922
            }}
            key={"current location"}
            title={props.title}
            description={props.desc}
            >
            <Image source={require('../../assets/mapIcons/travel_road.png')} style={{height: 64, width:64 }} />
            </Marker>
    );
};

const styles = StyleSheet.create({
    button: {
        //height: (Dimensions.get('window').height/ 3),
    },
    iconStyle: {
        marginHorizontal: 20,
    }
});

export default CustomMarker;