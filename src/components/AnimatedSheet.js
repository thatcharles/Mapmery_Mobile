import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const AnimatedSheet = (props) => {
    return (
            <Modal 
            animationType="fade"
            transparent={true}
            visible={props.editModel}
            onRequestClose={() => {props.setEditModel( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setEditModel( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard}}>
                            <View style={{ paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white', height: 50, marginTop: 10}}>
                                    <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500'}}>
                                        Midtown Marta station, Atlanta
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
                                </View>
                            </View>
                            <TextInput 
                                multiline
                                mode='outlined'
                                placeholder='note'
                                placeholderTextColor='grey'
                                style={{
                                    flex: 1, 
                                    fontWeight: '700', 
                                    backgroundColor: '#f6f7ff', 
                                    alignSelf:'center', 
                                    width: width * 0.8, 
                                    marginTop: 10,
                                    borderRadius: 5
                                }}
                            />
                            <View style={{flexDirection: 'row', alignSelf:'flex-end', marginBottom: 30, marginEnd: 15}}>
                                <IconButton icon="keyboard-backspace" size={25} onPress={() => {props.setEditModel(false)}} color='#ff3d43'/>
                                <IconButton icon="content-save-edit-outline" size={25} onPress={() => {props.setEditModel(false)}} color='#50a39b'/>
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
        bottom: -50,
        width: width - 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 10,
        alignItems: 'center'
    }
})

export default AnimatedSheet
