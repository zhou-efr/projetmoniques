import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const backgroundColor = '#BDC8C0';
const frontColor = '#fff';

function NavigationBar({state, descriptors, navigation}) {
  return (
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
  );
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '15%',
    paddingBottom: '5%',
    backgroundColor: backgroundColor,
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
