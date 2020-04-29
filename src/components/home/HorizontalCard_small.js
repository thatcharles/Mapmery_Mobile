import React, { Component } from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image } from 'react-native'

const HorizontalCard_small = (props) => {
    return (
        <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd'}}>
                <View style={{flex:2}}>
                    <Image source={props.imgUri}
                            style={{flex:1, width: null, height: null, resizeMode: 'cover'}}
                    ></Image>
                </View>
                <View style={{flex:1}}>
                    <Text style={{flex:1, paddingLeft: 10, paddingTop: 10}}>{props.name}</Text>
                </View>
        </View>
    )
}

export default HorizontalCard_small

