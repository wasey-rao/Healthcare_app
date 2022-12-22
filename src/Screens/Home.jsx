import React, { useState, useEffect } from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native-paper';


export default SearchScreen = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const showPatient = item => {
    Database.shared.searchDetail(item).then(() => {
      this.props.navigation.navigate('SearchedDonor', {
        item: item,
        User: this.state.User,
      });
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(users);
        console.log(users)
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  renderitem = item => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="blue" />
      )
    } else {
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
            <TouchableOpacity onPress={() => this.showDonor(item)}>
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
        renderItem={({ item }) => this.renderitem(item)}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={true}
      />
      <View style={styles.button1}>
        <TouchableOpacity
          style={styles.signIn1}
          onPress={() =>
            this.props.navigation.navigate('RequestForm', {
              User: this.state.User,
            })
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
