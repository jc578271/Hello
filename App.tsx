/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// @ts-ignore
import type {Node} from 'react';
import Router from './Router';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import TestRouter from './testRouter';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);


const App: () => Node = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
};
export default App;
