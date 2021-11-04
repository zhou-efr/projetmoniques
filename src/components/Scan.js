import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import SearchIcon from '../files/images/icons/search.png';

const backgroundColor = '#BDC8C0';

class Scan extends Component {
  render() {
    return (
      <View style={styles.scanContainer}>
        <View style={styles.northenContainer}>
          <Text style={styles.headerText}>
            Pour avoir les informations d’un {'\n'}
            médicament, <Text style={styles.bold}>scanne son QR Code.</Text>
          </Text>
          <View style={styles.cameraContainer}>
            <RNCamera
              captureAudio={false}
              style={styles.cameraComponent}
              ref={ref => (this.camera = ref)}
              ratio={'1:1'}
              zoom={0}
              cameraViewDimensions={{width: 100, height: 100}}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBarComponent}
            placeholder={'Rechercher un médicament'}
          />
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Image source={SearchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  northenContainer: {
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold',
  },
  headerText: {
    fontFamily: 'Encode Sans',
    fontSize: 20,
    marginBottom: 10,
  },
  cameraContainer: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: backgroundColor,
    borderRadius: 20,
    padding: 3,
  },
  cameraComponent: {
    overflow: 'hidden',
    borderRadius: 20,
    height: Dimensions.get('screen').width * (3 / 4),
    width: Dimensions.get('screen').width * (3 / 4),
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff5F',
    width: '80%',
    borderRadius: 10,
  },
  searchBarComponent: {
    width: '80%',
    marginLeft: 4,
  },
  searchButtonContainer: {
    borderLeftWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '20%',
  },
  searchIcon: {
    resizeMode: 'contain',
  },
});

export default Scan;
