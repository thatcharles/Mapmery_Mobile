import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar,ScrollView } from 'react-native'
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

    const [content, setContent] = useState([]) 
    const [contentAll, setContentAll] = useState([])
    var dict = {};

    const onMessageReceived = (msg, key) => {
        if(msg.payload){
            if (msg.payload.delta){
                if(msg.payload.delta.ops){
                    if(msg.payload.delta.ops[2].insert){
                        bodyUpdate(msg.payload.delta.ops[2].insert, key)
                    }
                }
            }
        }
    }

    const bodyUpdate = (body, key) => {
        dict[key] = body.trim()
    }

    const HandleSave = () => {
        var body = []
        var index = []
        for(var key in dict) {
            body.push(dict[key])
            index.push(parseInt(key))
        }
        navigation.state.params.handleBodyUpdate(body, index)
        navigation.goBack()
    }

    const createContent = locations => {
        let allContent = []
        locations.map((location, index) => {
            let newContent = []
            newContent.push({ insert: location.name })
            newContent.push({ insert: '\n', attributes: { header: 1 } })
            newContent.push({ insert: location.body })
            newContent.push({ insert: '\n\n\n\n' })
            setContent(content =>[...content, newContent])
            allContent.push({ insert: location.name })
            allContent.push({ insert: '\n', attributes: { header: 1 } })
            allContent.push({ insert: location.body })
            allContent.push({ insert: '\n\n\n\n' })
        })
        setContentAll(allContent)
    }

    useEffect(() => {
        if(navigation.state.params){
            createContent(navigation.state.params.body)
        }
    }, [navigation.state.params])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginHorizontal: 20, marginTop: Platform.OS === 'android'? 30 : null}}>
                    <Text
                        style={{flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white'}}
                    >
                        {navigation.state.params.readOnly? 'View': 'Editor'}
                    </Text>
                    {!navigation.state.params.readOnly ? (
                        <View style={{flexDirection:'row'}}>
                            <Button color='red' size={40} style={{marginTop: 5}}onPress={() => navigation.goBack()}>Cancel</Button>
                            <Button color='#50a39b' size={40} style={{marginTop: 5}}onPress={() => HandleSave()}>Save</Button>
                        </View>
                    ) : (<Button color='#50a39b' size={40} style={{marginTop: 5}}onPress={() => navigation.goBack()}>Back</Button>)
                    }
                </View>
            </View>
            {navigation.state.params.readOnly ? (
                <View
                    style={{height: 700}}>
                    <WebViewQuillJS
                        backgroundColor={"white"}
                        content = {
                            contentAll
                        }
                        isReadOnly
                    />
                </View>
                ) :
                (
                <ScrollView>
                    {
                        navigation.state.params.body.map((location, index) => {
                            return (
                                <View
                                    key={'editor-' + index} 
                                    style={{height: 200, marginBottom: 10}}>
                                    <WebViewQuillJS
                                        backgroundColor={"white"}
                                        onMessageReceived={msg => onMessageReceived(msg,index)}
                                        content = {
                                            content[index]
                                        }
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
                )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab_addCur: {
        position: 'absolute',
        margin: 50,
        right: 0,
        backgroundColor: 'white'
    }
})

export default Editor
