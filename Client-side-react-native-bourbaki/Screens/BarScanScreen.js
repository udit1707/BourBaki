import React,{  useCallback, useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator, Dimensions, Alert,} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import QRScannerView from "../Components/QRSCANNER_VIEW";
import Colors from "../constants/Colors"
import { equationScanned, reset } from "../store/actions/equation";
import MathView from "react-native-math-view"
import { theme } from "../Auth_Core/theme";

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
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Limits Equation : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Answer : </Text>
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Limits} />
        </View>
        </View>
      }else if(equationType === 'Bodmas Checker'){
        compo=<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:15}}>Your solution for the bodmas is : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',
          color:answer.GetAnswer?Colors.primary:theme.colors.error}} math={answer.GetAnswer} />
        </View>
      }
      else if(equationType === 'Binomial Expansion'){
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Equation : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Series : </Text>
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Series} />
        </View>
        </View>
      }
      else if(equationType === 'Series Expansion'){
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Equation : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Series : </Text>
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Series} />
        </View>
        </View>
      }else if(equationType === 'Equation Solver'){
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Equation : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Answer : </Text>
        <View style={{width:'80%'}}>
          <Text style={{textAlign:'center',color:Colors.primary}} numberOfLines={4} >
                      {answer.solution}
          </Text></View>
        </View>
        </View>
      }else if(equationType === 'Quadratic Equation'){
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Equation : </Text>
        
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Answer : </Text>
          <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.solution} />
        </View>
        </View>
      }else if(equationType === 'Trignometric Equation'){
        compo=<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Equation : </Text>
                  
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                    <Text  style={{fontSize:20}}>Answer :  </Text>
                    
                  </View>
          </View>
      }else if(equationType === 'Differentiation'){
        compo=<MathView config={{ex:15}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.derivative} />
      }else if(equationType === 'Circle'){
        compo=<View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Equation : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Circle} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Area : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Area} />
                  </View>
              </View>
      }else if(equationType === 'Ellipse'){
        compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{fontSize:17}}>Equation : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.ellipseEqn} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Area : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.areaEllipse} />
                  </View>
                  <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Auxilliary Circle : </Text>
                    <MathView config={{ex:8}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.ellipseAuxcircle} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Circumference : </Text>
                    <MathView config={{ex:8}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.ellipsecircumference} />
                  </View>
                  </View>
      }else if(equationType === 'Complex Numbers'){
        compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{fontSize:17}}>Real : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.real} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Imaginary : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.img} />
                  </View>
                  <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Abs : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.abs} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Argument : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.arg} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Conjugate : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.conjugate} />
                  </View>
                  </View>
      }
      else if(equationType === 'Points and Coordinates'){
        compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <Text style={{fontSize:17}}>Points : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Points} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Area Collinear : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.areCollinear} />
                  </View>
                  <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Area Polynomial : </Text>
                    <MathView config={{ex:8}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.AreaPolynomial} />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:17}}>Perimeter Polynomial : </Text>
                    <MathView config={{ex:8}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.PerimeterPolynomial} />
                  </View>
                  </View>
      }
      else if(equationType === 'Bodmas'){
            compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Equation : </Text>
                    <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.latexString.substring(2,answer.latexString.length-2)} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:15}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.ans.toString()} />
                  </View> 
                  </View>
      }else if(equationType === 'Indefinite Integration'){
        compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                  <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Integral : </Text>
                  <MathView config={{ex:15}} style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={(answer.latexString.substring(2,answer.latexString.length-2))} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:15}} style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.Integrals} />
                  </View> 
                  </View>
      }else if(equationType === 'Definite Integration'){
        compo=<View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Integral : </Text>
                  <MathView config={{ex:15}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={(answer.latexString.substring(2,answer.latexString.length-2))} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:15}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.DefiniteIntegrals} />
                  </View> 
                  </View>
      }else if(equationType === 'Double Integration'){
        compo=<View >
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:18}}>Integral : </Text>
                  <MathView config={{ex:12}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={(answer.latexString.substring(2,answer.latexString.length-2))} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:12}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.DoubleDefiniteIntegrals} />
                  </View> 
                  </View>
      }else if(equationType === 'Triple Integration'){
        compo=<View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Integral : </Text>
                  <MathView config={{ex:9}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={(answer.latexString.substring(2,answer.latexString.length-2))} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.TripleDefiniteIntegrals} />
                  </View> 
                  </View>
      }else if(equationType === 'Lines and Coordinates'){
        compo=<View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Equation : </Text>
                  <MathView config={{ex:12}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.LineEquation} />
                  </View> 
                  </View>
      }else if(equationType === 'Differential Equation')
      {
        compo=<View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Differential : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={(answer.latexString.substring(2,answer.latexString.length-2))} />
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:7}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.LDE} />
                  </View> 
                  </View>
      }else if(equationType === 'Word Problems')
      {
        compo=<View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:2}}>
                  
                    <Text numberOfLines={3} style={{fontFamily:'Montserrat-SemiBold',fontSize:15,color:Colors.primary,}} > {answer.latexString}</Text>
                  </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:20}}>Answer : </Text>
                  <MathView config={{ex:10}}  style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}} math={answer.solution} />
                  </View> 
                  </View>
      }
                      
    }
    return <View style={styles.screen}>
        <View style={{width:'70%',marginTop:'10%',height:"40%",overflow:'scroll'}} >
                  <QRScannerView
                    isCornerOffset={true}
                     cornerBorderLength={24}
                      cornerBorderWidth={4}
                      cornerOffsetSize={4}
                      cornerColor={Colors.accent}
                      rectWidth={Dimensions.get('screen').width*0.8}
                      rectHeight={Dimensions.get('screen').height*0.4}
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
                    height:'30%',
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
        backgroundColor: "white",
        width:'95%',
        height:'40%',
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