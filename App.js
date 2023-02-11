/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import LoadingScreen from './src/Screens/LoadingScreen';
import DrawerContent from './src/Screens/DrawerContent';
import Patient from './src/Screens/Patient';
import Home from './src/Screens/Home';
import AddPatient from './src/Screens/AddPatient';
import Icon from 'react-native-vector-icons/Ionicons';
//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CreateAuthStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
        }}
        component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const CreateHomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          title: 'HEALTH CARE',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'teal',
          },
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="teal"
              onPress={() => navigation.openDrawer()}>
            </Icon.Button>
          )
        }}
      />
      <Stack.Screen
        name="Patient"
        component={Patient}
        options={{
          headerTitleAlign: 'center',
          title: 'Details',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'teal',
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-back"
              size={25}
              backgroundColor="teal"
              onPress={() => navigation.navigate('home')}>
            </Icon.Button>
          )
        }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          headerTitleAlign: 'center',
          title: 'Add Patient',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'teal',
          },
          headerLeft: () => (
            <Icon.Button
              name="chevron-back"
              size={25}
              backgroundColor="teal"
              onPress={() => navigation.navigate('home')}>
            </Icon.Button>
          )
        }}
      />
    </Stack.Navigator>
  )
}

const App = () => {


  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Loading" component={LoadingScreen} />
        <Drawer.Screen name="Auth" component={CreateAuthStack} />
        <Drawer.Screen name="Home" children={CreateHomeStack} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
};


export default App;
