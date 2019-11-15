
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import GoogleMapsScreen from './src/screens/GoogleMapsScreen';
import MenuScreen from './src/screens/ManuScreen';
import LoginScreen from './src/screens/LoginScreen';
import HelpScreen from './src/screens/HelpScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';


const navigator = createStackNavigator({
  Index: IndexScreen,
  GMaps: GoogleMapsScreen,
  Menu: MenuScreen,
  Login: LoginScreen,
  Help: HelpScreen,
  Language: LanguageScreen,
  Settings: SettingsScreen,
  Profile: ProfileScreen,
  Register: RegisterScreen,
  EditProfile: EditProfileScreen
},{
  initialRouteName: 'Index',
  defaultNavigationOptions:{
    title:'VisitAR  ',
    headerTitleStyle: {
      textAlign:"center",
      flex:1 ,
      fontWeight: 'bold'
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

export default createAppContainer(navigator);
