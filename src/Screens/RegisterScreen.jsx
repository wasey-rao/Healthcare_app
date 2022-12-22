import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from 'react-native'
import React, { useReducer } from 'react'
import { INITIAL_STATE, docReducer } from '../Reducers/docReducers'
import { ACTION_TYPES } from '../Reducers/docActionTypes'

const RegisterScreen = ({ navigation }) => {
    const [state, dispatch] = useReducer(docReducer, INITIAL_STATE);

    const handleChange = (e,name) => {
        dispatch({
            type: ACTION_TYPES.CHANGE_INPUT,
            payload: { name: name, value: e }
        })
    }
    console.log(state)
    return (
        <View style={styles.container}>
            {/* <ImageBackground
                source={require('../assets/background.jpg')}
                style={styles.image}> */}
                <Text style={styles.greeting}>
                    {'Hello!\nSign up to get started.'}
                </Text>
                <View style={styles.errorMessage}>
                    <Text style={styles.error}>{state.errorMessage}</Text>
                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={e => handleChange(e, 'name')}
                        //value={this.state.user.name}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            name="email"
                            onChangeText={e => handleChange(e, 'email')}
                        //value={this.state.user.email}
                        />
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            name="password"
                            onChangeText={e => handleChange(e, 'password')}
                        //value={this.state.user.pasword}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: 'center', marginTop: 32 }}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#3399ff', fontSize: 14 }}>
                        Already have an Account?{' '}
                        <Text style={{ fontWeight: '500', color: 'lightblue' }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            {/* </ImageBackground> */}
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCCCCC'
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#e9446a',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {
        marginBottom: 46,
        marginHorizontal: 30,
    },
    inputTitle: {
        //color: '#ccffff',
        color: 'black',
        fontSize: 13,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#BABF9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F30',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: 'lightblue',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
})