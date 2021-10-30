import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native'
import { CustomHeader } from '../index';
import i18n from 'i18n-js';
import { SubData } from "./SubData";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment' // 2.20.1
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import Modal from 'react-native-modal';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import Context from '../../Context/context';


const windowWidth = Dimensions.get('window').width;
const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)

export default class TrialScreen extends Component {
    static contextType = Context;
    constructor(props) {
        super(props)
        this.state = {
            created: 0,
            expired: false,
            isModalVisible: false,
            start: false,
            data: {}
        }
    }

    componentDidMount() {
        this.checkToken();
    }

    gotoSubscribe = async () => {
        const email = this.context.email;
        this.props.navigation.navigate('Subscription', { email: email, ref_code: _today });
    };

    goHome = async (responseJson) => {
        AsyncStorage.setItem('memberNames', responseJson.member_name).then(
            responseJson => {
                this.props.navigation.navigate('HomeApp', { msg: responseJson })
            }
        );
        AsyncStorage.setItem('memberId', responseJson.member_role);
        AsyncStorage.setItem('member_email', this.context.email);

        AsyncStorage.setItem('member_image', responseJson.member_image);
        AsyncStorage.setItem('member_nic', responseJson.member_nic);
        this.context.addSub(responseJson.subscription);
        this.context.addEmail(this.context.email);
    }

    gotoHome = async () => {
        const { start, expired, data } = this.state

        const email = this.context.email;
        const formData = new FormData()
        formData.append('email', email);
        start == true ?
            this.goHome(data)
            :

            fetch('https://youandmenest.com/tr_reactnative/api/updatetrial', {
                method: 'POST', // or 'PUT'
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    if (data == 'false') {
                        console.log('true')
                    }
                    else {
                        // console.log(data)


                        var date1 = moment(new Date()) //firstDate
                        var date2 = moment(data.trial_date).add(1, 'days')

                        // console.log(Math.round((date2-date1)/1000)) 

                        // console.log(date2.diff(date1, 'seconds'))
                        this.setState({
                            created: date2.diff(date1, 'seconds'),
                            start: true,
                        });

                        if (date2.diff(date1, 'seconds') >= 0) {
                            AsyncStorage.setItem('memberNames', data.member_name).then(
                                data => {
                                    this.toggleModal()
                                }
                            );
                            AsyncStorage.setItem('memberId', data.member_role);
                            AsyncStorage.setItem('member_email', data.member_email);

                            AsyncStorage.setItem('member_image', data.member_image);
                            AsyncStorage.setItem('member_nic', data.member_nic);
                            this.context.addSub(data.subscription);
                        }
                        else {
                            this.setState({
                                created: date2.diff(date1, 'seconds'),
                                start: true,
                                expired: true,
                            });
                        }




                    }



                })
                .catch((error) => {
                });

    };


