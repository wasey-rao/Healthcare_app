/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
//import moment from 'moment';

const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({
        isValidEmail: true,
        errorMessage: '',
    });

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = () => {
        const { email, password } = data;
        if (email === '') {
            setState({errorMessage: 'Please enter email!'});
            alert('Please enter email!');
          } else if (password === '') {
            setState({errorMessage: 'Please enter password!'});
            alert('Please enter password!');
          } else {
            auth()
              .signInWithEmailAndPassword(email, password).then(()=>{
                navigation.navigate('Home');
              })
              .catch(error => {
                setState({errorMessage: error.message});
              });
          }
    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="teal" barStyle="light-content" />
            <View style={{ flexDirection: 'row' }}>
                <Ionicons.Button name="chevron-back" backgroundColor="teal" size={20} onPress={() => navigation.goBack()} />
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, }}>Healh Care</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                    <Image
                        style={{ height: 40, width: 40 }}
                    //source={require('../assets/app_icon.png')}
                    />
                </View>
            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>{'LOGIN'}</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Email</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="envelope" color="#05375a" size={20} />
                        <TextInput
                            placeholder={"Email"}
                            style={styles.textInput}
                            defaultValue={data.email}
                            autoCapitalize="none"
                            onEndEditing={e => {
                                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                if (reg.test(e.nativeEvent.text.trim()) === true || e.nativeEvent.text.trim() === '') {
                                    setState({
                                        isValidEmail: true,
                                    });
                                    setData({
                                        ...data,
                                        email: e.nativeEvent.text,
                                    });
                                } else {
                                    setState({
                                        isValidEmail: false,
                                    });
                                }
                            }}
                            keyboardType="email-address"
                        />
                    </View>
                    {state.isValidEmail ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Invalid Email!
                            </Text>
                        </Animatable.View>)}
                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Password</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="key" color="#05375a" size={20} />
                        <TextInput
                            placeholder={"Password"}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onEndEditing={e => {
                                setData({
                                    ...data,
                                    password: e.nativeEvent.text,
                                });
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                    {/* {state.isValidMobile ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Mobile no. must be 11 digits!
                            </Text>
                        </Animatable.View>)} */}


                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
                            <LinearGradient
                                colors={['teal', '#014d4e']}
                                style={styles.signIn}>
                                <Text
                                    style={[
                                        styles.textSign,
                                        {
                                            color: '#fff',
                                        },
                                    ]}>
                                    {'LOGIN'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16,
    },
    text_footer1: {
        color: '#05375a',
        fontSize: 16,
        textAlign: 'right',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 5,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    color_textPrivate: {
        color: 'grey',
    },
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

});