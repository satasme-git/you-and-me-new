
import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, StatusBar, Text, ActivityIndicator, Image, View, TextInput, TouchableOpacity, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-web-swiper';
import { IMAGE } from '../constants/image';
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

const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;

const hmacAlgorithm = CONSTANTS.HmacAlgorithms.HmacSHA512;

const EventName = CONSTANTS.Events.onBatchReccieved;
let deviceWidth = Dimensions.get('window').width;

export class BillerCategories extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      _hash: '',
      categoryData: [],
      isLoading: true,
      loadin: 0,
      billers: [],
      _billCode: '',

    };
  }
  getBillers(category) {

    this.setState({
      billers: [],
      loadin: 0,
    });

    AsyncStorage.setItem('cat_id', "" + category).then(
      responseJson => {
        this.props.navigation.navigate('GetBiller');
      }
    );

    // const cat_id = category;
    // JSHmac(cat_id + "bcaad5b1-bafa-4527-83b6-a3b7119dbd76", "a419f2b7652b09c34518f09759b4dba6089fab38d792609b8bb9daf8343875cd", CONSTANTS.HmacAlgorithms.HmacSHA256)
    //   .then(hash => {
    //     fetch('https://dev.directpay.lk/v2/backend/external/api/retrieveBillers', {
    //       method: 'post',
    //       headers: {
    //         'Authorization': 'Bearer ' + hash,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "categoryId": cat_id,
    //         "merchantId": "bcaad5b1-bafa-4527-83b6-a3b7119dbd76",
    //       }),

    //     }).then((response) => response.json())
    //       .then((responseJson) => {
    //         console.log(">>>>>>>>>>>>>>>>??????????????????????????? : "+this.state.billers)

    //         this.setState({
    //           billers: responseJson.data.billerData,
    //           // loadin: 1,
    //         });

    //         // console.log(responseJson.data.billerData);
    //       }).catch((error) => {
    //         console.error(error);

    //       })
    //   }
    //     // console.log(hash)
    //   )
    //   .catch(e => console.log(e));
    // this.RBSheet.open()
  }
  componentDidMount() {
    JSHmac("bcaad5b1-bafa-4527-83b6-a3b7119dbd76", "a419f2b7652b09c34518f09759b4dba6089fab38d792609b8bb9daf8343875cd", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash => {
        fetch('https://dev.directpay.lk/v2/backend/external/api/billCategories', {
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
            this.setState({
              categoryData: responseJson.data.categoryData,
              isLoading: false,

            });
            // console.log(responseJson.data);
          }).catch((error) => {
            console.error(error);

          })
      })
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
              this.RBSheet.close();


              setTimeout(() => {
                AsyncStorage.setItem('billerCode', this.state._billCode).then(
                  responseJson => {
                    this.props.navigation.navigate('BillPaymentInformation');
                  }
                );

              }, 100);
              // this.props.navigation.navigate('BillPaymentInformation');

            }
          }).catch((error) => {
            console.error(error);

          })
      })
      .catch(e => console.log(e));
  }
  render() {
    let { isLoading, loadin, loading } = this.state
    let lapsList2;
    //  if(loadin){

    //     <MaterialIndicator color='#4E3CCE' />


    //  }else{

    lapsList2 = this.state.billers.map((data) => {

      return (

        <View key={data.billerCode} style={{ margin: 8, borderRadius: 15, backgroundColor: 'white' }}>

          <TouchableOpacity
            onPress={() =>

              this.paymentActions(data.billerCode)

            }
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, width: deviceWidth / 3.5 }}>
              <Text>ss{this.state.loadin}</Text>
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
    // }
    // let { isLoading,loading } = this.state
    let lapsList;
    if (isLoading) {
      return (
        <MaterialIndicator color='#4E3CCE' />
      );
    } else {
      lapsList = this.state.categoryData.map((data) => {
        return (
          <View key={data.id} style={{ margin: 5, borderRadius: 15, backgroundColor: 'white' }}>
            <TouchableOpacity
              onPress={() =>

                this.getBillers(data.id)
                // this.props.navigation.navigate('GetBiller')
              }>
              {
                data.id <= 10 ?
                  data.id == 6 ? null :
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, width: deviceWidth / 3.5 }}>

                      <Image source={{
                        uri: 'https://youandmenest.com/tr_reactnative/public/images/Biller/' +
                          data.id + ".png",
                      }} style={{ width: 50, height: 50, overflow: 'hidden' }} />
                      <Text>{data.category}</Text>
                    </View> : null
              }
            </TouchableOpacity>
            <RBSheet

              ref={ref => {
                this.RBSheet = ref;
              }}
              closeOnDragDown={true}
              height={400}
              openDuration={700}
              customStyles={{
                container: {
                  // justifyContent: "center",
                  // alignItems: "center",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  backgroundColor: '#F2F2F2'
                }
              }}
            >

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={{ flex: 1, marginBottom: 30, marginLeft: 1 }}>
                  {/* <Text style={{ paddingBottom: 5 }}>aaaaa</Text> */}
                  <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                    {lapsList2}
                  </View>
                </View>
              </ScrollView>



            </RBSheet>
          </View>
        )
      })
    }

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#9A81FD" />
        {/* <View > */}

        <View>
  
          <Swiper
            horizontal
            loop
            timeout={-3.5}

            controlsProps={{
              dotActiveStyle: { backgroundColor: 'red' },
            }}>


            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
              }}>
              <Image
                source={IMAGE.ICON_SLIDE7}
                style={{ height: 280, width: 390 }}></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
              }}>
              <Image
                source={IMAGE.ICON_SLIDE4}
                style={{ height: 280, width: 400 }}></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
              }}>
              <Image
                source={IMAGE.ICON_SLIDE5}
                style={{ height: 280, width: 400 }}></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
              }}>
              <Image
                source={IMAGE.ICON_SLIDE6}
                style={{ height: 280, width: 400 }}></Image>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(200,20,20,0.3)',
              }}>
              <Image
                source={IMAGE.ICON_SLIDE3}
                style={{ height: 280, width: 400 }}></Image>
            </View>
          </Swiper>
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          {/* <View><Text>coucou test</Text></View> */}
          {lapsList}
        </View>
        {/* </View> */}
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
  },
  
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'rgba(20,20,200,0.3)',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },
})