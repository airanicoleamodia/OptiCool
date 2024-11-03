import { View } from 'react-native'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextInput, Text, FAB } from 'react-native-paper';
import { removeAuth, setAuth } from '../../states/authSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime'
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

export default function Profile() {

    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);
    const navigation = useNavigation();

    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userData, setUserData] = useState({
        avatar: '',
        username: '',
        email: '',
    });

    const setUserOriginalInfo = async () => {

        const { data } = await axios.get(`${baseURL}/users/getsingle/${user._id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })

        setUserData({
            avatar: data.user.avatar,
            username: data.user.username,
            email: data.user.email,
        })
    }

    useFocusEffect(
        useCallback(() => {
            setUserOriginalInfo()
        }, [user])
    )

    const handleAvatarSelection = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserData((prev) => ({ ...prev, avatar: { public_id: "", url: result.assets[0].uri } }))
        }
    };

    const update = async () => {
        try {
            setIsSubmitting(true)

            const FORM_DATA = new FormData();

            if (!userData.avatar.public_id) {
                const newImageUri = "file:///" + userData.avatar.url.split("file:/").join("");

                FORM_DATA.append('avatar', {
                    uri: newImageUri,
                    type: mime.getType(newImageUri),
                    name: newImageUri?.split("/").pop()
                })
            }

            FORM_DATA.append('username', userData.username);
            FORM_DATA.append('email', userData.email);

            const { data } = await axios.put(`${baseURL}/users/update/${user._id}`, FORM_DATA, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            dispatch(setAuth({
                user: data.user,
                token: data.token,
            }))

            setUserOriginalInfo();
            setIsEditing(false);
            setIsSubmitting(false)
        } catch (err) {
            setIsSubmitting(false)
            console.log(err);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 10, gap: 20 }}>


                <View
                    style={{ alignSelf: 'center', marginTop: 30, }}

                >
                    {isEditing && (
                        <FAB
                            icon="pen"
                            style={{ position: 'absolute', zIndex: 1, }}
                            size='small'
                            onPress={handleAvatarSelection}
                            disabled={isSubmitting}
                        />
                    )}
                    <Avatar.Image
                        source={{ uri: userData.avatar?.url }}
                        size={120}
                    />
                </View>

                <TextInput
                    mode='outlined'
                    label={""}
                    disabled={!isEditing}
                    onChangeText={(value) => setUserData((prev) => ({ ...prev, username: value }))}
                    value={userData.username}
                />

                <TextInput
                    mode='outlined'
                    label={""}
                    disabled={!isEditing}
                    onChangeText={(value) => setUserData((prev) => ({ ...prev, email: value }))}
                    value={userData.email}
                />

                {isEditing ?

                    <View style={{ flexDirection: 'row', gap: 10, }}>

                        <Button
                            style={{ flex: 1, }}
                            mode='contained'
                            onPress={update}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            Update
                        </Button>

                        <Button
                            style={{ flex: 1, }}
                            mode='outlined'
                            onPress={() => {
                                setIsEditing(false)
                                setUserOriginalInfo();
                            }}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        >
                            Cancel
                        </Button>

                    </View>

                    :

                    <Button
                        mode='contained'
                        onPress={() => {
                            setIsEditing(true)
                        }}
                    >
                        Edit Profile
                    </Button>
                }

                <Button mode='contained' onPress={() => navigation.navigate('ResetPasswordCode')}>Change password</Button>

                <Button mode='outlined' onPress={() => dispatch(removeAuth())}>Logout</Button>
            </View>
        </View>
    )
}