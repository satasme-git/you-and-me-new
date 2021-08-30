import React, { Component } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, ScrollView,StatusBar, TouchableOpacity, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';

import i18n from 'i18n-js';
const db = new Database();

export class AddMesurement extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      TextInpuPbValue: '',
      TextInpuLValue: '',
      dbs: '',
      isLoading: false,

    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })
    this.loadDbVarable = this.loadDbVarable.bind(this);


  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    // this.getData();
    // this.viewListData();
  }
  async componentDidMount() {
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
  }
  saveData() {
    const { TextInpuPbValue } = this.state;
    const { TextInpuLValue } = this.state;

    db.listBabyDetails(this.state.dbs).then((data) => {
      let result = data;
      if (result == 0) {
        this.setState({
          isLoading: false,
        });
      } else {
        let { bbGender } = this.props
        for (var i = 0; i < result.length; i++) {
          bbGender = result[i].bbGender;
        }
        let dbtable;
        if (bbGender == "Girl") {
          dbtable = 'Wightgirl';
        } else if (bbGender == "Boy") {
          dbtable = 'WightvsLength';
        }
        let data = {
          _weight: parseFloat(this.state.TextInpuPbValue),
          _month: parseInt(this.state.TextInpuLValue),
          dbName: dbtable
        }
        if (TextInpuPbValue != '' && TextInpuLValue != '') {

          db.addGrouthTracker(this.state.dbs, data).then((result) => {
            this.props.navigation.navigate('AreaChart');
            //   this.getData();
          }).catch((err) => {
            console.log(err);
          })
        } else {
          showMessage({
            message: "Input Fail",
            description: "Fields can not be empty",
            backgroundColor: 'red'
          })
        }
      }
    }).catch((err) => {
      console.log(err);
    })





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
        <FlashMessage duration={1000} />
        <CustomHeader bgcolor='#fbb146' title={i18n.t('growth.subheading')} gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
        <ScrollView style={styles.container}>

        <LinearGradient start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 90, zIndex: -1 }}>
          {/* <View style={{ backgroundColor: '#fbb146', height: 135, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}> */}
            <View style={{ marginTop: 0, marginLeft: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('growth.heading2')} {this.state.userName}</Text>
              {/* <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('growth.subheading')}</Text> */}

            </View>
            <View style={{ flexDirection: 'row',  marginTop: 0 ,marginLeft:10}}>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('AreaChart')} style={[styles.buttonh, { backgroundColor: '#FF4C58', }]}>
                <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                  <View style={{ backgroundColor: '#FF4C58', padding: 7, borderRadius: 35 }}>
                    <Icon
                      name='area-chart'
                      type='font-awesome'
                      color='red'
                      iconStyle={{ fontSize: 15, color: '#fff' }}
                    />
                  </View>
                  <Text style={{ color: '#fff', padding: 5 }}>{i18n.t('growth.chartbtn')}</Text>


                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('GrowthWebView')} style={[styles.buttonh, { backgroundColor: '#15D354', }]}>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                  <View style={{ backgroundColor: '#15D354', padding: 7, borderRadius: 35 }}>
                    <Icon
                      name='info'
                      type='feather'
                      color='red'
                      iconStyle={{ fontSize: 17, color: '#fff' }}
                    />
                  </View>
                  <Text style={{ color: '#fff', padding: 5 }}>{i18n.t('growth.moredetails')}</Text>

                </View>
              </TouchableOpacity>
            </View>

          </LinearGradient>

          <View style={styles.breadthPo1}>
            {/* <Text style={{ marginVertical: 8 }}>{i18n.t('growth.weight')} </Text> */}
            <TextInput
              keyboardType='numeric' style={{ height: 45, borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 }}
              autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} placeholder={i18n.t('growth.weightinner')} />

            {/* <Text style={{ marginVertical: 8, marginTop: 25 }}>{i18n.t('growth.month')} </Text> */}
            <TextInput
              keyboardType='numeric' style={{ height: 45, borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 , marginTop:10}}
              autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuLValue: TextInputValue })} placeholder={i18n.t('growth.monthinner')} />
            {/* </View> */}



            <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >
              <LinearGradient colors={['#4E3CCE', '#9A81FD']}

                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.9 }}

                style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  {i18n.t('growth.monthinnerbutton')}
                </Text>
              </LinearGradient>


            </TouchableOpacity>
            {/* <View style={styles.button}>
            <Button
              large
              leftIcon={{ name: 'save' }}
              title='Save'
              onPress={() => this.saveData()} />
          </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20
  },

  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }, breadthPo1: {

    justifyContent: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    backgroundColor: 'white',
    // bottom: 100,
    zIndex: 5,
    width: '95%',
    borderRadius: 10,
    elevation: 2,
    padding: 20,
    paddingTop: 20,
    marginTop: 10,
    // shadowColor: '#30C1DD',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.8,
    // shadowRadius: 5,
  }, linearGradient: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    padding: 0,
    alignSelf:'center'
  }, buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }, buttonh: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 18,
    // width: 120
    elevation: 10,
    shadowColor: '#30C1DD',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginHorizontal: 10,

    paddingHorizontal:3,
    paddingVertical:4


  }, breadthPo1: {
    zIndex: 5,
    padding: 18,
    marginTop: 10,

  }
})