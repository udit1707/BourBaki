import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../Auth_Core/theme';
import Colors from '../constants/Colors';

const Logo = () => (
  <View style={{width: 140,height: 140,}}>
  <Image source={require('../Auth_assets/logo.png')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    marginBottom: 5,
    tintColor:theme.colors.primary
  },
});

export default memo(Logo);
