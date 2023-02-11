import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ToastAndroid,
    Alert,
} from 'react-native';
// import {BannerAd, BannerAdSize} from '@react-native-admob/admob';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import Ionicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// import variables from '../variables.json';

const RegisterScreen = ({ navigation }) => {
    const [state, setState] = useState({
        isValidEmail: true,
        isValidUser: true,
        isValidMobile: true,
        check_textInputChange: false,
        errorMessage: '',
    });

    const [data, setData] = useState({
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        qualification: '',
        contact: '',
    });

    const textInputChange = val => {
        if (val.length >= 2) {
            setState({

                check_textInputChange: true,
                isValidUser: true,
            });
            setData({
                ...data,
                username: val,
            });
        } else {
            setState({
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };



    const handleValidUser = val => {
        if (val.trim().length >= 1) {
            setState({
                isValidUser: true,
            });
        } else {
            setState({
                isValidUser: false,
            });
        }
    };

    const handleSignup = async () => {
        if (data.username === '') {
            setState({ errorMessage: 'Please enter username!' });
            alert('Please enter username!');
        } else if (data.firstName === '') {
            setState({ errorMessage: 'Please enter first name!' });
            alert('Please enter first name!');
        } else if (data.lastName === '') {
            setState({ errorMessage: 'Please enter last name!' });
            alert('Please enter last name!');
        } else  if (data.password === '') {
            setState({ errorMessage: 'Please enter password!' });
            alert('Please enter password!');
        } else if (data.contact === '') {
            setState({ errorMessage: 'Please enter contact number!' });
            alert('Please enter contact number!');
        } else if (data.email === '') {
            setState({ errorMessage: 'Please enter email!' });
            alert('Please enter email!');
        } else  {
        await auth.createUserWithEmailAndPassword(data.email, data.password).then(async user => {
            console.log("User account created & signed in!");
            await firestore().collection('doctors').doc(user.user.uid).set({
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                qualification: data.qualification,
                contact: data.contact,
                email: data.email,
                password: data.password,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: null,
            }).then(() => {
                console.log('User added!');
                navigation.navigate('home');
            }
            );
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            }

            console.error(error);
        });
        }
    };


    return (

        <View style={styles.container}>
            <StatusBar backgroundColor="teal" barStyle="light-content" />
            <View style={{ flexDirection: 'row' }}>
                {/* <Ionicons.Button name="chevron-back" backgroundColor="teal" size={20} onPress={() => navigation.goBack()} /> */}
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ marginTop: 10, fontWeight: 'bold', color: 'white', fontSize: 20, }}>Healh Care</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                    {/* <Image
                        style={{ height: 40, width: 40 }}
                    //source={require('../assets/app_icon.png')}
                    /> */}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Sign UP</Text>
                </View>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Username</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#05375a" size={20} />
                        <TextInput
                            placeholder={"User Name"}
                            style={styles.textInput}
                            autoCapitalize='words'
                            //defaultValue={data.username}
                            onChangeText={val => textInputChange(val)}
                            // onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                        />
                        {state.check_textInputChange ? (
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {/* {state.isValidUser ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Name must be 1 character long.
                            </Text>
                        </Animatable.View>
                    )} */}


                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={styles.text_footer}>Email</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="envelope" color="#05375a" size={20} />
                        <TextInput
                            placeholder={"Your Email"}
                            style={styles.textInput}
                            autoCapitalize="none"
                            //defaultValue={this.state.email}
                            //onChangeText={val => this.handleValidEmail(val)}
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
                                invalid Email Format.
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

                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Mobile No.</Text>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="mobile" color="#05375a" size={20} />
                        <TextInput
                            placeholder={"Your Mobile no."}
                            style={styles.textInput}
                            //defaultValue={this.state.MobileNo}
                            autoCapitalize="none"
                            onChangeText={MobileNo => {
                                if (MobileNo.length < 11 || MobileNo.length > 11) {
                                } else {
                                    setData({
                                        ...data,
                                        contact: MobileNo,
                                    });
                                }
                            }}
                            onEndEditing={e => {
                                if (e.nativeEvent.text.length < 11 || e.nativeEvent.text.length > 11) {
                                    setState({ isValidMobile: false });
                                } else {
                                    setState({
                                        isValidMobile: true,
                                    });
                                }
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                    {state.isValidMobile ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Mobile no. must be 11 digits!
                            </Text>
                        </Animatable.View>)}

                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>First Name</Text>
                    </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="address-card-o" color="#05375a" size={20} /> */}
                        <TextInput
                            placeholder={"First Name"}
                            style={styles.textInput}
                            //defaultValue={this.state.Address}
                            onChangeText={firstName => setData({
                                ...data,
                                firstName: firstName
                            })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Last Name</Text>
                    </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="address-card-o" color="#05375a" size={20} /> */}
                        <TextInput
                            placeholder={"Last Name"}
                            style={styles.textInput}
                            //defaultValue={this.state.Address}
                            onChangeText={lastName => setData({
                                ...data,
                                lastName: lastName
                            })}
                        />
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Gender</Text>
                    </View>
                    <View style={{ marginTop: 0, borderBottomWidth: 1, borderBottomColor: '#f2f2f2', padding: 5 }}>
                        <Picker selectedValue={data.gender} onValueChange={(value, index) => setData({ gender: value })} mode="dropdown">
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                        <Text style={[styles.text_footer, { color: 'red' }]}>*</Text>
                        <Text style={styles.text_footer}>Qualification</Text>
                    </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="address-card-o" color="#05375a" size={20} /> */}
                        <TextInput
                            placeholder={"Qualification"}
                            style={styles.textInput}
                            //defaultValue={this.state.Address}
                            onChangeText={qualification => setData({
                                ...data,
                                qualification: qualification
                            })}
                        />
                    </View>



                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleSignup}>
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
                                    {'Sign Up'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignSelf: 'center', marginTop: 32 }}
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#3399ff', fontSize: 14 }}>
                                Already have an Account?{' '}
                                <Text style={{ fontWeight: '500', color: 'lightblue' }}>Login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
            {/* <View styele = {{}}>
        <BannerAd
            size={BannerAdSize.ADAPTIVE_BANNER}
            unitId={variables.android_unit_id}
            onAdFailedToLoad={error => console.error(error)}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            ref={this.bannerRef}
          />
        </View> */}
        </View>
    );

}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
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
        textAlign: 'left'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16,
    },
    text_footer1: {
        color: '#05375a',
        fontSize: 18,
        textAlign: 'right'
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
    urduButton: {
        color: '#fff',
        textAlign: 'left'
    },
    englishButton: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        //marginLeft:115

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
    button1: {
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //flex:1,
        alignSelf: 'flex-end',
        paddingHorizontal: 5,
    },
    signIn1: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 80,
        flexDirection: 'row',
    },
    signIn2: {
        width: 100,
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 80,
        flexDirection: 'column', flex: 1,
    },
    textSign1: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'right'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

});