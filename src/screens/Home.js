import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'

export default class Home extends Component {
    render() {
        return (
            <>
                <Header titleText='Home' />
                <View>
                    <Text> Home </Text>
                </View>
            </>
        )
    }
}


