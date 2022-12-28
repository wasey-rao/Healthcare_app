import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Cards from '../Components/Card';
import { LineChart } from 'react-native-chart-kit';
import Chart from '../Components/Charts';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons';


const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

const Patient = ({ route }) => {
    const { key } = route.params;
    const [patient, setPatient] = useState({});
    const [temp, setTemp] = useState([0]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(key)
            .onSnapshot(documentSnapshot => {
                console.log('User: ', documentSnapshot.data());
                setTemp([...temp, temp.push(documentSnapshot.data().temperature)].slice(Math.max(temp.length - 5, 0)));
                setPatient(documentSnapshot.data());
                console.log('temp', temp)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    let data = {
        labels: [],
        datasets: [
            {
                data: []
            },
        ],
    };
    data.datasets[0].data = temp;
    return (
        // <View style={styles.container}>
        //     <View style={styles.cards}>
        //         <Cards content={'supine'} />
        //         <Cards />
        //     </View>
        //     <View style={styles.cards}>
        //         <Cards content={'supine'} />
        //         <Cards />
        //     </View>
        // </View>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.userName}>{patient.displayName}</Text>
                <View style={styles.cardContainer}>

                    <ScrollView horizontal={true}>
                        <Cards
                            title="Body Position"
                            content={patient.position}
                            icon="md-body"
                            color={"teal"}
                        />
                        <Cards
                            title="Temperature"
                            content={patient.temperature}
                            icon="thermometer"
                            color={"red"}
                        />
                        <Cards
                            title="Card 3"
                            content={'supine'}
                        />
                    </ScrollView>
                </View>
                <View style={styles.chartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="thermometer" size={20} color="red" />
                        <Text style={styles.cardText}>Temperature</Text>
                    </View>
                    <Chart data={data} chartConfig={chartConfig} />
                </View>
                <View style={styles.chartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/breath.png')} style={{ width: 20, height: 20 }} />
                        <Text style={styles.cardText}>Snore</Text>
                    </View>
                    <Chart data={data} chartConfig={chartConfig} />
                </View>

            </View>
        </ScrollView>
    );
};

export default Patient

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     margin: 5,
    //     alignItems: 'center',
    // },
    // cards: {
    //     flex: 1,
    //     flexDirection: 'row',
    // },
    // cardContainer: {
    //     backgroundColor: '#fff',
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     borderRadius: 5,
    //     padding: 15,
    //     marginBottom: 15
    // },
    cardText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: 'grey',
    },
    chartContainer: {
        margin: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    }
});