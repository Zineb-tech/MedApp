import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, CameraRoll , ToastAndroid } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Print from 'expo-print';
import QRCode from 'react-native-qrcode-svg';
//import ViewShot from 'react-native-view-shot';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(true);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showSelectedDateTime, setShowSelectedDateTime] = useState(false);
  const [userData, setUserData] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const viewShotRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const response = await axios.get(
          'http://10.0.2.2:3001/auth/userdetails/{id}',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleConfirmDateTime = (date) => {
    setSelectedDate(date);
    setDateTimePickerVisibility(false);
    setShowReschedule(true);
    setShowSelectedDateTime(true);
  };

  const handleCancel = () => {
    Alert.alert(
      'Confirm Cancelation',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes' },
      ]
    );
    setSelectedDate(null);
    setShowSelectedDateTime(false);
    setShowQRCode(false);
  };

  const resetSelections = () => {
    setSelectedDate(null);
    setDateTimePickerVisibility(true);
    setShowReschedule(true);
    setShowQRCode(false);
  };

  const handleReschedule = () => {
    resetSelections();
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString() : '';
  };

  const formattedDate = selectedDate ? formatDate(selectedDate) : '';
  const formattedTime = selectedDate ? formatTime(selectedDate) : '';

  const data = {
    name: userData ? userData.username : '',
    email: userData ? userData.email : '',
    selectedDate: formattedDate,
    selectedTime: formattedTime,
  };

  const generateQRCode = () => {
    setShowQRCode(true);
  };

  const printToFile = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + 'QRCode.jpg';
      await FileSystem.writeAsStringAsync(fileUri, uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const html = `
        <html>
          <body style="text-align: center; padding: 20px;">
            <img src="data:image/jpeg;base64,${uri}" width="200" height="200" />
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Selected Date: ${data.selectedDate}</p>
            <p>Selected Time: ${data.selectedTime}</p>
          </body>
        </html>
      `;
      const { uri: pdfUri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', pdfUri);
      await shareAsync(pdfUri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error printing to file:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={styles.title}>Book Appointment</Text>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDateTime}
        onCancel={() => setDateTimePickerVisibility(false)}
      />
      {showSelectedDateTime && (
        <View>
          <Text>Selected Date: {formatDate(selectedDate)}</Text>
          <Text>Selected Time: {formatTime(selectedDate)}</Text>
          <CustomButton title="Cancel" onPress={handleCancel} />
        </View>
      )}
      <View>
        <CustomButton title="Reschedule" onPress={handleReschedule} />
        <CustomButton title="Generate QR-Code" onPress={generateQRCode} />
      </View>
      {showQRCode && userData && (
          <QRCode
            size={200}
            value={JSON.stringify(data)}
            color="black"
            backgroundColor="white"
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 400,
  },
  title: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.titleColor,
  },
});
