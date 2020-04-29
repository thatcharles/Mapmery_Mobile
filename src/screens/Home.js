import React, { useState } from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import Header from '../components/Header'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, Appbar } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import Card_big from '../components/home/Card_big'
import Card_2col from '../components/home/Card_2col'
import Tag from '../components/home/Tag'
import Animated from 'react-native-reanimated';

const {
    useCode,
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    and,
    not,
    concat
  } = Animated;

const {width,height} = Dimensions.get('window')

const Home = () => {

    const scrollY = new Value(0)
    let startHeaderHeight = 80
    let endHeaderHeight = 50

    if (Platform.OS === 'android') {
        startHeaderHeight = 110 + StatusBar.currentHeight
        endHeaderHeight = 80 + StatusBar.currentHeight
    }

    const onScrollChange = event(
        [
            {
                // when we scroll, put y offset into scrollY variable
                nativeEvent:{contentOffset:{y:scrollY}}

            }
        ]
    )

    const animatedHeaderHeight = interpolate(scrollY, {
        inputRange:[0,50],
        outputRange: [startHeaderHeight, endHeaderHeight],
        extrapolate: Extrapolate.CLAMP
    })

    const animatedOpacity = interpolate(animatedHeaderHeight,{
        inputRange:[endHeaderHeight,startHeaderHeight],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
    })

    const animatedTagTop = interpolate(animatedHeaderHeight,{
        inputRange:[endHeaderHeight,startHeaderHeight],
        outputRange: [-30, 10],
        extrapolate: Extrapolate.CLAMP
    })


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Animated.View style={{ height: animatedHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                    <View style={{ flexDirection:'row', padding: 10, backgroundColor: 'white', marginHorizontal: 20, elevation: 1, marginTop: Platform.OS === 'android'? 30 : null}}>
                        <Icon name='ios-search' size={25} style={{marginRight: 10, marginTop: 10}}/>
                        <TextInput 
                            placeholder='Try'
                            placeholderTextColor='grey'
                            underlineColorAndroid='transparent'
                            style={{flex: 1, fontWeigth: '700', backgroundColor: 'white', height: 40}}
                        />
                    </View>
                    <Animated.View 
                        style={{flexDirection: 'row', marginHorizontal: 20, position: 'relative', top: animatedTagTop, opacity: animatedOpacity}}
                    >
                        <Tag tag='Journey'/>
                        <Tag tag='Spot'/>
                    </Animated.View>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    style={{flex:1, backgroundColor: 'white'}}
                    onScroll={
                            event(
                                [
                                    {
                                        // when we scroll, put y offset into scrollY variable
                                        nativeEvent:{contentOffset:{y:scrollY}}
                                    }
                                ]
                            )
                        }
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
                    <View style={{marginTop: 40, }}>
                        <Text style={{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}>
                            Around the world
                        </Text>
                        {/** flexDirection: 'row', flexWrap: 'wrap' help make the cards align in 2 columns */}
                        <View style={{marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            <Card_2col imgUri={require('../../assets/img/rotterdam.jpg')} type={'vacation house'} name={'home 0'} price={'90$'} starRating={4}/>
                            <Card_2col imgUri={require('../../assets/img/rotterdam.jpg')} type={'vacation house'} name={'home 0'} price={'90$'} starRating={3}/>
                            <Card_2col imgUri={require('../../assets/img/rotterdam.jpg')} type={'vacation house'} name={'home 0'} price={'90$'} starRating={3.5}/>
                        </View>
                    </View>
                    
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home

