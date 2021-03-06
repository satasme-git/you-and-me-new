import React, { Component } from 'react';
import { Text, ScrollView, Image, View, Dimensions, TouchableOpacity, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import *as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import RNLanguages from 'react-native-languages';
import { BarIndicator } from 'react-native-indicators';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CountDown from 'react-native-countdown-component';
import Context from '../../Context/context';


const windowWidth = Dimensions.get('window').width;
// import RNRestart from 'react-native-restart';

import i18n from 'i18n-js';

import en from '../../translations/en.json';
import fr from '../../translations/zh.json';
import moment from 'moment' // 2.20.1
const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)
export class LoginScreen extends Component {

  static contextType = Context;

  constructor(props) {
    super(props)
    this.checkToken();
    this.state = {
      lan: '',
      defaultval: 0,
      isVisible: false,
      isModalVisible: false,
      isLoading: true,
      created:0,
      expired:false,
      failed:false,

      modalLoading:true
    }
    this.loadDbVarable();
  }

  state = {
    currentLanguage: RNLanguages.language,


  };
  async loadDbVarable() {
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
    var language = await AsyncStorage.getItem('lang');
    if (language != "") {
      if (language == "en") {

        this.changelanguage("en")
        this.setState({
          defaultval: 0
        });

      } else if (language == "fr") {

        this.changelanguage("fr")
        this.setState({
          defaultval: 1
        });

      }
    }


  }
  async componentDidMount() {

    var language = await AsyncStorage.getItem('lang');
    if (language != "") {
      if (language == "en") {

        this.changelanguage("en")
        this.setState({
          defaultval: 0
        });

      } else if (language == "fr") {

        this.changelanguage("fr")
        this.setState({
          defaultval: 1
        });

      }
    }


  }

  changelanguage(value) {
    this.setState({ currentLanguage: value });
    AsyncStorage.setItem("lang", value)
      .then(data => {
        //  RNRestart.Restart();


      })
      .catch(err => {
        // RNRestart.Restart();
        console.log("err");
      });

  }


