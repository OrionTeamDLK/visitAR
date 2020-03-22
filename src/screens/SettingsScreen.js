import React, { Component } from 'react';
import {View, Text, StyleSheet, Modal, TouchableHighlight} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import AcceptableUsePolicy from '../Components/AcceptableUsePolicy';
import { withNavigation } from 'react-navigation';

const SettingsScreen =()=>{
    return (
        <View data-test = "SettingsScreen_view">
            <Text style={{fontWeight:"bold", fontSize: 30}}data-test = "SettingsScreen_text">Settings screen</Text>
            <Text  data-test = "SettingsScreen_text">-Permissions</Text>
            <Text  data-test = "SettingsScreen_text">-Terms and conditions</Text>
            <Text  data-test = "SettingsScreen_text">-Logout</Text>
        </View>
    );
};



export default SettingsScreen;

{/*
class SettingsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
          modalVisible:false,
        }
    }
    setModalVisible = () => {
      //console.log("modal called and it is set to: " + this.state.modalVisible);
      this.setState({
        modalVisible:!this.state.modalVisible
      })
    }

    render(props) {
        return (
          <View data-test = "SettingsScreen_view">
              <Text style={{fontWeight:"bold", fontSize: 30}}data-test = "SettingsScreen_text">Settings screen</Text>
              <Text style={styles.textStyle} data-test = "SettingsScreen_text">-Permissions</Text>
              <Text style={styles.textStyle} data-test = "SettingsScreen_text">-Terms and conditions</Text>
              <Text style={styles.textStyle}  data-test = "SettingsScreen_text">-Logout</Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible()});
                  }}>
                  <Text
                    style={{fontSize:50, fontWeight:'bold',}}
                    >Close</Text>
                </TouchableHighlight>
          </View>
                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}>
                <View style={styles.modalOuter}>
                    <View style={styles.modalInner}>
                            <Text>Number of tokens you have collected so far, collect more at each landmark to fill up all the slots</Text>
                            <TouchableHighlight
                              onPress={() => {
                                this.setModalVisible();
                              }}>
                              <Text
                                style={{fontSize:22, fontWeight:'bold'}}
                                >Close</Text>
                            </TouchableHighlight>
                    </View>
                  </View>
              </Modal>

        )
    }
}
export default withNavigation(UserInterface)

const styles = StyleSheet.create({
    textStyle: {
        fontSize:25
    }
});
*/}
