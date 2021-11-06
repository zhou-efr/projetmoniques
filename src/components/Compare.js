import React, {Component} from 'react';
import {Text, View} from 'react-native';

const backgroundColor = '#BDC8C0';

class Compare extends Component {
  render() {
    return (
      <View
        style={{
          flex: 4,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: backgroundColor,
        }}>
        <Text>Compare</Text>
      </View>
    );
  }
}

export default Compare;
