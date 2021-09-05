
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
      _billerName: '',
      isLoading: true,
    };
  }
  async componentDidMount() {
    const cat_id = await AsyncStorage.getItem('cat_id');

    JSHmac(cat_id + "a1840a1b-986d-4c22-b16d-e3d9db64db46", "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash => {
        fetch('https://prod.directpay.lk/v2/backend/external/api/retrieveBillers', {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + hash,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "categoryId": cat_id,
            "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",

          }),

        }).then((response) => response.json())
          .then((responseJson) => {

            if (responseJson.status == 200) {

              this.setState({
                billers: responseJson.data.billerData,
                isLoading: false,
              });
            } else {
              this.setState({
                billers: "",
                isLoading: false,
              });
              console.log(">>>>>>>>>>>>>>>>EEEEEEEEEEEE : " + responseJson.status);
            }


            // console.log(responseJson.data.billerData);




          }).catch((error) => {
            console.error(error);

          })
      }
        // console.log(hash)

      )
      .catch(e => console.log(e));
  }

  paymentActions(billerCode, billerName) {
    this.setState({
      _billCode: billerCode,
      _billerName: billerName,
    });
    this.walletBalance();
  }

  walletBalance() {
    JSHmac("a1840a1b-986d-4c22-b16d-e3d9db64db46", "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
      .then(hash => {
        fetch('https://prod.directpay.lk/v2/backend/external/api/getWalletBalance', {
          method: 'post',
          headers: {
            'Authorization': 'Bearer ' + hash,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
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
                  AsyncStorage.setItem('billerName', this.state._billerName);
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
      if (this.state.billers != "") {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>> : " + this.state.billers);
        lapsList = this.state.billers.map((data) => {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>> : " + data.providerImage);
          return (

            <View key={data.billerCode} style={{ margin: 8, borderRadius: 15, backgroundColor: 'white' }}>

              <TouchableOpacity
                onPress={() =>

                  this.paymentActions(data.billerCode, data.billerName)

                }
              >
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 7, width: deviceWidth / 3.6 }}>

                  <Image source={{
                    uri: 'https://youandmenest.com/tr_reactnative/public/images/BillersImages/' +
                      data.providerImage + ".png",
                  }} style={{ width: 80, height: 50, overflow: 'hidden' ,resizeMode:'cover'}} />
                  <Text>{data.billerName}</Text>
                  {/* <Text>{data.billerCode}</Text> */}
                </View>

              </TouchableOpacity>





            </View>
          )

        }
        )
      } else {
        return (

          <View  style={{ margin: 8, borderRadius: 15, backgroundColor: 'white' }}>
            <View><Text>No billers found</Text></View>
          </View>
        )
      }
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