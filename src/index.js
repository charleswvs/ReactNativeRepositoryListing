import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import './config/ReactotronConfig';

import Routes from './routes';
// everything imported after reactotron will be debugged

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
