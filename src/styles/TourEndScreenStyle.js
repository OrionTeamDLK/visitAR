import {StyleSheet,Dimensions} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  button: {
    borderWidth: 0.1,
    borderColor: '#e4d9c0',
    borderRadius: 20,
    height: Dimensions.get('window').height*.08,
    width: Dimensions.get('window').width * .7,
    backgroundColor: '#4c6294',
    borderBottomWidth: 3,
    borderColor: "black",
    alignItems:'center',
    justifyContent: 'center',
    marginTop:5
    },
  textHeader: {
    textAlign: "center",
    fontSize: 30

  },
  textMain: {
    textAlign: "center",
    fontSize: 20
  },
  textList: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  viewBar: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    marginTop: 20,
    marginBottom: 20
  },
  image: {
    width: "80%",
    height: 200,
    left: "10%",
    resizeMode: 'stretch'
  },
  iconStyle: {
    width: 22,
    height: 22,

  },
  text:{
    color:"white",
    fontSize:22
  },
  buttonsView:{
    marginTop:10,
    alignItems:'center',
    justifyContent:'center'
  }
});
