import React, { useEffect } from 'react';
import Colors from "../constants/Colors";

import {View,StyleSheet,Text, ActivityIndicator, ImagePropTypes} from 'react-native'


const startupScreen = (props) => {
    // const dispatch=useDispatch();

    // useEffect(()=>{
    //     const tryLogin = async () => {
    //         const userData=await AsyncStorage.getItem('userData');
    //         if(!userData){
    //             props.navigation.navigate('Auth');
    //             return ;
    //         }
    //         const transformedData= JSON.parse(userData);
    //         const {token,userId,email,expiryDate}=transformedData;
    //         const expirationDate=new Date(expiryDate);
    //         if(expirationDate <= new Date() || !token || !userId){
    //             props.navigation.navigate('Auth');
    //             return ;
    //         }
    //         dispatch(authenticate(userId,token,email,expirationDate.getTime() - new Date().getTime()));
    //         dispatch(getUserData());
    //         props.navigation.navigate('Shop');
            
    //     };
    //     tryLogin();
    // },[dispatch]);

    return <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
    </View>
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default startupScreen