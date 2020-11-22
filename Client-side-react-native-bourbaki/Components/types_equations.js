import React,{  useEffect, useRef, useState } from "react";
import CheckBox from "@react-native-community/checkbox"
import { FlatList } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { equationType } from "../store/actions/equation";
import Colors from "../constants/Colors";


const FuntionType =props => {
    const tvalue=useSelector(state=>state.equations.eqType);
    const [type,setType]=useState(tvalue);
    const dispatch=useDispatch()
    useEffect(()=>{dispatch(equationType(type))},[dispatch,type])
    const types=[
        {id:'Bodmas',value:false},
        {id:'Bodmas Checker', value:false},
        {id:'Equation Solver',value:false},
        {id:'Circle',value:false},
        {id:'Complex Numbers',value:false},
        {id:'Differentiation',value:false},
        {id:'Lines and Coordinates',value:false},
        {id:'Points and Coordinates',value:false},
        {id:'Indefinite Integration',value:false},
        {id:'Definite Integration',value:false},
        {id:'Double Integration',value:false},
        {id:'Triple Integration',value:false},
        {id:'Limits',value:false},
        {id:'Ellipse',value:false},
        {id:'Differential Equation',value:false},
        {id:'Binomial Expansion',value:false},
        {id:'Series Expansion',value:false},
        {id:'Fourier Expansion',value:false},
        {id:'Word Problems',value:false},
    ]
        return <View>
        <FlatList data={types} renderItem={itemData=>
        <View style={{flexDirection:'row',marginBottom:5,justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:14,color:'#191919'}}>{itemData.item.id}</Text>
        <CheckBox 
         tintColors={{true:Colors.primary}} value={itemData.item.id === type ? true: false} 
         onValueChange={value=>{
             if (value)
             {setType(itemData.item.id);
             
             }
        }}/>
        </View>} />     
    </View>

};


export default FuntionType;