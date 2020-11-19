/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, Component } from 'react';
import ImageNavigator from "./Navigation/appNavigator";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Image_Picker from './Screens/Image_picker';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import authReducer from "./store/reducers/auth"
import equationReducer from "./store/reducers/equation"
import ReduxThunk from "redux-thunk"
const rootReducer=combineReducers({
  auths:authReducer,
  equations:equationReducer
});
const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default class App extends Component{
  render(){
     return <Provider store={store}><ImageNavigator/></Provider>;
  }
}


