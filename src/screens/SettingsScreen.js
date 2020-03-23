import React, { Component } from 'react';
import {View, Text, StyleSheet, Modal, TouchableHighlight,TouchableOpacity,Image,Dimensions} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import AcceptableUsePolicy from '../Components/AcceptableUsePolicy';
import PrivacyPolicy from '../Components/PrivacyPolicy';
import TermsAndConditions from '../Components/TermsAndConditions';
import { withNavigation } from 'react-navigation';

export default class SettingsScreen extends React.Component {
  componentWillMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      acceptanceDisplay: false,
      privacyDisplay: false,
      termsDisplay: false,
      permissionsDisplay: false,

      }
  }

  setModalVisible = (term) => {
    //console.log("modal called and it is set to: " + this.state.modalVisible);
    term==="acceptanceDisplay"?
    this.setState({
      acceptanceDisplay:!this.state.acceptanceDisplay
    })
    :
    term==="privacyDisplay"?
    this.setState({
      privacyDisplay:!this.state.privacyDisplay
    })
    :
    term==="termsDisplay"?
    this.setState({
      termsDisplay:!this.state.termsDisplay
    })
    :null
  }


  render() {
    return (
      <View data-test = "SettingsScreen_view" style={{ flex: 1 }}>
          <Text style={{fontWeight:"bold", fontSize: 30, textAlign:'center'}}data-test = "SettingsScreen_text">Settings screen</Text>
          <TouchableOpacity
                  onPress={() => { this.setModalVisible("acceptanceDisplay") }}
          >
              <View
                  style={styles.viewStyle}>
                <Text style={styles.buttonText}>
                Acceptable Use Policy
                </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity
                  onPress={() => { this.setModalVisible("termsDisplay") }}
          >
              <View
                  style={styles.viewStyle}>
                  <Text style={styles.buttonText}>
                  Terms & Conditions
                  </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity
                  onPress={() => { this.setModalVisible("privacyDisplay") }}
          >
              <View
                  style={styles.viewStyle}>
                <Text style={styles.buttonText}>
                Privacy Policy
                </Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={ () => console.log("permissions pressed")}
          >
              <View
                  style={styles.viewStyle}>
                  <Text style={styles.buttonText}>
                  Permissions
                  </Text>
              </View>
          </TouchableOpacity>



          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.acceptanceDisplay}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalOuter}>
              <View style={styles.modalInner}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible("acceptanceDisplay");
                        }}>
                        <Text
                          style={styles.closeText}
                          >Close</Text>
                      </TouchableHighlight>

                      <AcceptableUsePolicy />
              </View>
            </View>
        </Modal>



        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.privacyDisplay}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible("privacyDisplay");
                      }}>
                      <Text
                        style={styles.closeText}
                        >Close</Text>
                    </TouchableHighlight>
                    <PrivacyPolicy />
            </View>
          </View>
      </Modal>


      <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.termsDisplay}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible("termsDisplay");
                    }}>
                    <Text
                      style={styles.closeText}
                      >Close</Text>
                  </TouchableHighlight>
                  <TermsAndConditions />
          </View>
        </View>
    </Modal>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  modalOuter:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00000080',
  margin:0
  },
  modalInner:{
  width: Dimensions.get('window').width * .9,
  height: Dimensions.get('window').height * .9,
  backgroundColor: '#EBD5B3',
  padding: 20,
  overflow:'hidden',
  borderRadius: 20,
},
closeButton:{
  marginTop:50,
  position:'absolute'
},
contentText:{
 fontSize:22
},
closeText:{
 fontSize:20,
 fontWeight:'bold',
 textDecorationLine:'underline',
 textAlign:'center'
},
 viewStyle:{
   borderWidth: 0.1,
   borderColor: '#e4d9c0',
   borderRadius: 20,
   overflow: 'hidden',
   height: 70,
   width: Dimensions.get('window').width * .8,
   backgroundColor: '#4c6294',
   justifyContent: 'center',
   alignItems: 'center',
   borderBottomWidth: 3,
   borderColor: "black"
 },
 buttonText:{
   color:"white",
   fontSize:22}

});




{/*
const SettingsScreen =()=>{
    return (
        <View data-test = "SettingsScreen_view" style={{ flex: 1 }}>
            <Text style={{fontWeight:"bold", fontSize: 30, textAlign:'center'}}data-test = "SettingsScreen_text">Settings screen</Text>
            <TouchableOpacity
                onPress={ () => console.log("acceptance us pressed")}
            >
                <View data-test="Screen_Recenter_Button"
                    style={{
                        borderWidth: 0.1,
                        borderColor: '#e4d9c0',
                        borderRadius: 75,
                        overflow: 'hidden',
                        height: 70,
                        width: 70,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                        <Image
                            style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center" }}
                            source={require('../../assets/skip.png')}
                        />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ () => console.log("terms pressed")}
            >
                <View data-test="Screen_Recenter_Button"
                    style={{
                        borderWidth: 0.1,
                        borderColor: '#e4d9c0',
                        borderRadius: 75,
                        overflow: 'hidden',
                        height: 70,
                        width: 70,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                        <Image
                            style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center" }}
                            source={require('../../assets/skip.png')}
                        />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ () => console.log("privacy pressed")}
            >
                <View data-test="Screen_Recenter_Button"
                    style={{
                        borderWidth: 0.1,
                        borderColor: '#e4d9c0',
                        borderRadius: 75,
                        overflow: 'hidden',
                        height: 70,
                        width: 70,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                        <Image
                            style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center" }}
                            source={require('../../assets/skip.png')}
                        />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ () => console.log("permissions pressed")}
            >
                <View data-test="Screen_Recenter_Button"
                    style={{
                        borderWidth: 0.1,
                        borderColor: '#e4d9c0',
                        borderRadius: 75,
                        overflow: 'hidden',
                        height: 70,
                        width: 70,
                        backgroundColor: '#4c6294',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 3,
                        borderColor: "black"
                    }}>
                        <Image
                            style={{ width: 35, height: 35, alignItems: "center", justifyContent: "center" }}
                            source={require('../../assets/skip.png')}
                        />
                </View>
            </TouchableOpacity>
            <AcceptableUsePolicy />
        </View>
    );
};



export default SettingsScreen;



*/}
