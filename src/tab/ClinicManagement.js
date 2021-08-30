import React, { Component } from 'react';
import { TextInput, Text, View, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import FlashMessage, { showMessage } from "react-native-flash-message";
import i18n from 'i18n-js';
import CustomPushNotification from './CustomPushNotification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
const db = new Database();
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _formatTime = 'HH:mm:ss';
const _timenow = moment().format(_formatTime)
const cn = new CustomPushNotification();
export class ClinicManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DateText: _today,
            TextInputNoteValue: '',
            DateHolder: null,
            TextInpuPbValue: '',
            isLoading: true,
            date: new Date(),
            dbs: '',
            userName: '',
            timeb: '',
            lan: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);


    }
    state = {
        isDateTimePickerVisible: false,
    };
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (timeb) => {
        var date = new Date(timeb);
        this.setState({
            dobDate: date,
            timeb: moment(timeb).format('HH:mm:ss'),
        });
        this._hideDateTimePicker();
    };


    state = {
        isDatePickerVisible: false,
    };
    _showDatePicker = () => this.setState({ isDatePickerVisible: true });

    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _handleDatePicked2 = (date) => {

        this.setState({
            // dobDate: date,
            DateText: moment(date).format('YYYY-MM-DD'),
        });
        this._hideDatePicker();
    };

    DatePickerMainFunctionCall = () => {

        let DateHolder = this.state.DateHolder;

        if (!DateHolder || DateHolder == null) {

            DateHolder = new Date();
            this.setState({
                DateHolder: DateHolder
            });
        }

        //To open the dialog
        this.refs.DatePickerDialog.open({

            date: DateHolder,

        });

    }

    /**
     * Call back for dob date picked event
     *
     */
    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            DateText: moment(date).format('YYYY-MM-DD')
        });
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        // this.getData();
        // this.viewListData();
    }
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('memberNames');
        this.setState({
            userName: myArray,
            lan: await AsyncStorage.getItem('lang'),
        });

    }
    saveData() {
        const { TextInputNoteValue } = this.state;

        var dates = this.state.DateText;
        var formattedDate = moment(dates).format("YYYY-MM-DD")

        var time = this.state.timeb;

        let nestPeriod = moment(formattedDate).subtract(1, 'day').format('YYYY-MM-DD');

        let datanotf = {
            _title: " " + TextInputNoteValue + " " + formattedDate,
            _bigText: "One day more..",
            date: nestPeriod
        }
        cn.testPush(datanotf);

        let data = {
            _note: this.state.TextInputNoteValue,
            _date: dates,
            pTime: time,
        }

        if (TextInputNoteValue != "" && dates != "" && time != "") {
            db.addNote(this.state.dbs, data).then((result) => {
                this.props.navigation.navigate('PeriodAgenda');

                // this.props.navigation.goBack();
                //  goBack();
            }).catch((err) => {

            })
        } else {
            showMessage({
                message: "Input Fail",
                description: "Fields can not be empty",
                backgroundColor: 'red'
            })
        }
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title="" bcbuttoncolor='white' navigation={this.props.navigation} bdcolor='#9A81FD' />
                <FlashMessage duration={1000} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    {/* <View> */}
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0.9 }}
                        colors={['#4E3CCE', '#9A81FD']} style={[styles.gradient, { height: 135, zIndex: -1 }]}>
                        {/* <View style={{ backgroundColor: '#4E3CCE', height: 135, zIndex: -1, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}> */}
                        <View style={{ marginTop: 0, marginLeft: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('special_notes.hedding')} {this.state.userName}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('special_notes.subheadding')}</Text>
                            {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AgendaHistory')} style={[styles.buttonh, { backgroundColor: '#FF4C58' }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#FF4C58', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='bar-chart'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: '#fff' }}
                                        />
                                    </View>
                                    <Text style={{ color: '#fff', padding: 7 }}>{i18n.t('special_notes.history')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodAgenda')} style={[styles.buttonh, { backgroundColor: '#15D354'}]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: '#15D354', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='calendar'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, color: '#fff' }}
                                        />
                                    </View>
                                    <Text style={{ color: '#fff', padding: 7 }}>{i18n.t('special_notes.calandar')}</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* </View> */}
                    </LinearGradient>

                    <View style={styles.breadthPo1}>
                        <Text style={{ marginVertical: 10 }} >{i18n.t('special_notes.slt_date')}</Text>
                        <TouchableOpacity onPress={this._showDatePicker} >
                            <View style={{ borderColor: 'gray', height: 50, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 15 }}>
                                {
                                    this.state.DateText != '' ?
                                        <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                                        :
                                        <Text style={styles.datePickerText}>{_today}</Text>
                                }
                            </View>
                        </TouchableOpacity>


                        <Text style={{ marginVertical: 10, marginTop: 20 }} >{i18n.t('special_notes.time')}</Text>
                        <TouchableOpacity onPress={this._showDateTimePicker} >
                            <View style={{ borderColor: 'gray', height: 50, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 15 }}>
                                {
                                    this.state.timeb != '' ?
                                        <Text style={styles.datePickerText}>{this.state.timeb}</Text>
                                        :
                                        <Text style={styles.datePickerText} >{_timenow}</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginVertical: 10, marginTop: 20 }}>{i18n.t('special_notes.descrpt')}  </Text>
                        <TextInput multiline={true} autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputNoteValue: TextInputValue })} style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 10 }} placeholder={i18n.t('special_notes.inner_descript')} />
                        <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >
                            <LinearGradient colors={['#4E3CCE', '#9A81FD']}

                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0.9 }}

                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    {i18n.t('special_notes.button')}
                                </Text>
                            </LinearGradient>


                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </ScrollView>


                <DateTimePicker
                    mode="time"
                    locale="en_GB"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />

                <DateTimePicker
                    mode="date"
                    locale="en_GB"
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked2}
                    onCancel={this._hideDatePicker}
                />

            </SafeAreaView>
        );
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
        flex: 6,
        backgroundColor: '#f3f3f3',
        zIndex: -1

    }, header: {
        flex: 2,
        backgroundColor: '#fbb146',
        borderBottomStartRadius: 30,

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
        borderRadius: 55,
        elevation: 5, // Android
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }, breadthPo1: {

        zIndex: 5,
        padding: 18,
        marginTop: 10,

    }, breadthPo2: {

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        // bottom: -190,
        marginBottom: 10,
        // zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,

    }, button1: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 25,
        // marginTop: 5,
        width: 80,
        marginTop: 10,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',



    }, button: {
        backgroundColor: "white",
        padding: 7,
        borderRadius: 25,
        marginTop: 18,
        width: 125,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,

    }, linearGradient: {

        marginTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        padding: 3,
    }, buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }, datePickerBox: {
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center'
    },

    datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',

    }, buttonh: {
        // backgroundColor: "#AF1E8F",
        padding: 2,
        borderRadius: 12,
        marginTop: 18,
        // width: 120,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginLeft: 20,

        paddingHorizontal:5,
        paddingVertical:4


    }
});