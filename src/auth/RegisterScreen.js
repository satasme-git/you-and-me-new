
import React, { Component } from 'react';
import { TextInput, StatusBar, Text, View, SafeAreaView, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Icon, Avatar, Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import i18n from 'i18n-js';
import RNDirectPayCardPayment from 'react-native-direct-pay-card-payment';

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

import { CustomHeader } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {

    top:-15,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: 500

  }, title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18
  }, text: {
    color: 'gray',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  }, signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  }, textSign: {
    color: 'white',
    fontWeight: 'bold'
  }, linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 13,
    color: 'black',
    backgroundColor: 'transparent',
  }

});

export class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      TextInputName: '',
      TextInputEmail: '',
      TextInputNic:'',
      // TextInputPhoneNumber: '',
      TextInputpassword: '',
      isLoading: true,

      PickerValueHolder: '',
      value: null,
      items: [],
      loading: false,
      language: 'java',
      // emailError: "",
    }
  }
  InputUsers = () => {
    // const emailError = validate("email", this.state.TextInputEmail)
   
    // this.validate({
    //   TextInputName: { required: true},
    //   TextInputEmail: {email: true},
    //   TextInputPhoneNumber: {numbers: true},
    //   PickerValueHolder:{required: true},
    //   // date: {date: 'YYYY-MM-DD'}
    // });
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    // const { TextInputPhoneNumber } = this.state;
    const { TextInputpassword } = this.state;
    const { PickerValueHolder } = this.state;
    const { TextInputNic } = this.state;
    


    let emailValidateregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mobileValidateregex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    let nic10 = /^[0-9]{9}[vVxX]$/;
    let nic12 = /^[0-9]{7}[0][0-9]{4}$/;

    if (TextInputName == '' || TextInputEmail == '' || TextInputpassword == '' || PickerValueHolder == ''||TextInputNic=='') {
      if (PickerValueHolder == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          optionError: "Please select an option first",
          errorFound: "true",
        })
      } else {
        this.setState({
          optionError: "",
          errorFound: "",
        })
      }
      if (TextInputpassword == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          pwError: "Please enter password",
          errorFound: "true",
        })
      } else {
        this.setState({
          pwError: "",
          errorFound: "",
        })
      }

      if (TextInputEmail == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          emailError: "Please enter email",
          errorFound: "true",
        })
      } else {

   

        this.setState({
          emailError: "",
          errorFound: "",
        })

        if (emailValidateregex.test(TextInputEmail) == false) {
          this.setState({
            emailError: "Invalid email",
            errorFound: "true",
          })
        }else{

        }
      }
      if (TextInputName == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          unameError: "Please enter user name",
          errorFound: "true",
        })
      } else {
        this.setState({
          unameError: "",
          errorFound: "",
        })
      }
      if (TextInputNic == '') {
       
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          nicError: "Please enter nic ",
          errorFound: "true",
        })
      } else {
      
        if(TextInputNic.length==10){
          if (nic10.test(TextInputNic) == false) {
            this.setState({
              nicError: "invalid NIC number",
              errorFound: "true",
            })
          }else{
            this.setState({
              nicError: "",
              errorFound: "",
            })
          }
        }else  if(TextInputNic.length==12){
          if (nic12.test(TextInputNic) == false) {
            this.setState({
              nicError: "invalid NIC number",
              errorFound: "true",
            })
          }else{
            this.setState({
              nicError: "",
              errorFound: "",
            })
          }
        }else{
          this.setState({
            nicError: "invalid NIC number",
            errorFound: "true",
          })
        }
        // this.setState({
        //   nicError: "",
        //   errorFound: "",
        // })
      }
    } else {
      this.setState({
        unameError: "",
        nicError: "",
        optionError: "",
        emailError: "",
        mobileError: "",
        pwError: "",
      })

      if (emailValidateregex.test(TextInputEmail) == true) {
        this.setState({
          emailError: "",
          errorFound: "",
        })
        //email verification success. process continue for further validation

        //mobile verification success. process continue for further validation


     

        //start save data in the server
        if (this.state.errorFound != "false" || this.state.errorFound == "") {
          this.setState({
            loading: true,

          })
          fetch('https://youandmenest.com/tr_reactnative/api/register', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              member_name: TextInputName,
              member_email: TextInputEmail,
              member_nic: TextInputNic,
              member_password: TextInputpassword,
              member_role: PickerValueHolder,
            }),

          }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);

              this.setState({
                isLoading: false,
                loading: false,
              }, function () {

              });
              if (responseJson == "Insert success") {
                AsyncStorage.setItem('memberNames', TextInputName).then(
                  responseJson => {

                
                    if(PickerValueHolder==3){
                      this.props.navigation.navigate('midwifeConfirm');
                    }else{
                      this.props.navigation.navigate('HomeApp');
                    }
                   
                  }
                );
                AsyncStorage.setItem('memberId', PickerValueHolder);
                AsyncStorage.setItem('member_email', TextInputEmail);

              } else {
                showMessage({
                  message: "Register Fail",
                  description: "" + `${responseJson}`,
                  backgroundColor: 'red'
                })
                this.setState({
                  loading: false,
                  // passwordError: passwordError
                })
                this.props.navigation.navigate('Register')
               
              }


            }).catch((error) => {
              console.error(error);
              
            })

          this.state.errorFound = "false"
        }

        //end save data in the server


      } else {
        this.setState({
          emailError: "Invalid email",
          errorFound: "true",
        })
      }
    }





  }
