import React from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'

const {width,height} = Dimensions.get('window')

const HomeMap_actoin_card = (props) => {
    return (
        <View style={{flexDirection:'row', width: 250, height: 130, borderRadius: 5, backgroundColor: 'white', overflow:'hidden'}}>
            <View style={{flex:1, alignContent: 'center', justifyContent:'center'}}>
                <Avatar.Image size={64} style={{margin: 10, marginTop:15, backgroundColor: 'black'}} source={{uri: props.item.author.image ? props.item.author.image  : null}}/>
            </View>
            <View style={{flex:2}}>
                <View style={{flexDirection:'row', alignContent: 'center', justifyContent:'center', height:40}}>
                    <View style={{flex:2, overflow:'hidden', alignItems: 'flex-start', marginTop: 15}}>
                        <Text style={{fontSize: 12}}>Local expert</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'flex-end'}}>
                        <IconButton icon="plus" onPress={() => {props.setIsoptionArea(true)}} color='#50a39b'/>
                    </View>
                </View>
                <Text style={{borderRadius: 5, fontWeight: '700'}}>{props.item.title}</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: 0, marginBottom: 7}}
                >
                    <Text style={{fontWeight: '500', color: 'grey'}}>{props.item.author.name}</Text>
                    <Text style={{fontWeight: '500', color: 'grey'}}>Midtown Marta station</Text>
                    <Text style={{fontWeight: '500', paddingLeft: 10}}>Picked up here to meet the city of Atlanta. A afternoon in midtown with A afternoon in midtown with A afternoon in midtown with</Text>
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeMap_actoin_card