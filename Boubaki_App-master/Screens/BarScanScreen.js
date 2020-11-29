import React,{  useCallback, useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator, Dimensions, Alert,} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import QRScannerView from "../Components/QRSCANNER_VIEW";
import Colors from "../constants/Colors"
import { equationScanned, reset } from "../store/actions/equation";
import MathView from "react-native-math-view"
import { theme } from "../Auth_Core/theme";
import { ScrollView } from "react-native-gesture-handler";

const barScreen = props =>{
    const equation=useSelector(state=>state.equations.eqtScanned)
    const answer=useSelector(state=>state.equations.answer)
    const equationType=useSelector(state=>state.equations.eqType)
    const [isLoading,setIsLoading]=useState(true);
    const newPath=props.navigation.getParam('newPath');
    const cropUri=props.navigation.getParam('cropUri')
    const [err,setErr]=useState('');
    const dispatch = useDispatch();
    const fn= useCallback(async ()=>{
      try{
          await dispatch(equationScanned(newPath,equationType));
        }catch(err){
          setErr(err.message)
      }
      setIsLoading(false);
      return ;
    },[dispatch,setErr,equationScanned,setIsLoading]);
    useEffect(()=>{
      const willFocusSub=props.navigation.addListener('willFocus',fn())
      return ()=> {
          willFocusSub.remove();
      };
  },[fn])
  if(err){
    if(err.includes("Unable to resolve host")){
        Alert.alert(
        'Error',
        'Network Issues, Please check your internet',
        [
         { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }else{
      Alert.alert('Error',
      err,[
        {text:'OK',onPress:()=>console.log('OK Pressed')}],{cancelable:false});
    }}
    let compo;
    if (answer){
      if (equationType === 'Limits'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                height:'28%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.Limits} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Bodmas Checker'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                height:'28%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.GetAnswer} />
            </Text>
          </View> 
          </ScrollView>
      }
      else if(equationType === 'Binomial Expansion'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Series </Text></View>
          <Text numberOfLines={4} style={{textAlign:'center',fontFamily:'Montserrat-SemiBold', color:Colors.primary}}>
          <MathView config={{ex:9}}  
          style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }
      else if(equationType === 'Series Expansion'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Series </Text></View>
          <Text numberOfLines={4} style={{textAlign:'center',fontFamily:'Montserrat-SemiBold', color:Colors.primary}}>
          <MathView config={{ex:9}}  
          style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }
      else if(equationType === 'Fourier Expansion'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Series </Text></View>
          <Text numberOfLines={4} style={{textAlign:'center',fontFamily:'Montserrat-SemiBold', color:Colors.primary}}>
          <MathView config={{ex:9}}  
          style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Equation Solver'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text numberOfLines={4} style={{textAlign:'center',fontFamily:'Montserrat-SemiBold',fontSize:15,color:Colors.primary}}>
          <MathView config={{ex:7}}
          resizeMode='contain'  
          style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Differentiation'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
          <MathView config={{ex:9}}  
          style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Circle'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
                width:Dimensions.get('screen').width*0.90,
                height:Dimensions.get('screen').height*0.5,
                paddingHorizontal:5,
                alignItems:'center'}}>
                <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                height:'28%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Equation </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.Circle} />
            </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                height:'28%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Area </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.Area} />
            </Text>
          </View>
              </ScrollView>
      }else if(equationType === 'Ellipse'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
                width:Dimensions.get('screen').width*0.90,
                height:Dimensions.get('screen').height*0.80,
                paddingHorizontal:5,
                alignItems:'center'}}>
                <View style={{flexDirection:'column',
                justifyContent:'flex-start',
                width:'100%',
                height:'20%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Equation </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:8}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.ellipseEqn} />
            </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start',
                width:'100%',
                height:'20%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Area </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.areaEllipse} />
            </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start',
                width:'100%',
                height:'20%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Ellipse Auxiliary Circle </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.ellipseAuxcircle} />
            </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start',
                width:'100%',
                height:'20%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Ellipse Circumference </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.ellipsecircumference} />
            </Text>
          </View>
          </ScrollView>
      }else if(equationType === 'Complex Numbers'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.85,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Real Part </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.real} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Imaginary Part </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.img} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Argument </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.arg} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Conjugate </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.conjugate} />
      </Text>
    </View>
    </ScrollView>
    }
      else if(equationType === 'Points and Coordinates'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.6,
          paddingHorizontal:5,
          alignItems:'center'}}>
                <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:18,textAlign:'center',color:'white'}}>Points </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:6}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.Points} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:18,textAlign:'center',color:'white'}}>Area Collinear </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.areCollinear} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:18,textAlign:'center',color:'white'}}>Area Polynomial </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.AreaPolynomial} />
      </Text>
    </View>
    <View style={{flexDirection:'column',
          justifyContent:'flex-start',
          width:'100%',
          height:'20%',
          marginTop:10,
          backgroundColor:'white',
          borderRadius:20,
          elevation:5,
          overflow:'hidden',
          shadowOffset:{width:5,height:5},
          shadowColor:'black',
          shadowRadius:5,
          shadowOpacity:0.6}}>
    <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
      <Text style={{fontSize:18,textAlign:'center',color:'white'}}>Perimeter Polynomial </Text></View>
    <Text style={{textAlign:'center'}}>
      <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.PerimeterPolynomial} />
      </Text>
    </View>
    </ScrollView>
      }
      else if(equationType === 'Bodmas'){
            compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
                  width:Dimensions.get('screen').width*0.90,
                  height:Dimensions.get('screen').height*0.5,
                  paddingHorizontal:5,
                  alignItems:'center'}}>
                  <View style={{flexDirection:'row',
                        marginVertical:'3%',
                        justifyContent:'center',
                        width:'100%',
                        height:'28%',
                        alignItems:'center',
                        borderRadius:20,
                        backgroundColor:'white',
                        elevation:5,
                        padding:5,
                        overflow:'hidden',
                        shadowOffset:{width:5,height:5},
                        shadowColor:'black',
                        shadowRadius:5,
                        shadowOpacity:0.6}}>
                    <Text numberOfLines={3} style={{textAlign:'center'}}>
                      <MathView config={{ex:11}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
                      </Text>
                  </View>
                  <View style={{flexDirection:'column',
                        justifyContent:'flex-start'
                        ,width:'100%',
                        height:'28%',
                        marginTop:10,
                        backgroundColor:'white',
                        borderRadius:20,
                        elevation:5,
                        overflow:'hidden',
                        shadowOffset:{width:5,height:5},
                        shadowColor:'black',
                        shadowRadius:5,
                        shadowOpacity:0.6}}>
                  <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
                    <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
                  <Text style={{textAlign:'center'}}>
                    <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.ans.toString()} />
                    </Text>
                  </View> 
                  </ScrollView>
      }else if(equationType === 'Indefinite Integration'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
          <MathView config={{ex:9}}  
          style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}
           math={answer.latex} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Definite Integration'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.DefiniteIntegrals} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Double Integration'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.DoubleDefiniteIntegrals} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Triple Integration'){
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center',fontSize:20}}>
              <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold',color:Colors.primary}} 
              math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.TripleDefiniteIntegrals} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Lines and Coordinates'){
        compo= <View style={{flexDirection:'column',
        justifyContent:'flex-start'
        ,width:'100%',
        marginTop:10,
        backgroundColor:'white',
        borderRadius:20,
        elevation:5,
        overflow:'hidden',
        shadowOffset:{width:5,height:5},
        shadowColor:'black',
        shadowRadius:5,
        shadowOpacity:0.6}}>
  <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
    <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Equation </Text></View>
  <Text style={{textAlign:'center'}}>
    <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.LineEquation} />
    </Text>
  </View> 
      }else if(equationType === 'Differential Equation')
      {
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text numberOfLines={4} style={{textAlign:'center'}}>
            <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.LDE} />
            </Text>
          </View> 
          </ScrollView>
      }else if(equationType === 'Word Problems')
      {
        compo=<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ 
          width:Dimensions.get('screen').width*0.90,
          height:Dimensions.get('screen').height*0.5,
          paddingHorizontal:5,
          alignItems:'center'}}>
          <View style={{flexDirection:'row',
                marginVertical:'3%',
                justifyContent:'center',
                width:'100%',
                height:'28%',
                alignItems:'center',
                borderRadius:20,
                backgroundColor:'white',
                elevation:5,
                padding:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
            <Text numberOfLines={3} style={{textAlign:'center'}}>
              {answer.latexString}
              </Text>
          </View>
          <View style={{flexDirection:'column',
                justifyContent:'flex-start'
                ,width:'100%',
                height:'28%',
                marginTop:10,
                backgroundColor:'white',
                borderRadius:20,
                elevation:5,
                overflow:'hidden',
                shadowOffset:{width:5,height:5},
                shadowColor:'black',
                shadowRadius:5,
                shadowOpacity:0.6}}>
          <View style={{width:'100%',height:'40%',marginBottom:'5%',justifyContent:'center',padding:2,backgroundColor:Colors.primary}}>
            <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Evaluate </Text></View>
          <Text style={{textAlign:'center'}}>
            <MathView config={{ex:13}}  style={{fontFamily:'Montserrat-SemiBold', color:Colors.primary}} math={answer.solution} />
            </Text>
          </View> 
          </ScrollView>
      }
                      
    }
    return <View style={styles.screen}>
        <View style={{width:'70%',marginTop:'20%',height:"30%",overflow:'scroll'}} >
                  <QRScannerView
                    isCornerOffset={true}
                     cornerBorderLength={24}
                      cornerBorderWidth={4}
                      cornerOffsetSize={4}
                      cornerColor={Colors.accent}
                      rectWidth={Dimensions.get('screen').width <500? 300: 400}
                      rectHeight={Dimensions.get('screen').height <800? 150: 200}
                      maskColor={"#0000004D"}
                      borderWidth={2}
                      borderColor={Colors.primary}
                      bottomMenuHeight={100}
                      bottomMenuStyle={{backgroundColor: '#000000B3', height: 100, justifyContent: 'center'}}
                      scanBarColor={Colors.primary}
                      scanBarImage={cropUri}
                      scanBarMargin={10}
                      hintTextStyle= {{color: '#fff', fontSize: 14,backgroundColor:'transparent'}}
                      hintTextPosition={130}
                      scanBarAnimateTime={3000}
                      onScanResultReceived={null}>
                  </QRScannerView>
                  </View>
                    <View style={styles.modalView}>
                      <View style={{ height:'70%',
                        width:'100%', justifyContent:'center',alignItems:'center'}}>
                    {isLoading?<ActivityIndicator style={{width:10}} size='large' color={Colors.accent} />:null}
                    {answer?
                      compo                     
                    :<Text style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:err?theme.colors.error:Colors.primary}}>
                      {err?'Error in finding Solution':'Finding Solution...'}</Text>}
                  </View>
                  <View style={{
                    height:'20%',
                    width:'100%',
                    backgroundColor:Colors.primary,justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
                      <Pressable 
                      android_ripple={{color:'#0000008D'}}
                        onPress={()=>setTimeout(()=>props.navigation.goBack(),500)}
                        style={{width:'100%',height:'100%', justifyContent:'center'}}>
                     <Text style={{fontFamily:'Montserrat-Medium',fontSize:20,color:'white',textAlign:'center'}}>Return</Text>
                     </Pressable>
                </View>
                  </View>
    </View>
}
barScreen.navigationOptions =navData=>{
  return {
  headerTitle:'Finding Solution',
}}
const styles=StyleSheet.create({
    screen:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#A9A9A9',
        
        },
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        
      },
      modalView: {
        backgroundColor:'#ececec',
        width:'95%',
        height:'60%',
        borderRadius: 20,
        paddingTop: 10,
        justifyContent:'space-between',
        alignItems: "center",
        shadowColor: "#000",
        overflow:'hidden',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }
})

export default barScreen;