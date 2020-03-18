import React from 'react';
import {View, Text, StyleSheet, Image, Button,ScrollView} from 'react-native';
import NavigationButton from '../Components/NavigationButton';
import { withNavigation } from 'react-navigation';
import {getTimeDiff} from '../../Utils/date_time';
import {styles} from '../styles/TourEndScreenStyle';



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
            <Text style={styles.textMain}>No tokens this time.{"\n"}How many can you and your friends collect next time?</Text>
            :
            <Text style={styles.textMain}>You have collected {tokens} out of 8 tokens! well done!!!{"\n"}How many can you and your friends collect next time?</Text>
            }

            <Button
              style={{marginTop:20}}
              onPress={()=> props.navigation.navigate("GMaps")}
              title="Back to map screen"
              accessibilityLabel="Back to map screen"
            />
          </ScrollView>
      </View>

    );
};

export default withNavigation(EndTourScreen);
