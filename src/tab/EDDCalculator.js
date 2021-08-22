import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet,StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import { IMAGE } from '../constants/image';
import * as Progress from 'react-native-progress';
import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment' // 2.20.1
import { extendMoment } from 'moment-range';
const moments = extendMoment(moment);
import RBSheet from "react-native-raw-bottom-sheet";
import Database from '../Database';
import *as Animatable from 'react-native-animatable';
import CalendarStrip from 'react-native-slideable-calendar-strip';
const db = new Database();
import ActionButton from 'react-native-action-button';
import DatePicker from 'react-native-date-picker';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
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
const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const screenWidth = Dimensions.get("window").width;
const labels = ["1st month", , "3rd month ", "5thmonth", "7th month", "9th month"];

const nineMonth = moment(_today).subtract(9, 'month');
const minumumDate = moment(nineMonth).subtract(7, 'day').format('YYYY-MM-DD');

const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: 'gray'
}

export class EDDCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            currentPosition: 0,
            _eddDateCount: '',
            _compltedMonths: '',
            dbs: '',
            TextInpuPbValue: '',
            date: new Date(),
            abd: '../images/baby/1.1.jpg',
            _estimatedDate: '',
            avatar: "",
            _compltedWeeks: 0,
            _lastPeriodDate: '',
            isLoading: true,
            _availabeledd: 0,
            // _minimumDate: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
            // isLoading: false,
        });
        this.getDDDate();
    }
    getDDDate() {
        const start = moment(_today, 'YYYY-MM-DD');
        // db.loadDB();
        let edd = [];
        let plastdate = "";
        let eddDate = "";
        let compltedMonths = "";
        let compltedWeeks = 0;
        let _eddDateCount = "";
        let availabeledd = 0;
        db.getEddDate(this.state.dbs).then((datat) => {

            edd = datat;
            for (var i = 0; i < edd.length; i++) {
                plastdate = edd[i].pName

            }


            // eddDate = moment(plastdate).add(277, 'day').format('YYYY-MM-DD');
            const end = moment(plastdate, 'YYYY-MM-DD');

            const range = moment.range(start, end);
            const range2 = range.snapTo('day');

            compltedMonths = ((277 - range2.diff('days')) / 30).toFixed(0);
            compltedWeeks = ((277 - range2.diff('days')) / 7).toFixed(0);
            this.setState({
                _eddDateCount: parseFloat(range2.diff('days')),
                _compltedMonths: compltedMonths,
                _estimatedDate: plastdate,

                isLoading: false,
            });

            const nineMonth = moment(plastdate).subtract(9, 'month');
            const eddDate = moment(nineMonth).subtract(6, 'day').format('YYYY-MM-DD');


            // let lastPdate = moment(plastdate).subtract(277, 'day').format('YYYY-MM-DD');

            const range3 = moment.range(eddDate, start);
            const range4 = range3.snapTo('day');

            for (var i = 0; i < 41; i++) {
                if (compltedWeeks == i) {

                    availabeledd = 1;
                    this.setState({
                        abd: i,
                        _compltedWeeks: parseFloat(range4.diff('days')),
                        _lastPeriodDate: eddDate,
                        _availabeledd: availabeledd,
                        isLoading: false,

                    });
                }
            }

        });
        availabeledd = 0;

    }
    componentDidMount() {

    }
    onPageChange(position) {
        this.setState({ currentPosition: position });
    }
    addEDD() {
        this.RBSheet.close();
        // this.setState({
        //     isLoading: false,

        // });
        var dates = this.state.date;


        var formattedDate = moment(dates).format("YYYY-MM-DD");


        // const minumumDate = moment(_today).subtract(278, 'day').format('YYYY-MM-DD');

        if (formattedDate > minumumDate) {
            const nineMonth = moment(formattedDate).add(9, 'month');
            const eddDate = moment(nineMonth).add(6, 'day').format('YYYY-MM-DD');
            let data = {
                pName: eddDate,
                pDescription: 'Estimated Delivery Date',
            }
            let result = [];
            let _eddIdId;
            let availabeledd = 0;
            // console.log("edd dATE :::::::::::::::" + eddDate);
            db.getEddDate(this.state.dbs).then((datas) => {
                result = datas;
                for (var i = 0; i < result.length; i++) {
                    _eddIdId = result[i].pId
                    availabeledd = 1;

                }

                if (availabeledd == 1) {



                    let dataup = {
                        pName: eddDate,
                        pDescription: 'Estimated Delivery Date',
                        pId: _eddIdId,
                    }

                    db.updateEDD(this.state.dbs, dataup).then((result) => {

                        this.setState({
                            isLoading: false,
                        });
                        this.getDDDate();
                    }).catch((err) => {
                        console.log(err);
                        this.setState({
                            isLoading: false,
                        });
                    })
                    availabeledd = 0;
                } else {
                    db.addEDD(this.state.dbs, data).then((result) => {
                        this.setState({
                            isLoading: false,
                        });
                        this.getDDDate();
                    }).catch((err) => {
                        console.log(err);
                        this.setState({
                            isLoading: false,
                        });
                    })

                }

                availabeledd = 0;
            })
        } else {
        }



    }


    get avatarImage() {
        switch (this.state.abd) {
            case 0:
                return require('../images/baby/2.jpg');
            case 1:
                return require('../images/baby/2.jpg');
            case 2:
                return require('../images/baby/1.1.jpg');
            case 3:
                return require('../images/baby/3.jpg');
            case 4:
                return require('../images/baby/4.jpg');
            case 5:
                return require('../images/baby/5.jpg');
            case 6:
                return require('../images/baby/6.jpg');
            case 7:
                return require('../images/baby/7.jpg');
            case 8:
                return require('../images/baby/8.jpg');
            case 9:
                return require('../images/baby/9.jpg');
            case 10:
                return require('../images/baby/10.jpg');
            case 11:
                return require('../images/baby/11.jpg');
            case 12:
                return require('../images/baby/12.jpg');
            case 13:
                return require('../images/baby/13.jpg');
            case 14:
                return require('../images/baby/14.jpg');
            case 15:
                return require('../images/baby/15.jpg');
            case 16:
                return require('../images/baby/16.jpg');
            case 17:
                return require('../images/baby/17.jpg');
            case 18:
                return require('../images/baby/18.jpg');
            case 19:
                return require('../images/baby/19.jpg');
            case 20:
                return require('../images/baby/20.jpg');
            case 21:
                return require('../images/baby/21.jpg');
            case 22:
                return require('../images/baby/22.jpg');
            case 23:
                return require('../images/baby/23.jpg');
            case 24:
                return require('../images/baby/24.jpg');
            case 25:
                return require('../images/baby/25.jpg');
            case 26:
                return require('../images/baby/26.jpg');
            case 27:
                return require('../images/baby/27.jpg');
            case 28:
                return require('../images/baby/28.jpg');
            case 29:
                return require('../images/baby/29.jpg');
            case 30:
                return require('../images/baby/30.jpg');
            case 31:
                return require('../images/baby/31.jpg');
            case 32:
                return require('../images/baby/32.jpg');
            case 33:
                return require('../images/baby/33.jpg');
            case 34:
                return require('../images/baby/34.jpg');
            case 35:
                return require('../images/baby/35.jpg');
            case 36:
                return require('../images/baby/36.jpg');
            case 37:
                return require('../images/baby/37.jpg');
            case 38:
                return require('../images/baby/38.jpg');
            case 39:
                return require('../images/baby/39.jpg');
            default:
                return require('../images/baby/babyDelever.jpg');
        }
    }
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
                <LinearGradient start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <CustomHeader bgcolor='transparent' gradient1="transparent" gradient2="transparent" titleColor="white" title={i18n.t('edd.headding')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />

                    <LinearGradient start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0.9 }} colors={['transparent', 'transparent']} style={styles.header} >

                        <View style={{ marginTop: 10, marginLeft: 20, }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{i18n.t('edd.headding')}</Text> */}
                            <Text style={{ color: 'white', marginTop: -3 }}>{i18n.t('edd.subheadding')}</Text>
                        </View>
                        {

                            this.state._estimatedDate == '' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.RBSheet.open()} style={[styles.buttonh, { backgroundColor: 'white', }]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 40 }}>
                                                <Icon
                                                    name='plus'
                                                    type='font-awesome'
                                                    color='red'
                                                    iconStyle={{ fontSize: 10, paddingRight: 2, paddingLeft: 2, color: 'white' }}
                                                />
                                            </View>
                                            <Text style={{ color: '#394694', padding: 5 ,fontSize:14}}>{i18n.t('edd.button')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.RBSheet.open()} style={[styles.buttonh, { backgroundColor: 'white', }]}>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 35 }}>
                                                    <Icon
                                                        name='edit'
                                                        type='font-awesome'
                                                        color='red'
                                                        iconStyle={{ fontSize: 10, paddingRight: 0, paddingLeft: 0, color: 'white' }}
                                                    />
                                                </View>
                                                <Text style={{ color: '#394694', padding: 5 ,fontSize:14}}>{i18n.t('edd.buttonup')}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }

                    </LinearGradient>

                    <View style={styles.footer}>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            <View style={{ justifyContent: 'center', padding: 0, paddingTop: 25, }}>
                                <View style={{ backgroundColor: 'white', borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                                    <CalendarStrip
                                        selectedDate={this.state.selectedDate}
                                        onPressDate={(date) => {
                                            this.setState({ selectedDate: date });
                                        }}
                                        onPressGoToday={(today) => {
                                            this.setState({ selectedDate: today });
                                        }}
                                        onSwipeDown={() => {
                                            // alert('onSwipeDown');
                                        }}
                                        markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                                    />
                                </View>

                                <View style={{ marginTop: 15, marginBottom: -15 }}>
                                    <StepIndicator
                                        calendarHeaderContainerStyle={{ backgroundColor: 'red' }}
                                        customStyles={customStyles}
                                        currentPosition={this.state._compltedMonths}
                                        stepCount={9}
                                        labels={labels}

                                    /></View>
                                <View >
                                    {

                                        this.state._availabeledd == 1 ?
                                            this.state._eddDateCount > 0 ?
                                                <View style={styles.container}>

                                                    <Card style={[styles.periodcard]}>

                                                        <View style={{ flexDirection: 'row', paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>


                                                            <View >
                                                                <View style={{ marginLeft: 8, flexDirection: 'column' }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <View style={{ marginTop: 10, marginBottom: -10 }}>
                                                                            <Text style={{ color: '#9e9e9e', fontSize: 12 }}>{i18n.t('edd.gusturalage')}</Text>
                                                                            <View style={{ flexDirection: 'row' }}>

                                                                                <Icon
                                                                                    name='calendar'
                                                                                    type='font-awesome'

                                                                                    iconStyle={{ fontSize: 17, paddingRight: 0, paddingLeft: 0, marginTop: 5, color: 'green' }}
                                                                                />

                                                                                <Text style={{ color: 'green', paddingTop: 0, paddingLeft: 8, fontSize: 20, fontWeight: 'bold' }}>{
                                                                                    this.state._availabeledd == 1 ?
                                                                                        this.state._compltedWeeks : 0

                                                                                } days</Text>
                                                                            </View>

                                                                        </View>


                                                                    </View>

                                                                    <Progress.Bar style={{ marginTop: 20, backgroundColor: '#e0e0e0', borderColor: 'white', }} color='#f78a2c' progress={(this.state._compltedWeeks / 277)} height={5} borderRadius={5} width={230} />
                                                                    <View>

                                                                        <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0, marginTop: 4 }}>{i18n.t('edd.lastperiod')} : <Text style={{ fontSize: 12, fontSize: 12, fontWeight: 'bold', color: 'black' }}>{
                                                                            this.state._availabeledd == 1 ?
                                                                                this.state._lastPeriodDate : 0
                                                                        }</Text></Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'column' }}>
                                                                <Text style={{ color: '#9e9e9e', fontSize: 12, marginLeft: 0, marginTop: 10 }}>{i18n.t('edd.beforedue')}</Text>
                                                                <Text style={{ fontSize: 50, marginBottom: -10, marginTop: -10, color: '#424242' }}>{
                                                                    this.state._availabeledd == 1 ?
                                                                        this.state._eddDateCount
                                                                        : 0
                                                                }</Text>
                                                                <Text>{i18n.t('edd.daysLeft')}</Text>

                                                            </View>

                                                        </View>

                                                        <View style={styles.greenBar}>

                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View>
                                                                    <Text style={{ color: 'white' }}>{i18n.t('edd.estdlvrdate')} <Text style={{ color: 'black', fontWeight: 'bold' }}> {
                                                                        this.state._availabeledd == 1 ?
                                                                            this.state._estimatedDate
                                                                            : 0
                                                                    }</Text></Text>
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


                                                </View>
                                                :
                                                <View style={styles.container}>
                                                    <View style={{ height: 145, }}>
                                                        <Text style={{ fontWeight: 'normal', fontSize: 40, color: '#fbb146' }}>  Congratulations</Text>
                                                    </View>
                                                </View>
                                            :
                                            <View style={styles.container}>
                                                <View style={{ height: 145 }}>

                                                </View>
                                            </View>
                                    }
                                </View>
                                <View style={{ position: 'absolute', paddingTop: 330, justifyContent: 'center', alignItems: 'center', paddingLeft: 23 }}>
                                    <WaveIndicator color='#fbb146' size={350} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 40 }}>



                                    <TouchableOpacity style={styles.button5}



                                    >
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                            <Image

                                                source={this.avatarImage}
                                                //  source={this.state.abd}
                                                style={{ height: 240, width: 240, borderRadius: 150 }}
                                            >
                                            </Image>

                                        </View>


                                    </TouchableOpacity>

                                </View>






                            </View>
                            <View style={{ margin: 10 }}>
                                <Button
                                    title={i18n.t('edd.moredetailsbtn')}
                                    titleStyle={{ color: 'white' }}
                                    buttonStyle={{ borderRadius: 25, backgroundColor: '#e91e63', borderColor: '#e91e63', color: '#e91e63', padding: 12, borderWidth: 1, marginBottom: 20, marginTop: 15 }}
                                    onPress={() => this.props.navigation.navigate('EddWebView')}
                                />

                            </View>
                        </ScrollView>

                    </View>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        closeOnDragDown={true}
                        // closeOnPressMask={false}
                        height={300}
                        openDuration={400}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20
                            }
                        }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps='handled'
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                {/* <CalendarStrip

                                selectedDate={this.state.selectedDate}
                                onPressDate={(date) => {
                                    this.setState({ selectedDate: date });

                                }}
                                onPressGoToday={(today) => {
                                    this.setState({ selectedDate: today });
                                }}
                                onSwipeDown={() => {
                                    // alert('onSwipeDown');
                                }}
                                markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                            /> */}
                                <DatePicker
                                    mode="date"
                                    enableAutoDarkMode={true}
                                    date={this.state.date}
                                    // minimumDate={_today}

                                    minimumDate={new Date(minumumDate)}
                                    maximumDate={new Date(_today)}
                                    // maxDate={"2020-10-20"}
                                    style={{ marginBottom: 10 }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                                {/* <TextInput value={this.state.selectedDate} autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="BP value" /> */}
                                {/* <Text>{this.state.selectedDate}</Text> */}
                                <TouchableOpacity onPress={() => this.addEDD()} style={styles.button}>
                                    <Text style={styles.buttonText}>{i18n.t('special_notes.add')} </Text>


                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </RBSheet>
                </LinearGradient>
            );
        }
    }
} const styles = StyleSheet.create({

    button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {

        flex: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        // backgroundColor: '#fbb146',
        marginBottom: 40,
        // justifyContent: 'center',
        // alignItems: 'center',
    }, backgroundImage: {
        // height: height,
        position: "absolute",

        resizeMode: 'cover',

        // resizeMode: 'cover', // or 'stretch'
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center', alignItems: 'center',
        width: "100%",
    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 130,
        elevation: 5, // Android
        height: 255,
        width: 255,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // top: -300,

        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }, monthWith: {
        width: (screenWidth) / 5
    }, monthImageSize: {
        width: 50,
        height: 50,
        marginLeft: 0
    }, button: {
        backgroundColor: "#f78a2c",
        padding: 10,
        borderRadius: 25,
        // marginTop: 5,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',

    }, periodcard: {
        height: 145,
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderRadius: 8,
        elevation: 3,
        shadowOffset: { width: 3, height: 5 },
        shadowRadius: 8,
        width: "100%",


    }, greenBar: {
        backgroundColor: '#50cebb',
        height: 45,
        width: (Dimensions.get("window").width) - 30,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        top: 5,
        padding: 10
        // width: "90%",
    }, buttonh: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 15,
        // width: 330,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,


    }
});