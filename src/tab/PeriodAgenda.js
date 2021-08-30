import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Database from '../Database';
import { CustomHeader } from '../index';
import moment from 'moment' // 2.20.1
import FlashMessage, { showMessage } from "react-native-flash-message";
import CustomPushNotification from './CustomPushNotification';
// import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
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
import PushNotification from 'react-native-push-notification';
const db = new Database();
const testIDs = require('../testIDs');
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

const cn = new CustomPushNotification();

export class PeriodAgenda extends Component {
    initialState = {
        [_today]: { disabled: false }
    }
    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,
            items: {},
            tmpArray: [
            ],
            dbs: '',
            _babybDate: '',
            isLoading: true,
            lan: '',
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
        this.loadData();
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });
        this.createChannel();

    }
    createChannel(){
        PushNotification.createChannel(
            {
                channelId:"test-channel",
                channelName:"Test Channel",
                playSound: true, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            
                vibrate: true,
            }
        );
    }
    loadData() {
        db.listBabyDetails(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
            } else {
                let { babybDate } = this.props
                for (var i = 0; i < result.length; i++) {
                    babybDate = result[i].bbDate;
                }
                this.setState({
                    isLoading: false,
                    _babybDate: babybDate,
                });

            }
        }).catch((err) => {
            console.log(err);
        })

        let selected = true;
        let selected1 = false;
        let markedDates = {}
        let updatedMarkedDates = '';
        let products = [];
        let _pdate,_pcatId,_pDescription,_pTime = '';
        let marked = true;
        let deletedMarkeDates = 0;
        db.listProduct(this.state.dbs).then((data) => {
            products = data;

            for (var i = 0; i < products.length; i++) {
                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription
                _pTime = products[i].pTime

                if (_pcatId == 1) {


                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "red", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                        pName: _pdate,
                    });
                    this.state.items[_pdate] = [];
                    this.setState(prevState => ({
                        isLoading: false,
                        tmpArray: [...prevState.tmpArray, { date: _pdate, time: _pTime, discription: _pDescription, category: _pcatId }]
                    }))


                } if (_pcatId == 4) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    // if (_today == nestPeriod) {
                    //     cn.testPush(data);
                    // }
                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "#50cebb", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    this.state.items[_pdate] = [];
                    this.setState(prevState => ({
                        isLoading: false,
                        tmpArray: [...prevState.tmpArray, { date: _pdate, time: _pTime, discription: _pDescription, category: _pcatId }]
                    }))

                } if (_pcatId == 5) {
                    let data = {
                        _title: " " + _pDescription + "" + _pdate,
                        _bigText: "this is subtitle",
                    }
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    // if (_today == nestPeriod) {
                    //     cn.testPush(data);
                    // }

                    markedDates = { ...markedDates, ...{ selected }, selectedColor: "pink", marked: false };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    this.state.items[_pdate] = [];
                    this.setState(prevState => ({
                        isLoading: false,
                        tmpArray: [...prevState.tmpArray, { date: _pdate, time: _pTime, discription: _pDescription, category: _pcatId }]
                    }))


                } if (_pcatId == 6) {

                   
                   
                    let nestPeriod = moment(_pdate).subtract(2, 'day').format('YYYY-MM-DD');
                    let data = {
                        _title: "Reminder "+ _pdate,
                        _bigText: ""+_pDescription,
                        date:nestPeriod
                    }
                  
                
                    //  cn.testPush(data);
                    
                    if (_today == nestPeriod) {
                        // cn.testPush(data);
                    }

                    markedDates = { marked: true, dotColor: '#6a1b9a', };
                    updatedMarkedDates = { ...this.state._markedDates, ...{ [_pdate]: markedDates } }
                    this.setState({
                        isLoading: false,
                        _markedDates: updatedMarkedDates,
                    });
                    // state.vaccine.push()
                    this.state.items[_pdate] = [];
                    this.setState(prevState => ({
                        isLoading: false,
                        tmpArray: [...prevState.tmpArray, { date: _pdate, time: _pTime, discription: _pDescription, category: _pcatId }]
                    }))

                }
                if (_pcatId == 3) {
                    var babayBirgDay = this.state._babybDate;
                    if (babayBirgDay != "") {
                        let nextVaaccination = moment(babayBirgDay).add(_pdate, 'day').format('YYYY-MM-DD');

                        let data = {
                            _title: "Yor " + _pDescription + " vacination date is " + nextVaaccination,
                            _bigText: "2 days more ",
                        }
                        let beforeVaccination = moment(nextVaaccination).subtract(2, 'day').format('YYYY-MM-DD');

                        // if (_today == beforeVaccination) {

                        //     cn.testPush(data);
                        // }
                        markedDates = { ...markedDates, ...{ selected }, selectedColor: "#ffc107", };
                        updatedMarkedDates = { ...this.state._markedDates, ...{ [nextVaaccination]: markedDates } }

                        this.setState({
                            isLoading: false,
                            _markedDates: updatedMarkedDates,
                            pName: nextVaaccination,

                        });
                        this.state.items[nextVaaccination] = [];
                        this.setState(prevState => ({
                            isLoading: false,
                            tmpArray: [...prevState.tmpArray, { date: nextVaaccination, time: '', discription: _pDescription, category: _pcatId }]
                        }))

                        // this.state.items[nextVaaccination] = [];

                    }
                }

            }

            for (var i = 0; i < this.state.tmpArray.length; i++) {
                if (this.state.tmpArray[i].category == 6) {
                    this.state.items[this.state.tmpArray[i].date].push({
                        name:
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={{ width: 225 }}>
                                    <Text style={{ color: 'gray' }}>{i18n.t('special_notes.time_1')} : {this.state.tmpArray[i].time}</Text>

                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i18n.t('special_notes.subheadding')}</Text>


                                    <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{this.state.tmpArray[i].discription}</Text>
                                </View>
                                <View style={{ width: 55, height: 55, backgroundColor: '#6a1b9a', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white' }}>S</Text>
                                </View>

                            </View>,
                    })
                } if (this.state.tmpArray[i].category == 3) {
                    this.state.items[this.state.tmpArray[i].date].push({

                        name:
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 225 }}>
                                    {/* <Text style={{ color: 'gray' }}>Time : {_pTime}</Text> */}
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 0, height: 2 }}></Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i18n.t('period_calan.vaccine')}</Text>
                                    <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{this.state.tmpArray[i].discription}</Text>
                                </View>
                                <View style={{ width: 55, height: 55, backgroundColor: '#ffc107', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 30, color: 'white' }}>V</Text>
                                </View>


                            </View>,

                    });
                } if (this.state.tmpArray[i].category == 5) {
                    this.state.items[this.state.tmpArray[i].date].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 0, height: 1 }}></Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i18n.t('period_calan.period')}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 14 }}>{this.state.tmpArray[i].date}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{i18n.t('period_calan.nextpunder')}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: 'pink', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>N</Text>
                            </View>
                        </View>,
                    });
                } if (this.state.tmpArray[i].category == 4) {
                    this.state.items[this.state.tmpArray[i].date].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 0, height: 1 }}></Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i18n.t('period_calan.ovulation')}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 14 }}>{this.state.tmpArray[i].date}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{i18n.t('period_calan.ovulation_date')}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: '#50cebb', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>O</Text>
                            </View>
                        </View>,
                    });
                } if (this.state.tmpArray[i].category == 1) {

                    this.state.items[this.state.tmpArray[i].date].push({
                        name: <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 225 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 0, height: 1 }}></Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i18n.t('period_calan.period')}</Text>
                                <Text style={{ fontWeight: 'normal', fontSize: 13, marginTop: 3 }}>{i18n.t('period_calan.periodstdate')}</Text>
                            </View>
                            <View style={{ width: 55, height: 55, backgroundColor: 'red', borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: 'white' }}>P</Text>
                            </View>


                        </View>,

                    });
                }
            }


        }).catch((err) => {
            console.log(err);

        })

    }
    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#4E3CCE' />
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fce4ec' }}>
                    <CustomHeader bgcolor='#fbb146'   gradient1="#4E3CCE"gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' title={i18n.t('special_notes.subheadding')} navigation={this.props.navigation} bdcolor='#fbb146' />
                    <Agenda
                        testID={testIDs.agenda.CONTAINER}
                        items={this.state.items}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        // selected={'2020-09-16'}
                        renderItem={this.renderItem.bind(this)}
                        initialNumToRender={7}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        // rowHasChanged={this.rowHasChanged.bind(this)}
                        // markingType={'period'}
                        markedDates={this.state._markedDates}
                        pastScrollRange={20}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={120}
                        // Specify how each item should be rendered in agenda
                        refreshControl={null}
                        refreshing={false}

                        hideKnob={false}


                        onRefresh={() => console.log('refreshing...')}

                    />
                    <FlashMessage duration={1000} />
                </SafeAreaView>
            );
        }
    }

    loadItems(day) {


    }

    renderItem(item) {
        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item]}

            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});