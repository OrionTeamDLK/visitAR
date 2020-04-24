import React from 'react';
import {View, Text, StyleSheet, Image, Button,ScrollView,TouchableOpacity} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { withNavigation } from 'react-navigation';
import {getTimeDiff} from '../../Utils/date_time';
import {styles} from '../styles/TourEndScreenStyle';
import LinkButton from "../Components/LinkButton";
import Icon from "react-native-vector-icons/FontAwesome";


const EndTourScreen =(props)=>{


    let { time_started, time_finished, landmarks_visited} = props.navigation.state.params.tour;
    let timeDiff = getTimeDiff(time_started, time_finished);
    let tokens =  props.navigation.state.params.tokens;

    return (
        <View data-test = "EndTourScreen_view">
        	<ScrollView>
            <Image style={styles.image} source={require('../../assets/carl1.jpeg')}/>
            <Text style={styles.textHeader}>Congratulations on completing the Carlingford Tour!{"\n"}</Text>
            <Text style={styles.textMain}>You spent { timeDiff } on this historic tour</Text>
            <Text style={styles.textMain}>we hope you had a wonderful time</Text>
            <View style={styles.viewBar} />
            {console.log(landmarks_visited.length)}
            <Text style={styles.textList}>You have visted:</Text>
            {landmarks_visited.length > 0 ?
                landmarks_visited.map((landmark, index) =>
                  <Text style={styles.textList} key={landmark.id} >-{landmark.title}</Text>
                )
            :
              <Text style={styles.textMain}>
                No landmarks this time, hope you come back and check out more of Carlingford town
              </Text>
            }
            <View style={styles.viewBar} />
            {tokens === 0?
            <Text style={styles.textMain}>No tokens this time.{"\n"}How many can you collect next time?</Text>
            :
            <Text style={styles.textMain}>You have collected {tokens} out of 8 tokens! well done!!!{"\n"}How many can you collect next time?</Text>
            }
            <View style={styles.buttonsView}>
            <LinkButton icon="link" name="Leave Feedback" link='https://www.surveymonkey.com/r/HLQC9JD' />
            <TouchableOpacity
                onPress={ ()=>props.navigation.navigate("GMaps")}
                style={styles.button}>
                <Text style={styles.text}>
                    <Icon name="backward" size={30} color="white" style={styles.iconStyle} />
                    <Text>  </Text>
                    Back to map screen
                </Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
      </View>

    );
};

export default withNavigation(EndTourScreen);
