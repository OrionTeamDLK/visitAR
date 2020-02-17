
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import GoogleMapsScreen from './src/screens/GoogleMapsScreen';
import MenuScreen from './src/screens/MenuScreen';
import LoginScreen from './src/screens/LoginScreen';
import HelpScreen from './src/screens/HelpScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ArTestScreen from './src/screens/ArTestScreen';
import LandmarkScreen from './src/screens/LandmarkScreen';
import EndTourScreen from './src/screens/TourEndScreen';
import * as firebase from 'firebase';
//import EndTourScreen from './src/screens/TourEndScreen';



const firebaseConfig = {
  apiKey: "AIzaSyD76GKd6cJwFZuSDdJsFUnJmL31xEG5Iaw",
  authDomain: "orion-57b76.firebaseapp.com",
  databaseURL: "https://orion-57b76.firebaseio.com",
  projectId: "orion-57b76",
  storageBucket: "orion-57b76.appspot.com",
  messagingSenderId: "943400221085",
  appId: "1:943400221085:web:25c1b2ddce16b9fbd71774",
  measurementId: "G-56R04KRSTK"
};

firebase.initializeApp(firebaseConfig);


const navigator = createStackNavigator({
  GMaps: {
    screen: GoogleMapsScreen,
    navigationOptions: {
      header: null,
    },
  },
  Index: IndexScreen,
  //GMaps: GoogleMapsScreen,
  Menu: MenuScreen,
  Login: LoginScreen,
  Help: HelpScreen,
  Language: LanguageScreen,
  Settings: SettingsScreen,
  Profile: ProfileScreen,
  Register: RegisterScreen,
  EditProfile: EditProfileScreen,
  ArTest: ArTestScreen,
  Landmark: LandmarkScreen,
  EndTour: {
    screen: EndTourScreen,
    navigationOptions: {
      header: null,
    },
  },
},{
  initialRouteName: 'GMaps',
  defaultNavigationOptions:{
    title:'VisitAR  ',
    //header:null,
    headerTitleStyle: {
      textAlign:"center",
      flex:1 ,
      fontWeight: 'bold',
      fontSize:50,
  },
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  }
});

//Donal commit 15 - 11 - 19
//Donal commit 15 - 11 - 19
//paddy commit better than donals
// Oisin's test commit - it's not "visitARRR" Paddy why are pirates involved I don't get it.
// testing commit from home pc - and if you can have pirates why wouldnt you?
// Emma test commit

export default createAppContainer(navigator);
