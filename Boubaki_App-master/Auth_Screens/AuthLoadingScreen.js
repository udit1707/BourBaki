import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import Background from "../Auth_Components/Background";
import { theme } from "../Auth_Core/theme";
import { FIREBASE_CONFIG } from "../Auth_Core/config";
import { useDispatch } from "react-redux";
import { userName } from "../store/actions/equation";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const AuthLoadingScreen = ({ navigation }) => {
  const dispatch=useDispatch();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      dispatch(userName({email:user.email,userName:user.displayName}))
      navigation.navigate("ImagePicker");
    } else {
      // User is not logged in
      navigation.navigate("HomeScreen");
    }
  });
  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.error} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
