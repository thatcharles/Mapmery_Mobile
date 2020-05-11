import React, { Component } from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
const {width,height} = Dimensions.get('window')
import { Avatar} from 'react-native-paper'

const Car_big = (props, {navigation}) => {
    return (
        <View style={{width: width-40, height: 200, marginTop: 40, borderWidth: 0.5, borderRadius: 5, borderColor: '#dddddd'}}>
            <View style={{flex:2}}>
                <Image source={props.imgUri}
                        style={{flex:1, width: null, height: null, resizeMode: 'cover', borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                ></Image>
            </View>
            <View style={{flex:1, flexDirection: 'row'}}>
                <Avatar.Image size={48} style={{margin: 10}} source={{uri: props.avatar ? props.avatar : null}} />
                <View style={{justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={{marginHorizontal: 10}}>{props.name}</Text>
                    <Text style={{marginHorizontal: 10}}>By {props.author}</Text>
                </View>
            </View>
        </View>
    )
}

export default Car_big