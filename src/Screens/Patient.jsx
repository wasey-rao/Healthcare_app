import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Cards from '../Components/Card';
import { LineChart } from 'react-native-chart-kit';
import Chart from '../Components/Charts';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { Dimensions } from 'react-native';


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
    const [wid, setWidth] = React.useState(Dimensions.get('window').width);
    const [patient, setPatient] = useState({});
    const [temp, setTemp] = useState([0]);
    const [snore, setSnore] = useState([0]);
    const [gsr, setGSR] = useState([0]);

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            setWidth(Dimensions.get('window').width);
        })

        const subscriber = firestore()
            .collection('users')
            .doc(key)
            .onSnapshot(documentSnapshot => {
                console.log('User: ', documentSnapshot.data());
                setTemp([...temp, temp.push(documentSnapshot.data().temperature)].slice(Math.max(temp.length - 5, 0)));
                setSnore([...snore, snore.push(documentSnapshot.data().snore_voltages)].slice(Math.max(snore.length - 5, 0)));
                setGSR([...gsr, gsr.push( documentSnapshot.data().resistive_voltages)].slice(Math.max(gsr.length - 5, 0)));
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
                data: temp
            },
        ],
    };
    let snoreData = {
        labels: [],
        datasets: [
            {
                data: snore
            },
        ],
    };
    let gsrData = {
        labels: [],
        datasets: [
            {
                data: gsr
            },
        ],
    };
    // data.datasets[0].data = temp;
    // snoreData.datasets[0].data = snore;
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
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'black', marginTop: 8 }}>Mark Patient Critical</Text>
                    <Checkbox
                        status={patient.priority ? 'checked' : 'unchecked'}
                        onPress={() => {
                            firestore()
                                .collection('users')
                                .doc(key)
                                .update({
                                    priority: !patient.priority,
                                })
                                .then(() => {
                                    console.log('User updated!');
                                });
                        }}
                    />
                </View>
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
                        {/* <Cards
                            title="Card 3"
                            content={'supine'}
                        /> */}
                    </ScrollView>
                </View>
                <View style={styles.chartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="thermometer" size={20} color="red" />
                        <Text style={styles.cardText}>Temperature</Text>
                    </View>
                    {/* <Chart data={data} chartConfig={chartConfig} /> */}
                    <LineChart
                        data={data}
                        width={wid / 1.06}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={styles.chartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/breath.png')} style={{ width: 20, height: 20 }} />
                        <Text style={styles.cardText}>Snore</Text>
                    </View>
                    {/* <Chart data={snoreData} chartConfig={chartConfig} /> */}
                    <LineChart
                        data={snoreData}
                        width={wid / 1.06}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={styles.chartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Image source={require('../assets/breath.png')} style={{ width: 20, height: 20 }} /> */}
                        <Text style={styles.cardText}>GSR</Text>
                    </View>
                    {/* <Chart data={snoreData} chartConfig={chartConfig} /> */}
                    <LineChart
                        data={gsrData}
                        width={wid / 1.06}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
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