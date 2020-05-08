/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// import { auth } from '../_actions/user_actions';
import { auth } from '../redux/notesApp'
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, TextInput, Button, TouchableOpacity } from 'react-native'

export default function Auth({ navigation }, props) {

    let user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(auth()).then(response => {
            console.log('Auth response: ', response)
            if (!response.payload.isAuth) {
                navigation.navigate('Login')
            } else {
                if (!response.payload.isAdmin) {
                    if (navigation.state.params){
                        navigation.state.params.setAuth(true)
                    }
                    navigation.navigate('Home')
                }
                else {
                    if (navigation.state.params){
                        navigation.state.params.setAuth(true)
                    }
                    navigation.navigate('Home')
                }
            }
        })
        
    }, [navigation.state.params])

    return (<Text>loading...</Text>)
}

/*
export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.userReducer.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    props.navigatoin.navigate('Login')
                    // if (reload) {
                    //     props.history.push('/login')
                    // }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        //props.history.push('/')
                        props.navigatoin.navigate('Home')
                    }
                    else {
                        props.navigatoin.navigate('Home')
                        // if (reload === false) {
                        //     props.history.push('/')
                        // }
                    }
                }
            })
            
        }, [])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}
*/

