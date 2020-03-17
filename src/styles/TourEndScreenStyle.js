import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  Button: {
    marginTop: 10
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
  }
});
