import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'

export default class Collection extends Component {
    render() {
        return (
            <>
                <Header titleText='Collections' />
                <View>
                    <Text> Collections </Text>
                </View>
            </>
        )
    }
}

