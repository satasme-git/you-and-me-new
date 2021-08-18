
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, ActivityIndicator, Image, Dimensions, View, TextInput, TouchableOpacity, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
let deviceWidth = Dimensions.get('window').width;
const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

const hmacAlgorithm = CONSTANTS.HmacAlgorithms.HmacSHA512;

const EventName = CONSTANTS.Events.onBatchReccieved;


export class GetBiller extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      billers: [],
      _billCode: '',
      isLoading: true,
    };
  }
  async componentDidMount() {
    const cat_id = await AsyncStorage.getItem('cat_id');

    JSHmac(cat_id + "bcaad5b1-bafa-4527-83b6-a3b7119dbd76", "a419f2b7652b09c34518f09759b4dba6089fab38d792609b8bb9daf8343875cd", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash => {
        fetch('https://dev.directpay.lk/v2/backend/external/api/retrieveBillers', {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + hash,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "categoryId": cat_id,
            "merchantId": "bcaad5b1-bafa-4527-83b6-a3b7119dbd76",

          }),

        }).then((response) => response.json())
          .then((responseJson) => {

// console.log(">>>>>>>>>>>>>>>>EEEEEEEEEEEE : "+hash);
            this.setState({
              billers: responseJson.data.billerData,
              isLoading: false,
            });

            // console.log(responseJson.data.billerData);




          }).catch((error) => {
            console.error(error);

          })
      }
        // console.log(hash)

      )
      .catch(e => console.log(e));
  }

  paymentActions(billerCode) {
    this.setState({
      _billCode: billerCode,
    });
    this.walletBalance();
  }

  walletBalance() {
    JSHmac("bcaad5b1-bafa-4527-83b6-a3b7119dbd76", "a419f2b7652b09c34518f09759b4dba6089fab38d792609b8bb9daf8343875cd", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash => {
        fetch('https://dev.directpay.lk/v2/backend/external/api/getWalletBalance', {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + hash,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "merchantId": "bcaad5b1-bafa-4527-83b6-a3b7119dbd76",
          }),
        }).then((response) => response.json())
          .then((responseJson) => {
            // this.setState({
            //   categoryData: responseJson.data.categoryData,
            // });

            if (responseJson.data.success == true) {
           
              
              
              // setTimeout(() => {
                AsyncStorage.setItem('billerCode', this.state._billCode).then(
                  responseJson => {


                    this.props.navigation.navigate('BillPaymentInformation');
                  }
                );

              // }, 100);
              // this.props.navigation.navigate('BillPaymentInformation');

            }
          }).catch((error) => {
            console.error(error);

          })
      })
      .catch(e => console.log(e));
  }
  render() {
    let { isLoading } = this.state
    let lapsList;
    if (isLoading) {
      return (
        <MaterialIndicator color='#4E3CCE' />
      );
    } else {
       lapsList = this.state.billers.map((data) => {
        return (

          <View key={data.billerCode} style={{ margin: 8, borderRadius: 15, backgroundColor: 'white' }}>

            <TouchableOpacity
              onPress={() =>

                this.paymentActions(data.billerCode)

              }
            >
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, width: deviceWidth / 3.6 }}>
            
                <Image source={{
                  uri: 'https://youandmenest.com/tr_reactnative/public/images/Mobile/' +
                    data.billerCode + ".png",
                }} style={{ width: 80, height: 50, overflow: 'hidden' }} />
                <Text>{data.billerName}</Text>
              </View>

            </TouchableOpacity>





          </View>
        )
      })
    }


    return (
      <ScrollView style={styles.container}>

        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {lapsList}
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
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