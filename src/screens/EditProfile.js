import React, {useState} from 'react'
import { Dimensions, View, Text, SafeAreaView, TextInput, ActivityIndicator, StatusBar, ScrollView } from 'react-native'
import {Formik} from 'formik'
import * as Yup from "yup";
import { FAB, List, Avatar, Card, IconButton, Button, Image  } from 'react-native-paper'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../redux/notesApp'

const {width,height} = Dimensions.get('window')

const EditProfile = ({navigation}) => {

    const dispatch = useDispatch();
    const [errormsg, setErrormsg] = useState(null)

    let startHeaderHeight = 50

    if (Platform.OS === 'android') {
        startHeaderHeight = 80 + StatusBar.currentHeight
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Formik
                initialValues={{
                    lastName: navigation.state.params.lastname,
                    name: navigation.state.params.name,
                    description: navigation.state.params.description,
                    location: navigation.state.params.location
                  }}
                validationSchema={Yup.object().shape({
                    name: Yup.string(),
                    lastName: Yup.string(),
                    description: Yup.string()
                    .max(150, 'at most 150 caracters'),
                    location: Yup.string()
                    .max(50, 'at most 50 caracters'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
            
                        let dataToSubmit = {
                            name: values.name,
                            lastname: values.lastName,
                            description: values.description,
                            location: values.location
                        };
                        
                        navigation.state.params.updateHandler(dataToSubmit)
                        navigation.navigate("Profile");
                      }, 500);
                  }}
            >
                {formikProps => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                      } = formikProps
                    return(
                        <React.Fragment >
                            <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                                <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginHorizontal: 20, marginTop: Platform.OS === 'android'? 30 : null}}>
                                    <Text
                                        style={{flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white'}}
                                    >
                                        SIGN UP
                                    </Text>
                                    <Button
                                        color='red' 
                                        size={40} 
                                        style={{marginTop: 5}}
                                        onPress={() => navigation.navigate("Profile")}
                                    >Cancel</Button>
                                </View>
                            </View>
                            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.name}
                                        placeholder='First Name'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.name && touched.name ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('name')}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.lastName}
                                        placeholder='Last Name'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.lastName && touched.lastName ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('lastName')}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.description}
                                        placeholder='Description'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.password && touched.password ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('description')}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.location}
                                        placeholder='Location'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.password && touched.password ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('location')}
                                    />
                                </View>
                            </ScrollView>
                            <View style={{justifyContent: 'center', height: 30}}>
                                {errormsg ? (<Text>{errormsg}</Text>): (<></>)}
                            </View>
                            <View style={{justifyContent: 'center', height: 50}}>
                                {isSubmitting? (<ActivityIndicator/>): (<Button onPress={handleSubmit}>Submit</Button>)}
                            </View>
                        </React.Fragment>
                    )}
                }
            </Formik>
        </SafeAreaView>
    )
}

export default EditProfile
