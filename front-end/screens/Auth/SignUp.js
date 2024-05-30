import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { CheckBox } from 'react-native-elements'; 
import Colors from '../../constants/Colors';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const SignUp = React.forwardRef((props, ref) => {
  const [username, setUsername] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("");
  const [isSelected, setSelection] = React.useState(false); 
  const navigation = useNavigation();

  const verifyLength = (value, length) => {
    return value.length >= length;
  };

  const isValidated = () => {
    const isUsernameValid = verifyLength(username, 1);
    const isEmailValid = verifyLength(email, 1);
    const isPasswordValid = verifyLength(password, 1);

    setUsernameState(isUsernameValid ? "green" : "red");
    setEmailState(isEmailValid ? "green" : "red");
    setPasswordState(isPasswordValid ? "green" : "red");

    return isUsernameValid && isEmailValid && isPasswordValid ;
  };
  
  const handleSubmit = async () => {
    try {
      if (!isValidated()) return;
      
      const data = {
        username: username,
        email: email,
        password: password,
      };    
        submitForm();
      
    } catch (error) {
      console.log(error);
    } 
  }
  const submitForm = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3001/auth/signUp', {
        username: username,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data posted successfully:', response.data);
      navigation.navigate("PendingApprovalScreen");
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  
  
  
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.TextStyle}>Fill your information below or register with your social account</Text>
          <View style={styles.inputGroup}>
            <CustomInput
              label="Username"
              placeholder="John Doe"
              value={username}
              setValue={setUsername}
              borderColor={usernameState}
            />
            <CustomInput
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              setValue={setEmail}
              borderColor={emailState}
            />
            <CustomInput
              label="Password"
              placeholder="Password"
              value={password}
              setValue={setPassword}
              borderColor={passwordState}
              secureTextEntry
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                title="Agree with terms and condition"
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
                containerStyle={styles.checkbox} 
              />
            </View>
            <CustomButton
              onPress={handleSubmit}
              title="Register"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

// Styles
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    width: '100%',
  },
  safeArea:{
    flex:1,
    backgroundColor:Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    marginTop: 50,
    textAlign: "center",
    color: Colors.titleColor,
  },
  TextStyle:{
    marginTop: 10,
    textAlign: "center",
  },
  inputGroup:{
    marginTop: 50,
    width: '100%',
  },
  checkboxContainer:{
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox:{
    backgroundColor: 'transparent', 
    borderColor: 'transparent', 
    marginLeft: 0, 
  },
});

export default SignUp;
