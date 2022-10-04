import React, {useState,useEffect,useContext} from 'react';
import {Text, StyleSheet, FlatList, ScrollView, Button} from 'react-native';
import {Card} from 'react-native-paper';
import { AuthContext } from "../src/context/AuthContext";
import {API_ROOT} from '@env';

function Tasks({navigation}) {

    // const {test} = useContext(AuthContext);
    // console.log(test)

    const [apiData, setApiData] = useState([]); // https://dev.to/andrewbaisden/creating-react-flask-apps-that-connect-to-postgresql-and-harperdb-1op0

    const {userToken} = useContext(AuthContext);
    // console.log('userToken from Tasks.js',userToken!==undefined);
    console.log(userToken!==undefined);

    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            // console.log('API_ROOT',API_ROOT)
            // const {userToken} = useContext(AuthContext);
            const API = API_ROOT+'/tasks';

            fetch(API,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
            })
                .then((response) => {
                    // console.log(response);
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    // setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);


    const renderItem = ({ item }) => (
        <Card style={styles.cardStyle}>
            <Text>{item.type} for {item.date}, at {item.time}</Text>
            <Text>Renter Name: {item.name}</Text>
            <Text>{item.type} Address: {item.address}</Text>
            <Text>Items: {item.items}</Text>
            <Text>User notes: {item.notes}</Text>
            <Text>Contact phone: {item.phone}</Text>
            <Text>Contact email: {item.email}</Text>
            <Button title='Is this task completed?' onPress={() => navigation.navigate('Task completed form',{item})} />

        </Card>
    );

    // console.log("from tasks.js");
    // changed scrollview in return to view
    return (
        <ScrollView>
            {/* <Button title="Login" onPress={() => navigation.navigate('Login')} /> */}
            <Button title="Historical Tasks" onPress={() => navigation.navigate('Historical Tasks')} />
            <Button title="Update Item" onPress={() => navigation.navigate('Update Item')} />
            <FlatList
            data={apiData}
            renderItem={renderItem}
            keyExtractor = {item=>item.id}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cardStyle: {
        margin:10,
        padding:10
    },
})


export default Tasks