import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import StarRating from 'react-native-star-rating'
import { FAB, List, Avatar, Card, IconButton  } from 'react-native-paper'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')

const AddCurrentLocationSheet = (props) => {

    const [note, setNote] = useState('')
    const [title, setTitle] = useState('')

    return (
            <Modal 
            animationType="fade"
            transparent={true}
            visible={props.editCurModel}
            onRequestClose={() => {props.setEditCurModel( false )}}
            >
                <TouchableOpacity
                    style={{ ...styles.modalContainer, ...StyleSheet.absoluteFill}} 
                    activeOpacity={1} 
                    onPressOut={() => {props.setEditCurModel( false )}}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {console.log('model pressed')}}
                    >
                        <View style={{...styles.optioncard}}>
                            <View style={{ paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white', height: 50, marginTop: 10}}>
                                    {/* <Text style={{flex: 1, fontSize: 20 ,fontWeight: '500'}}>
                                        {props.name}
                                    </Text> */}
                                    <TextInput 
                                        multiline
                                        mode='outlined'
                                        placeholder='title'
                                        placeholderTextColor='grey'
                                        style={{
                                            flex: 1, 
                                            fontSize: 20,
                                            fontWeight: '700', 
                                            backgroundColor: '#f6f7ff', 
                                            alignSelf:'center', 
                                            width: width * 0.8, 
                                            
                                        }}
                                        value={title}
                                        onChangeText={(value) => setTitle(value)}
                                    />
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginHorizontal: 20, backgroundColor: 'white'}}>
                                <View style={{flex: 1, marginTop:20}}>
                                    <Image source={props.imgUri}
                                            style={{flex:1, width: null, height: null, resizeMode: 'cover', borderRadius: 5, maxHeight: 100}}
                                    ></Image>
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
                                value={note}
                                onChangeText={(value) => setNote(value)}
                            />
                            <View style={{flexDirection: 'row', alignSelf:'flex-end', marginBottom: 30, marginEnd: 15}}>
                                <IconButton icon="keyboard-backspace" size={25} onPress={() => {props.setEditCurModel(false)}} color='#ff3d43'/>
                                <IconButton icon="content-save-edit-outline" 
                                    size={25} 
                                    onPress={() => {
                                        props.insertLocation(title, -1, -1)
                                        props.setEditCurModel(false)
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
        bottom: -50,
        width: width - 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 10,
        alignItems: 'center'
    }
})

export default AddCurrentLocationSheet
