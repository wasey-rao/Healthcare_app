import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Cards = ({title, content, icon, color}) => {
  return (
    <Card style={styles.card}>
      <Icon name={icon} style={styles.icon} color={color} size={25}/>
    <Card.Content>
      <Title style={styles.title}>{title}</Title>
      <Paragraph>{content}</Paragraph>
    </Card.Content>
    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </Card>
    // <View style={styles.card}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
  )
}

export default Cards;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
})