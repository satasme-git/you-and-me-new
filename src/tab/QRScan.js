
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Text, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase, Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { CustomHeader } from '../index';
import i18n from 'i18n-js';
export class QRScan extends Component {
  constructor() {
    super();
    this.state = {
      prodId: '',
      isLoading: false,
      isVisible: false,
      _member_email: '',
      data: ''
    };
  }
  onSuccess = e => {
    RNCamera.Constants.FlashMode.auto

    // console.log(e.data);
    // console.log("dasdasd");


    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );



    fetch('https://youandmenest.com/tr_reactnative/api/check_qr_code', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_code: e.data,
        member_email: this.state._member_email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson == "available") {
          AsyncStorage.setItem('discount', "true");
        } else if(responseJson == "unavailable"){
          AsyncStorage.setItem('discount', "false");
        }else{

        }

        this.props.navigation.replace('HomeApp')
      }).catch((error) => {
        console.error(error);
      })



  };

  async componentDidMount() {
    const member_email = await AsyncStorage.getItem('member_email');


    this.setState({
      // _billercode:billercode,
      _member_email: member_email,
    });

  }



  render() {
    const { isVisible } = this.state
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      // <ScrollView style={{ backgroundColor: '#F2F2F2' }}>
      //      <CustomHeader bgcolor='#fbb146'   gradient1="#4E3CCE"gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' title="asdasda" navigation={this.props.navigation} bdcolor='#fbb146' />



      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            {/* Go to{' '} */}
            <Text style={styles.textBold}></Text> 
            {i18n.t('subscribe.scan')}
          </Text>
        }
        bottomContent={
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>{i18n.t('subscribe.back')}!</Text>
          </TouchableOpacity>
        }

      />

      // </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
})