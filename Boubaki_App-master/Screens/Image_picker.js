import ButtonP from "../Auth_Components/Button";
import React,{  useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator, Alert, Dimensions,} from "react-native"
import ImagePicker from "react-native-image-picker"
import Colors from "../constants/Colors"
import { CropView } from 'react-native-image-crop-tools';
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Crop from "../constants/crop.png";
import Delete from "../constants/delete.png"
import BarScreen from "../Screens/BarScanScreen";
import FuntionIcon from "../Components/icons/funtion";
import GraphIcon from "../Components/icons/graph";
import FuntionType from "../Components/types_equations";
import fs from "react-native-fs";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetAnswer } from "../store/actions/equation";
import {HeaderButtons,Item} from "react-navigation-header-buttons"
import HeaderButton from "../Components/HeaderButton"
import { theme } from "../Auth_Core/theme";
import { color } from "react-native-reanimated";
import MathView from "react-native-math-view"
const Image_Picker = props => {
    const [source, setSource]= useState(null);
    const [sourceUri,setSourceUri]=useState(null)
    const [cropUri,setCropUri]=useState(null);
    const [newFilePath,setNewFilePath]=useState('');
    const[cropped,setCropped]=useState(false);
    const[crop_width,setCropWidth]=useState(0);
    const[crop_heigth,setCropHeigth]=useState(0);
    const[eq_select,setEqSelect]=useState(false);
    const equationType=useSelector(state=>state.equations.eqType);
    const crop_ref=useRef();
    const dispatch=useDispatch();
    const chooseFile=async()=>{
        const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      return await ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const srce={uri: 'data:image/jpeg;base64,' + response.data}
          console.log("source response"+response.uri)
            setSource({...srce});
            setSourceUri(response.uri)
          }
          setCropped(false);
        });
       
    }
    const getSollution=()=>{
      dispatch(resetAnswer());
      if (equationType){
       return props.navigation.navigate('BarScreen',{newPath:newFilePath,cropUri:cropUri})
      }else{
        Alert.alert(
          'Alert',
          'Please select the equation type',
          [
           { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
      );
    }
  }
    const onImageCrop =res=>{
      setCropWidth(res.width);
      setCropHeigth(res.height);
      setCropped(true)
      let cprui=res.uri
      const newPath= fs.DocumentDirectoryPath + cprui.substring(cprui.lastIndexOf('/'))
      setNewFilePath(newPath);
      console.log("new "+ newPath)
      setCropUri(cprui);
      return fs.moveFile(cprui,newPath)
      .then(res=>console.log("file moved"))
      .catch(err=>console.log(err));
    }
    console.log("source uri: " + sourceUri)
     
  
  
       
    const [showModal,setShowModal]= useState(false);
        return (<SafeAreaView  style={{flex:1}}>
            <View style={styles.container}>
                <Modal 
                animationType="slide"
                transparent={true}
                visible={showModal} 
                >
                  <View style={styles.modalEQ} >
                  <View style={styles.modalView}>
                      <View style={{ 
                        width:'100%',height:'7%', justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:20, color:Colors.primary}}>Select Problem Type</Text>
                  </View>
                  <View style={{width:'100%',height:'100%',top:10}}>
                    <FuntionType onPress={()=>setShowModal(false)} />
                  </View>                  
                  </View>
                  </View>                  
                </Modal>
                <View style={{width:'100%',marginTop:20,height:'9%',justifyContent:'flex-start',alignItems:'center',paddingVertical:5}}>
                <View style={{width:'100%',height:'100%'}}>
                  <FuntionIcon onPress={()=>{setEqSelect(true);setShowModal(true)}} />
                </View>
                </View>
                {!sourceUri?
                <View style={{width:'100%',marginTop:'18%',height:'30%',position:'relative',justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:160,
                      height:160,
                      borderRadius:160,
                      backgroundColor:Colors.primary,
                      shadowColor:'black',
                      shadowOffset:{width:20,height:20},
                      shadowRadius:20,
                      elevation:10,
                      padding:30,
                      marginBottom:40}}>
                        <Image source={require('../Auth_assets/logo.png')} 
                        style={{width:'100%',height:'100%',tintColor:'white'}}/>
                    </View>
                    <Text style={{fontSize:22,fontFamily:'Montserrat-SemiBold',color:'#686868'}}>Add your Equation</Text>
                </View>:
                !cropped?<View style={{
                  marginTop:'30%',
                  marginBottom:'20%' ,
                  width:"100%",
                  height:150,
                  justifyContent:'center',
                  alignItems:'center'}} >
            <CropView  sourceUrl={sourceUri} keepAspectRatio={false}
              style={{width:400,height:200}} ref={crop_ref}  
              onImageCrop={onImageCrop} >
            </CropView>
            </View>:
              <View style={styles.image}>
                <Image style={{width:'100%',height:'100%'}} source={{uri:cropUri}} />
               </View>}
              <View style={{width:'100%',height:'40%',marginTop:!source?'30%':'15%',position:'relative',padding:10}}>
              <ScrollView contentContainerStyle={{height:'100%',width:'100%'}}>
                <View style={{
                  flex:1,
                  height:'100%',
                  width:'100%',justifyContent:'flex-start',alignItems:'center',
                  borderTopStartRadius:20,
                  borderColor:theme.colors.primary,
                  borderTopEndRadius:20,
                  shadowColor:'black',
                  shadowOffset:{width:10,height:10},
                  shadowRadius:10,
                  elevation:5,
                  backgroundColor:Colors.primary}}>
                    
          {!source?<View style={{width:'35%',overflow:'hidden'}}>
          <ButtonP mode='contained'  onPress={chooseFile} >Add Image</ButtonP>
          </View>:null}
          
          <View style={{flexDirection:'row',marginTop:'7%',marginBottom:'10%',height:'18%',width:'100%', justifyContent:'space-evenly', alignItems:'center'}}>
          {sourceUri && !cropUri?          
              <View style={{height:'100%',width:'30%',bottom:10}}>
              <View style={{
                  height:'100%',
                  width:'100%',
                  borderRadius:100,
                  shadowColor:'black',
                  shadowOffset:{width:10,height:10},
                  shadowRadius:10,
                  shadowOpacity:0.6,elevation:4,
                  overflow:'hidden',
                  backgroundColor:theme.colors.primary,justifyContent:'center'}}>
                  <Pressable android_ripple={{color:'#fffff9'}}style={{width:'100%',height:'100%',flexDirection:'row',justifyContent:'center',
                  alignItems:'center'}}
                  onPress={()=>setTimeout(()=>{
                    crop_ref.current.saveImage(true,90); 
                    console.log(crop_ref.current);},500)}>
                      <View style={{width:30,height:30,padding:5}}>
                      <Image source={Crop} name="crop" style={{width:"100%",height:"100%",tintColor:theme.colors.surface}} />
                      </View>
                    <Text style={{fontFamily:'Montserrat-Medium',fontSize:18,color:'white',textAlign:'center'}}>Crop</Text>
                    </Pressable></View> 
                </View> :null}
                
                {sourceUri?<View style={{height:'100%',width:'30%',bottom:10}}>
              <View style={{
                  height:'100%',
                  width:'100%',
                  borderRadius:100,
                  shadowColor:'black',
                  shadowOffset:{width:50,height:50},
                  shadowRadius:50,
                  shadowOpacity:0.6,elevation:4,
                  overflow:'hidden',
                  backgroundColor:theme.colors.accent,justifyContent:'center'}}>
                  <Pressable android_ripple={{color:'#fffff9'}} style={{width:'100%',height:'100%',flexDirection:'row',justifyContent:'center',
                  alignItems:'center'}}
                  onPress={()=>setTimeout(()=>{
                    setSource(null);
                    setCropUri(null);
                    setSourceUri(null);
                    setCropped(true);
                    dispatch(reset());
                    },500)}>
                      <View style={{width:27,height:27,padding:5}}>
                      <Image source={Delete} name="delete" style={{width:"100%",height:"100%",tintColor:'white'}} />
                      </View>
                    <Text style={{fontFamily:'Montserrat-Medium',fontSize:18,color:'white',textAlign:'center'}}>Clear</Text>
                    </Pressable></View> 
                </View>:null}
                </View>
          
            {cropUri?<View style={{width:'51%',overflow:'hidden'}}>
                        <ButtonP 
                        mode='contained'  
                        onPress={getSollution} >Get Solution</ButtonP>
                      </View>:null}
                      </View>                
                </ScrollView>
                </View>           
                </View>
              </SafeAreaView>
              
                )
                

}
Image_Picker.navigationOptions =navData=>{
  return {
  headerTitle:'Select Equation',
  headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                  onPress={()=>navData.navigation.toggleDrawer()}  />
              </HeaderButtons>,

}}
const styles= StyleSheet.create({
  container: {
    flex:1,
    width:Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop:0,
    backgroundColor:'#F0F0F0'
    },
    
    screen:{
        height:"100%",
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        },
        modalView: {
          backgroundColor: "white",
          width:'95%',
          height:Dimensions.get('screen').height*0.6,
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
        },
      image:{
          width:'90%',
          height:'30%',
          marginVertical:40,
          marginBottom:10,
          padding:10,
         },
      modalEQ:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#0000004D',
        
      },
      
});


export default Image_Picker;