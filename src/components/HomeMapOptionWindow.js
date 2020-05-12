import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const HomeMapOptionWindow = (props) => {
    return (
            <Modal 
            animationType="fade"
            transparent={true}
            visible={props.isoptionWindow}
            onRequestClose={() => {props.setIsoptionWindow( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setIsoptionWindow( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard}}>
                            <View style={{ paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white', height: 50}}>
                                    <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500'}}>
                                        {props.place ? props.place.name : null}
                                    </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white', marginTop: -25}}>
                                <Text style={{fontSize: 10 ,fontWeight: '600'}}>
                                    Afternoon in midtown
                                </Text>
                                <Text style={{fontSize: 10 ,fontWeight: '300', color: 'grey', marginLeft: 5}}>
                                    by Yu-Lin Chung
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white'}}>
                                <View style={{flex: 1, marginTop:20}}>
                                    <Image source={props.imgUri}
                                            style={{flex:1, width: null, height: null, resizeMode: 'cover', borderRadius: 5, maxHeight: 100}}
                                    ></Image>
                                </View>
                                <View style={{flex: 2, marginTop: 20}}>
                                    <Text style={{fontSize: 12 ,fontWeight: '500', marginHorizontal: 10, paddingHorizontal: 10, height: 80}}>
                                        Picked up here to meet the city of Atlanta. A afternoon in midtown with A afternoon in midtown with A afternoon in midtown with
                                    </Text>
                                    <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                                        <IconButton icon="keyboard-backspace" size={25} onPress={() => {props.setIsoptionWindow(false)}} color='#ff3d43'/>
                                        <IconButton 
                                            icon="content-save-edit-outline" 
                                            size={25} 
                                            onPress={() => {
                                            props.setIsoptionWindow(false) 
                                            props.setIsoptionArea(true)
                                            }} color='#50a39b'
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>   
            </Modal> 
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
        bottom: 10,
        backgroundColor: 'white',
        width: width * 0.9,
        height: 200,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        elevation: 5,
        borderRadius: 15
    }
})

export default HomeMapOptionWindow