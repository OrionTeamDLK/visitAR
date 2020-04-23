import {
    StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e4d9c0",
    //justifyContent: "center",
   
  },
  Button: {
    marginTop: 10,
    marginHorizontal: 10,
    color: "#adadad"
  },
  profile_pic: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  heading: {
    margin:20,
    fontSize:20
  },
  subHeading: {
    marginTop:10,
    marginBottom:10,
    fontSize:18
  },
  content_style: {
    backgroundColor: "#d9d1bf",
    alignItems: 'center',
  },
  displayName: {
    fontSize: 30,
    color: "white"
  }
});
