import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')


const SaveTitle_model = (props) => {

    const [value, setValue] = useState('')

    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={props.isSaveTitle}
            onRequestClose={() => {props.setIsSaveTitle( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setIsSaveTitle( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard, alignContent: 'center'}}>
                            <View style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: 20}}>
                                <Text style={{fontSize: 20 ,fontWeight: '500'}}>Saved the trip to</Text>
                            </View>
                            {/* <Text style={{fontSize: 20 ,fontWeight: '700', margin: 20}}>March NY Trip</Text> */}
                            <TextInput 
                                placeholder='title'
                                placeholderTextColor='grey'
                                underlineColorAndroid='transparent'
                                style={{fontWeight: '700', backgroundColor: 'white', height: 40, marginHorizontal: 20}}
                                //value={props.value}
                                onChangeText={(value) => {setValue(value)}}
                            />
                            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                                <IconButton icon="keyboard-backspace" size={25} onPress={() => {props.setIsSaveTitle(false)}} color='#ff3d43'/>
                                <IconButton 
                                    icon="check" 
                                    size={25} 
                                    onPress={() => {
                                        props.setTitle(value)
                                        props.setIsSaveTitle(false)
                                    }} 
                                    color='#50a39b'
                                />
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
        //right: 0,
        //bottom: height / 2 - 200,
        //top: 0,
        backgroundColor: 'white',
        width: width * 0.9,
        height: 200,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        elevation: 5,
        borderRadius: 15,
    }
})

export default SaveTitle_model
