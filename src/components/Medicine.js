import React, {Component} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import tw from 'tailwind-react-native-classnames';

class Medicine extends Component {
  constructor(props) {
    super(props);
  }

  toggleVisible = () => {
    this.props.toggleVisible();
  };

  render() {
    const isVisible = this.props.visible;
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => this.toggleVisible()}>
        <BlurView
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            borderRadius: 20,
            overflow: 'hidden',
            height: '50%',
            width: '50%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          blurType={'light'}
          blurAmount={20}>
          <View
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0)',
            }}>
            <Text>panda</Text>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  panda: {
    position: 'absolute',
  },
});

export default Medicine;
