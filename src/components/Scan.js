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
import {
  API_CIP_URL,
  API_JSON_FORMAT,
  API_SEARCH_URL,
} from '../constants/constants';
import Medicine from './Medicine';

const backgroundColor = '#BDC8C0';
const testList = ['abcd', 'bcd', 'cdab', 'dabc', 'efgh', 'fgh', 'ghij'];

function Scan(props) {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [textInputValue, setTextInputValue] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [data, setData] = useState(undefined);

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
  const handleScan = async ({data, type}) => {
    if (type === 'DATA_MATRIX' && data.length > 17) {
      let CIP = data.substring(4, 17);
      console.log(CIP);
      setLoading(true);

      console.log('awaiting');
      let response = await fetch(API_CIP_URL + CIP + API_JSON_FORMAT, {
        method: 'GET',
      }).catch(e => {
        console.log(e);
        setLoading(false);
        return undefined;
      });
      console.log('awaited');

      if (!response) {
        console.log('fail to load response');
        setLoading(false);
        return;
      }

      let json = await response.json();

      if (!json) {
        console.log('fail to load json');
        setLoading(false);
        return;
      }

      console.log(json);
      setData(json[0]);
      setLoading(false);
      setModal(true);
    }
  };
  const handleText = async e => {
    let searched = e;
    setTextInputValue(searched);
    console.log('awaiting search');
    let response = await fetch(
      API_SEARCH_URL + '"' + searched + '"/[]' + API_JSON_FORMAT,
      {
        method: 'GET',
      },
    ).catch(error => {
      console.log(error);
      setLoading(false);
      return undefined;
    });
    console.log('awaited search');

    if (!response) {
      console.log('fail to load search response');
      setLoading(false);
      return;
    }

    console.log('awaiting search json');
    let json = await response.json().catch(error => {
      console.log('response : ');
      console.log(response);
      console.log('fail to load search json');
      return undefined;
    });

    if (!json) {
      setLoading(false);
      return;
    }
    console.log('awaited search json');
    console.log(json);
    let tempSuggestions = [];
    setData(json[0]);

    console.log('pushing to suggestions');
    for (let i of json) {
      console.log(i);
      if (i) {
        tempSuggestions.push(i.name);
      }
    }
    console.log('end pushing to suggestions');
    setSuggestions(tempSuggestions);
  };
  const handleClosingModal = () => {
    setModal(false);
    setLoading(false);
    setData(undefined);
    setSuggestions([]);
    setTextInputValue('');
  };
  const handleSearchValidation = () => {
    setModal(true);
    setLoading(true);
  };

  return (
    <View style={styles.scanContainer}>
      {!keyboardStatus && !showModal && (
        <View style={styles.northenContainer}>
          <Text style={styles.headerText}>
            Pour avoir les informations d’un {'\n'}
            médicament, <Text style={styles.bold}>scanne son QR Code.</Text>
          </Text>
          <View style={styles.cameraContainer}>
            <RNCamera
              captureAudio={false}
              style={styles.cameraComponent}
              ratio={'1:1'}
              zoom={0.5}
              cameraViewDimensions={{width: 100, height: 100}}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              onBarCodeRead={
                Loading ? undefined : async event => await handleScan(event)
              }
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
      {showModal ? (
        <></>
      ) : (
        <View style={styles.outerSearchBarContainer}>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBarComponent}
              placeholder={'Rechercher un médicament'}
              value={textInputValue}
              onChangeText={e => handleText(e)}
              onSubmitEditing={handleSearchValidation}
            />
            <View style={styles.searchButtonContainer}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearchValidation}>
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
      )}
      <Medicine
        visible={showModal}
        toggleVisible={e => {
          handleClosingModal();
        }}
        data={data}
      />
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
