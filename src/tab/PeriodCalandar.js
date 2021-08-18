import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1
import { Icon } from 'react-native-elements';
import { IMAGE } from '../constants/image';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import Database from '../Database';
import AsyncStorage from '@react-native-community/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const today = new Date();
const currentDate = today.getDate();
const _format = 'YYYY-MM-DD';
const _formatTime = 'HH:mm:ss';
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)
import { extendMoment } from 'moment-range';
import CustomPushNotification from './CustomPushNotification';

import i18n from 'i18n-js';

const moments = extendMoment(moment);
const db = new Database();
const cn = new CustomPushNotification();

export class PeriodCalandar extends Component {
    initialState = {
        [_today]: { disabled: false }
    }
    constructor(props) {
        super(props);
        this.state = {
            _markedDates: this.initialState,
            marked: null,
            pName: '',
            ovulation_date: '',
            _ovl_date: '',
            next_period_date: '',
            _reacl_next_p_date: 0,
            reacl_next_ov_date: '',
            isLoading: false,
            _deleteDate: '',
            _babybDate: '',
            dbs: '',
            _role_id: '',
            _day: currentDate,
            _month_name: monthNames[today.getMonth()],
            _days_count: moment(_today, "YYYY-MM").daysInMonth(),
            _day_of_month: '',
            startAngle: '', angleLength: '',
            _nextPeriodDate: '',
            _monthlyPeriod: 0,
            lan: '',

        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);


    }
    async componentDidMount() {
        const role_id = await AsyncStorage.getItem('memberId');
        this.setState({
            isLoading: false,
            _role_id: role_id,
            lan: await AsyncStorage.getItem('lang'),
        });
        this.createChannel();

    }
    createChannel(){
        PushNotification.createChannel(
            {
                channelId:"test-channel",
                channelName:"Test Channel"
            }
        );
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.loadData();
    }

