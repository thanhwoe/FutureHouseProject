import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions,TextInput} from 'react-native';
import { icons } from '../constants';

const Test = () => {
    function renderHeader(){
        return(
            <View>
                <TouchableOpacity style={{
                    margin:10,
                    padding:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#EE5387'
                }}
                >
                    <Text style={{color:'#FFFFFF'}}> This is header</Text>
                </TouchableOpacity>
            </View>

        )
    }
    function renderFooter(){
        return(
            <View>
                <TouchableOpacity style={{
                    margin:10,
                    padding:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#512DA8'
                }}
                >
                    <Text style={{color:'#FFFFFF'}}> This is Footer</Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        <Text style={styles.header}> Introduce</Text>
        <Text> personal information</Text>
        <Text> personal information</Text>
        <Text> personal information</Text>
        <Text> personal information</Text>
        <Text> personal information</Text>
        <Image 
        source={icons.cat}
        style={{width:300,height:300, marginLeft:50}}/>
        {renderFooter()}
    </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor:'#F5F5F5',
    },
    header:{
        fontSize:30,
        fontWeight:'bold'
    }
    
})

export default Test;
