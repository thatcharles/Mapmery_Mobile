import React, { useState } from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, Appbar } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import Card_big from '../components/home/Card_big'

const {width,height} = Dimensions.get('window')

const Home = () => {

    let startHeaderHeight = 80
    if (Platform.OS === 'android') {
        startHeaderHeight = 100 + StatusBar.currentHeight
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                    <View style={{ flexDirection:'row', padding: 10, backgroundColor: 'white', marginHorizontal: 20, elevation: 1, marginTop: Platform.OS === 'android'? 30 : null}}>
                        <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                        <TextInput 
                            placeholder='Try'
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            style={{flex: 1, fontWeigth: '700', backgroundColor: 'white', height: 40}}
                        />
                    </View>
                </View>
                <ScrollView
                    scrollEventThrottle={16}
                    style={{flex:1, backgroundColor: 'white'}}
                >
                    <View style={{flex:1, backgroundColor: 'white', paddingTop: 20}}>
                        <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}> Home </Text>
                    </View>
                    <View style={{height: 130, marginTop: 20}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'home 2'}/>
                            <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'home 1'}/>
                            <HorizontalCard_small imgUri={require('../../assets/img/rotterdam.jpg')} name={'home 1'}/>
                        </ScrollView>
                    </View>
                    <View style={{marginTop: 40, paddingHorizontal: 20}}>
                        <Text style={{fontSize: 24, fontWeight: '700'}}>Introducing Plus</Text>
                        <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'home 2'}/>
                        <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'home example'}/>
                    </View>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home

