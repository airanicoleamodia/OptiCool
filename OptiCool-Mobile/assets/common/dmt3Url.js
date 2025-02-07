import { Platform } from 'react-native'

let dmtUrl = '';

// {
//     Platform.OS == 'android'
//         ? dmtUrl = 'http://192.168.23.103:5000'
//         : dmtUrl = 'http://192.168.23.103:5000'
// }
{
    Platform.OS == 'android'
        ? dmtUrl = 'http://192.168.23.103:5000'
        : dmtUrl = 'http://192.168.23.103:5000'
}


export default dmtUrl;