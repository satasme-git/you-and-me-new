import React, { Component } from 'react';
import { Text, ScrollView, Image, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import *as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import RNLanguages from 'react-native-languages';
import { BarIndicator } from 'react-native-indicators';
// import RNRestart from 'react-native-restart';

import i18n from 'i18n-js';

import en from '../../translations/en.json';
import fr from '../../translations/zh.json';

export class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.checkToken();
    this.state = {
      lan: '',
      defaultval:0,
      isVisible:false,
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
          defaultval:0
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
          defaultval:0
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

  checkToken = async () => {
    const token = await AsyncStorage.getItem('memberNames');
    const role_id = await AsyncStorage.getItem('memberId');
    const email = await AsyncStorage.getItem('member_email');
    
    if (token) {

      if(role_id!=3){
        this.props.navigation.navigate('HomeApp');
      }else{

        this.setState({
          isVisible: true,
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
             

              if(responseJson==null){
                this.setState({
                  isVisible: false,
                });
                this.props.navigation.navigate('HomeApp');
              }else{
                this.setState({
                  isVisible: false,
                });
                this.props.navigation.navigate('midwifeConfirm');
              }
      
         
          }).catch((error) => {
              console.error(error);
          })

      }
     
    } else {
      this.props.navigation.navigate('Login')
    }
  }
  render() {
    const {isVisible } = this.state
    i18n.locale = this.state.currentLanguage;
    i18n.fallbacks = true;
    i18n.translations = { en, fr };
    const options = [
      { label: 'English', value: 'en' },
      { label: 'සිංහල ', value: 'fr' }

    ];

    return (


      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb448" />
        <LinearGradient colors={['#fbb448', '#f78a2c']} style={styles.gradient}>


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
              <Animatable.View animation="fadeInLeft">

              <Button
                    title= {i18n.t('welcome.signin')}
                    titleStyle={{ color: 'black', fontSize: 17 }}
                 
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
                  <Text style={{ paddingVertical: 15 }}>{i18n.t('welcome.newaccount1')} <Text style={{ color: 'white' }}>{i18n.t('welcome.newaccount2')} </Text> </Text>
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

                            <BarIndicator style={{ marginTop: -20 }} color='#fbb146' />
                            <Text>loading ....</Text>

                        </View>

                    </View>
                </Modal>
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
  }

});