import React, { useState, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const criticalTemperature = 37.0;

  const onDisplayNotification = async (item) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Critical Temperature',
      body: 'Patient ' + item.displayName + ' has a critical temperature of ' + item.temperature,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        color: 'red',
        priority: 'max',
        vibrate: true,
        //visibility: 'public',
        // importance: 'high',
        autoCancel: true,
        sound: 'default',
      },
    });
  };


  const showPatient = item => {
    navigation.navigate('Patient', {
      key: item,
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot?.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData([...users].sort((a, b) => a.priority === b.priority ? 0 : a.priority ? -1 : 1 ));
        console.log(users)
        setLoading(false);
      });

      const backAction = () => {
        if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => {backHandler.remove(), subscriber()};

    // Unsubscribe from events when no longer in use
    //return () => subscriber();
  }, []);

  const renderitem = item => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="blue" />
      )
    } else {
      if (item.temperature >= criticalTemperature) {
        onDisplayNotification(item);
      }
      return (
        //<View style={{flexDirection:'row'}}>
        <View style={styles.feed}>
          <View style={{ flex: 1 }}>
            <View style={styles.feed}>
              <Text style={[styles.title, { color: 'teal' }]}>
                Name :
              </Text>
              <Text style={{ color: 'teal' }}>{item.displayName}</Text>
            </View>
            <View style={styles.feed}>
              <Text style={[styles.title, { color: 'teal' }]}>
                Body Temperature :
              </Text>
              <Text style={{ color: 'teal' }}>{item.temperature}</Text>
            </View>
            <View style={styles.feed}>
              <Text style={[styles.title, { color: 'teal' }]}>
                Age :
              </Text>
              <Text style={{ color: 'teal' }}>{item.age}</Text>
            </View>
            <View style={styles.feed}>
              <Text style={[styles.title, { color: 'teal' }]}>
                Position :
              </Text>
              <Text style={{ color: 'teal' }}>{item.position}</Text>
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={() => showPatient(item.key)}>
              <LinearGradient
                colors={['teal', '#014d4e']}
                style={styles.signIn}>
                <Text style={styles.textSign}>View</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        //</View>
      );
    }
  };


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.feeds}
        data={data}
        renderItem={({ item }) => renderitem(item)}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={true}
      />
      <View style={styles.button1}>
        <TouchableOpacity
          style={styles.signIn1}
          onPress={() =>
            navigation.navigate('AddPatient')
          }>
          <LinearGradient
            colors={['teal', '#014d4e']}
            style={styles.signIn1}>
            <Text
              style={[
                styles.textSign1,
                {
                  color: '#fff',
                },
              ]}>
              {'Add New Patient'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  search: {
    borderRadius: 8,
    marginVertical: 3,
    padding: 5,
  },
  feed: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 3,
  },
  feeds: {
    marginHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    //marginTop: 30,
  },
  signIn: {
    width: 100,
    height: 40,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    //marginHorizontal: 3,
  },
  textSign1: {
    color: 'white',
    fontWeight: 'bold',
  },
  button1: {
    alignItems: 'center',
    //marginTop: 50,
    paddingHorizontal: 30,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  signIn1: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
