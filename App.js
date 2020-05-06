import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import { Provider as StoreProvider} from 'react-redux'
import {applyMiddleware, createStore } from 'redux'
//import store from './src/redux/store'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/redux/notesApp'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export default function App() {
  return (
    <StoreProvider store={createStoreWithMiddleware(rootReducer)}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
