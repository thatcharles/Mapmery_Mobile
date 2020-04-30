import React from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import Animated, {Transition, Transitioning} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, Appbar, Avatar } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import Card_big from '../components/home/Card_big'
import Card_2col from '../components/home/Card_2col'
import Tab from '../components/Tab'
import GridPost from '../components/GridPost'
import { FAB, List } from 'react-native-paper'

const {width,height} = Dimensions.get('window')

const Profile = () => {

    let startHeaderHeight = 80
    if (Platform.OS === 'android') {
        startHeaderHeight = 110 + StatusBar.currentHeight
    }

    const InfoHeight = 80
    const InsightHeight = 130


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex:1, backgroundColor: 'white'}}>
                <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                    <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginTop: Platform.OS === 'android'? 30 : null}}>
                        <Avatar.Image size={64} style={{margin: 10, marginTop:15}} source={require('../../assets/avatar.jpg')} />
                        <View style={{backgroundColor: 'white'}}>
                            <Text
                                style={{ flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white', marginTop: 10}}
                            >
                                Yu-Lin Chung
                            </Text>
                            <Text
                                style={{flex: 1, fontSize: 12 ,fontWeight: '500', backgroundColor: 'white'}}
                            >
                                A traveler, vloger, and influencer.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: InfoHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                        <View style={{backgroundColor: 'white', padding: 10}}>
                            <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white'}}>
                                <Text style={{fontSize: 12 ,fontWeight: '700', marginHorizontal: 10}}>
                                    Location:
                                </Text>
                                <Text style={{fontSize: 12 ,fontWeight: '500'}}>
                                    Atlanta, GA, USA.
                                </Text>
                            </View>
                            <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white'}}>
                                <Text style={{fontSize: 12 ,fontWeight: '700', marginHorizontal: 10}}>
                                    Joined at:
                                </Text>
                                <Text style={{fontSize: 12 ,fontWeight: '500'}}>
                                    May 2020
                                </Text>
                            </View>
                        </View>
                </View>
                <View style={{flex:1, backgroundColor: 'white', paddingTop: 20}}>
                    <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}> Insights </Text>
                </View>
                <View style={{height: InsightHeight, marginTop: 20}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'posts'}/>
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'reviews'}/>
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'helpful votes'}/>
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'hearts'}/>
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'followers'}/>
                        <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'saved posts'}/>
                    </ScrollView>
                </View>
                <View style={{flex:1, backgroundColor: 'white', paddingTop: 20}}>
                    <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}> Settings </Text>
                </View>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Notifications
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Account Setting
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Account Privacy
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Security
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Payments
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                Help
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection:'row', paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                            <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', marginTop: 7}}>
                                About
                            </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Profile


/**
 * Name
 * About
 * 
 * Location
 * Joined at
 * 
 * Insights
 */

/**
 * Notifications
 * Account Setting
 *  - Language
 *  - Dark Mode
 * Account Privacy
 * Security
 * Payments
 * Help
 * About
 * ---------
 * Switch Account
 * Add Account
 * Log Out
 * ---------
 * from
 * Mapmory
 */
