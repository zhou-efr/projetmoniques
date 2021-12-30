import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const backgroundColor = '#BDC8C0';
const frontColor = '#fff';
const BIG = '90%';
const SMALL = '75%';
const colors = {
  Compare: '#A5D4D8',
  Scan: '#F99158',
  Saved: '#E05B41',
};
const navButtonIcons = {
  Compare: require('../files/images/icons/MedicineIcon.png'),
  Scan: require('../files/images/icons/Bulk.png'),
  Saved: require('../files/images/icons/Vector.png'),
};

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
                  <View
                    style={[
                      styles.innerButton,
                      {
                        height: isFocused ? BIG : SMALL,
                        backgroundColor: colors[label],
                      },
                    ]}>
                    <Image source={navButtonIcons[label]} />
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
    borderRadius: 100,
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
    aspectRatio: 1,
    borderRadius: 100,
  },
});

export default NavigationBar;
