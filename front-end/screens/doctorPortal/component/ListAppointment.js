import React from 'react';
import { FlatList, Text, StyleSheet, View, Image} from 'react-native';
import StyledButton from '../../../components/StyledButton';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/core";




const ListAppointment = () => {
  const DATA = [
    { id: '1', title: 'M. Driss', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '123456789', timeSlot: '10:00 AM' },
    { id: '2', title: 'Mme. Monia', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '987654321', timeSlot: '08:00 AM' },
    { id: '3', title: 'M. Youssef', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '456789123', timeSlot: '11:00 AM' },
    { id: '4', title: 'M. Ali ', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '789123456',timeSlot: '13:00 AM' },
    { id: '5', title: 'Mme. wijdane', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '321654987', timeSlot: '14:00 AM' },
    { id: '6', title: 'M. Adam', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '654987321', timeSlot: '12:00 AM'},
    { id: '7', title: 'First Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '111111111', status: 'approved' },
    { id: '8', title: 'Second Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '222222222', status: 'pending' },
    { id: '9', title: 'Third Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '333333333', status: 'approved' },
    { id: '14', title: 'First Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '444444444', status: 'pending' },
    { id: '15', title: 'Second Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '555555555', status: 'approved' },
    { id: '16', title: 'Thid Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '666666666', status: 'pending' },
    { id: '17', title: 'First Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '777777777', status: 'approved' },
    { id: '18', title: 'Second Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '888888888', status: 'pending' },
    { id: '19', title: 'ThiRRRRd Item', image: require('../../../assets/images/Online Doctor-rafiki.png'), phoneNumber: '999999999', status: 'approved' },
  ];
  const navigation = useNavigation(); 
  
  const handleButtonPress = () => {
    navigation.navigate("PatientInf");
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="phone" size={20} color={Colors.primary} />
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.detailItem}>
              
              <Text style={styles.timeSlot}>{item.timeSlot}</Text>
            </View>
          </View>
        </View>
      </View>
      <StyledButton title="View Patient Details" onPress={() => handleButtonPress()} />
    </View>
  );

  return (
    <View style={styles.container} >
      <Text style={styles.text}>Upcoming Appointment</Text>
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View> 
  );
};

export default ListAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, 
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.titleColor
  },
  phoneNumber: {
    fontSize: 15,
    color: Colors.black,
    marginLeft:10
  },
  timeSlot: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.titleColor,
    marginLeft: 40
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    marginBottom: 10, 
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    backgroundColor: Colors.primary
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
