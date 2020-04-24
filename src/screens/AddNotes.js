import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton, TextInput, FAB } from 'react-native-paper'

import Header from '../components/Header'

function AddNotes({ navigation }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteValue, setNoteValue] = useState('')

    function onSaveNote() {
        navigation.state.params.addNote({ noteTitle, noteValue })
        navigation.goBack()
    }

    return (
        <>
        <Header titleText='Add a new note' />
        <IconButton
            icon='close'
            size={25}
            color='white'
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
        />
        <View style={styles.container}>
            <TextInput
            label='Add Title Here'
            value={noteTitle}
            mode='outlined'
            onChangeText={setNoteTitle}
            style={styles.title}
            />
            <TextInput
            label='Add Note Here'
            value={noteValue}
            onChangeText={setNoteValue}
            mode='flat'
            multiline={true}
            style={styles.text}
            scrollEnabled={true}
            returnKeyType='done'
            blurOnSubmit={true}
            />
            <FAB
            style={styles.fab}
            small
            icon='check'
            disabled={noteTitle == '' ? true : false}
            onPress={() => onSaveNote()}
            />
        </View>
        </>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  text: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0
  }
})

export default AddNotes
