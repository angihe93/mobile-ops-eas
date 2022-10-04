import React, {useState,useEffect, useContext} from 'react';
import {Text, StyleSheet, ScrollView, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { AuthContext } from "../src/context/AuthContext";
// import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import {API_ROOT} from '@env';

// select item to update: search bar with name or id
// maybe display all items below (scrollview both ways) and narrow down with search
// maybe first just do enter item id, easier than displaying table
// then confirm if this is the item to update

function UpdateItem() {

    const [apiData, setApiData] = useState([]);
    const [itemId, setItemId] = useState('1');
    const [error, setError] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    // console.log(selectedLocation);
    // const itemId='1';
    // console.log(itemId);
    // console.log(typeof itemId);

    // const [apiData, setApiData] = useState([]); // https://dev.to/andrewbaisden/creating-react-flask-apps-that-connect-to-postgresql-and-harperdb-1op0
    const {userToken} = useContext(AuthContext);
    // console.log('userToken from UpdateItem.js',userToken!==undefined);
    console.log(userToken!==undefined);

    useEffect(() => {
      
        const getAPI = () => {
            const API = API_ROOT+`/showitem/${itemId}`;
            // console.log(API)

            fetch(API,{
              headers: {
                Authorization: `Bearer ${userToken}`
              },
          })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    // console.log(data.name)
                    setApiData(data);
                    setError('')
                })
                .catch(err => {
                  console.log("Error occurred: " + err);
                  setError('invalid item id')
              });
        };
        getAPI();
    }, [itemId,updateStatus]); //itemId

    const updateItemLocation = () => {
      setUpdateStatus('')
     
      fetch(API_ROOT+`/updateitem/${itemId}/${selectedLocation.split(' ')[0].toLowerCase()}`, {
        method:'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`
      },
        // headers:{'Content-Type':'application/json'},
      })
      .then(resp=>{
        const statusCode = resp.status;
        // success=resp.ok;
        // console.log(statusCode);
        if (statusCode==200) {
          setUpdateStatus('success');
          // showMessage({
          //   message: "Simple message",
          //   type: "info",
          // });
        } else {
          setUpdateStatus('error occurred');
        }
      })
    }

    var locations = ['CU Unit 2-12-16','CSL','Other (please specify below)']


    return (
      <ScrollView>
        {/* <Text>Update item Screen</Text> */}
        <TextInput // remind user to press enter
          label='enter item id, press enter when done' 
          mode='outlined' 
          onSubmitEditing={input=>setItemId(input.nativeEvent.text)}
        />
        {/* <Button title="submit" onPress={(text)=>setItemId(text.nativeEvent.text)}/>  */}
        <Text style={styles.developmentNotice}>{error}</Text>
        <Text>Id: {apiData.id}</Text>
        <Text>Current Info:</Text>
        <Text>Name: {apiData.name}</Text>
        <Text>Address apt: {apiData.address_apt}</Text>
        <Text>Address street number: {apiData.address_num}</Text>
        <Text>Address treet: {apiData.address_street}</Text>
        <Text>Address zip: {apiData.address_zip}</Text>

        <Text>Update Item Location:</Text>

        <SelectDropdown
          data={locations}
          onSelect={(selectedItem, index) => {
              setSelectedLocation(selectedItem);
              // console.log(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
          }}
          rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
          }}
          // rowTextStyle={styles.dropDownTextStyle}
        />

        <Text style={styles.developmentNotice}>'Other' option and address input boxes are in development, not functional yet!</Text>
        <TextInput 
          label='new address apt'
          mode='outlined'
        />
        <TextInput
          label='new address street number'
          mode='outlined'
        />
        <TextInput
          label='new address street'
          mode='outlined'
        />
        <TextInput
          label='new address zip'
          mode='outlined'
        />

        <Button title="submit change" onPress={()=>updateItemLocation()}/>  
        {/* ()=>console.log('pressed'); */}
        {/* {apiData.map(item => <Text>{item.name}</Text>)} */}
        <Text style={styles.developmentNotice}>{updateStatus}</Text>
        
        {/* <FlashMessage ref="myLocalFlashMessage" /> */}
      </ScrollView>
    );
  }


  const styles = StyleSheet.create({
    dropDownTextStyle: {
        fontSize:15
    },
    developmentNotice: {
        fontSize:20,
        color: '#FF0000',
        margin:10
    }
  })

  export default UpdateItem