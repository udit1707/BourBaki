import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions
} from "react-native";
import Colors from "../constants/Colors";

const Background = ({ children }) => (
  <View style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height}}>
    <ImageBackground
     source={require('../Auth_assets/back_n.jpg')}
     resizeMode="repeat"
      style={styles.background}
    >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
