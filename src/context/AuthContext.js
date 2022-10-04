import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {API_ROOT} from '@env';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [test, setTest] = useState('Test Value');
  const [userToken, setUserToken] = useState(null);

  const login = async(username,password) => {
    // post request to /token
    // console.log('username from login()',username);
    // console.log('password from login()',password);

    // https://stackoverflow.com/questions/41775517/web-fetch-api-waiting-the-fetch-to-complete-and-then-executed-the-next-instruct
    fetch(API_ROOT+'/token',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    }).then(
      async(res) => {
        console.log('res in first .then:',res);
        // console.log('res.data from post request for token',res.data);
        // console.log('res from post request for token',res);
        // console.log(res.json().then)
        return res.json(); // needed this to return token in this step
        // res.json()
      }
    )
    // .then(async(res)=>{
    //   console.log('res in second.then:',res);
    //   return res; // needed this to return token in this step
    //   // setUserToken(res.access_token);
    //   // AsyncStorage.setItem('userToken',res.access_token);
    // })
    // .catch(e=>{
    //   console.log('error from post request for token',e);
    // })
    .then(async(res)=>{ // removed async
      console.log('res in third .then:',res);
      // console.log(res);
      // console.log(res.access_token);
      setUserToken(res.access_token);
      AsyncStorage.setItem('userToken',res.access_token);
      // const userTokenFromAsync = await AsyncStorage.getItem('userToken');
      // console.log('usertoken from asyncstorage.getitem from AuthContext login()',userTokenFromAsync);
    })
    
    // setUserToken('randomstr');
    // AsyncStorage.setItem('userToken',userToken);
  }

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
  }

  // console.log('userToken from AuthContext',userToken);

  const isLoggedIn = async() => {
    try {
      let userToken = AsyncStorage.getItem('userToken'); // separate user token used in this func only
      // setUserToken(userToken);
      // if 
    } catch(e) {
      console.log('isLoggedIn error:',e)
    }
    
  }

  useEffect(()=>{
    isLoggedIn();
  }, [])

  return (
    <AuthContext.Provider value={{test, userToken, login, logout}}>
    {/* <AuthContext.Provider value={{userToken, login}}> */}
      {children}
    </AuthContext.Provider>
  );
}

export default {AuthContext, AuthProvider};