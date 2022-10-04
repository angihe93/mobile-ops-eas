import React from "react"; //
import { StyleSheet, Text, View } from 'react-native';
// import Home from './components/Home';
import Contants from 'expo-constants';
// import Tasks from './components/Tasks';
// import HistoricalTasks from './components/HistoricalTasks';
// import TaskCompletedForm from './components/TaskCompletedForm';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import UpdateItem from "./components/UpdateItem";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import Login from "./components/Login";

// const Stack = createNativeStackNavigator();
// const Tasks = Tasks;
// const HistoricalTasks = HistoricalTasks;

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>  
        <Login />
      </NavigationContainer>  
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Contants.statusBarHeight
  },
});

// export default App;
