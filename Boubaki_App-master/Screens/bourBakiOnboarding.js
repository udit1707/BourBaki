import React from "react";
import {View,StyleSheet,Image,TouchableOpacity,StatusBar, Dimensions} from "react-native";
import ParticleBackground from "react-native-particle-background";

const OnBoardScreen=(props)=>{
  return(
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.bg}>
        <ParticleBackground
        style={styles.bg}
        particleColor="#rgba(64,142,198,0.7)"
        particleSize={6}
        particleDispersion={40}
        backgroundColor="#1e2761"
      />
        </View>
        <View style={styles.logo}>
          <Image source={require("../constants/BourbakiTITLE.png")} style={{width:'100%',height:'100%'}}/>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Auth')}>
         <Image source={require("../Auth_assets/logo.png")} style={styles.tinylogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  bg:{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  center:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:Dimensions.get('screen').width*0.7,
    height:Dimensions.get('screen').width*0.6,
  },
  tinylogo:{
    width:Dimensions.get('screen').width*0.25,
    height:Dimensions.get('screen').width*0.25,
  }
});
export default OnBoardScreen;
