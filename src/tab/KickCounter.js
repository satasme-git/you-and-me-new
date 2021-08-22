import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import { BarIndicator } from 'react-native-indicators';
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Avatar } from 'react-native-elements';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import i18n from 'i18n-js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const db = new Database();
var j = 0;
const _format = 'YYYY-MM-DD';
const _formatTime = 'HH:mm:ss';
const _today = moment().format(_format)
const time = moment().format(_formatTime);

export class KickCounter extends Component {
    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var time = moment().format(_formatTime); //To get the Current Hours

        super(props);
        this.state = {
            isLoading: true,
            _current_date: _today,
            _list_kcData: [],
            _kick_count: 0,
            increment: 0,
            dbs: '',
            _first_time: "00:00",

            _last_time: "00:00",
            times: moment().format(_formatTime),
            _max_hours: '',
            _status: 1,

        }

        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

    }
    componentDidMount() {

    }

    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        const status = 1;
        this.getaAllClickData(status);
    }
    saveData() {

        if (this.state._status != 0) {
            if (this.state._kick_count < 10) {
                j = 1;
                this.setState({
                    increment: j,
                    // isLoading: false,
                });
                this.getData();
            } else {

            }
        }

    }
    getaAllClickData(status) {

        db.listAllKickCount(this.state.dbs).then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_kcData: results,
            });

        }).catch((err) => {
            console.log(err);
        });
        var temp;
        let data = {
            kcDate: this.state._current_date.toString(),
            kcValue: this.state._kick_count,
            // kcTime: time,
        }
        db.listKickCount(this.state.dbs, data).then((results) => {
            result = results;

            if (result == 0) {


            } else {

                var _clickValue;
                var status1;
                for (var i = 0; i < result.length; i++) {
                    _clickValue = result[i].kcCount;

                    if (status == 1) {
                        temp = _clickValue + this.state.increment;
                    } else {
                        temp = _clickValue;
                    }
                    first_time = result[i].kcFirstTime;
                    last_time = result[i].kcLastTime;
                    status1 = result[i].kcStatus;
                }
                this.setState({
                    _kick_count: temp,
                    _first_time: first_time,
                    _last_time: last_time,
                    _status: status1,
                });
                var range = moment(this.state._first_time, 'HH:mm:ss');

                var l = new Date().getTime();


                var range2 = (l - range);
                var hours = (range2 / (1000 * 60 * 60)).toFixed(2);

                if (hours < 12) {

                    let data = {
                        kcDate: this.state._current_date.toString(),
                        kcValue: this.state._kick_count,
                        kcTime: this.state._last_time,
                    }

                    db.updateClickCount(this.state.dbs, data).then((result) => {
                    }).catch((err) => {
                        console.log(err);

                    });
                    this.setState({
                        _max_hours: hours,
                    });
                } else {
                    this.setState({
                        _max_hours: hours,
                    });

                }


            }
        }).catch((err) => {
            console.log(err);
        })
    }
    getData() {

        var temp;
        var first_time;
        var last_time;
        var status = 1;
        var status1 = 0;
        let data = {
            kcDate: this.state._current_date.toString(),
            kcValue: this.state._kick_count,
            kcTime: moment().format(_formatTime),
        }

        db.listKickCount(this.state.dbs, data).then((results) => {
            result = results;
            if (result == 0) {

                db.addKickCount(this.state.dbs, data).then((results) => {

                }).catch((err) => {
                    console.log(err);
                });
                this.LoadAfterClick();
            } else {

                var _clickValue;
                for (var i = 0; i < result.length; i++) {
                    _clickValue = result[i].kcCount;
                    temp = _clickValue + this.state.increment;
                    first_time = result[i].kcFirstTime;
                    last_time = result[i].kcLastTime;
                    status1 = result[i].kcStatus

                }
                var range = moment(this.state._first_time, 'HH:mm:ss');

                var l = new Date().getTime();
                var range2 = (l - range);
                var hours;
                if (this.state._first_time == '00:00:00') {
                    hours = 0;

                } else {
                    hours = (range2 / (1000 * 60 * 60)).toFixed(2);

                }


                if (hours < 12) {
                    if (_clickValue > 0) {

                        let data = {
                            kcDate: this.state._current_date.toString(),
                            kcValue: temp,
                            kcTime: moment().format(_formatTime),
                        }
                        db.updateClickCount(this.state.dbs, data).then((result) => {
                        }).catch((err) => {
                            console.log(err);

                        });
                        this.LoadAfterClick();

                    } else {

                        let data = {
                            kcDate: this.state._current_date.toString(),
                            kcValue: temp,
                            kcTime: moment().format(_formatTime),
                            kclTime: moment().format(_formatTime),
                        }

                        db.updateClickCountRfValueZoro(this.state.dbs, data).then((result) => {
                        }).catch((err) => {
                            console.log(err);

                        });
                        this.LoadAfterClick();

                    }
                } else {

                }
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    LoadAfterClick() {

        var temp;
        let data = {
            kcDate: this.state._current_date.toString(),
            kcValue: this.state._kick_count,
            kcTime: moment().format(_formatTime),
        }
        db.listKickCount(this.state.dbs, data).then((results) => {
            result = results;
            if (result == 0) {

            } else {
                var _clickValue;
                var status1;
                for (var i = 0; i < result.length; i++) {
                    _clickValue = result[i].kcCount;
                    temp = _clickValue + this.state.increment;
                    first_time = result[i].kcFirstTime;
                    last_time = result[i].kcLastTime;
                    status1 = result[i].kcStatus;
                }

                this.setState({
                    _kick_count: _clickValue,
                    _first_time: first_time,
                    _last_time: last_time,
                    _status: status1,
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    deleteData(id, date) {
        var status = 1;
        if (_today == date) {
            this.setState({
                // isLoading: false,
                _kick_count: 0,
            });

        }

        this.setState({
            // isLoading: true
        });
        db.deleteKicks(this.state.dbs, id).then((result) => {
            console.log(result);
            // this.getData();
            this.getaAllClickData(status);

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    refresh() {
        var status = 2;
        let data = {
            kcDate: this.state._current_date.toString(),
        }
        db.refreshClickCount(this.state.dbs, data).then((result) => {
            this.setState({
                _kick_count: 0,
                _max_hours: '',
                isLoading: false,
                // _first_time: '0:00',
                // _last_time: "0.00",
            });
        }).catch((err) => {
            console.log(err);
        });
        this.getaAllClickData(status);
    }
    stopKicks() {
        var status = 1;
        let data = {
            kcDate: this.state._current_date.toString(),
        }
        db.stopKick(this.state.dbs, data).then((result) => {
            this.props.navigation.navigate('KickCounterHister')
            this.setState({
                isLoading: false,
            });
        }).catch((err) => {
            console.log(err);
        });
        this.getaAllClickData();
    }
    keyExtractor = (item, index) => index.toString()
    render() {
        const data = [10, 5, 25, 15, 20]

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            return (

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('kick.heading')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                    {/* <View style={styles.brestposition5}></View>
                    <View style={styles.brestposition6}></View>
                    <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View> */}

                    <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{  backgroundColor: '#fbb146', height: 100, zIndex: -1,}}>


                    {/* <View style={{ backgroundColor: '#fbb146', height: 145, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}> */}
                        <View style={{ marginTop: 0, marginLeft: 20 }}>

                            {/* <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>Hello {this.state.userName}</Text> */}
                            {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{i18n.t('kick.heading')}</Text> */}
                            <Text style={{ color: 'white' }}>{i18n.t('kick.subheading')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('KickCounterHister')} style={[styles.buttonh, { backgroundColor: 'white', width: 130 }]}>
                                <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        {/* <Icon
                                            name='bar-chart'
                                            type='font-awesome'

                                            iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'gray' }}
                                        /> */}
                                         <MaterialCommunityIcons
                                    name="history"
                                    size={20}
                                    color="#4633cb"
                                />
                                    </View>
                                    <Text style={{ color: 'black', padding: 7 }}>{i18n.t('kick.buttonhis')}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </LinearGradient>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>


                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon

                                    name='calendar'
                                    type='font-awesome'
                                    color='gray'
                                    iconStyle={{ fontSize: 13, paddingTop: 3 }}
                                    onPress={() => console.log('hello')} />
                                <Text style={{ paddingLeft: 10 }}>Kicks on {this.state._current_date}</Text>
                            </View>
                            {/* <Text style={{ fontSize: 22, paddingBottom: 10 }}>{this.state._kick_count}</Text> */}
                            <AnimatedCircularProgress
                                size={242}
                                linecap='round'
                                rotation={0}
                                width={8}


                                // linecap='round'
                                padding={10}
                                fill={(this.state._kick_count / 10) * 100}
                                tintColor="#f78a2c"
                                backgroundColor="#cfd8dc"


                            >
                                {
                                    (fill) => (

                                        <TouchableOpacity style={styles.button5}

                                            onPress={() => this.saveData()}>
                                            {

                                                this.state._status != 0 ?
                                                    this.state._max_hours < 12 ?
                                                        this.state._kick_count < 10 ?
                                                            <Image style={{ width: 95, height: 95, marginLeft: 0, marginTop: 0 }}
                                                                source={IMAGE.ICON_BABY_FOOT2}
                                                                resizeMode="contain"
                                                            /> :
                                                            <Image style={{ width: 95, height: 95, marginLeft: 0, marginTop: 0 }}
                                                                source={IMAGE.ICON_BABY_FOOT3}
                                                                resizeMode="contain"
                                                            />
                                                        :
                                                        <Text>Max level exceeded</Text>
                                                    :
                                                    <Image style={{ width: 95, height: 95, marginLeft: 0, marginTop: 0 }}
                                                        source={IMAGE.ICON_BABY_FOOT3}
                                                        resizeMode="contain"
                                                    />
                                            }

                                        </TouchableOpacity>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderRightColor: 'gray', borderRightWidth: 1, paddingRight: 40 }}>
                                    <Text style={{ fontSize: 28, color: 'green', paddingBottom: 10 }}>{this.state._first_time}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('kick.first')}</Text>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 40 }}>
                                    <Text style={{ fontSize: 28, color: 'red', paddingBottom: 10 }}>{this.state._last_time}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('kick.last')}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <View style={{ padding: 20, paddingTop: 35 }}>
                                    <Avatar
                                        rounded
                                        showEditButton
                                        size={62}

                                        icon={{ name: 'undo', type: 'font-awesome', color: 'white' }}
                                        containerStyle={{
                                            shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                                            shadowOffset: { height: 3, width: 8 },
                                            borderWidth: 1, borderColor: 'white', // IOS
                                            shadowOpacity: 1, // IOS
                                            shadowRadius: 5, elevation: 2,
                                            backgroundColor: '#fbb146',


                                        }}
                                        onPress={() => this.refresh()}

                                    />
                                </View>
                                <View style={{ padding: 20 }}>
                                    <TouchableOpacity style={styles.button6}
                                    >
                                        <Animatable.Text animation="fadeInUp" style={{ fontSize: 40 }}>
                                            {this.state._kick_count}
                                        </Animatable.Text>
                                        {/* <Text style={{ fontSize: 40 }}>{this.state._kick_count}</Text> */}
                                    </TouchableOpacity>

                                </View>
                                <View style={{ padding: 20, paddingTop: 35 }}>
                                    <Avatar
                                        rounded
                                        showEditButton
                                        size={62}
                                        icon={{ name: 'stop', type: 'font-awesome', color: 'white', }}
                                        containerStyle={{
                                            shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                                            shadowOffset: { height: 3, width: 8 },
                                            borderWidth: 1, borderColor: 'white', // IOS
                                            shadowOpacity: 3, // IOS
                                            shadowRadius: 5, elevation: 2,
                                            backgroundColor: 'red'
                                        }}
                                        onPress={() => this.stopKicks()}
                                    />
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    {/* <View style={styles.header}>
                        <View style={{ marginTop: 0, marginLeft: 20 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Kick counter</Text>
                            <Text style={{ color: 'white' }}>press on foot after kick</Text>
                        </View>

                    </View> */}
                    {/* <View style={styles.footer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon

                                    name='calendar'
                                    type='font-awesome'
                                    color='gray'
                                    iconStyle={{ fontSize: 13, paddingTop: 3 }}
                                    onPress={() => console.log('hello')} />
                                <Text style={{ paddingLeft: 10 }}>Kicks on {this.state._current_date}</Text>
                            </View>
                            <Text style={{ fontSize: 22, paddingBottom: 10 }}>{this.state._kick_count}</Text>
                            <AnimatedCircularProgress
                                size={232}
                                rotation={0}
                                width={6}
                                padding={10}
                                fill={(this.state._kick_count / 10) * 100}
                                tintColor="#f78a2c"
                                backgroundColor="#cfd8dc"
                             
                              
                                >
                                {
                                    (fill) => (
                                        <TouchableOpacity style={styles.button5}
                                            onPress={() => this.saveData()}>
                                            <Image style={{ width: 85, height: 85, marginLeft: 0, marginTop: 0 }}
                                                source={IMAGE.ICON_BABY_FOOT2}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </AnimatedCircularProgress>
                            
                        </View>
                        <View style={{bottom:150,left:120}}>
                  
                        </View>
                        <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                            <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>
                            <FlatList

                                style={{
                                    backgroundColor: 'white', marginVertical: 0,
                                    elevation: 2,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.7,
                                    shadowRadius: 8,
                                }}
                                keyExtractor={this.keyExtractor}
                                data={this.state._list_kcData}
                                renderItem={({ item }) => <ListItem
                                    style={{
                                        height: 50, paddingTop: 15,
                                    }} >
                                    <Left>
                                        <View style={styles.iconMore}>
                                            <Icon
                                                name='calendar'
                                                type='font-awesome'
                                                color='gray'
                                                iconStyle={{ fontSize: 18 }}

                                            //   Alert.alert("dsfsdf"+value)
                                            // onPress={() => console.log(">>>>>>>>>>>>>>>>>>>")}
                                            // onPress={() => showMessage({
                                            //     message: "Hello World",
                                            //     description: "This is our second message",
                                            //     type: "success",
                                            //   })} 
                                            />
                                        </View>
                                    </Left>
                                    <Body style={{ marginLeft: -160 }}>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.kcDate}</Text>
                                        <Text style={styles.dateText}><Text style={{ color: 'gray', fontSize: 12 }}>Kick count is :</Text> {item.kcCount} </Text>
                                    </Body>
                                    <Right>
                                        <View style={styles.iconMore}>
                                            <Icon
                                                type='font-awesome'
                                                color='gray'
                                                iconStyle={{ fontSize: 18, padding: 8 }}
                                                name="trash-o" color="gray"
                                                onPress={() => {
                                                    this.deleteData(item.kcId, item.kcDate,); showMessage({

                                                        message: "Hello there",
                                                        description: "successfuly deleted "+ `${item.kcDate}`,
                                                        type: "success",
                                                    })
                                                }}
                                            />
                                        </View>
                                    </Right>
                                </ListItem>
                                }
                            />

                        </View>
                    </View> */}

                </SafeAreaView>
            );
        }
    }
} const styles = StyleSheet.create({

    button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        width: 150,
        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {
        flex: 6,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, header: {
        flex: 1,
        backgroundColor: '#fbb146'
    }, backgroundImage: {
        position: "absolute",
        resizeMode: 'cover',
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 100,
        elevation: 5, // Android
        height: 190,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }, button6: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 100,
        elevation: 5, // Android
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }, buttonh: {
        backgroundColor: "#AF1E8F",
        padding: 0,
        borderRadius: 10,
        marginTop: 18,

        elevation: 4,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,


    }, brestposition5: {
        width: 260,
        height: 260,
        marginLeft: 280,
        marginTop: 390,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 175, 0.5)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition6: {
        width: 140,
        height: 140,
        // marginRight: 12,
        marginTop: 450,
        marginLeft: 338,
        backgroundColor: 'rgba(255, 255,255, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
    , brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -130,
        marginTop: 140,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.3)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 180,
        marginLeft: -92,
        backgroundColor: 'rgba(255, 255,255, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
});