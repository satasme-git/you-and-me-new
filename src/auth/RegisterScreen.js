
import React, { Component } from 'react';
import { TextInput, StatusBar, Text, View, SafeAreaView, Dimensions, Alert, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Icon, Avatar, Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Context from '../../Context/context';

import Modal from 'react-native-modal';

import { Picker } from '@react-native-community/picker';
import i18n from 'i18n-js';

import RenderHTML from "react-native-render-html";
import RBSheet from "react-native-raw-bottom-sheet";
import HTML_FILE from '../constants/index.html';
import { WebView } from 'react-native-webview';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
import moment from 'moment' // 2.20.1
const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {

    top: -15,
    marginBottom: 30
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
const html = `
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Directpay|RecurringPayment</title>
    </head>
 
  <body>
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>chamil pathirana</h2>

  </body>
</html>
  `;


const HTML = `
<h1>This Is A Heading</h1>
<h2>And below is my dog</h2>
<img src="https://www.kindacode.com/wp-content/uploads/2020/10/dog_sample.jpg" alt="My Dog"/>
<br/>
<hr/>
<br/>
<em style="textAlign: center;">Have a nice day with React Native</em>
<div>
  <p>This is a paragraph</p>
</div>
`;
export class RegisterScreen extends Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      TextInputName: '',
      TextInputEmail: '',
      TextInputNic: '',
      // TextInputPhoneNumber: '',
      TextInputpassword: '',
      isLoading: true,

      PickerValueHolder: '',
      value: null,
      items: [],
      loading: false,
      language: 'java',
      
      isModalVisible: false,
      // emailError: "",
    }
  }
  toggleModal = () => {
    // let { isModalVisible } = this.state
    // this.setState({
    //   isModalVisible: !isModalVisible,
    //   isLoading: false
    // });
    
    this.props.navigation.navigate('TrialScreen')
  };
  InputUsers = () => {

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

    if (TextInputName == '' || TextInputEmail == '' || TextInputpassword == '' || PickerValueHolder == '' || TextInputNic == '') {
      if (PickerValueHolder == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          optionError: "Please Select an Option First",
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
          pwError: "Please Enter Password",
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
          emailError: "Please Enter Email",
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
        } else {

        }
      }
      if (TextInputName == '') {
        showMessage({
          message: "Somefields not filled",
          backgroundColor: 'red'
        })
        this.setState({
          unameError: "Please Enter Username",
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
          nicError: "Please Enter NIC ",
          errorFound: "true",
        })
      } else {

        if (TextInputNic.length == 10) {
          if (nic10.test(TextInputNic) == false) {
            this.setState({
              nicError: "Invalid NIC number",
              errorFound: "true",
            })
          } else {
            this.setState({
              nicError: "",
              errorFound: "",
            })
          }
        } else if (TextInputNic.length == 12) {
          if (nic12.test(TextInputNic) == false) {
            this.setState({
              nicError: "Invalid NIC number",
              errorFound: "true",
            })
          } else {
            this.setState({
              nicError: "",
              errorFound: "",
            })
          }
        } else {
          this.setState({
            nicError: "Invalid NIC number",
            errorFound: "true",
          })
        }

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
                  // responseJson => {


                  

                  // }
                );
                AsyncStorage.setItem('memberId', PickerValueHolder);
                AsyncStorage.setItem('member_email', TextInputEmail);
                if (PickerValueHolder == 3) {
                  this.props.navigation.navigate('midwifeConfirm');
                } else {
                  
                  this.context.addEmail(TextInputEmail);
                  this.toggleModal()
                  // this.props.navigation.navigate('Subscription', { email: TextInputEmail,ref_code:_today })
                }
                

              } else {
                showMessage({
                  message: "Register Fail",
                  description: "" + `${responseJson}`,
                  backgroundColor: 'red'
                })
                this.setState({
                  loading: false,

                })
                this.props.navigation.navigate('Register')

              }


            }).catch((error) => {
              console.error(error);

            })

          this.state.errorFound = "false"
        }

      } else {
        this.setState({
          emailError: "Invalid Email",
          errorFound: "true",
        })
      }
    }
  }

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
  gotoSubscribe = async () => {

    const email = await AsyncStorage.getItem('member_email');
    // const nic = await AsyncStorage.getItem('member_nic');
    
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+nic);
    this.props.navigation.navigate('Subscription', { email: email,ref_code:_today });

  };

  render() {

    let { isLoading, loading,isModalVisible } = this.state
    if (isLoading) {
      return (
        <BarIndicator color='#4E3CCE' />
      );
    } else {
      return (

        <LinearGradient colors={['#9A81FD', '#4E3CCE']} style={styles.gradient}>
          <StatusBar barStyle="light-content" hidden={false} backgroundColor="#9A81FD" />
          <CustomHeader bgcolor='#9A81FD' gradient1="transparent" gradient2="transparent" titleColor="black" title="" navigation={this.props.navigation} bdcolor='#9A81FD' />
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
                <View style={{ bborderColor: '#F2F2F2', borderWidth: 0.2, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 10 }}>

                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.PickerValueHolder}
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
                <TextInput onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_uname')} onEndEditing={this.clearFocus} autoFocus={false} />
                <Text style={{ color: 'red' }}>{this.state.unameError}</Text>


                <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.nic')} :</Text>
                <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}><TextInput onChangeText={TextInputValue => this.setState({ TextInputNic: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 ,paddingRight:25,width:'100%'}} placeholder={i18n.t('SignUp.enter_nic')} onEndEditing={this.clearFocus} autoFocus={false} keyboardType={'numeric'} />
                <Text style={{fontSize:15,marginLeft:-20,fontWeight:'bold'}}>V</Text>
                </View>
                <Text style={{ color: 'red' }}>{this.state.nicError}</Text>
                <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.email')} :</Text>
                <TextInput onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder={i18n.t('SignUp.enter_email')} enter_email onEndEditing={this.clearFocus} autoFocus={false} />
                <Text style={{ color: 'red' }}>{this.state.emailError}</Text>

                <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, }}>{i18n.t('SignUp.pw')} :</Text>
                <TextInput secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ height: 45, borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#fff', paddingLeft: 10 }} placeholder={i18n.t('SignUp.pwInner')} onEndEditing={this.clearFocus} autoFocus={false} />
                <Text style={{ color: 'red' }}>{this.state.pwError}</Text>
                <View style={{ flex: 1 }}>

                  <WebView
                    style={{ flex: 1 }}
                    originWhitelist={['*']}
                    source={HTML_FILE}
                    // style={{ marginTop: 100 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                  />
                </View>
                <Button
                  title={i18n.t('SignUp.signUp')}
                  titleStyle={{ color: 'black', fontSize: 17 }}
                  loading={loading}
                  buttonStyle={{
                    width: '100%',
                    backgroundColor: '#e2e1e1',
                    alignSelf: 'flex-end',
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 25,
                    marginBottom: 100,
                    marginTop: 30,
                    paddingVertical: 11,
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.7,
                    shadowRadius: 8,
                  }}
                  onPress={() => this.props.navigation.navigate('HomeApp',{ msg: "" })} onPress={this.InputUsers}
                >

                </Button>


              </Animatable.View>

            </View>


            <RBSheet

              ref={ref => {
                this.RBSheet = ref;
              }}
              closeOnDragDown={true}
              height={400}
              openDuration={700}
              customStyles={{
                container: {

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
                <RedPickerItem2 />
              </ScrollView>
            </RBSheet>

           


          </ScrollView>
        </LinearGradient>


      );
    }
  }
}
class RedPickerItem extends Component {
  render() {
    return (
      <Picker.Item {...this.props} style={{ color: '#fff', placeholderTextColor: '#fff' }} />
    )
  }
}

class RedPickerItem2 extends Component {
  render() {
    return (
      <WebView
        style={{ flex: 1 }}

      />
    )
  }
}