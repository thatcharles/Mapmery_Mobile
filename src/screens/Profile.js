import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'

export default class Profile extends Component {
    render() {
        return (
            <>
                <Header titleText='Profiles' />
                <View>
                    <Text> Profiles </Text>
                </View>
            </>
        )
    }
}
