import React, {useState, useEffect} from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import Animated, {Transition, Transitioning} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons'
import { FAB, TextInput, Appbar, Avatar, Button } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import { logoutUser, updateUser } from '../redux/notesApp'

import { useSelector, useDispatch } from 'react-redux'
import navigation from '../navigation';
import axios from 'axios';

const {width,height} = Dimensions.get('window')

const Profile = ({navigation}) => {

    let startHeaderHeight = 80
    if (Platform.OS === 'android') {
        startHeaderHeight = 110 + StatusBar.currentHeight
    }

    const InfoHeight = 80
    const InsightHeight = 130

    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.userReducer)
    const userId = userReducer.loginSucces ?  userReducer.loginSucces.userId : null
    const userData = userReducer.userData ?  userReducer.userData : null
    const ID = userId ? userId: userData._id

    useEffect(() => {
    }, [userReducer])

    const logoutHandler = () => {
        setTimeout(() => {
            dispatch(logoutUser())
                .then(response => {
                    setTimeout(() => {
                        // used for redirect
                        navigation.navigate('Login')
                        }, 1000);
                });
          }, 500);
    }

    const updateHandler = (dataToSubmit) => {
        setTimeout(() => {
            
            // ec2-3-88-10-24.compute-1.amazonaws.com/api/users/register
            // https://mapmory.herokuapp.com/api/users/register
              dispatch(updateUser(dataToSubmit)).then(response => {
                  if (response.payload.success) {
                      console.log('profile updated!')
                  } else {
                      console.log('error: ',response.payload)
                  }
                })
          }, 500);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex:1, backgroundColor: 'white'}}>
                <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                    <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginTop: Platform.OS === 'android'? 30 : null}}>
                        <Avatar.Image size={64} style={{margin: 10, marginTop:15}} source={{uri: userData ? userData.image : null}} />
                        <View style={{backgroundColor: 'white'}}>
                            <Text
                                style={{ flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white', marginTop: 10}}
                            >
                                {userData ? userData.name + ' ' : null}
                                {userData ? userData.lastname : null}
                            </Text>
                            <Text
                                style={{flex: 1, fontSize: 12 ,fontWeight: '500', backgroundColor: 'white'}}
                            >
                                {userData ? userData.description : null}
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
                                    {userData ? userData.location : null}
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
                            <View style={{ flexDirection:'row', paddingHorizontal: 10, backgroundColor: 'white'}}>
                                <Text style={{fontSize: 10 ,fontWeight: '500', marginHorizontal: 10}}>
                                    {ID}
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
                <TouchableOpacity onPress={() => {logoutHandler()}}>
                    <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500', color: '#4240eb', marginVertical: 15, marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 5}}>
                                Logout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <Button style={styles.fab} contentStyle={{heigth:50, wifth: 50}} icon="feather" mode="Outlined" color='#50a39b' onPress={() => {updateHandler()}}/> */}
            <FAB
                style={styles.fab}
                color='#50a39b'
                small
                icon="feather"
                title='edit'
                onPress={
                    () =>
                    {
                        if(userData){
                            navigation.navigate('EditProfile', {
                                updateHandler,
                                name: userData.name,
                                lastname: userData.lastname,
                                description: userData.description,
                                location: userData.location,
                            })
                        }
                    }
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        marginHorizontal: 30,
        marginVertical: 50,
        backgroundColor: 'white',
        right: 0,
        top: 0,
        elevation: 0
    },
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
