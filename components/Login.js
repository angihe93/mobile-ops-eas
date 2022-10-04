import {TextInput} from 'react-native-paper';
import {View, Text, Button, SafeAreaView} from 'react-native';
import { AuthContext } from '../src/context/AuthContext';
import React, { useState, useContext } from "react"; //
import Tasks from '../components/Tasks';
import HistoricalTasks from '../components/HistoricalTasks';
import TaskCompletedForm from '../components/TaskCompletedForm';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateItem from "../components/UpdateItem";

const Stack = createNativeStackNavigator();

const Login = () => {
    const {login} = useContext(AuthContext);
    const {test} = useContext(AuthContext);
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    console.log(test)
    console.log('AuthContext from Login.js',{AuthContext});
    const {userToken} = useContext(AuthContext); // doesn't save after closing app

    const [loginStatus, setLoginStatus] = useState('');
    // console.log('AsyncStorage from Login.js',AsyncStorage);
    // const userToken = await AsyncStorage.getItem('userToken');
    // console.log('userToken from Login.js',userToken);

    console.log('username:',username);
    console.log('password',password);
    
    if (userToken===null || userToken===undefined) {
      return (
        <SafeAreaView>
          <TextInput // remind user to press enter
            label='username' 
            mode='outlined' 
            // onSubmitEditing={input=>setUserName(input.nativeEvent.text)}
            onChangeText={text=>setUserName(text)}
          />
          <TextInput // remind user to press enter
            label='password' 
            mode='outlined' 
            // onSubmitEditing={input=>setPassword(input.nativeEvent.text)}
            onChangeText={text=>setPassword(text)}
          />
          <Button title="Login" onPress={() => {login(username,password)}} />
          <Text> {loginStatus}</Text>

        </SafeAreaView>
      );
    } else {
      return (
        <Stack.Navigator initialRouteName="Tasks">
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Task completed form" component={TaskCompletedForm} />
          <Stack.Screen name="Historical Tasks" component={HistoricalTasks} />
          <Stack.Screen name="Update Item" component={UpdateItem} />
        </Stack.Navigator> 
      )
    };
    
};

export default Login;