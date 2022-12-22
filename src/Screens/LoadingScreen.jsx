import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Home');
                //Alert.alert(user.email);
            } else {
                navigation.navigate('Auth');
                //Alert.alert('User not signed in')
            }
        })}, []);

    return (
      <View style={styles.container}>
        <Text>Loading ...</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;