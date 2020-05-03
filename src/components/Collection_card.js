import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const Collection_card = (props) => {
    return (
            <View style={{...styles.optioncard}}>
                <View style={{ paddingHorizontal: 10, marginHorizontal: 10, backgroundColor: 'white', height: 50}}>
                        <Text numberOfLines={1} style={{flex: 1, fontSize: 20 ,fontWeight: '500'}}>
                            Midtown Marta station, Atlanta
                        </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginHorizontal: 10, backgroundColor: 'white', marginTop: -25}}>
                    <Text style={{fontSize: 10 ,fontWeight: '600'}}>
                        Afternoon in midtown
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginHorizontal: 10, backgroundColor: 'white'}}>
                    <View style={{flex: 1, marginTop:10}}>
                        <Image source={props.imgUri}
                                style={{flex:1, width: null, height: null, resizeMode: 'cover', borderRadius: 5, maxHeight: 100}}
                        ></Image>
                    </View>
                    <View style={{flex: 2, marginTop: 20}}>
                        <Text style={{fontSize: 12 ,fontWeight: '500', marginHorizontal: 10, paddingHorizontal: 10, height: 50}}>
                            Collection card
                        </Text>
                        <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                            <IconButton icon="keyboard-backspace" size={25} onPress={() => {console.log('pressed back')}} color='#ff3d43'/>
                            <IconButton 
                                icon="content-save-edit-outline" 
                                size={25} 
                                onPress={() => {
                                    console.log('pressed store')
                                }} color='#50a39b'
                            />
                        </View>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optioncard: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: width * 0.6,
        height: 170,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        elevation: 5,
        borderRadius: 15
    }
})

export default Collection_card