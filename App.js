// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Compare from './src/components/Compare';
import Saved from './src/components/Saved';
import Scan from './src/components/Scan';
import NavigationBar from './src/components/NavigationBar';
import background from './src/files/images/img_1.png';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ImageBackground
      source={background}
      style={styles.imageBackgroundContainer}>
      <NavigationContainer style={styles.transparentBackground}>
        <Tab.Navigator
          initialRouteName={'Scan'}
          backBehavior={'initialRoute'}
          sceneContainerStyle={{backgroundColor: 'transparent'}}
          screenOptions={{
            headerShown: false,
            tabStyle: {
              backgroundColor: '#ffffff00',
            },
            keyboardHidesTabBar: true,
          }}
          tabBar={props => <NavigationBar {...props} />}>
          <Tab.Screen name="Compare" component={Compare} />
          <Tab.Screen name="Scan" component={Scan} />
          <Tab.Screen name="Saved" component={Saved} />
        </Tab.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  imageBackgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
    overflow: 'visible',
  },
});
