import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const InfoPopUp = (props) => {
    const desc = props.description;
    return (
        <View style={{ justifyContent: "center", margin: 5 }}>
        <Text style={{ fontSize: 25,textAlign:"center",fontWeight:"bold" }}>{props.title}</Text>
        <Text style={{fontSize: 16}}>{desc.substring(0, 60) + "..."}</Text>
        <Text style={{fontSize: 14, textAlign:"center" , textDecorationLine: "underline"}}>Click For More Information...</Text>
        </View>
    );
};

export default InfoPopUp;