//    source = {
//     html: `
//     <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Directpay|RecurringPayment</title>
// </head>
// <div id="card_container"></div>
// <body>
//     <script src="https://cdn.directpay.lk/dev/v1/directpayCardPayment.js?v=1"></script>
//     <script>
//         DirectPayCardPayment.init({
//             container: "card_container", //<div id="card_container"></div>
//             merchantId: "xxxxxxx", //your merchant_id
//             amount: "100.00",
//             refCode: "DP12345", //unique referance code form merchant
//             currency: "LKR",
//             type: "RECURRING",
//             recurring: {
//                 startPaymentDate: "2050-07-18",
//                 lastPaymentDate: "2050-07-19",
//                 interval: "MONTHLY",
//                 isRetry: true,
//                 retryAttempts: 2,
//                 recurringAmount: "50.00",
//                 doFirstPayment: true,
//             },
//             customerEmail: "abc@mail.com",
//             customerMobile: "+94712345467",
//             description: "test products", //product or service description
//             debug: true,
//             responseCallback: responseCallback,
//             errorCallback: errorCallback,
//             logo: "https://test.com/directpay_logo.png",
//             apiKey: "xxxxxxxxxxx",
//         });
//         //response callback.
//         function responseCallback(result) {
//             console.log("successCallback-Client", result);
//             alert(JSON.stringify(result));
//         }

