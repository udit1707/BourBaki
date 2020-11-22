import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Image, Platform, View } from 'react-native';
import Menu from "../../constants/menu.png"
const MenuIcon = props => {
    return <View  style={{width:20,height:20}}>
                    <Image style={{width:'100%',height:'100%',tintColor:'white'}} source={Menu} />
                </View>
}

export default MenuIcon