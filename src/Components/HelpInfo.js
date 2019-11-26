import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HelpInfo = (props) => {
    return(
        <View data-test = "helpinfo_view" style={styles.slideDefault}>
            <Text data-test = "helpinfo_text" style={styles.text}>Help {props.num} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    slideDefault: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#9DD6EB"
	},
    text: {
		color: "white",
		fontSize: 30,
        fontWeight: "bold"
    },
});

export default HelpInfo;
