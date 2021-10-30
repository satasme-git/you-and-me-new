
import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, Text,Image,ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { IMAGE } from '../constants/image';


export class DIscountAvailable extends Component {
 
  constructor() {
    super();
    this.state = {

      isLoading: false,
    };
  }
  


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />


        <View style={{ flex: 1,  alignItems: 'center', }}>
          <Text style={{color:'pink',fontWeight: "normal",fontSize:30,marginTop:40}}>Congratulations !!</Text>

          <Image style={{ width: 350, }}
            source={IMAGE.ICON_DISCOUNTAVLBLE}
            resizeMode="contain"
          />
          <Text>You are </Text>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})