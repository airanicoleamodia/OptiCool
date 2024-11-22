import { Alert, ScrollView, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, DataTable, Button, IconButton } from 'react-native-paper'
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function UsersAll() {

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const { user, token } = useSelector(state => state.auth);
    const navigation = useNavigation();


    const [items, setItems] = useState([]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const getUsers = async () => {
        try {

            const { data } = await axios.get(`${baseURL}/users/all`, {
            })

            setItems(data.users)

        } catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async (id) => {

        try {

            const { data } = await axios.delete(`${baseURL}/users/delete/${id}`, {

            })

            Alert.alert("", "Successfully deleted!");
            getUsers()

        } catch (err) {
            console.log(err);
        }
    }


    const handleDelete = (id) => {
        console.log(id)
        Alert.alert("", "Do you want to delete this user",
            [
                { text: "Cancel" },
                { text: "Yes", onPress: () => deleteUser(id) }
            ]
        )
    }

    useFocusEffect(
        useCallback(() => {
            getUsers()
        }, [])
    )

    const updateRole = async ({ id, role }) => {

        try {
            
            const { data } = await axios.put(`${baseURL}/users/update/role/${id}`, {
                role: role,
            })

            Alert.alert("", "Successfully deleted!");
            getUsers()

        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (id) => {
        Alert.alert('Change Role', 'Please choose a role',
            [
                { text: "Cancel", },
                { text: "Admin", onPress: () => updateRole({ id: id, role: 'admin' }) },
                { text: "User", onPress: () => updateRole({ id: id, role: 'user' }) },
            ]
        )
    }

    return (
        <View style={{ marginBottom: 40, }}>

            <Text>Users</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable style={{ width: 500, }}>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center' }}>Role</DataTable.Title>
                        <DataTable.Title numeric style={{ justifyContent: 'center' }}>Action</DataTable.Title>
                    </DataTable.Header>

                    {items?.map((item) => (
                        <DataTable.Row key={item._id} style={{ height: 80 }}>
                            <DataTable.Cell>{item.username}</DataTable.Cell>
                            <DataTable.Cell>{item.email}</DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>{item.role}</DataTable.Cell>
                            <DataTable.Cell numeric style={{ justifyContent: 'center' }}>
                                <IconButton icon={'account'} onPress={() => handleUpdate(item._id)} />
                                <IconButton icon={'delete'} onPress={() => handleDelete(item._id)} />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}

                </DataTable>
            </ScrollView>

        </View>
    )
}