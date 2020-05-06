import React from 'react'
import { View, Text, SafeAreaView, TextInput, ActivityIndicator, StatusBar } from 'react-native'
import {Formik} from 'formik'
import * as Yup from "yup";
import { FAB, List, Avatar, Card, IconButton, Button, Image  } from 'react-native-paper'
import axios from 'axios'

const registerUser = async(dataToSubmit) => {
    const request = axios.post('https://mapmory.herokuapp.com/api/users/register',dataToSubmit)
        .then(response => console.log(response.data))
        .catch(function (error) {
            console.log(error);
          });

    // fetch('https://mapmory.herokuapp.com/api/blog/getBlogs', {method:'GET'})
    // .then(
    //   result => {
    //     return result.json()
    //   }).then(data => {
    //     console.log(data)
    //   })
}

const Signup = ({navigation}) => {

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

                      //console.log(dataToSubmit)
                      
                      // ec2-3-88-10-24.compute-1.amazonaws.com/api/users/register
                      // https://mapmory.herokuapp.com/api/users/register
                      registerUser(dataToSubmit)
                    //   .then(response => {
                    //     if (response.payload.success) {
                    //       navigation.navigate("Login");
                    //     } else {
                    //       alert(response.payload.err.errmsg)
                    //     }
                    //   })
            
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
                            <View style={{flex: 2, backgroundColor: 'white'}}>
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 80}}>
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
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 80}}>
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
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 80}}>
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
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 80}}>
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
                                <View style={{flex: 1, backgroundColor: 'white', maxHeight: 80}}>
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
                            </View>
                            <View style={{flex:1, justifyContent: 'center'}}>
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
