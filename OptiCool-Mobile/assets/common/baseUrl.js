import { Platform } from 'react-native'

let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'http://192.168.194.74:4000/api/v1'
        : baseURL = 'http://192.168.194.74:4000/api/v1'
}


export default baseURL;


// // import { Platform } from 'react-native'

// // let baseURL = '';

// // {
// //     Platform.OS == 'android'
// //         ? baseURL = 'https://opticool.onrender.com/api/v1'
// //         : baseURL = 'https://opticool.onrender.com/api/v1'
// // }

// // export default baseURL;

// const baseURL = 'mongodb://localhost:27017/';

// export default baseURL;
