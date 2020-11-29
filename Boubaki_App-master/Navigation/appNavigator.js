import React from 'react';
import { Image, Platform, SafeAreaView, View,Text } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import Image_Picker from '../Screens/Image_picker';
import GraphScreen from '../Screens/Graph_Screen';

import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {logoutUser} from "../api/auth-api";
import startupScreen from '../Screens/StartupScreen';
import Logout from "../constants/exit.png"
import Home from "../constants/home.png"
import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    AuthLoadingScreen,
    Dashboard
  } from "../Auth_Screens";
import barScreen from '../Screens/BarScanScreen';
import { useSelector } from 'react-redux';
import Drawer from '../Components/drawer';
import OnBoardScreen from '../Screens/bourBakiOnboarding';

const ImageNavigator=createStackNavigator({
    ImagePickerScreen:Image_Picker,
    GraphScreen:GraphScreen,
    BarScreen:barScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android'? Colors.primary:''
        },
        headerTitleStyle:{
            fontFamily:'Montserrat-SemiBold'
        },
        headerBackTitleStyle:{
            fontFamily:'Montserrat-SemiBold'
        },
        headerTintColor:Platform.OS === 'android'? 'white':Colors.primary
    }
    });
    const AuthNavigator=createStackNavigator({
        HomeScreen,
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
        Dashboard,
        AuthLoadingScreen
    },{
        initialRouteName:'AuthLoadingScreen',
        headerMode:'none'
    });
     const DrawerNavigator=createDrawerNavigator({
        Home:{screen:ImageNavigator,
            navigationOptions:{
            drawerIcon:drawerInfo => <View  style={{width:25,height:25}}>
                <Image source={Home} style={{width:'100%',height:'100%',tintColor:drawerInfo.tintColor}}/>
                </View>
        }},
        logout:{screen:Dashboard,
            navigationOptions:{
                drawerIcon:drawerInfo =><View  style={{width:25,height:25}}>
                 <Image source={Logout} style={{width:'100%',height:'100%',tintColor:drawerInfo.tintColor}}
            onPress={()=>logoutUser} /></View>
            }}
    },{drawerWidth:'65%',
         contentOptions:{
            activeTintColor:Colors.primary,
            inactiveTintColor:'grey',
            itemStyle:{justifyContent:'space-between',alignItems:'center',width:'100%'}
        },contentComponent:props=>{
            return (<SafeAreaView>
                <Drawer />
                <DrawerItems {...props} />
            </SafeAreaView>)
        }
    });
    const AppNavigator=createSwitchNavigator({
        // Startup:startupScreen,
        Start:OnBoardScreen,
        Auth:AuthNavigator,
        ImagePicker:DrawerNavigator
    })
export default createAppContainer(AppNavigator);