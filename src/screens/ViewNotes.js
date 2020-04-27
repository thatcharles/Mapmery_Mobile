import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'

import Header from '../components/Header'

import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'
import { color } from 'react-native-reanimated'

function ViewNotes({ navigation }) {

    // replace useState with useSelector to link to Redux
    const notes = useSelector(state => state)
    const dispatch = useDispatch()

    const addNote = note => dispatch(addnote(note))
    const deleteNote = id => dispatch(deletenote(id))
    return (
        <>
            <Header titleText='Simple Note Taker' />
            <View style={styles.container}>
                {notes.length === 0 ? (
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>You do not have any notes</Text>
                    </View>
                ) : (
                      <FlatList
                      data={notes}
                      renderItem={({ item }) => (
                        <List.Item
                        title= {item.note.noteTitle}
                        description= {item.note.noteValue}
                        descriptionNumberOfLines={1}
                        onPress={() => deleteNote(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    />
                )}
            <FAB
                style={styles.fab}
                small
                icon='plus'
                label='Add new note'
                // add a second parameter object
                onPress={() =>
                navigation.navigate('AddNotes', {
                    addNote
                })
                }
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
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 20
  },
  fabRight: {
    position: 'absolute',
    margin: 20,
    left: 0,
    bottom: 80
  }
})

export default ViewNotes