//         //error callback
//         function errorCallback(result) {
//             console.log("successCallback-Client", result);
//             alert(JSON.stringify(result));
//         }
//     </script>
// </body>
// `
//   };
  componentDidMount() {
    fetch('https://youandmenest.com/tr_reactnative/api/view_role', {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    }).then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          role_id = responseJson[i].id
          role_name = responseJson[i].role_name
          console.warn(role_id);
        }
        console.log(responseJson);
        // var datas=JSON.stringify(responseJson);
        // Alert.alert(datas.id);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          _role_id: role_id,
          items: role_name,

        }, function () {
          // In this block you can do something with new state.
        });
      }).catch((error) => {
        console.error(error);
      })
  }

  handleChangeOption(itemValue) {
    if (itemValue !== 0) {
      this.setState({ PickerValueHolder: itemValue });
    }
  }
  card(){
    RNDirectPayCardPayment.addCardToUser(
      'dev', //env : dev or prod
      '7c62d2fdd3d4edf99e97be9838dd2fd7bac316578bffc37ef68100d516fa7409',// apiKey
      'II07510', // mid
      '987654321', //unique id of the user
      'chamil', // firstname of the user
      'pathirana', // lastname of the user
      'chamiljay88@mail.com', // email of the user
      '0716460440', // phone number of the user
      (_err, _r) => {
        if (_err) {//failed
                                  
          console.log('code: ' + _err.code);
                                  console.log('message: ' + _err.message);          
        } else {//successfully added the card
                      
          console.log('id: ' + _r.id); // id (token) of the added card
          console.log('mask: ' + _r.mask); // masked card number
          console.log('reference: ' + _r.reference); // unique user id as the reference
          console.log('brand: ' + _r.brand); // brand of the card (Visa / Mastercared)
        }
      },
    )
  }
  render() {
    let { isLoading,loading } = this.state
    if (isLoading) {
      return (
        <BarIndicator color='#fbb146' />
      );
    } else {
      return (
      
          <LinearGradient colors={['#fbb448', '#f78a2c']} style={styles.gradient}>
            <CustomHeader bgcolor='#fbb448' gradient1="transparent"gradient2="transparent"  titleColor="black" title="" navigation={this.props.navigation} bdcolor='#fbb448' />
            <FlashMessage duration={4000} />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={{
                flex: 1, justifyContent: 'center', paddingHorizontal: 15,
                paddingVertical: 0
              }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 0, color: 'white' }}> {i18n.t('SignUp.headding')}</Text>

                  <Text style={{ fontSize: 12, marginTop: 2, color: 'black', textAlign: 'center' }}>{i18n.t('SignUp.subtitle1')} </Text>
                  <Text style={{ fontSize: 12, marginTop: -2, marginBottom: 10, color: 'black' }}>{i18n.t('SignUp.subtitle2')}</Text>
                </View>


                <Animatable.View animation="fadeInLeft">

                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.role1')} :</Text>
                  <View style={{ bborderColor: '#F2F2F2', borderWidth: 0.2, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }}>

                    <Picker
                      mode="dropdown"
                      // selectedValue={this.state.datasource[index].packselectedValue}
                      selectedValue={this.state.PickerValueHolder}
                      // style={{ borderBottomColor: 'red', borderWidth: 1 }}
                      // onValueChange={this.handleChangeOption}
                      prompt='Options'
                      onValueChange={
                        (itemValue, itemIndex) =>

                          this.setState(
                            { PickerValueHolder: itemValue },
                            (name, index) => {
                            })
                      }
                    >
                      <RedPickerItem label={i18n.t('SignUp.pickerheading')} value="red" color='red' fontSize='15' value={0} />

                      {this.state.dataSource.map((item, key) => (

                        <Picker.Item label={item.role_name} value={item.id} key={key} />)
                      )}

                    </Picker>
                  </View>
                  <Text style={{ color: 'red' }}>{this.state.optionError}</Text>

                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.username')} :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_uname')} onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.unameError}</Text>


                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.nic')} :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputNic: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_nic')} onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.nicError}</Text>



                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.email')} :</Text>
                  <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_email')} enter_email onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.emailError}</Text>

                  {/* <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>Mobil number :</Text>
                  <TextInput
                    onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })}
                    keyboardType="numeric"
                    maxLength={10}
                    style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder="Enter Mobil number" onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.mobileError}</Text> */}

                  <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.pw')} :</Text>
                  <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ height: 45, borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder={i18n.t('SignUp.pwInner')} onEndEditing={this.clearFocus} autoFocus={false} />
                  <Text style={{ color: 'red' }}>{this.state.pwError}</Text>

                  <Button
                    title={i18n.t('SignUp.signUp')}
                    titleStyle={{ color: 'black', fontSize: 17 }}
                    loading={loading}
                    buttonStyle={{
                      width:'100%',
                      backgroundColor:'#e2e1e1',
                      alignSelf: 'flex-end',
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 25,
                      marginBottom: 20,
                      marginTop: 30,
                      paddingVertical:11,
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.7,
                      shadowRadius: 8,
                    }}
                    onPress={() => this.props.navigation.navigate('HomeApp')} onPress={this.InputUsers}
                  >
                     
                  </Button>

                  <TouchableOpacity style={{ marginTop: 30 }}  onPress={this.card}>

                    <LinearGradient colors={['#fff', '#e2e1e1']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>
                      card
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animatable.View>

              </View>
            </ScrollView>
          </LinearGradient>
        
        
      );
    }
  }
} class RedPickerItem extends Component {
  render() {
    return (
      <Picker.Item {...this.props} style={{ color: '#fff', placeholderTextColor: '#fff' }} />
    )
  }
}