    checkToken = async () => {

        const role_id = await AsyncStorage.getItem('memberId');
        const token = await AsyncStorage.getItem('memberNames');
        const email = await AsyncStorage.getItem('member_email');

        const token2 = this.context.email;

        console.log(token2)
        if (token2) {

            const formData = new FormData()

            formData.append('email', token2);

            fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
                method: 'POST', // or 'PUT'
                body: formData
            })
                .then(response => response.json())
                .then(data => {

                    var f = 'YYYY-MM-DD HH:mm:ss'
                    if (data[0].free == '1') {
                        var date1 = moment(new Date()) //firstDate
                        var date2 = moment(data[0].trial_date).add(1, 'days')
                        // console.log(Math.round((date2-date1)/1000)) 

                        this.setState({
                            created: date2.diff(date1, 'seconds'),
                            start: true,
                            data: data[0]
                        });

                    }
                    else {
                        this.setState({
                            start: false,
                        });


                    }

                })
                .catch((error) => {
                });


        }
        else {
            // this.props.navigation.navigate('Login');

            console.log("data");
        }
    }

    toggleModal = () => {
        const { isModalVisible } = this.state
        this.setState({
            isModalVisible: !isModalVisible,
            isLoading: false
        });
    };

    render() {

        const { created, expired, isModalVisible, start, data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                {/* <FlashMessage duration={1000} /> */}
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('subscribe.hedding')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                <View style={{ padding: 15, justifyContent: 'space-between', flex: 1 }}>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: '300', alignSelf: 'center', width: '100%', textAlign: 'center' }}>{i18n.t('subscribe.choose2')}</Text>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                            {SubData.map((data) =>
                                <View key={data.id} style={{ width: "50%", padding: 20 }}>
                                    <View style={{ backgroundColor: 'white', borderRadius: 15, height: 225, justifyContent: 'space-between' }}>
                                        <View style={{ padding: 15, alignItems: 'center' }}>
                                            <Text style={{ padding: 7, fontSize: 18 }}>{i18n.t('subscribe.' + data.plan)}</Text>
                                            <View style={{ height: 1, backgroundColor: 'gray', width: "100%", marginBottom: 15 }} />

                                            <View style={{ justifyContent: 'center', height: 110, alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: 10 }}>Rs: </Text>
                                                    <Text style={{ fontSize: 25 }}>{data.price}</Text>
                                                </View>
                                                <Text style={{ fontSize: 17 }}>{i18n.t('subscribe.' + data.month)}</Text>
                                                {data.id == 1 ?
                                                    start == true ?
                                                        created == 0 ?
                                                            <View style={{ alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                                                <BarIndicator color='#c5a8f7' size={17} />
                                                            </View>
                                                            :
                                                            <View style={{ alignItems: 'center', backgroundColor: '#d2c2ef', marginTop: 5, padding: 5, borderRadius: 5, marginBottom: -15 }}>
                                                                {/* <Text style={{fontSize:17,paddingBottom:5}}>{i18n.t('subscribe.'+data.month)}</Text> */}
                                                                <CountDown
                                                                    until={created}
                                                                    digitStyle={{ backgroundColor: '#FFF', width: 20 }}
                                                                    digitTxtStyle={{ color: '#000' }}
                                                                    onFinish={() => this.setState({
                                                                        expired: true
                                                                    })}
                                                                    size={13}
                                                                    timeToShow={['H', 'M', 'S']}
                                                                    timeLabels={{ h: 'HH', m: 'MM', s: 'SS' }}
                                                                    separatorStyle={{ color: '#000', paddingBottom: 2 }}
                                                                    timeLabelStyle={{ color: 'black', marginTop: -10 }}
                                                                    showSeparator
                                                                />
                                                                <Text style={{ fontSize: 15 }}>{i18n.t('subscribe.left')}</Text>
                                                            </View>
                                                        :
                                                        null
                                                    :
                                                    null
                                                }
                                                {/* <Text style={{fontSize:17}}>{i18n.t('subscribe.'+data.month)}</Text> */}
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={data.id == 1 ? () => { this.gotoHome() } : () => { this.gotoSubscribe() }}>
                                            <LinearGradient colors={['transparent', '#9A81FD']} style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 10, alignItems: 'center' }}>
                                                {data.id == 1 ?
                                                    expired == true ?
                                                        <Text style={{ fontSize: 17, color: '#4E3CCE' }}>{i18n.t('subscribe.expire')}</Text>
                                                        :
                                                        start == true ?
                                                            <Text style={{ fontSize: 17, color: '#4E3CCE' }}>{i18n.t('subscribe.use')}</Text>
                                                            :
                                                            <Text style={{ fontSize: 17, color: '#4E3CCE' }}>{i18n.t('subscribe.' + data.button)}</Text>
                                                    :
                                                    <Text style={{ fontSize: 17, color: '#4E3CCE' }}>{i18n.t('subscribe.' + data.button)}</Text>
                                                }
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
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
                                        flexDirection: 'row',
                                        marginBottom: -30,
                                        zIndex: 1,
                                    }}>
                                    <View
                                        style={{
                                            backgroundColor: expired == true ? 'red' : 'green',
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
                                            borderTopColor: expired == true ? 'red' : 'green',
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
                                            borderBottomColor: expired == true ? '#a80606' : '#104c2e',
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
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 17 }}>{i18n.t('subscribe.in')}</Text>
                                    </View>
                                    {created == 0 ?
                                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 40 }}>
                                            <BarIndicator color='#4E3CCE' size={17} />
                                        </View>
                                        :
                                        <CountDown
                                            until={created}
                                            digitStyle={{ backgroundColor: '#FFF' }}
                                            digitTxtStyle={{ color: '#000' }}
                                            onFinish={() => this.setState({
                                                expired: true
                                            })}
                                            size={20}
                                            timeToShow={['H', 'M', 'S']}
                                            timeLabels={{ h: i18n.t('subscribe.h'), m: i18n.t('subscribe.m'), s: i18n.t('subscribe.s') }}
                                            separatorStyle={{ color: '#000', paddingBottom: 20 }}
                                            showSeparator
                                        />}
                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {
                                            expired == true ? <Text style={{ fontSize: 17, paddingRight: 20, marginTop: 10 }}>{i18n.t('subscribe.expire')}</Text> :
                                                <Button
                                                    title={i18n.t('subscribe.start1')}
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
                                                    onPress={() => { this.props.navigation.navigate('HomeApp', { msg: "" }); this.toggleModal() }}
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
                                </View>
                            </View>


                        </Modal>
                    </View>
                    <Image style={{ width: 100, height: 100, marginLeft: 0, alignSelf: 'center' }}
                        source={IMAGE.ICON_LOGO_MAIN}
                        resizeMode="contain"
                    />
                </View>
            </SafeAreaView>
        )
    }
}
