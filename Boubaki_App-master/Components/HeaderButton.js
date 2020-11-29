import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { Image, Platform, View } from 'react-native';
import MenuIcon from './icons/menu';


const customHeaderButton = props => {
    return  <HeaderButton 
    IconComponent={MenuIcon} 
    style={{marginLeft:10}}
    iconSize={25} 
    {...props} 
    color={Platform.OS === 'android' ? 'white' : Colors.primary} />
};

export default customHeaderButton