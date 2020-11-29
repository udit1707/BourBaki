import React,{  useEffect, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Dimensions,StyleSheet,Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { equationType } from "../store/actions/equation";
import Colors from "../constants/Colors";
import Carousel from "react-native-snap-carousel"


const FuntionType =props => {
    const tvalue=useSelector(state=>state.equations.eqType);
    const dispatch=useDispatch()
    const data=[
        {title:'Bodmas',source:require('../constants/bodmas.jpg')},
        {title:'Bodmas Checker', source:require('../constants/bodmas.jpg')},
        {title:'Equation Solver',source:require('../constants/equations.jpg')},
        {title:'Circle',source:require('../constants/circle.jpg')},
        {title:'Complex Numbers',source:require('../constants/complex.png')},
        {title:'Differentiation',source:require('../constants/differentiation.png')},
        {title:'Lines and Coordinates',source:require('../constants/lines.jpg')},
        {title:'Points and Coordinates',source:require('../constants/coordinates.jpg')},
        {title:'Indefinite Integration',source:require('../constants/indefinite.jpg')},
        {title:'Definite Integration',source:require('../constants/definite.jpg')},
        {title:'Double Integration',source:require('../constants/double.jpg')},
        {title:'Triple Integration',source:require('../constants/triple.jpg')},
        {title:'Limits',source:require('../constants/limits.png')},
        {title:'Ellipse',source:require('../constants/ellipse.jpg')},
        {title:'Differential Equation',source:require('../constants/differential.jpg')},
        {title:'Binomial Expansion',source:require('../constants/binomial.jpg')},
        {title:'Series Expansion',source:require('../constants/series.jpg')},
        {title:'Fourier Expansion',source:require('../constants/fourier.jpg')},
        {title:'Word Problems',source:require('../constants/word.jpg')},
    ]
    console.log(tvalue)
        return <View style={styles.container}>
        <Carousel  layout={"default"}
        data={data}
        sliderWidth={Dimensions.get('screen').width*0.9}
        itemWidth={Dimensions.get('screen').width*0.9}
        renderItem={({item,index})=>{
                    return (
                        <View style={{
                            width:'100%',
                            height:'100%',
                            justifyContent:'center',
                            alignItems:'center'}} >
                                <View style={{width:'100%',height:'70%',justifyContent:'center',alignItems:'center'}}>
                                <Pressable 
                                android_ripple={'white'}
                                onPress={()=>{dispatch(equationType(item.title));props.onPress();}} 
                                style={{width:'100%',height:'100%'}}>
                                    <Image
                                    source={item.source}
                                    style={styles.cardImage}
                                    />
                                </Pressable>
                                </View>
                                <View style={{width:'100%',height:'30%'}}><Text style={styles.cardText}>
                                    {item.title}
                                </Text>
                                </View>
                                </View>
                        )
                      }}
                      />     
    </View>

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:'10%'
    },
    
    cardText:{
      marginTop:'10%',
      fontSize:18,
      textAlign:'center',
      fontFamily:"Montserrat-SemiBold",
      color:"#408EC6",
    },
    card:{
      backgroundColor:"pink",
      width:"100%",
      height:200,
      borderRadius:5,
      shadowColor:"#000",
      shadowOpacity:1,
      shadowOffset:{
        height:10,
        width:10
      },
      elevation:9,
  
    },
    cardImage:{
      width:"100%",
      height:'100%',
      borderRadius:10,
      resizeMode:'cover'
    }
  });
  
export default FuntionType;