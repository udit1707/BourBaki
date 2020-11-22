import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../Auth_Core/theme";

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={styles.button}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    borderRadius:20,
    
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26
  }
});

export default memo(Button);
