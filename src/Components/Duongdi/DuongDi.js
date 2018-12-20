import React, { Component } from 'react';
import {View} from 'react-native';
import { WebView } from 'react-native';

export default class DuongDi extends Component {
  render() {
    return (
      <View style={{flex:1}}>
      <WebView
      style={{flex:1}}
        source={{uri: 'http://125.212.241.28/demo/#'}}
      />
      </View>
    );
  }
}