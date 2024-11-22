import { Platform } from 'react-native'

let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'https://opticool.onrender.com/api/v1'
        : baseURL = 'https://opticool.onrender.com/api/v1'
}

export default baseURL;