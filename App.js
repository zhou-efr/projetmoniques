// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Compare from './src/components/Compare';
import Saved from './src/components/Saved';
import Scan from './src/components/Scan';
import NavigationBar from './src/components/NavigationBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Scan'}
        backBehavior={'initialRoute'}
        screenOptions={{headerShown: false}}
        tabBar={props => <NavigationBar {...props} />}>
        <Tab.Screen name="Compare" component={Compare} />
        <Tab.Screen name="Scan" component={Scan} />
        <Tab.Screen name="Saved" component={Saved} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
