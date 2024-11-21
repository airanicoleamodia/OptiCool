import { View, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './EnvironmentDesign';
import opticoolImage from '../../assets/opticool.png';

export default function EnvironmentStatus() {
    return (
        <SafeAreaView style={styles.container}>
        {/* Make sure the ImageBackground takes up the whole screen */}
        <ImageBackground
            source={opticoolImage}
            style={styles.background}
            resizeMode="cover"
        >
    

            <View style={styles.mainRow}>
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Temperature Sensor 1</Text>
                    <Text style={styles.applianceStatus}>Status: Active</Text>
                </View>
             
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Temperature Sensor 2</Text>
                    <Text style={styles.applianceStatus}>Status: Active</Text>
                </View>
            </View>

            <View style={styles.mainRow}>
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Temperature Sensor 3</Text>
                    <Text style={styles.applianceStatus}>Status: Active</Text>
                </View>
             
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Temperature Sensor 4</Text>
                    <Text style={styles.applianceStatus}>Status: Active</Text>
                </View>
            </View>

            <View style={styles.mainRow}>
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Exhaust Fan</Text>
                    <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                </View>
            </View>

            <View style={styles.mainRow}>
                <View style={styles.applianceCard}>
                    <Text style={styles.applianceText}>Power Consumption Meter</Text>
                    <Text style={styles.applianceStatusInactive}>Status: Inactive</Text>
                </View>
            </View>
            
      
        </ImageBackground>
    </SafeAreaView>
    );
}
