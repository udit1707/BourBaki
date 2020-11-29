import React from 'react';

import { Image, Platform, View, Text } from 'react-native';
import Colors  from '../constants/Colors';
import { useSelector } from 'react-redux';
import { theme } from '../Auth_Core/theme';



const Drawer = props => {
    const user=useSelector(state=>state.equations.user)
    return  <View style={{width:'100%',height:'40%',backgroundColor:Colors.primary,justifyContent:'center',padding:8}}>
            <View style={{width:50,
                height:50,
                borderRadius:50,
                marginVertical:15,
                backgroundColor:theme.colors.primary,
                justifyContent:'center',
                shadowColor:'black',
                shadowOffset:{width:10,height:10},
                shadowRadius:10,
                elevation:5,
                alignItems:'center'}}>
                <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:28,color:'white'}}>{user.userName.substring(0,1)}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:15,color:'white'}}> Name - </Text>
            <Text numberOfLines={1} style={{fontFamily:'Montserrat-SemiBold',fontSize:15,color:'white'}}>{user.userName}</Text>
            </View>
            </View>
};

export default Drawer