import React, { memo } from "react";
import Background from "../Auth_Components/Background";
import Logo from "../Auth_Components/Logo";
import Header from "../Auth_Components/Header";
import Paragraph from "../Auth_Components/Paragraph";
import Button from "../Auth_Components/Button";
import { logoutUser } from "../api/auth-api";

const Dashboard = ({navigation}) => (
  <Background>
    <Logo />
    <Header>Bourbaki Logout</Header>
    <Paragraph>
      Your problems need solution come again and rest your pace.
    </Paragraph>
    <Button mode="contained" onPress={() => logoutUser()}>
      Logout
    </Button>
    <Button mode="outlined" onPress={() => navigation.goBack()}>
      Return
    </Button>
  </Background>
);

export default memo(Dashboard);
