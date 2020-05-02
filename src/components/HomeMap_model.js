import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const HomeMap_model = (props) => {
    return (
            <Modal 
            animationType="fade"
            transparent={true}
            visible={props.isoptionArea}
            onRequestClose={() => {props.setIsoptionArea( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setIsoptionArea( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard, alignContent: 'center'}}>
                            <View style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: 20}}>
                                <Text style={{fontSize: 20 ,fontWeight: '500'}}>Saved the trip to</Text>
                            </View>
                            <Text style={{fontSize: 20 ,fontWeight: '700', margin: 20}}>March NY Trip</Text>
                            <View style={{alignSelf: 'flex-start', marginLeft: 20}}>
                                <Text style={{fontSize: 20 ,fontWeight: '500'}}>Change to</Text>
                            </View>
                            <ScrollView style={{flex: 1}} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity onPress={() => {props.setIsoptionArea(false)}}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white'}}>
                                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '700', marginTop: 7}}>
                                                Atlanta Attraction Collection
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {props.setIsoptionArea(false)}}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white'}}>
                                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '700', marginTop: 7}}>
                                                Spring Break Plan
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {props.setIsoptionArea(false)}}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white'}}>
                                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '700', marginTop: 7}}>
                                                Winter Break to SF
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {props.setIsoptionArea(false)}}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20, backgroundColor: 'white'}}>
                                            <Text style={{flex: 1, fontSize: 20 ,fontWeight: '700', marginTop: 7}}>
                                                Downtown Bars
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                                <IconButton icon="keyboard-backspace" size={25} onPress={() => {props.setIsoptionArea(false)}} color='#ff3d43'/>
                                <IconButton icon="check" size={25} onPress={() => {props.setIsoptionArea(false)}} color='#50a39b'/>
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
        right: 0,
        bottom: height / 2 - 200,
        //top: 0,
        backgroundColor: 'white',
        width: width * 0.6,
        height: 300,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        elevation: 5,
        borderRadius: 15,
    }
})

export default HomeMap_model