    loadData() {


        let selected = true;
        let markedDates = {}
        let updatedMarkedDates = '';
        let products = [];
        let _pdate = '';
        let marked = true;
        let _pcatId;
        let _pParity_bit = 0;
        let firstOvDate = '';
        let firstOvDateDay = '';
        let OvDateDay = '';
        let period_date = 0;
        const start = moment(_today, 'YYYY-MM-DD');
        db.listProduct(this.state.dbs).then((data) => {
            products = data;
            for (var i = 0; i < products.length; i++) {

                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription
                _pParity_bit = products[i].pParityBit


                if (_pcatId == 1) {
                    markedDates = { ...markedDates, ...{ selected }, startingDay: true, endingDay: true, color: "red" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }

                    const end2 = moment(_pdate, 'YYYY-MM-DD');
                    const range3 = moment.range(start, end2);
                    period_date = range3.snapTo('day');
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                        _day_of_month: _pdate.substring(8, 10),
                        _monthlyPeriod: parseFloat(period_date.diff('days')),
                    });

                }
                if (_pcatId == 4) {

                    if (firstOvDate == '') {
                        let data = {
                            _title: " " + _pDescription + "" + _pdate,
                            _bigText: "this is subtitle",
                        }
                        let ovulation = moment(_pdate).subtract(1, 'day').format('YYYY-MM-DD');
                        if (_today == ovulation) {
                            cn.testPush(data);
                        }

                        const end2 = moment(_pdate, 'YYYY-MM-DD');
                        const range3 = moment.range(start, end2);
                        firstOvDate = range3.snapTo('day');
                        firstOvDateDay = _pdate.substring(8, 10);
                        OvDateDay = _pdate;
                    }

                    if (_pParity_bit == 0) {
                        markedDates = { ...markedDates, ...{ selected }, startingDay: true, color: '#50cebb', textColor: 'white', endingDay: false };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    } else if (_pParity_bit == 4) {
                        markedDates = { ...markedDates, ...{ selected }, endingDay: true, color: '#50cebb', textColor: 'white', startingDay: false };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    }
                    else {
                        markedDates = { ...markedDates, ...{ selected }, startingDay: false, endingDay: false, color: '#70d7c7', textColor: 'white' };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    } this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        reacl_next_ov_date: firstOvDate.diff('days'),
                        ovulation_date: firstOvDateDay,
                        _ovl_date: OvDateDay,
                    });
                } if (_pcatId == 5) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(1, 'day').format('YYYY-MM-DD');
                    if (_today == nestPeriod) {
                        cn.testPush(data);
                    }
                    const end = moment(_pdate, 'YYYY-MM-DD');
                    const range = moment.range(start, end);
                    const range2 = range.snapTo('day');
                    markedDates = { ...markedDates, ...{ selected }, startingDay: true, endingDay: true, color: "pink" };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        _reacl_next_p_date: parseFloat(range2.diff('days')),
                        _nextPeriodDate: _pdate
                    });

                }
            }
        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        });

    }
    savePeriod() {
        this.setState({
            isLoading: false,
        });
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        } else {
            this.RBSheet.close();
        }
        var _ovlDate = moment(this.state.pName).add(12, 'day').format('YYYY-MM-DD');
        var _nextDate = moment(this.state.pName).add(28, 'day').format('YYYY-MM-DD');
        let data = {
            pName: this.state.pName,
            pDescription: "Period start ",
            pOvlDate: _ovlDate,
            pNexpdate: _nextDate,
            pTime: moment().format(_formatTime),
        }
        let result = [];
        let pDateandMonth;
        let availabel = 0;
        let availabelOvl = 0;
        let availabeNext = 0;
        let nextP = 0;
        let availableP = 0;
        let availableInnerP = 0;
        let availableInnerP2 = 0;
        let availableInnerSame = 0;
        let deletep = 0;
        db.listGetCurrntMonthPeriod(this.state.dbs).then((datas) => {
            result = datas;
            var pPeriod_Id = null;
            var pcat_Id = null;

            for (var i = 0; i < result.length; i++) {
                pDateandMonth = result[i].pName;
                pcat_Id = result[i].pCatId;
                pPeriod_Id = result[i].pId;

                if (this.state.pName >= _today) {
                    if (pDateandMonth >= _today) {
                        if (this.state.pName == pDateandMonth) {
                            availableP = 1;
                            availableInnerSame = 1;
                            this.unmarkDate(pDateandMonth);
                            this.deletePeriod(pPeriod_Id);
                            this.deleteNextPeriod();

                            this.setState({
                                isLoading: false,
                                _reacl_next_p_date: 0,
                            });

                            // }
                        } else {
                            if (pcat_Id == 1) {
                                availableP = 1;
                                availableInnerP2 = 1;
                                let data2 = {
                                    _pDateandMonth: this.state.pName,
                                    _pPeriod_Id: pPeriod_Id,
                                }
                                this.updatePeriod(data2);
                                this.unmarkDate(pDateandMonth);

                            } if (pcat_Id == 4) {
                                availabelOvl = 1;
                                this.unmarkDate(pDateandMonth);
                            } if (pcat_Id == 5) {
                                let data3 = {
                                    _pPeriod_Id: pPeriod_Id,
                                    _nextDate: _nextDate,

                                }
                                this.unmarkDate(pDateandMonth);
                                this.updateNextPeriod(data3);

                            }
                        }
                    }
                } else {

                    if (pcat_Id == 1) {
                        availableP = 1;
                        availableInnerP = 1;
                        if (this.state.pName == pDateandMonth) {
                            deletep = 1;
                            this.unmarkDate(pDateandMonth);
                            this.deletePeriod(pPeriod_Id);
                            this.deleteOvulationDates();
                            this.deleteNextPeriod();
                        }

                    } if (pcat_Id == 4) {
                        this.unmarkDate(pDateandMonth);

                    }
                    availabel = 1;
                }
            }
            if (availableP == 0) {
                this.adPeriod(data);
                this.adNextPeriod(data);
                this.deleteOvulationDates();
                this.addOvulation(data);
            }

            if (availableInnerP == 1) {
                if (deletep != 1) {

                    this.adPeriod(data);
                    this.deleteOvulationDates();
                    this.addOvulation(data);
                    this.deleteNextPeriod();
                    this.adNextPeriod(data);

                }
            }
            if (availabelOvl == 1) {

                if (availableInnerSame == 1) {
                    this.deleteOvulationDates();
                } else {
                    this.deleteOvulationDates();
                    this.addOvulation(data);
                }
            }
            if (availableInnerP2 == 1) {
                if (availabelOvl == 0) {

                    this.deleteOvulationDates();
                    this.addOvulation(data);
                }
            }

            availabel = 0;
            availableP = 0;
            deletep = 0;
            availableInnerP = 0;
            availabelOvl = 0;
            availableInnerP2 = 0;
            availableInnerSame = 0;
            this.loadData();
        }).catch((err) => {

            this.setState({
                isLoading: false,
            });
        });


    }
    addOvulation(data) {
        db.addOvulationPeriod(this.state.dbs, data).then((result) => {
            this.setState({
                isLoading: false,
            });
        }).catch((err) => {
            this.setState({
                isLoading: false,
            });
        });
    }
    updatePeriod(data2) {

        db.updatePeriod(this.state.dbs, data2).then((result) => {
            this.setState({
                isLoading: false,
            });
        }).catch((err) => {
        })
    }
    adPeriod(data) {
        db.adderiod(this.state.dbs, data).then((result) => {
            this.setState({
                isLoading: false,
            });

        }).catch((err) => {
            this.setState({
                isLoading: false,
            });
        })
    }
    adNextPeriod(data) {
        db.addNextPeriod(this.state.dbs, data).then((result) => {
            this.setState({
                isLoading: false,
            });

        }).catch((err) => {
            this.setState({
                isLoading: false,
            });
        })
    }
    updateNextPeriod(data3) {
        db.updateNextPeriod(this.state.dbs, data3).then((result) => {
        }).catch((err) => {
            this.setState({
                isLoading: false,
            });
        });
    }
    deleteNextPeriod() {
        db.getNextPeriod(this.state.dbs).then((results) => {
            result = results;
            var _pName;
            for (var i = 0; i < result.length; i++) {
                _pName = result[i].pName;
                this.unmarkDate(_pName);
            }
        }).catch((err) => {
            console.log(err);
        });
        db.deleteNextPeriod(this.state.dbs).then((result) => {

        }).catch((err) => {
        });
    }
    deletePeriod(pPeriod_Id) {
        db.deletePeriod(this.state.dbs, pPeriod_Id).then((result) => {
            this.setState({

                isLoading: false,
            });
        }).catch((err) => {
        });
    }
    deleteOvulationDates() {
        db.gwtOvulationDates(this.state.dbs).then((results) => {
            result = results;
            var _pid, _pName;
            for (var i = 0; i < result.length; i++) {
                // _pid = result[i].pId;
                _pName = result[i].pName;
                this.unmarkDate(_pName);
            }
        }).catch((err) => {
            console.log(err);
        });
        db.deleteOvanpPeriod(this.state.dbs).then((result) => {
            this.setState({

                isLoading: false,
            });
        }).catch((err) => {
        })
    }
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }
    unmarkDate(dateUnmark) {
        let selected = false;
        let markedDates = {}
        let updatedMarkedDates = '';
        markedDates = { ...markedDates, ...{ selected } };
        updatedMarkedDates = { ...this.state._markedDates, ...{ [dateUnmark]: markedDates } }
        this.setState({
            isLoading: false,
            _markedDates: updatedMarkedDates,
            // pName: _pdate,
        });
    }
    onDaySelect = (day) => {
        this.RBSheet.open();
        // const _selectedDay = datess;

        const _selectedDay = moment(day.dateString).format(_format);


        // let selected = false;
        // let markedDates = {}

        // if (this.state._markedDates[_selectedDay]) {

        // Already in marked dates, so reverse current marked state
        // markedDates = !this.state._markedDates[_selectedDay].selected;
        // markedDates = this.state._markedDates[_selectedDay];

        // markedDates = { ...markedDates, ...{ selected }, selectedColor: "red" };
        // updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // }

        // markedDates = { ...markedDates, ...{ marked } };

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        //const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // Triggers component to render again, picking up the new state
        this.setState({
            // _markedDates: updatedMarkedDates,
            pName: _selectedDay
        });

    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        } else {

            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={[styles.scrollView, { marginBottom: -200 }]}>

                        <CustomHeader bgcolor='#fbb146'  title="" gradient1="#4E3CCE"gradient2="#9A81FD" titleColor="white"  bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
                        <View style={styles.brestposition5}></View>
                        <View style={styles.brestposition6}></View>


                        <LinearGradient   start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']}style={{  height: 140, zIndex: -1, }} >
                        {/* <View style={{ backgroundColor: '#fbb146', height: 140, zIndex: -1, }}> */}

                            <Text style={{ fontSize: 20, marginTop: 0, marginLeft: 15, fontWeight: 'bold', color: 'white' }}>{i18n.t('period_calan.title')}</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 0,marginLeft: 15, }}>{i18n.t('period_calan.subheading')}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodHistory')} style={[styles.buttonh, { backgroundColor: '#ED1B26', width: 130, }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='suitcase'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'gray' }}
                                        />
                                    </View>
                                    <Text style={{ color: 'white', padding: 7 }}>{i18n.t('period_calan.history')}</Text>
                                </View>
                            </TouchableOpacity>
                        {/* </View> */}
                        </LinearGradient>
                        <View style={styles.brestposition3}></View>
                        <View style={styles.brestposition4}></View>
                        <View style={{ flex: 1, padding: 15, bottom: 40 }}>

                            <Card>
                                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
                                <Card.Content>
                                    {/* <Paragraph>Card content</Paragraph> */}
                                    <Calendar
                                        theme={{
                                            'stylesheet.day.period': {
                                                base: {
                                                    overflow: 'hidden',
                                                    height: 34,
                                                    alignItems: 'center',
                                                    width: 38,
                                                }
                                            }
                                        }}

                                        // we use moment.js to give the minimum and maximum dates.
                                        // minDate={_today}
                                        // maxDate={_maxDate}
                                        // hideArrows={true}
                                        // onDayPress={this.onDaySelect}
                                        // onPress={() => this.RBSheet.open()}
                                        onDayPress={this.onDaySelect}

                                        // onDaySelect={()=>this.RBSheet.open()}
                                        // markedDates={{
                                        //     '2020-09-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
                                        //     '2020-09-26': {dots: [massage], disabled: true}
                                        //   }}
                                        //   markingType={'multi-dot'}
                                        // markedDates={{
                                        //     '2020-09-25': { marked: true},
                                        //     '2020-09-25': { marked: true },
                                        //     // '2020-09-26': { selected: true, selectedColor: 'red' }
                                        // }}
                                        // markedDates={{
                                        //     '2020-09-20': { textColor: 'green' },
                                        //     '2020-09-22': { startingDay: true, color: 'green' },
                                        //     '2020-09-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
                                        //     '2020-09-04': { disabled: true, startingDay: true, color: 'green', endingDay: true }
                                        // }}
                                        // markedDates={{
                                        //     '2020-10-25': {dots: [], selected: true, selectedColor: 'red'},
                                        //     '2020-10-26': {dots:[massage, workout]}
                                        //   }}
                                        //   markingType={'multi-dot'}
                                        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                                        markingType={'period'}
                                        // markedDates={{
                                        //     '2020-10-22': {  color: '#50cebb', textColor: 'white' },
                                        //     '2020-10-23': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-24': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-25': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-26': { color: '#70d7c7', textColor: 'white' },
                                        //     '2020-10-27': {  color: '#50cebb', textColor: 'white' },
                                        // }}
                                        // markingType={'period'}
                                        markedDates={this.state._markedDates}
                                    // markingType={'period'}
                                    // markingType={'multi-dot'}
                                    />
                                </Card.Content>

                            </Card>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: 'red'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>{i18n.t('period_calan.period')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#50cebb'

                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>{i18n.t('period_calan.ovulation')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                                    <View style={[styles.squrecolor, {
                                        backgroundColor: '#f06292'
                                    }]} />
                                    <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>{i18n.t('period_calan.nextp')}</Text>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, height: 350 }}>

                                {/* <Text style={{ color: 'grey' }}>Period</Text> */}
                                {/* {
                                    this.state.reacl_next_p_date ?
                                        <Text style={{ fontSize: 40, }}>{this.state.reacl_next_p_date} Days left</Text>
                                        :
                                        <Text ></Text>
                                }
                                {
                                    this.state.reacl_next_ov_date ?
                                        <Text style={{ color: 'grey', marginBottom: 10 }}> Ovulation {this.state.reacl_next_ov_date} days left</Text>
                                        :
                                        <Text style={{ marginBottom: 10 }}></Text>
                                }

                                {
                                    this.state.reacl_next_ov_date ?
                                        <View>
                                            <AnimatedCircularProgress
                                                size={200}
                                                rotation={0}
                                                width={8}
                                                // friction={1} 
                                                // linecap='round' 
                                                circleRadian={200}
                                                fill={(this.state._day / this.state._days_count) * 100}
                                                tintColor="#00e0ff"
                                                // lineCap="round"
                                                style={
                                                    { zIndex: -5, }
                                                }

                                                backgroundColor="#3d5875"

                                            >
                                                {
                                                    (fill) => (
                                                        <AnimatedCircularProgress
                                                            size={200}
                                                            rotation={(this.state._day_of_month / this.state._days_count) * 360}
                                                            width={15}
                                                            fill={(1 / this.state._days_count) * 100}
                                                            style={
                                                                { zIndex: 1 }
                                                            }
                                                            // arcSweepAngle={100}
                                                            tintColor="red"

                                                        >
                                                            {
                                                                (fill) => (
                                                                    <Text>
                                                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: 20, marginBottom: -20 }}>{this.state._month_name}</Text>
                                                                            <Text style={{ fontSize: 70, }}>{this.state._day}</Text>
                                                                        </View>
                                                                    </Text>
                                                                )}
                                                        </AnimatedCircularProgress>
                                                    )
                                                }
                                            </AnimatedCircularProgress>
                                            <AnimatedCircularProgress
                                                size={195}
                                                rotation={(this.state.ovulation_date / this.state._days_count) * 360}
                                                width={18}
                                                fill={(5 / this.state._days_count) * 100}
                                                tintColor="#50cebb"
                                                // lineCap="round"

                                                style={
                                                    { zIndex: -5, top: -200 }
                                                }
                                                backgroundColor="transparent"
                                            >
                                            </AnimatedCircularProgress>
                                        </View> : <Text></Text>
                                } */}

                                {

                                    this.state._reacl_next_p_date != 0 ?
                                        <View style={styles.containerD}>

                                            <Card style={[styles.periodcard]}>

                                                <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5, paddingRight: 0 }}>


                                                    <View >
                                                        <View style={{ marginLeft: 8, marginRight: 10, flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View style={{ marginTop: 0, marginBottom: -10 }}>
                                                                    <Text style={{ color: '#9e9e9e', fontSize: 12 }}>{i18n.t('period_calan.lastp')}</Text>
                                                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>

                                                                        <Icon
                                                                            name='calendar'
                                                                            type='font-awesome'

                                                                            iconStyle={{ fontSize: 17, paddingRight: 0, paddingLeft: 0, marginTop: 5, color: 'green' }}
                                                                        />

                                                                        <Text style={{ color: 'green', paddingTop: 0, paddingLeft: 8, fontSize: 20, fontWeight: 'bold' }}>{this.state.pName}
                                                                        </Text>
                                                                    </View>
                                                                    {/* <Text style={{ fontSize: 12, fontSize: 12, fontWeight: 'bold' }}>{this.state.pName}</Text> */}
                                                                </View>


                                                            </View>
                                                            {
                                                                // console.log(">>>>>>>>>>>>>>>>>>**************************** : "+parseInt(this.state._monthlyPeriod)/parseInt(this.state._reacl_next_p_date))
                                                            }
                                                            <Progress.Bar style={{ marginTop: 25, backgroundColor: '#e0e0e0', borderColor: 'white', }} color='#f78a2c' progress={this.state._monthlyPeriod / this.state._reacl_next_p_date} height={5} borderRadius={5} width={250} />
                                                            <View style={{ marginTop: 5 }}>
                                                                {/* ((this.state._compltedWeeks / 277) * 1).toFixed(2) */}
                                                                <Text style={{ color: 'black', fontSize: 13, marginLeft: 0, marginTop: 4 }}>{i18n.t('period_calan.nextpunder')} : <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'red' }}>
                                                                    {this.state._nextPeriodDate}
                                                                </Text></Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'column', }}>
                                                        <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0, marginTop: 0 }}>{i18n.t('period_calan.nextperiodp')}</Text>
                                                        <Text style={{ fontSize: 70, marginBottom: -10, marginTop: -18, color: '#424242' }}>
                                                            {this.state._reacl_next_p_date}
                                                        </Text>
                                                        <Text style={{ marginTop: -7, fontSize: 18 }}>{i18n.t('period_calan.daysleft')}</Text>

                                                    </View>

                                                </View>

                                                <View style={styles.greenBar}>
                                                    {/* calendar-alt */}
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View>
                                                            <Text style={{ color: 'white' }}>{i18n.t('period_calan.ovlstrtdate')} <Text style={{ color: 'black', fontWeight: 'bold' }}> {this.state._ovl_date}
                                                            </Text ></Text>
                                                        </View>
                                                        <View>
                                                            <View style={{ backgroundColor: 'white', padding: 4, borderRadius: 4, marginRight: 5 }}>
                                                                <Icon
                                                                    name='calendar'
                                                                    type='font-awesome'
                                                                    color='red'
                                                                    iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: '#90a4ae' }}
                                                                />
                                                            </View>

                                                        </View>
                                                    </View>

                                                </View>


                                            </Card>


                                        </View> :
                                        <View>
                                            <Text></Text>
                                        </View>
                                }



                            </View>


                        </View>

                    </ScrollView>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        closeOnDragDown={true}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20
                            }
                        }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: -13 }}>
                                <Text style={{ color: 'gray', fontSize: 12 }}>{this.state.pName}</Text>
                                <TouchableOpacity onPress={() => this.savePeriod()} style={styles.button}>
                                    <Text style={styles.buttonText}>Period ?</Text>
                                </TouchableOpacity>
                            </View>
                            {/* 
                                    <View style={styles.container}>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => this.savePeriod()}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_PERIOD}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Period</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SpecialNotes', { select_date: this.state.pName }); this.RBSheet.close(); }}>
                                            
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_NOTES}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Notes</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('PeriodAgenda'); this.RBSheet.close(); }}>
                                                <View style={{ alignItems: "center" }} >
                                                    <View style={{ height: 40, padding: 0 }}>

                                                        <Image source={IMAGE.ICON_BET_AGENDA}
                                                            style={{ height: 45, width: 45 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View>
                                                        <Text style={{ marginTop: 5, fontSize: 12 }}> Agenda</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                        <Card style={styles.card} >
                                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('PeriodHistory'); this.RBSheet.close() }}>
                                                <View style={{ alignItems: "center", justifyContent: 'center' }} >
                                                    <View style={{ height: 40, padding: 0 }}>
                                                        <Image source={IMAGE.ICON_BET_HISTORY}
                                                            style={{ height: 35, width: 35 }}
                                                        >
                                                        </Image>
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                                        <Text style={{ marginTop: 3, fontSize: 12, marginLeft: 10 }}>period History</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Card>
                                    </View> */}
                        </View>

                    </RBSheet>
                </SafeAreaView >
            );
        }
    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 330,
        alignItems: 'center',

        marginTop: 20
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, squrecolor: {
        width: 13, height: 13, elevation: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
    }, container: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',

    }, card: {
        height: 85,
        // width: (Dimensions.get("window").width / 2) - 20,
        width: "22%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
        margin: 5
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
        backgroundColor: 'rgba(242, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }, brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -70,
        marginTop: 160,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.8)',
        borderRadius: 130,
        // overflow: 'hidden',
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        // marginRight: 12,
        marginTop: 202,
        marginLeft: -32,
        backgroundColor: 'rgba(243, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }, buttonh: {
        backgroundColor: "#AF1E8F",
        padding: 5,
        borderRadius: 25,
        marginTop: 10,
        width: 120,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 14,


    }, periodcard: {
        height: 145,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        elevation: 3,

        // shadowColor: 'gray',
        shadowOffset: { width: 3, height: 5 },
        // shadowOpacity: 0.2,
        shadowRadius: 8,
        // alignItems: 'center',
        // margin: 5,
        // padding: 15

    }, containerD: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center', alignItems: 'center'
    }, greenBar: {
        backgroundColor: '#50cebb',
        height: 45,
        width: (Dimensions.get("window").width) - 30,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        top: 5,
        padding: 10
        // width: "90%",
    }
});