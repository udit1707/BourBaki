import React,{  useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator,} from "react-native"
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import Formula from "../../constants/formula-fx.png"

const FuntionIcon =props => {
  const eqType=useSelector(state=>state.equations.eqType)
    return <View style={{
        width:'37%',
        flexDirection:'column',
        height:'130%',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
        }}>
      <View style={{width:50,height:50,borderRadius:50,shadowColor:'black',shadowOffset:{width:10,height:10},
        shadowRadius:10,
        shadowOpacity:0.6,elevation:6,overflow:'hidden',
        backgroundColor:Colors.primary,justifyContent:'center',alignItems:'center'}}>
    <Pressable android_ripple={{color:'white'}} style={{width:'100%',height:'100%',padding:12}} onPress={props.onPress}>
      <Image  source={Formula} style={{width:'100%',height:'100%',tintColor:'white'}}/>
    </Pressable>
    </View>
    <View style={{width:'100%',alignItems:'center'}}>
    {eqType?<Text numberOfLines={1} style={{color:Colors.primary,fontFamily:'Montserrat-SemiBold',fontSize:11}}>
      {eqType}
    </Text>:<Text numberOfLines={1} style={{color:'#686868',fontFamily:'Montserrat-SemiBold',fontSize:10}}>
      Choose Type
    </Text>}
   </View>
    </View>

};


export default FuntionIcon;