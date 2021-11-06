import React, {Component, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import SearchIcon from '../files/images/icons/search.png';
import background from '../files/images/img_1.png';

const backgroundColor = '#BDC8C0';
const testList = ['abcd', 'bcd', 'cdab', 'dabc', 'efgh', 'fgh', 'ghij'];

function Scan(props) {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [textInputValue, setTextInputValue] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      setSuggestions([]);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleText = e => {
    let tempSuggestions = [];
    // console.log('suggestions : ', suggestions);

    for (let i of testList) {
      if (i.includes(e)) {
        tempSuggestions.push(i);
      }
    }
    // console.log('tempSuggestions : ', tempSuggestions);

    setSuggestions(tempSuggestions);
    setTextInputValue(e);
  };

  return (
    <View style={styles.scanContainer}>
      {!keyboardStatus && (
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
      )}
      <View style={styles.outerSearchBarContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBarComponent}
            placeholder={'Rechercher un médicament'}
            value={textInputValue}
            onChangeText={e => handleText(e)}
          />
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Image source={SearchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {!!suggestions.length && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => {
              // console.log(suggestion);
              return (
                <Text
                  key={index}
                  style={styles.suggestionsText}
                  onPress={event => {
                    setTextInputValue(suggestion);
                    handleText(suggestion);
                  }}>
                  {suggestion}
                </Text>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  suggestionsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 2,
    backgroundColor: '#ffffff5F',
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  suggestionsText: {
    padding: 2,
    paddingLeft: 4,
    marginLeft: 5,
    fontSize: 15,
  },
  imageBackgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
    overflow: 'visible',
  },
  scanContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ffffff00',
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
    // backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    backgroundColor: '#ffffff5F',
    borderRadius: 10,
  },
  outerSearchBarContainer: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
