import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import Collection_card from './Collection_card'
import { TextInput } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('screen')

const AnimatedSheet = (props) => {
    return (
        <Animated.View style={{...styles.bottomSheet, transform: [{translateY: props.translateY}]}}>
            <Collection_card imgUri={require('../../assets/img/rotterdam.jpg')}/>
            <TextInput 
                placeholder='Notes'
                placeholderTextColor='grey'
                underlineColorAndroid='transparent'
                style={{flex: 1, fontWeight: '700', backgroundColor: 'white', marginTop: 100}}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: width - 20,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 10,
        alignItems: 'center'
    }
})

export default AnimatedSheet
