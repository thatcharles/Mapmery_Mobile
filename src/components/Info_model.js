import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const Info_model = (props) => {
    return (
            <Modal 
            animationType="fade"
            transparent={true}
            visible={props.isInfoModel}
            onRequestClose={() => {props.setIsInfoModel( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setIsInfoModel( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard, alignContent: 'center'}}>
                            <View style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: 20}}>
                                <Text style={{fontSize: 20 ,fontWeight: '500'}}>Saved Spots</Text>
                            </View>
                            <View style={{alignSelf: 'flex-start', marginLeft: 20}}>
                                <Text style={{fontSize: 20 ,fontWeight: '500'}}>Unsaved Spots</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                                <IconButton icon="check" size={25} onPress={() => {props.setIsInfoModel(false)}} color='#50a39b' style={{bottom: 0}}/>
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
        top: 0,
        backgroundColor: 'white',
        width: width * 0.5,
        height: height * 0.4,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        elevation: 5,
        borderRadius: 15,
    }
})

export default Info_model