import React, { Component } from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DateTimePicker from 'react-native-modal-datetime-picker';
import FlashMessage, { showMessage } from "react-native-flash-message";
import i18n from 'i18n-js';
import { StatusBar } from 'react-native';
const db = new Database();

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
export class WeightGainDetailsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DateText: _today,

            DateHolder: null,
            TextInpuPbValue: '',
            isLoading: true,
            date: new Date(),
            dbs: '',
            userName: '',
            lan: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);


    }

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
        });
    }
    saveData() {

        const { TextInpuPbValue } = this.state;

        var dates = this.state.DateText;
        var formattedDate = moment(dates).format("YYYY-MM-DD")

        this.setState({
            // isLoading: false,

        });
        let data = {
            // pId: this.state.pId,
            wgDate: dates,
            wgValue: parseInt(this.state.TextInpuPbValue)
        }
        if (TextInpuPbValue != "" && dates != "") {
            if (dates != '' && this.state.wgValue != '') {
                db.addWGvalue(this.state.dbs, data).then((results) => {
                    //    this.props.navigation.navigate('WightGainBarchart')
                    this.props.navigation.navigate('WightGainBarchart');
                }).catch((err) => {
                    console.log(err);

                })
            } else {
                showMessage({
                    message: "Fields cannot be empty",
                    // description: "Username or password incorrect",
                    backgroundColor: 'red',

                })

            }
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
                <CustomHeader bgcolor='transparent'  gradient1="#4E3CCE"gradient2="#9A81FD" titleColor="white" title={i18n.t('weightGain.mainheading')} bcbuttoncolor='white' navigation={this.props.navigation} bdcolor='#fbb146' />
                <FlashMessage duration={1000} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

            
                    <LinearGradient start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 120, zIndex: -1}}>
                    {/* <View style={{ backgroundColor: 'red', height: 140, zIndex: -1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}> */}
                        <View style={{ marginTop: 0, marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('weightGain.heading2')} {this.state.userName}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('weightGain.subheading')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('WightGainBarchart')} style={styles.button}>
                            <View style={{ flexDirection: 'row',alignItems:'center',paddingLeft:10 }}>
                                {/* <View style={{ backgroundColor: 'gray', padding: 10, borderRadius: 35 }}> */}
                                    {/* <Icon
                                        name='bar-chart'
                                        type='font-awesome'
                                        color='red'
                                        iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'white' }}
                                    /> */}
                                <MaterialCommunityIcons
                                    name="history"
                                    size={20}
                                    color="#4633cb"
                                />
                                {/* </View> */}
                                <Text style={{ color: '#4633cb', padding: 7 }}>{i18n.t('weightGain.mainheading')}</Text>

                            </View>



                        </TouchableOpacity>
                    {/* </View> */}
                    </LinearGradient>

                    <View style={styles.breadthPo1}>

                    {/* <Text style={{ marginVertical: 10 }} >{i18n.t('weightGain.sltdate')}</Text> */}

                        <TouchableOpacity onPress={this._showDatePicker} >
                            <View style={{ borderColor: 'gray', height: 50, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingHorizontal: 15, paddingTop: 15,flexDirection:'row' ,justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Icon
                                            name='calendar'
                                            type='font-awesome'
                                            color='#4633cb'
                                            iconStyle={{ fontSize: 17, color: '#4633cb',paddingRight:10 }}
                                        />
                                        <Text>Date</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                {
                                    this.state.DateText != '' ?
                                        <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                                        :
                                        <Text style={styles.datePickerText}>{_today}</Text>
                                }
                                <Icon
                                            name='chevron-down'
                                            type='feather'
                                            color='#4633cb'
                                            iconStyle={{ fontSize: 20, color: 'gray',paddingLeft:10 }}
                                        />
                                        </View>
                            </View>
                        </TouchableOpacity>

                        {/* <Text style={{ marginVertical: 10 }}>{i18n.t('weightGain.waightval')} </Text> */}
                        <TextInput
                            keyboardType='numeric' style={{ height:45,borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10 , marginTop:10}}
                            autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })}  placeholder={i18n.t('weightGain.waightvalinner')} />
                        <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >
                            {/* <Text style={styles.buttonText}>Save Baby' Data</Text>
                                 */}

                            <LinearGradient colors={['#4E3CCE', '#9A81FD']}

                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0.9 }}

                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                {i18n.t('weightGain.button')}
</Text>
                            </LinearGradient>


                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </ScrollView>

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
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 2,
        backgroundColor: '#fbb146',
        borderBottomStartRadius: 30,
        //    borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
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

        // justifyContent: 'center',
        // alignSelf: 'center',
        // position: 'absolute',
        // backgroundColor: 'white',
        // bottom: 100,
        zIndex: 5,
        // width: '95%',
        // borderRadius: 10,
        // elevation: 2,
        padding: 18,
        // paddingTop: 20,
        marginTop: 10,
        // shadowColor: '#30C1DD',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
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
        // shadowColor: '#30C1DD',
        // shadowOffset: { width: 0, height: 3 },
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
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
        padding: 2,
        borderRadius: 10,
        marginTop: 18,
        width: 130,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,

    }, linearGradient: {

        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        padding: 1,
        alignSelf:'center'
        // marginTop: 40,
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 25,
    }, buttonText: {
        fontSize: 16,
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
        color: 'gray',

    },
});