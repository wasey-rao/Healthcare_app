/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import auth from "@react-native-firebase/auth";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function DrawerContent(props) {


  const [isUrdu, setUrdu] = React.useState(false);
  const { isFocused } = props.navigation;

  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        props.navigation.navigate('Auth');
      });
  };


  useEffect(() => {
    // if (isFocused){
    //Database.shared.getUrduBoolean().then((value) => {setUrdu(value);});
    // }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 70 }}>
              <Image
                style={styles.image}
              source={require('../assets/icon.png')}
              resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
              />
              {/* <Avatar.Image
                source={
                  require('../assets/app_icon_round.png')
                }
                size={80}
                style={{borderColor: 'red', borderWidth: 3, borderRadius: 50,overflow: 'hidden'}}
              /> */}

            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>
          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Title style={styles.title}>Health Care</Title>
            {/* <Caption style={styles.caption}>{'\u2022'}Blood Bank</Caption> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={'teal'} size={size} />
              )}
              label={() => <Text style={{ color: 'grey', fontSize: 16 }}>Home</Text>}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={'teal'} size={size} />
              )}
              label={() => <Text style={{ color: 'grey', fontSize: 16 }}>Profile</Text>}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            /> */}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="phone" color={'#b20404'} size={size} />
              )}
              label={() => <Text style={{ color: '#b20404', fontSize: 16 }}>Contact Us</Text>}
              onPress={() => {
                props.navigation.navigate('Contact');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="information-variant" color={'#b20404'} size={size} />
              )}
              label={() => <Text style={{ color: '#b20404', fontSize: 16 }}>About Us</Text>}
              onPress={() => {
                props.navigation.navigate('Introduction');
              }}
            /> */}
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences" style={{ marginTop: 15 }}>
            <View style={styles.preference}>
              <Text style={{ color: '#b20404', fontSize: 20 }}>اردو</Text>
              <View >
                <Switch value={isUrdu}
                  onValueChange={toggleSwitch} />
              </View>
            </View>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={'teal'} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOutUser();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    //color: '#b20404',
  },
  caption: {
    fontSize: 16,
    lineHeight: 16,
    color: '#b20404',
    marginLeft: 15
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderColor: 'teal',
    borderWidth: 3,
    borderRadius: 75,
  },
});
