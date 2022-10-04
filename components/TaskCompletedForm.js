import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import SelectDropdown from 'react-native-select-dropdown';

function TaskCompletedForm(props) {
    const item = props.route.params.item;
    const type = item.type;
    console.log(type);
    console.log(item.order_id);
    console.log(item.address_num);
    console.log(item.address_street);
    console.log(item.address_apt);
    const task_id = item.order_id;
    const items = item.items; // format: #1, Mini fridge; etc., change to list?
    const [completed, setCompleted] = useState(false);
    const [addressNum, setAddressNum] = useState(item.adress_num);
    const [addressStreet, setAddressStreet] = useState(item.addressStreet);
    const [addressApt, setAddressApt] = useState(item.address_apt);
    const [addressZip, setAddressZip] = useState(item.address_zip);
    console.log(completed);

    var radio_props = [
        {label: 'Yes', value: true },
        {label: 'No', value: false }
      ];

    // how to update locations according to db?
    var locations = ['CU Manhattan Mini','NYU Manhattan Mini',
                    'With/on the way to next renter','Other (please specify below)']

    // if completed is true, then when submit button is clicked, set task completed in db with the timestamp
    return (
        <View>
            <Text style={styles.developmentNotice}>In development, not functional yet!</Text>

            <Text>Has this task been completed?</Text>
            {/* <Text>{addressNum} {addressStreet}</Text> */}
            {/* https://stackoverflow.com/questions/66424006/how-to-select-a-button-in-react-native-without-selecting-others */}
            {/* <Checkbox status={completed ? 'checked' : 'unchecked'} text='Yes' onPress={()=>setCompleted(!completed)} /> */}
            
            <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {setCompleted(value)}}
            />

            <Text>Additional comments on this task (optional):</Text> 
            {/* <TextInput 
                label='' 
                mode='outlined' 
                onChangeText={text=>setAddressNum(text)}
            /> */}

            <Text>Where is this item now?</Text> 

            <SelectDropdown
                data={locations}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
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
                rowTextStyle={styles.dropDownTextStyle}
            />
       
            {/* only show this if other was chosen */}
            {/* if (selectedItem='Other (please specify below)') {
                <Text>If other, please specify item location:</Text>
            } */}
            {/* <Text>If other, please specify item location:</Text> 
            <TextInput 
                label='' 
                mode='outlined' 
                onChangeText={text=>setAddressNum(text)}
            /> */}
            
        </View>
    )
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

export default TaskCompletedForm