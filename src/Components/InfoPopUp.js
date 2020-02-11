import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const InfoPopUp = (props) => {
    const desc = props.description;
    return (
        <View style={{ justifyContent: "center", margin: 5 }}>
            <Text style={{ fontSize: 20 }}>{props.title}</Text>
            <Text>{desc.substring(0, 50) + "..."}</Text>
            <Text style={{textDecorationLine: "underline"}}>Click For More Information...</Text>
        </View>
    );
};

export default InfoPopUp;
