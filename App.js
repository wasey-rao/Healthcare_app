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
import Home from './src/Screens/Home';
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
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const CreateHomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
    </Stack.Navigator>
  )
}

function Homescreen() {
  return <Text>Home</Text>
}

const App = () => {


  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Loading" component={LoadingScreen} />
        <Drawer.Screen name="Auth" component={CreateAuthStack} />
        <Drawer.Screen name="Home" component={CreateHomeStack} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
};


export default App;
