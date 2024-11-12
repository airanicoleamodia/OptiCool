import { View, Image, ScrollView } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './EnvironmentDesign';

export default function EnvironmentStatus() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.outerCon}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.up}>INSIDE</Text>
                                <Text style={styles.percent}>50 %</Text>
                                <Text style={styles.bottom}>HUMIDITY</Text>
                                <Image
                                    source={require('../../assets/waterdroplet.png')} 
                                    style={styles.customIcon}
                                />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.up}>OUTSIDE</Text>
                                <Text style={styles.percent}>70 %</Text>
                                <Text style={styles.bottom}>HUMIDITY</Text>
                                <Image
                                    source={require('../../assets/waterdroplet.png')} 
                                    style={styles.customIcon}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.outerCon}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.up}>INSIDE</Text>
                                <Text style={styles.percent}>27°C</Text>
                                <Text style={styles.bottom}>TEMPERATURE</Text>
                                <Image
                                    source={require('../../assets/waterdroplet.png')} 
                                    style={styles.customIcon}
                                />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.up}>OUTSIDE</Text>
                                <Text style={styles.percent}>37°C</Text>
                                <Text style={styles.bottom}>TEMPERATURE</Text>
                                <Image
                                    source={require('../../assets/waterdroplet.png')} 
                                    style={styles.customIcon}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
