import React from "react";
import { View, Animated, Easing, Dimensions, Image, StyleSheet } from "react-native"
import { Spinner } from 'native-base';
//Code Sourced at https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae

export default class AnimatedLoadingBar extends React.Component {

  constructor() {
    super()
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }
  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: "#c9b391",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      }}
      >
      <Image source = {require('.../../assets/splash02.png')} style={styles.backgroundImage}/>
      <Spinner
        color='red'
        style={{
          position:"absolute",
          top:Dimensions.get("window").height*0.5,
          height:250,
        width:227}} />
      {/*}  <Animated.Image
          style={{
            position:"absolute",
            width: 227,
            height: 200,
            transform: [{ rotate: spin }]
          }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
        />*/}
      </View>
    )
  }

}



var styles = StyleSheet.create({
  backgroundImage:{
     width:Dimensions.get('window').width,
     height:Dimensions.get('window').height,
   }
 });
