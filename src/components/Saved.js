import React, {Component} from 'react';
import {Text, View} from 'react-native';

const backgroundColor = '#BDC8C0';

class Saved extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}>
        <Text>Saved</Text>
      </View>
    );
  }
}

export default Saved;
