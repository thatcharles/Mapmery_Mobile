import React, {useState} from 'react'
import { Dimensions, View, Text, SafeAreaView, TextInput, ActivityIndicator, StatusBar, ScrollView } from 'react-native'
import {Formik} from 'formik'
import * as Yup from "yup";
import { FAB, List, Avatar, Card, IconButton, Button, Image  } from 'react-native-paper'
import axios from 'axios'
//import { registerUser } from "../../../_actions/user_actions";
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../redux/notesApp'

const {width,height} = Dimensions.get('window')

const Signup = ({navigation}) => {

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
                    email: '',
                    lastName: '',
                    name: '',
                    password: '',
                    confirmPassword: ''
                  }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email('Email is invalid')
                      .required('Email is required'),
                    name: Yup.string()
                      .required('Name is required'),
                    lastName: Yup.string()
                      .required('Last Name is required'),
                    password: Yup.string()
                      .min(6, 'Password must be at least 6 characters')
                      .required('Password is required'),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                      .required('Confirm Password is required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
            
                      let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastname: values.lastName,
                        image: 'http://gravatar.com/avatar/d=identicon'
                      };
                      
                      // ec2-3-88-10-24.compute-1.amazonaws.com/api/users/register
                      // https://mapmory.herokuapp.com/api/users/register
                        dispatch(registerUser(dataToSubmit)).then(response => {
                            if (response.payload.success) {
                                navigation.navigate("Login");
                            } else {
                                setErrormsg(response.payload.err.errmsg)
                            }
                          })
            
                      setSubmitting(false);
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
                                        onPress={() => navigation.navigate('Login')}
                                    >Cancel</Button>
                                </View>
                            </View>
                            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.email}
                                        placeholder='Email'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.email && touched.email ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('email')}
                                    />
                                </View>
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
                                        value = {values.password}
                                        placeholder='Password'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.password && touched.password ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('password')}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 70}}>
                                    <TextInput 
                                        value = {values.confirmPassword}
                                        placeholder='Confirm Password'
                                        placeholderTextColor='grey'
                                        underlineColorAndroid= {errors.confirmPassword && touched.confirmPassword ? 'red' : '#dddddd'}
                                        style={{
                                            fontWeight: '700', 
                                            backgroundColor: 'white', 
                                            height: 60,
                                            borderRadius: 1,
                                            margin: 10
                                        }}
                                        onChangeText={handleChange('confirmPassword')}
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

export default Signup
