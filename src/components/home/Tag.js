import React from 'react'
import { View, Text } from 'react-native'

const Tag = (props) => {
    return (
        <View style={{minHeight: 20, minWidth: 40, padding: 5, backgroundColor: 'white', borderColor: '#dddddd', borderWidth: 0.2, borderRadius: 2, marginRight: 10, alignItems: 'center'}}>
            <Text style={{fontWeight: '700', fontSize: 10}}>{props.tag}</Text>
        </View>
    )
}

export default Tag