  // manoj
  checkToken = async () => {



    const role_id = await AsyncStorage.getItem('memberId');
    const token = await AsyncStorage.getItem('memberNames');
    const email = await AsyncStorage.getItem('member_email');

    if (token) {

      const formData = new FormData()

      formData.append('email', email);

      fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
        method: 'POST', // or 'PUT'
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if(data[0].member_role==3){
            this.checkSubscription()
          }
          else{
              if(data[0].subscription=='FREE'){
                console.log('free')
              var date1 = moment(new Date()) //firstDate
              var date2 = moment(data[0].trial_date).add(1, 'days')

              this.setState({
                created: date2.diff(date1, 'seconds'),
                isLoading: false,
              });
              // if (date2.diff(date1, 'seconds') >=0){
              this.toggleModal()
              
              // }
              // else{
              //   console.log('expired')
              // }
              this.context.addSub('FREE');
              this.context.addEmail(email);

              // var d = JSON.stringify(data)
              // console.log(data[0].subscription);
              // data[0].member_role==3?this.checkSubscription():
              // data[0].subscription == "SUCCESS" ?
              //   this.checkSubscription()
              //   :
              //   // null
              //   this.toggleModal()
              }
              else if(data[0].subscription=='SUCCESS'){
                console.log('SUCCESS')

                this.checkSubscription()
                this.context.addEmail(email);
              }
              else {
                console.log('failed')
                this.toggleModal()
                this.setState({
                    failed: true,
                  }); 
                  
                this.context.addEmail(email);
              }
          }


        })
        .catch((error) => {
        });


    }

    else {
      this.setState({
        isLoading: false,
      });
      this.props.navigation.navigate('Login');

      console.log("data");
    }
  }


  checkSubscription = async () => {

    const role_id = await AsyncStorage.getItem('memberId');
    const email = await AsyncStorage.getItem('member_email');

    if (role_id != 3) {
      this.props.navigation.navigate('HomeApp',{ msg: "" });
      this.setState({
        isLoading: false,
      });
    } else {

      this.setState({
        isVisible: true,
        isLoading: false,
      });


      fetch('https://youandmenest.com/tr_reactnative/api/checkConfirm', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_email: email,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {


          if (responseJson == null) {
            this.setState({
              isVisible: false,
            });
            this.props.navigation.navigate('HomeApp',{ msg: "" });
          } else {
            this.setState({
              isVisible: false,
            });
            this.props.navigation.navigate('midwifeConfirm');
          }


        }).catch((error) => {
          console.error(error);
        })

    }
  }
  toggleModal = () => {
    const {isModalVisible} = this.state
    this.setState({
      isModalVisible: !isModalVisible,
      isLoading: false
    });
     
  };

  gotoSubscribe = async () => {

    const email = await AsyncStorage.getItem('member_email');
    // const nic = await AsyncStorage.getItem('member_nic');
    
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+nic);
    this.props.navigation.navigate('Subscription', { email: email,ref_code:_today });

  };

    // goHome = async (responseJson) =>{


    //     AsyncStorage.setItem('memberNames', responseJson.member_name).then(
    //         responseJson => {
    //             this.props.navigation.navigate('HomeApp', { msg: responseJson })
    //         }
    //     );
    //     AsyncStorage.setItem('memberId', responseJson.member_role);
    //     AsyncStorage.setItem('member_email', TextInputName);

    //     AsyncStorage.setItem('member_image', responseJson.member_image);
    //     AsyncStorage.setItem('member_nic', responseJson.member_nic);
    //     this.context.addSub(responseJson.subscription);
    //     this.context.addEmail(TextInputName);
    // }
  // end of manoj


  render() {
    const { isVisible, isModalVisible, isLoading , created, expired,failed , modalLoading} = this.state
    i18n.locale = this.state.currentLanguage;
    i18n.fallbacks = true;
    i18n.translations = { en, fr };
    const options = [
      { label: 'English', value: 'en' },
      { label: '??????????????? ', value: 'fr' }

    ];

    return (


      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#9A81FD" />
        <LinearGradient colors={['#9A81FD', '#4E3CCE']} style={styles.gradient}>


          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{
              flex: 1, justifyContent: 'center', paddingHorizontal: 15,
              paddingVertical: 0
            }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 80, marginBottom: 10, color: 'black' }}>{i18n.t('welcome.welcome1')}


                </Text>

                <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.1)', padding: 20, borderRadius: 150 }}>
                  <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.2)', padding: 15, borderRadius: 120 }}>
                    <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.9)', padding: 10, borderRadius: 100 }}>
                      <Image style={{ width: 140, height: 140, marginLeft: 0 }}
                        source={IMAGE.ICON_LOGO_MAIN}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>

              </View>

              {/* manoj */}
              {isLoading == true ?
                <View>
                  <BarIndicator style={{ marginTop: 0 }} color='#fff' />
                </View>
                :

                <Animatable.View animation="fadeInLeft">

                  <Button
                    title={i18n.t('welcome.signin')}
                    titleStyle={{ color: 'black', fontSize: 17 }}

                    buttonStyle={{
                      width: '100%',
                      backgroundColor: '#e2e1e1',
                      alignSelf: 'flex-end',
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 25,
                      marginBottom: 20,
                      marginTop: 30,
                      paddingVertical: 11,
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.7,
                      shadowRadius: 8,
                      overflow: 'hidden',

                    }}
                    onPress={() => this.props.navigation.navigate('Login2')}
                  >

                  </Button>


                  {/* <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('Login2')}>

                  <LinearGradient colors={['#fff', '#F2F2F2']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                      {i18n.t('welcome.signin')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity> */}
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingVertical: 15, color: 'orange' }}>{i18n.t('welcome.newaccount1')} <Text style={{ color: 'white' }}>{i18n.t('welcome.newaccount2')} </Text> </Text>
                  </View>

                  <Button
                    title={i18n.t('welcome.signup')}
                    type="outline"
                    titleStyle={{ color: 'white' }}
                    buttonStyle={styles.submitText, { borderRadius: 25, borderColor: 'white', color: '#ccc', padding: 12, borderWidth: 1, marginBottom: 40 }}
                    onPress={() => this.props.navigation.navigate('Register')}

                  />

                  <SwitchSelector
                    textColor={'red'} //'#7a44cf'
                    selectedColor={'#fff'}
                    buttonColor={'green'}
                    borderColor={'#fff'}
                    height={52}
                    initial={this.state.defaultval}
                    borderWidth={0.2}
                    hasPadding
                    options={options} onPress={value => this.changelanguage(value)} />
                </Animatable.View>
              }
              {/* end of manoj */}

            </View>

            <Modal
              isVisible={isVisible}
              // isVisible={true}
              transparent={true}
              backdropOpacity={0.5}

              animationIn={'bounceIn'}
            >
              <View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 120,
                    marginHorizontal: 120,
                    padding: 15,
                    paddingTop: 40,
                    borderRadius: 5,
                    opacity: 0.9,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>

                  <BarIndicator style={{ marginTop: -20 }} color='#4E3CCE' />
                  <Text>loading ....</Text>

                </View>

              </View>
            </Modal>
            {/* manoj */}
            <Modal
              isVisible={isModalVisible}
              // isVisible={true}
              transparent={true}
              backdropOpacity={0.5}

              animationIn={'bounceIn'}
            >
             

              <View onLayout={()=>setTimeout(()=>{this.setState({modalLoading: false})}, 1000)}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: expired==true?'red':failed==true?'red':'green',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 10,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="cached"
                                    size={20}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />
                                <Text style={{ color: 'white' }}>{i18n.t('subscribe.hedding')}</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: expired==true?'red':failed==true?'red':'green',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: expired==true?'#a80606':failed==true?'#a80606':'#104c2e',
                                    marginLeft: -5,
                                }}
                            />
                        </View>
                        {/* {modalLoading==true?
                        <View>
                        <BarIndicator style={{ marginTop: 0 }} color='#fff' />
                      </View>
                        : */}
                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                            }}>
                              {failed==true?
                                <Text style={{fontSize:17,paddingVertical:12}}>{i18n.t('subscribe.sub')}</Text>
                                :
                                <View>
                              <View style={{alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:17}}>{i18n.t('subscribe.in')}</Text>
                            </View>
                            {created==0?
                        <View style={{alignItems:'center',justifyContent:'center',height:40}}>
                            <BarIndicator color='#4E3CCE' size={17} />
                            </View>
                        :
                        <CountDown
                            until={created}
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#000'}}
                            onFinish={() => this.setState({
                              expired: true
                            })}
                            size={20}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{h:i18n.t('subscribe.h'),m: i18n.t('subscribe.m'), s: i18n.t('subscribe.s')}}
                            separatorStyle={{color: '#000',paddingBottom:20}}
                            showSeparator
                        />}
                        </View>
                        }
                        {modalLoading==true?
                        <View style={{backgroundColor:"#fff",padding:10}}>
                        <BarIndicator style={{ marginTop: 0 }} color='#4E3CCE'  size={17} />
                      </View>
                        :
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' ,alignItems:'center'}}>
                                  {
                                    expired==true?<Text style={{fontSize:17,paddingRight:20,marginTop: 10}}>{i18n.t('subscribe.expire')}</Text>:
                                    failed==true?
                                    null:
                                    <Button
                                    title={i18n.t('subscribe.use')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: 'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                    onPress={() =>{this.props.navigation.navigate('HomeApp',{ msg: "" });this.toggleModal()}}
                                />
                                  }
                                  {
                                    expired==true?
                                    <Button
                                    title={i18n.t('subscribe.start2')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {this.gotoSubscribe();this.toggleModal()}}
                                />:
                                    failed==true?
                                    <Button
                                    title={i18n.t('subscribe.start2')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {this.gotoSubscribe();this.toggleModal()}}
                                />
                                :
                                <Button
                                title={i18n.t('subscribe.choose')}
                                titleStyle={{ color: 'black', fontSize: 17 }}
                                buttonStyle={{
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                    paddingVertical: 5,
                                    borderColor: expired==true?'red':failed==true?'red':'green',
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                }}
                                onPress={() => {this.props.navigation.navigate('TrialScreen');this.toggleModal()}}
                            />
                                  }
{/*                                 
                                <Button
                                    title={i18n.t('subscribe.choose')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red': 'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {this.props.navigation.navigate('TrialScreen');this.toggleModal()}}
                                /> */}
                            </View>
                            }
                        </View>
                        {/* } */}
                    </View>


            </Modal>
            {/* end of manoj */}
          </ScrollView>



        </LinearGradient>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  }, submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
  submitText: {
    paddingTop: 20,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,

  }, buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: 'black',
    backgroundColor: 'transparent',
  }


  , container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    marginBottom: 0
  }

});
