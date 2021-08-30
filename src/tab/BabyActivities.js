import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import *as Animatable from 'react-native-animatable';
import i18n from 'i18n-js';
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import ActionButton from 'react-native-action-button';
import { TextInput } from 'react-native-paper';
import { BarIndicator, } from 'react-native-indicators';
import FlashMessage, { showMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';
const db = new Database();
var j = 0;
const _formatTime = 'hh:mm:ss';
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
export class BabyActivities extends Component {
    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        super(props);
        this.state = {
            isLoading: true,
            selectedDate: new Date(),
            TextInputdaValue: '',
            _current_date: date,
            _list_kcData: [],
            _kick_count: 0,
            increment: 0,
            update_date: '',
            _updateRbSheet: 0,
            _updateId: '',
            dbs: '',
            userName:''
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.getaAllClickData();
    }

    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('memberNames');
        this.setState({
            userName: myArray,
         
        });

    }
    saveData() {



        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);

        this.setState({
            isLoading: false,
        });
        let data = {

            baDate: _selectedDay.toString(),
            baTime: moment().format(_formatTime),
            baText: this.state.TextInputdaValue
        }
        db.addBabyActivity(this.state.dbs, data).then((result) => {
            console.log(result);
            this.setState({
                isLoading: false,
                TextInputdaValue: '',

            });
            this.getaAllClickData();

        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        })


    }
    updateListData() {
        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);
        let data = {
            baId: this.state._updateId,
            baDate: _selectedDay.toString(),
            baTime: moment().format(_formatTime),
            baText: this.state.TextInputdaValue

        }
        db.updateBabyActivity(this.state.dbs, data).then((result) => {

            this.getaAllClickData();
            this.setState({
                isLoading: false,
                TextInputdaValue: '',
                _updateRbSheet: 0,
                _updateId: '',
            });

        }).catch((err) => {
            console.log(err);

        });
    }
    getaAllClickData() {

        db.listAllBabyActivity(this.state.dbs).then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_kcData: results,
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteData(id) {
        this.setState({
            // isLoading: true
        });
        db.deleteBabyAc(this.state.dbs, id).then((result) => {

            this.getaAllClickData();
            // this.getaAllClickData();
        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    emptyComponent = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'center', alignItems: 'center' }}>
                <Text >{i18n.t('babyactivity.oops')}</Text>
            </View>);
    }

    renderItem = ({ item }) => {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direaction) => {

            }, onOpen: (secId, rowId, direaction) => {

            },
            left: [
                {
                    onPress: () => {
                        showMessage({
                            message: "Hello there",
                            description: "successfuly deleted ",
                            type: "success",
                            hideOnPress: false,
                        })
                        this.deleteData(item.baId)
                        // Alert.alert("sfssadadad");


                    },
                    text: 'Delete', type: 'delete',
                }
                ,
                {
                    onPress: () => {
                        this.updateData(item.baId, item.baDate, item.baText);
                    },
                    text: 'update', type: 'update', backgroundColor: 'orange'
                }
            ],
            // rowId?
            sectionId: 1

        };
        return (
            <Swipeout {...swipeSettings} style={{ backgroundColor: 'white' }}>
                <ListItem
                    style={{
                        paddingTop: 5,

                    }}
                >
                    <Left>
                        <View style={styles.iconMore}>

                            <Icon
                                name='calendar'
                                type='font-awesome'
                                color='#009688'
                                iconStyle={{ fontSize: 20, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e0f2f1', borderRadius: 8, }}
                                onPress={() => console.log('hello')} />
                        </View>
                    </Left>
                    <Body style={{ marginLeft: -160 }}>
                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.baDate}</Text>
                        <Text style={styles.dateText}>{item.baText} </Text>
                        <Text style={{ color: 'gray', fontSize: 12 }}>Time : {item.baTime}</Text>
                    </Body>
                    <Right>
                        <View style={styles.iconMore}>
                            <Icon
                                type='font-awesome'
                                color='gray'
                                iconStyle={{ fontSize: 22 }}
                                name="angle-double-right" color="gray"
                                onPress={() => {

                                }}
                            />
                        </View>
                    </Right>
                </ListItem>
            </Swipeout>
        );

    };

    deleteData = (id) => {
        this.setState({
            // isLoading: true
        });
        db.deleteBabyAc(this.state.dbs, id).then((result) => {
            this.getaAllClickData();
        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    updateData(id, date, text) {
        this.setState({
            isLoading: false,
            _updateRbSheet: 1,
            TextInputdaValue: text,
            _updateId: id,
            update_date: moment(date, 'YYYY-MM-DD'),
        });
        this.RBSheet.open();
    }
    keyExtractor = (item, index) => index.toString()
    render() {

        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#4E3CCE' />
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <FlashMessage duration={1000} />
                    <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('babyactivity.heading')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0.9 }}
                        colors={['#4E3CCE', '#9A81FD']} style={[styles.gradient, { height: 40, zIndex: -1 }]}>
                        <View style={{ marginTop: 5, marginLeft: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('special_notes.hedding')} {this.state.userName}</Text>
                         
                            {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
                        </View>
                    </LinearGradient>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>

                        <View>

                            <View style={styles.container2}>
                                <Card style={[styles.card2,]}>

                                    <TouchableOpacity

                                        style={styles.touchableopacity}
                                        onPress={() => {
                                            
                                            this.props.navigation.navigate('FeedingTimeChart', {
                                                data: '',
                                            })
                                        }
                                        }>
                                        <View style={{ alignItems: 'center' }}>

                                            <Image
                                                source={IMAGE.ICON_FEEDING}
                                                style={styles.iconImage}></Image>

                                            <Text
                                                style={styles.iconText}>
                                                {' '}
                                                {i18n.t('babyactivity.feeding')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>

                                <Card style={[styles.card2]}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.navigate('UrinationTime')
                                        }>

                                        <View
                                            style={[
                                                { alignItems: 'center' },
                                                styles.touchableopacity,
                                            ]}>

                                            <Image
                                                source={IMAGE.ICON_URINATION}
                                                style={styles.iconImage}></Image>

                                            <Text
                                                style={styles.iconText}>
                                                {i18n.t('babyactivity.urine')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>


                            </View>

                            <View style={styles.container2}>
                                <Card style={styles.card2}>

                                    <TouchableOpacity
                                        style={styles.touchableopacity}
                                        onPress={() =>
                                            this.props.navigation.navigate('EliminationChart', {
                                                data: '',
                                            })
                                        }>
                                        <View style={{ alignItems: 'center' }}>

                                            <Image
                                                source={IMAGE.ICON_ELIMINATION}
                                                style={styles.iconImage}></Image>

                                            <Text
                                                style={styles.iconText}>
                                                {' '}
                                                {i18n.t('babyactivity.elimi')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>

                                <Card style={[styles.card2]}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.navigate('BathTracking')
                                        }>

                                        <View
                                            style={[
                                                { alignItems: 'center' },
                                                styles.touchableopacity,
                                            ]}>

                                            <Image
                                                source={IMAGE.ICON_BATHTIME}
                                                style={styles.iconImage}></Image>

                                            <Text
                                                style={styles.iconText}>
                                                {i18n.t('babyactivity.bath')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>


                            </View>

                            {/* <View style={styles.container}>

                                <Card style={[styles.card, { backgroundColor: '#4633cb' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedingTimeChart', {
                                        data: ''
                                    })}>
                                        <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: 'row' }} >
                                            <View style={{ height: 70, padding: 0, backgroundColor: 'white', width: 70, elevation: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={IMAGE.ICON_FEEDING}
                                                    style={{ height: 50, width: 50 }}
                                                >
                                                </Image>
                                            </View>

                                            <Text style={{ marginLeft: 20, fontSize: 14, color: 'white' }}>{i18n.t('babyactivity.feeding')} </Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>


                                <Card style={[styles.card, { backgroundColor: '#4633cb' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UrinationTime')}>
                                        <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: 'row' }} >
                                            <View style={{ height: 70, padding: 0, backgroundColor: 'white', width: 70, elevation: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={IMAGE.ICON_URINATION}
                                                    style={{ height: 40, width: 40 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginLeft: 20, fontSize: 14, color: 'white' }}>{i18n.t('babyactivity.urine')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card, { backgroundColor: '#4633cb' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EliminationChart')}>
                                        <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: 'row' }} >
                                            <View style={{ height: 70, padding: 0, backgroundColor: 'white', width: 70, elevation: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={IMAGE.ICON_ELIMINATION}
                                                    style={{ height: 40, width: 40 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginLeft: 20, fontSize: 14, color: 'white' }}>{i18n.t('babyactivity.elimi')}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>
                                <Card style={[styles.card, { backgroundColor: '#4633cb' }]} >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BathTracking')}>
                                        <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: 'row' }} >
                                            <View style={{ height: 70, padding: 0, backgroundColor: 'white', width: 70, elevation: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={IMAGE.ICON_BATHTIME}
                                                    style={{ height: 40, width: 40 }}
                                                >
                                                </Image>
                                            </View>
                                            <Text style={{ marginLeft: 20, fontSize: 14, color: 'white' }}>{i18n.t('babyactivity.bath')}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </Card>

                            </View>
                           */}

                            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 0 }}>
                                <Text style={{ paddingBottom: 10, fontSize: 18, fontWeight: 'bold' }}>{i18n.t('babyactivity.historyact')}</Text>
                                <FlatList

                                    style={{
                                        backgroundColor: 'white', marginVertical: 0,
                                        //  borderRadius: 16,
                                        elevation: 2,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.7,
                                        shadowRadius: 8,

                                    }}
                                    ListEmptyComponent={this.emptyComponent}
                                    keyExtractor={this.keyExtractor}
                                    data={this.state._list_kcData}
                                    renderItem={this.renderItem}
                                />
                            </View>

                        </View>
                    </ScrollView>
                    <ActionButton buttonColor="#4E3CCE" onPress={() =>
                        this.RBSheet.open()
                    }
                        style={{ position: 'absolute', zIndex: 999 }}
                    >


                    </ActionButton>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        closeOnDragDown={true}
                        // closeOnPressMask={false}
                        height={300}
                        openDuration={250}
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
                            contentInsetAdjustmentBehavior="automatic"
                            style={styles.scrollView}>
                            {
                                this.state._updateRbSheet == 0 ?
                                    <View style={{ flex: 1 }}>
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



                                        {/* <TextInput /> */}
                                        <TextInput autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputdaValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label={i18n.t('special_notes.enter_comment')} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                                                <Text style={styles.buttonText}>{i18n.t('special_notes.add_activity')}</Text>


                                            </TouchableOpacity>
                                        </View>
                                    </View> :
                                    <View style={{ flex: 1 }}>
                                        <CalendarStrip
                                            selectedDate={this.state.update_date}
                                            onPressDate={(date) => {
                                                this.setState({ selectedDate: date });
                                            }}
                                            onPressGoToday={(today) => {
                                                this.setState({ selectedDate: today });
                                            }}
                                            onSwipeDown={() => {
                                                // alert('onSwipeDown');
                                            }}
                                            markedDate={[]}
                                        />
                                        {/* <TextInput /> */}
                                        <TextInput autoFocus={false} value={this.state.TextInputdaValue} onChangeText={TextInputValue => this.setState({ TextInputdaValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label={i18n.t('special_notes.enter_comment')} />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <TouchableOpacity onPress={() => this.updateListData()} style={styles.buttonUpdate}>
                                                <Text style={styles.buttonText}>{i18n.t('special_notes.update_activity')}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            }
                        </ScrollView>
                    </RBSheet>
                </SafeAreaView>
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
        flex: 6,
        backgroundColor: '#f3f3f3',
        zIndex: -1
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 2,
        backgroundColor: '#fbb146'
        // justifyContent: 'center',
        // alignItems: 'center',
    }, container: {
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        bottom: 70,
        zIndex: 5,
        marginTop: 70
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

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        bottom: 130,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,
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
    }, card: {
        height: 90,
        // width: (Dimensions.get("window").width / 2) - 20,
        // width: "45%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'flex-start',


        margin: 5,
        justifyContent: 'center'
    }, button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 340,
        alignItems: 'center',
        marginTop: 20
    }, buttonText: {
        fontSize: 15,
        color: '#fff',
    }, buttonUpdate: {
        backgroundColor: "orange",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: '95%',
        alignItems: 'center',
        marginTop: 0,
        margin: 20,
    }, container2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    card2: {
        height: 150,
        backgroundColor: 'rgba(255, 255, 255,1)',
        borderRadius: 13,
        // padding: 10,
        elevation: 1,
        shadowColor: '#9A81FD',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
        paddingTop: 13,
        margin: 14,
        borderColor: '#9A81FD',
        borderWidth: 1
        // width: Dimensions.get('window').width /3
    }, touchableopacity: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    }, iconImage: {
        height: 70,
        width: 70,

        resizeMode: 'contain'
    }
});