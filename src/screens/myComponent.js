import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { List } from 'react-native-paper';

const notes = 
  [
    {
      "id": 1,
      "title": '123',
      "description":  '123'
    },
    {
      "id": 2,
      "title": '456',
      "description":  '456'
    }
  ]

function Item({ title, description, descriptionNumberOfLines, titleStyle }) {
    return (
        <>
        <Text>{title}</Text>
        <Text>{description}</Text>
        </>
    );
  }

const MyComponent = () => (
  <FlatList
      data={notes}
      renderItem={({ item }) => (
        <List.Item
        title='abc'
        description= '123'
        descriptionNumberOfLines={1}
        />
    )}
    keyExtractor={item => item.id.toString()}
    />
);

export default MyComponent;