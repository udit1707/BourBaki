import React,{  useEffect, useRef, useState } from "react";
import {View, Button,Pressable,Image,Text,Modal, StyleSheet, TouchableNativeFeedback, ToastAndroid, SafeAreaView, ActivityIndicator, Dimensions,} from "react-native"
import MathView from "react-native-math-view"
import {LineChart} from "react-native-chart-kit"
import { useSelector } from "react-redux";
import { State } from "react-native-gesture-handler";
const GraphScreen =props => {
    const equation=useSelector(state=>state.equations.eqtScanned)
    const screenWidth=Dimensions.get('window').width
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        barPercentage:0.99,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    return <View style={styles.screen}>
        
            {equation?<View style={styles.container}>
            <View style={{top:10,...styles.card,flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                
                <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:20,textAlign:'center'}}>Equation:</Text>
                
            <MathView   math={equation} />
            </View>
            <View style={{top:20,...styles.card}}>
        <LineChart
        
            data={data}
            width={screenWidth}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier/>
            </View>
            </View>:<View style={styles.container}>
                    <View style={{top:10,...styles.card,flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                        <Text style={{fontFamily:'Montserrat-SemiBold',fontSize:20,textAlign:'center'}}>No Equation Added</Text>
                        </View>
                </View>}
        </View>
        
    

};
GraphScreen.navigationOptions =navData =>{
    return {
        headerTitle: 'Plot your equation'
    }
}
const styles=StyleSheet.create({
    screen:{
        flex:1,
    },
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        shadowOpacity:0.26,
        elevation:5,
        backgroundColor:'white',
        width:'90%',
        marginVertical:0.25,
        borderRadius:20,
        paddingHorizontal:5,
        overflow:'hidden',
        
    },
});

export default GraphScreen;