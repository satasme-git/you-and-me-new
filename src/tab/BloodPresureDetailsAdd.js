import React, { Component } from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import FlashMessage, { showMessage } from "react-native-flash-message";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'i18n-js';
const db = new Database();
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
export class BloodPresureDetailsAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DateText: '',
            DateHolder: null,
            TextInpuSystolicbValue: '',
            TextInpuDiastolicValue: '',
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
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('memberNames');
        this.setState({
            userName: myArray,
            lan: await AsyncStorage.getItem('lang'),
        });
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });

    }
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
    onDatePickedFunction = (date) => {
        this.setState({
            dobDate: date,
            DateText: moment(date).format('YYYY-MM-DD')
        });
    }
    saveData() {
        var dates = this.state.DateText;
        var formattedDate = moment(dates).format("YYYY-MM-DD")


        let data = {
            // pId: this.state.pId,
            bpDate: formattedDate.toString(),
            bpValue: parseInt(this.state.TextInpuSystolicbValue),
            bpdstValue: parseInt(this.state.TextInpuDiastolicValue)
        }
        if (dates != '' && this.state.bpValue != '' && this.state.bpdstValue != '') {
            db.addPBvalue(this.state.dbs, data).then((result) => {
                this.props.navigation.navigate('BloodPresureBarChart');

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
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' title={i18n.t('blood.chartheadding')} gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                <FlashMessage duration={1000} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View>
                        <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 120, zIndex: -1 }}>
                         
                            <View style={{ marginTop: 0, marginLeft: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('blood.heading2')} {this.state.userName}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('blood.subheading')}</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BloodPresureBarChart')} style={styles.button}>
                                    <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                        <View style={{ backgroundColor: '#FF4C58', padding: 10, borderRadius: 35 }}>
                                            {/* <Icon
                                                name='bar-chart'
                                                type='font-awesome'
                                                color='red'
                                                iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: 'black' }}
                                            /> */}
                                            <MaterialCommunityIcons
                                                name="history"
                                                size={20}
                                                color="#fff"
                                            />
                                        </View>
                                        <Text style={{ color: '#fff', padding: 7 }}>{i18n.t('blood.buttonhis')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                        <View style={styles.breadthPo1}>

                            {/* <Text style={{ marginVertical: 15 }}>{i18n.t('blood.sltdate')}</Text> */}

                            <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
                                {/* <View style={{ borderColor: 'gray', height: 50, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10, paddingTop: 15 }} placeholder="Select Date">
                                    {
                                        this.state.DateText != '' ?
                                            <Text style={styles.datePickerText}>{this.state.DateText}</Text>
                                            :
                                            <Text style={styles.datePickerText}>{_today}</Text>
                                    }

                                </View> */}
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
                            {/* <Text style={{ marginVertical: 15 }}>{i18n.t('blood.sostolic')}  :</Text> */}
                            <TextInput
                                keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10,marginTop:10  }}
                                placeholder="Foobar" onEndEditing={this.clearFocus} autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuSystolicbValue: TextInputValue })} placeholder={i18n.t('blood.sostolinner')}
                            />
                            {/* <Text style={{ marginVertical: 15 }}>{i18n.t('blood.diastolicInner')}  :</Text> */}
                            <TextInput
                                keyboardType='numeric' style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 5, backgroundColor: '#f2f2f2', paddingLeft: 10,marginTop:10 }}
                                onEndEditing={this.clearFocus} autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInpuDiastolicValue: TextInputValue })} placeholder={i18n.t('blood.diastvalinner')}
                            />
                            <TouchableOpacity onPress={() => this.saveData()} activeOpacity={0.5} >

                                <LinearGradient colors={['#4E3CCE', '#9A81FD']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}
                                    style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>
                                        {i18n.t('blood.button')}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
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

    }, breadthPo1: {
        zIndex: 5,
        padding: 18,
        marginTop: 10,
    }, breadthPo2: {

        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
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
        backgroundColor: "#FF4C58",
        padding: 0,
        paddingHorizontal:10,
        borderRadius: 10,
        marginTop: 15,

        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 20,

    }, linearGradient: {

        marginTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        padding: 1,
        alignSelf:'center'
    }, buttonText: {
        fontSize: 16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
});