import React, { Component } from 'react';
import { TextInput, Text, StatusBar, View, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';

import *as Animatable from 'react-native-animatable';
import { Button } from 'react-native-elements';
import Database from '../Database';
const db = new Database();
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlashMessage, { showMessage } from "react-native-flash-message";
import i18n from 'i18n-js';
import RNLanguages from 'react-native-languages';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import en from '../../translations/en.json';
import fr from '../../translations/zh.json';
import CountDown from 'react-native-countdown-component';
import moment from 'moment' // 2.20.1
import Context from '../../Context/context';
const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)
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

const windowWidth = Dimensions.get('window').width;
export class Login2Screen extends Component {
    static contextType = Context;
    constructor(props) {
        super(props)
        this.state = {
            TextInputName: '',
            TextInputpassword: '',
            dbs: '',
            isLoading: true,
            lan: '',

            loading: false,
            // manoj
            isModalVisible: false,
            //
            currentLanguage: RNLanguages.language,
            
            created:0,
            expired:false,
            failed:false,
            response:{},

            
      modalLoading:true
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

        this.loadDbVarable = this.loadDbVarable.bind(this);
    }

    loadDbVarable(result) {
        this.setState({
            dbs: result,
            isLoading: false,
        });
        db.listBag(this.state.dbs).then((data) => {
            result = data;
            if (result == 0) {

                db.addItemOfMother_bag(this.state.dbs).then((result) => {

                }).catch((err) => {
                    console.log(err);
                })
            }
            this.setState({

                isLoading: false,
            });
        }).catch((err) => {
            console.log(err);
        })
    }
    InputUsers = () => {

        this.setState({
            loading: true,

        })
        const { TextInputName } = this.state;
        const { TextInputpassword } = this.state;



        fetch('https://youandmenest.com/tr_reactnative/api/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_email: TextInputName,
                member_password: TextInputpassword,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                // member_name = "";
                // member_role_id = "";
                this.setState({
                    isLoading: false,
                }, function () {
                    // In this block you can do something with new state.
                });


                if (responseJson !== "") {
                    if (responseJson == "sub_fail") {
                        this.checkToken();
                    }
                    else if (responseJson == "confirm_admin") {
                        showMessage({
                            message: "Wait",
                            description: "please wait, your account confirm by admin",
                            backgroundColor: 'green',

                        })
                        this.setState({
                            loading: false,
                        })
                    } else if (responseJson == "block") {
                        showMessage({
                            message: "Login Fail",
                            description: "your account block by admin. please contact administrator",
                            backgroundColor: 'red',

                        })
                        this.setState({
                            loading: false,
                        })

                    } else {

                        this.setState({
                            loading: false,
                        })
                        AsyncStorage.setItem('memberNames', responseJson.member_name).then(
                            responseJson => {
                                this.props.navigation.navigate('HomeApp', { msg: responseJson })
                            }
                        );
                        AsyncStorage.setItem('memberId', responseJson.member_role);
                        AsyncStorage.setItem('member_email', TextInputName);

                        AsyncStorage.setItem('member_image', responseJson.member_image);
                        AsyncStorage.setItem('member_nic', responseJson.member_nic);
                        this.context.addSub(responseJson.subscription);
                        this.context.addEmail(TextInputName);

                    }


                } else {

                    showMessage({
                        message: "Login Fail",
                        description: "Username or password incorrect" + `${responseJson}`,
                        backgroundColor: 'red',

                    })
                    this.setState({
                        loading: false,
                    })
                    this.props.navigation.navigate('Login2')
                }
            }).catch((error) => {
                console.error(error);
            })



    }
    goHome = async (responseJson) =>{
        let { TextInputName } = this.state
        AsyncStorage.setItem('memberNames', responseJson.member_name).then(
            responseJson => {
                this.props.navigation.navigate('HomeApp', { msg: responseJson })
            }
        );
        AsyncStorage.setItem('memberId', responseJson.member_role);
        AsyncStorage.setItem('member_email', TextInputName);

        AsyncStorage.setItem('member_image', responseJson.member_image);
        AsyncStorage.setItem('member_nic', responseJson.member_nic);
        this.context.addSub(responseJson.subscription);
        this.context.addEmail(TextInputName);
    }
    async componentDidMount() {
        const role_id = await AsyncStorage.getItem('lang');
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        }, function () {
            // In this block you can do something with new state.
        });

    }
    // manoj
    checkToken = async () => {

        const role_id = await AsyncStorage.getItem('memberId');
        const token = await AsyncStorage.getItem('memberNames');
        const email = await AsyncStorage.getItem('member_email');
        let { TextInputName } = this.state
        const formData = new FormData()
    
          formData.append('email', TextInputName);
    
          fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
            method: 'POST', // or 'PUT'
            body: formData
          })
            .then(response => response.json())
            .then(data => {
                if(data[0].subscription=='FREE'){
                  var date1 = moment(new Date()) //firstDate
                var date2 = moment(data[0].trial_date).add(1, 'days')
                // console.log(Math.round((date2-date1)/1000)) 

                this.setState({
                    created: date2.diff(date1, 'seconds'),
                    isLoading: false,
                    response:data[0]
                  }); 
                  this.context.addSub('FREE');
                  this.context.addEmail(TextInputName);
                 this.toggleModal()
                 console.log(data[0])  
                }
                else{
                    this.setState({
                        failed: true,
                  }); 
                   this.toggleModal() 
                   
                  this.context.addEmail(TextInputName); 
                }
                
            })
            .catch((error) => {
            });
        }

    // toggleModal = () => {
    //     this.setState({
    //         isModalVisible: true,
    //     });
    // };
    toggleModal = () => {
        const {isModalVisible} = this.state
        this.setState({
          isModalVisible: !isModalVisible,
          isLoading: false,
          loading:false
        });
      };
    gotoSubscribe = async () => {

        let { TextInputName } = this.state

        const nic = await AsyncStorage.getItem('member_nic');
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+TextInputName+" / "+_today);

        this.props.navigation.navigate('Subscription', { email: TextInputName,ref_code:_today });
        this.setState({
            isLoading: false
          });
    };
    // 
    render() {

        i18n.locale = this.state.lan;
        i18n.fallbacks = true;
        // manoj
        let { isLoading, loading, isModalVisible, TextInputName , created, expired,failed,response ,modalLoading} = this.state
        // 
        if (isLoading) {
            return (

                <BarIndicator color='#4E3CCE' />

            );
        } else {
            return (

                // <LinearGradient colors={['red', 'red']} style={styles.gradient}>

                <LinearGradient colors={['#9A81FD', '#4E3CCE']} style={styles.gradient}>
                    {/* <SafeAreaView style={{ flex: 1,backgroundColor:'#fbb448' }}> */}
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#9A81FD" />
                    <CustomHeader bgcolor='#9A81FD' gradient1="transparent" gradient2="transparent" titleColor="black" title="" navigation={this.props.navigation} bdcolor='#fbb448' />
                    <FlashMessage duration={4000} />
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>


                        <View style={{
                            justifyContent: 'space-between', paddingHorizontal: 15,

                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 5, color: 'white' }}>{i18n.t('welcome.signin')} </Text>
                                <Text style={{ fontSize: 14, color: 'black', marginBottom: 25 }}>{i18n.t('logIn.useemail')}</Text>
                                <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.1)', padding: 20, borderRadius: 150 }}>
                                    <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.2)', padding: 15, borderRadius: 120 }}>
                                        <View style={{ backgroundColor: 'rgba(252, 252, 252, 0.9)', padding: 10, borderRadius: 100 }}>
                                            <Image style={{ width: 150, height: 150, marginLeft: 0 }}
                                                source={IMAGE.ICON_LOGO_MAIN}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <Animatable.View animation="fadeInUp">
                                <Text style={{ color: '#fff', paddingVertical: 5, marginLeft: 2, marginTop: 30 }}>{i18n.t('logIn.email')} :</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: 'gray', borderWidth: 0.5, borderRadius: 25, backgroundColor: '#F2F2F2', paddingLeft: 10 }}>
                                    <Icon name="email" size={20} style={{ color: 'gray', paddingRight: 5 }} />
                                    <TextInput blurOnSubmit onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ width: '85%' }} placeholder={i18n.t('logIn.emailInner')} onEndEditing={this.clearFocus} autoFocus={false} />
                                </View>

                                {/* <Text style={{ color: 'white', paddingVertical: 10, marginLeft: 2, marginTop: 20 }}>User Name :</Text>
                                    <TextInput blurOnSubmit onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, backgroundColor: '#ffe3b8', paddingLeft: 10 }} placeholder="Enter User Name" onEndEditing={this.clearFocus} autoFocus={false} /> */}
                                <Text style={{ color: '#fff', paddingVertical: 5, marginLeft: 2, marginTop: 10 }}>{i18n.t('logIn.pw')} :</Text>
                                <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: 'gray', borderWidth: 0.5, borderRadius: 25, backgroundColor: '#F2F2F2', paddingLeft: 10 }}>
                                    <Icon name="briefcase" size={20} style={{ color: 'gray', paddingRight: 5 }} />
                                    <TextInput blurOnSubmit secureTextEntry={true} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ width: '85%' }} placeholder={i18n.t('logIn.pwInner')} onEndEditing={this.clearFocus} autoFocus={false} />
                                </View>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginTop: 15,
                                        // marginBottom: 15,
                                        textAlign: 'center',
                                    }}
                                    onPress={() => this.props.navigation.navigate('Forgotpw')}>
                                    {' '}
                                    Forgot Password?
                                </Text>
                                <View style={{ marginBottom: 20, marginTop: 10 }}>

                                    <Button
                                        loading={loading}
                                        title={i18n.t('welcome.signin')}
                                        type="outline"
                                        titleStyle={{ color: 'white' }}
                                        buttonStyle={{ borderRadius: 25, borderColor: 'white', color: 'white', padding: 12, borderWidth: 1, marginBottom: 20, marginTop: 15 }}
                                        onPress={this.InputUsers}

                                    />
                                </View>


                            </Animatable.View>


                        </View>
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
                                    borderBottomColor:expired==true?'#a80606':failed==true?'#a80606':'#104c2e',
                                    marginLeft: -5,
                                }}
                            />
                        </View>
                        

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
                                    onPress={() =>{this.goHome(response);this.toggleModal()}}
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
                                
                                
                            
                            </View>
                            }
                        </View>
        {/* } */}
                    </View>


            </Modal>
                        {/* end of manoj */}

                    </ScrollView>
                    {/* </SafeAreaView> */}
                </LinearGradient>

            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        // top:-15,
        flex: 1,
        marginBottom: 0
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
        // flex: 1,
        // width: 280,
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
        margin: 14,
        color: 'black',
        backgroundColor: 'transparent',
    }


});
