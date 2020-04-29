import React from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions } from 'react-native'
import StarRating from 'react-native-star-rating'

const {width,height} = Dimensions.get('window')

const Card_2col = (props) => {
    return (
        <View style={{width: width / 2 - 30, height: width / 2 - 30, borderWidth: 0.5, borderColor: '#dddddd'}}>
            <View style={{flex:1}}>
                <Image source={props.imgUri}
                        style={{flex:1, width: null, height: null, resizeMode: 'cover'}}
                ></Image>
            </View>
            {/** justifyContent: 'space-evenly' make sure the content take up the whole usable space. */}
            <View style={{flex:1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10}}>
                <Text style={{fontSize: 10}}>{props.type}</Text>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>{props.name}</Text>
                <Text style={{fontSize: 10}}>{props.price}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={props.starRating}
                    starSize={10}></StarRating>
            </View>
        </View>
    )
}

export default Card_2col
