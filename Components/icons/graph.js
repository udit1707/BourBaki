import React,{  useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator,} from "react-native"
import Colors from "../../constants/Colors";
import Graph from "../../constants/trend.png"


const GraphIcon =props => {
    return <View style={{
        width:'35%',
        flexDirection:'column',
        height:'130%',
        justifyContent:'center',
        alignItems:'center'
        }}>
      <View style={{width:'40%',height:'90%',borderRadius:100,shadowColor:'black',shadowOffset:{width:10,height:10},
        shadowRadius:10,padding:13,
        shadowOpacity:0.6,elevation:5,overflow:'hidden',
        backgroundColor:Colors.primary,justifyContent:'center'}}>
    <Pressable style={{width:'100%',height:'100%'}} onPress={props.onPress}>
      <Image  source={Graph} style={{width:'100%',height:'100%',tintColor:'white'}}/>
    </Pressable>
    </View>
    <View style={{width:'80%',alignItems:'center'}}>
    <Text numberOfLines={1} style={{fontFamily:'Montserrat-SemiBold',fontSize:15}}>
      Plot Graph
    </Text>
   </View>
    </View>

};


export default GraphIcon;