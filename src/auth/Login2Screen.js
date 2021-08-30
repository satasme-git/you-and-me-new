import React, { Component } from 'react';
import { TextInput, Text, StatusBar, View, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
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
import en from '../../translations/en.json';
import fr from '../../translations/zh.json';
import moment from 'moment' // 2.20.1
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

export class Login2Screen extends Component {
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

                member_name = "";
                member_role_id = "";
                this.setState({
                    isLoading: false,
                }, function () {
                    // In this block you can do something with new state.
                });


                if (responseJson !== "") {
                    if (responseJson == "sub_fail") {
                        this.toggleModal();
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
    async componentDidMount() {
        const role_id = await AsyncStorage.getItem('lang');
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        }, function () {
            // In this block you can do something with new state.
        });

    }
    // manoj
    toggleModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    gotoSubscribe = async () => {

        let { TextInputName } = this.state

        const nic = await AsyncStorage.getItem('member_nic');
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+TextInputName+" / "+_today);

        this.props.navigation.navigate('Subscription', { email: TextInputName,ref_code:_today });

    };
    // 
    render() {

        i18n.locale = this.state.lan;
        i18n.fallbacks = true;
        // manoj
        let { isLoading, loading, isModalVisible, TextInputName } = this.state
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
                            <View>

                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        height: 120,
                                        width: '100%',
                                        marginHorizontal: 0,
                                        padding: 15,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>

                                    {/* <BarIndicator style={{ marginTop: -20 }} color='#fbb146' /> */}
                                    <Text>Your Subscription is not Valid. Please Add Valid Payment Details to Subscribe</Text>
                                    <Button
                                        title="Subscribe Now                 "
                                        titleStyle={{ color: 'black', textAlign: 'center' }}
                                        buttonStyle={{
                                            width: '100%',
                                            backgroundColor: '#e2e1e1',
                                            borderRadius: 25,
                                            marginBottom: 20,
                                            marginTop: 10,
                                            paddingVertical: 11,
                                            elevation: 3,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 3 },
                                            shadowOpacity: 0.7,
                                            shadowRadius: 8,
                                        }}

                                        onPress={() => { this.gotoSubscribe(); this.setState({ isModalVisible: false }) }}

                                    />
                                </View>

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
