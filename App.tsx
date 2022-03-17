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
import { View } from 'react-native';
import Home from './src/screens/Home';


const App: () => Node = () => {
  return (
  <View>
    <Router />
  </View>
  )
};



export default App;
