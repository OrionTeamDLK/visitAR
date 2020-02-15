import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HelpInfo = (props) => {
    return(
        <View data-test = "helpinfo_view" style={styles.slideDefault}>
            <Text data-test = "helpinfo_num"style={styles.text}>{props.num}</Text>
            <Text data-test = "helpinfo_text" style={styles.text}>{props.text} </Text>
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
		fontSize: 40,
        fontWeight: "bold",
        textAlign:"center",
        marginTop:40,
        marginLeft:25,
        marginRight:25
    },
    textNum:{
        color: "white",
		fontSize: 40,
        fontWeight: "bold",
        textAlign:"center",
    }
});

export default HelpInfo;
