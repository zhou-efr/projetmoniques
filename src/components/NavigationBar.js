import React, {Component, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const backgroundColor = '#BDC8C0';
const frontColor = '#fff';

function NavigationBar({state, descriptors, navigation}) {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {!keyboardStatus && (
        <View style={styles.navigationBarContainer}>
          <View style={styles.navigationBar}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({name: route.name, merge: true});
                }
              };

              return (
                <TouchableOpacity
                  accessibilityRole={'button'}
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  key={index}
                  onPress={onPress}
                  testID={options.tabBarTestID}>
                  <View style={styles.outerButton}>
                    <View
                      style={[
                        styles.innerButton,
                        {
                          backgroundColor: isFocused ? '#ffffff00' : frontColor,
                        },
                      ]}>
                      <Text>{label[0]}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '15%',
    paddingBottom: '5%',
    backgroundColor: '#f0000000',
  },
  navigationBar: {
    backgroundColor: frontColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '75%',
    borderRadius: 20,
  },
  outerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
    height: '80%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  innerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    aspectRatio: 1,
    borderRadius: 15,
  },
});

export default NavigationBar;
