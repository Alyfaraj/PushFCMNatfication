import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { config, sendNotifcation, SetFCMToken } from './notifcationService';

class App extends Component {

  componentDidMount() {
    config();
    SetFCMToken();
  }

  render() {
    return (
      <View style={{alignContent:'center',alignItems:'center',justifyContent:'center',flex:1}}>
        <Text>Click here to push notfication</Text>
        <Button title="Send" onPress={() => { sendNotifcation() }} />
      </View>
    )
  }
};



export default App;

