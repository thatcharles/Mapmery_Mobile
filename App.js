import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/redux/store'


export default function App() {
  return (
    <StoreProvider store={store}>
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
