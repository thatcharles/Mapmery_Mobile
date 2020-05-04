import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import DeltaStatic, { providerRegistry, Quill } from 'react-native-webview-quill';
//import {WebView} from 'react-native-webview-quill/src/providers/WebView/ReactNative/index'
//import { WebView } from 'react-native-webview';
import Delta from 'quill-delta'
import {WebViewQuillEditor, WebViewQuillViewer, WebViewQuillJS} from 'react-native-webview-quilljs'
import { FAB, List, Avatar, Card, IconButton, Button, Image  } from 'react-native-paper'

const Editor = ({navigation}) => {

    let startHeaderHeight = 50

    if (Platform.OS === 'android') {
        startHeaderHeight = 80 + StatusBar.currentHeight
    }

    const onMessageReceived = (msg) => {
        if(msg.payload){
            //console.log(msg.payload.text)
        }
    }

    const delta = new Delta([
        { insert: 'The Two Towers' },
        { insert: '\n', attributes: { header: 1 } },
        { insert: 'Aragorn sped on up the hill.\n' }
      ]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginHorizontal: 20, marginTop: Platform.OS === 'android'? 30 : null}}>
                    <Text
                        style={{flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white'}}
                    >
                        Editor
                    </Text>
                    <Button 
                        color='red' 
                        size={40} 
                        style={{marginTop: 5}}
                        onPress={() => navigation.goBack()}
                    >Cancel</Button>
                </View>
            </View>
            <View style={{ height: 700}}>
            <WebViewQuillJS
                backgroundColor={"white"}
                onMessageReceived={onMessageReceived}
                content = {delta}
            />
            </View>
        </SafeAreaView>
    )
}

export default Editor
