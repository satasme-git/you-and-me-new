import React, { Component, useState } from 'react';
import { Modal, StyleSheet, ImageBackground, Text, Image, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';
import { CustomHeader } from '../index';
import { Icon } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';
import Database from '../Database';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import LinearGradient from 'react-native-linear-gradient';
import {
    BarIndicator,
} from 'react-native-indicators';
const db = new Database();

var ddd;
export class HospitalBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            _mother_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: '',
            date: '',
            dbs: '',
            lan: '',
            motherbag_count: 0,
            babybag_count: 0,
            lroombag_count: 0,

        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

        this.loadDbVarable = this.loadDbVarable.bind(this);
        this.getData = this.getData.bind(this);

    }
    abc = (value) => {

    }
    useEffect = (() => {

        this.navigation.addListener('focus', () => alert('Screen was focused'))
    });


    async componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            date:
                year + '-' + month + '-' + date,
            lan: await AsyncStorage.getItem('lang'),
        });

    }
    async loadDbVarable(result) {
        this.setState({
            dbs: result,
            lan: await AsyncStorage.getItem('lang'),
        });
        this.viewListData();


    }

    getData = (value, value2) => {

        let data = {
            hStatus: value2,
            hId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let int;
        let result;
        if (value != null) {
            db.updateStatus(this.state.dbs, data, this.state.lan).then((result) => {
                console.log(result);
                this.setState({
                    isLoading: false,
                });

            }).catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
            })
        }
        db.listBag(this.state.dbs, this.state.lan).then((data) => {

            result = data;
            if (result == 0) {
                db.addItemOfMother_bag(this.state.dbs).then((result) => {
                    console.log(result);

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                this.viewListData();
            }
        }).catch((err) => {
            console.log(err);
        });


    }
    viewListData() {
        let mother_bag = [];
        db.listMotherBagItems(this.state.dbs, this.state.lan).then((data) => {


            if (data != null) {
                mother_bag = data;

                this.setState({
                    _mother_bag: mother_bag,
                    isLoading: false,
                });

            }


        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })


    }
    keyExtractor = (item, index) => index.toString()
    render() {
        let { isLoading } = this.state

        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            let value = 0;


            return (

                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <CustomHeader style={{ zIndex: -5 }} gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bgcolor='#fbb146' bcbuttoncolor='#fff' title="" navigation={this.props.navigation} bdcolor='#fbb146' />
                    {/* <View style={styles.brestposition5}></View>
                    <View style={styles.brestposition6}></View>
                    <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View> */}
                    <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ backgroundColor: '#fbb146', height: 120, zIndex: -1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>

                        <View style={{ marginTop: 0, marginLeft: 20 }}>

                            <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'white', marginTop: -5 }}>{i18n.t('bag.headding2')} {this.state.userName}</Text>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('bag.subhed')}</Text>

                        </View>
                        <View style={{ flexDirection: 'row',  marginTop: 10,marginLeft:10 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('HospitalBagBaby')} style={[styles.buttonh, { backgroundColor: '#fff', width: 110 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='suitcase'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, paddingRight: 0, paddingLeft: 0, color: '#4E3CCE' }}
                                        />
                                    </View>
                                    <Text style={{ color: '#4E3CCE', padding: 7 }}>{i18n.t('bag.babybag')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LabourRoomPacking')} style={[styles.buttonh, { backgroundColor: '#fff', width: 160 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 35 }}>
                                        <Icon
                                            name='shopping-bag'
                                            type='font-awesome'
                                            color='red'
                                            iconStyle={{ fontSize: 13, color: '#4E3CCE' }}
                                        />
                                    </View>
                                    <Text style={{ color: '#4E3CCE', padding: 7 }}>{i18n.t('bag.laborropak')}</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={{backgroundColor:'white'}}>

                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', marginTop: 25, marginLeft: 18 }}>{i18n.t('bag.hbag')}</Text>

                            </View>


                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state._mother_bag}

                                renderItem={({ item }) => <ListItem
                                    style={{ paddingBottom: 10, paddingTop: 10 }}
                                    onPress={() => {
                                        this.getData(item.hId, item.hStatus);

                                    }}
                                >
                                    {
                                        item.hStatus == "true" ?
                                            <Left >
                                                <Icon
                                                    name='check-circle'
                                                    type='font-awesome'
                                                    color='#9A81FD'
                                                    iconStyle={{ fontSize: 25, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, backgroundColor: '#4E3CCE', borderRadius: 8, }}
                                                    onPress={() => console.log('hello')} />
                                            </Left> : <Left>
                                                <Icon
                                                    name='check-circle'
                                                    type='font-awesome'
                                                    color='#fff'
                                                    iconStyle={{ fontSize: 25, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, backgroundColor: '#eceff1', borderRadius: 8, }}
                                                    onPress={() => console.log('hello')} />
                                            </Left>
                                    }

                                    <Body style={{ marginLeft: -180 }}>

                                        <Text>{item.hName}</Text>
                                        <Text style={styles.dateText}>{
                                            item.hStatus == "true" ?
                                                item.hDate : ''
                                        }</Text>
                                    </Body>
                                    <Right>

                                        <Switch
                                            disabled={true}
                                            trackColor={{ true: '#4E3CCE', false: 'grey' }}
                                            thumbColor={'white'}

                                            value={item.hStatus == "true" ? true : false}
                                        />

                                    </Right>
                                </ListItem>



                                } />
                        </View>
                    </ScrollView>


                </SafeAreaView>
            );
        }


    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, dateText: {
        fontSize: 11,
        color: 'grey',
    }, insText: {
        color: "grey",
        fontSize: 12,
        marginLeft: 19,

    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    }, buttonh: {

        padding: 0,
        borderRadius: 10,
        marginTop: 10,
        width: 120,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 10,


    }
    , brestposition5: {
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
    }
    , container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        // bottom: 40,
        // zIndex: 5,
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

    }, card: {

        height: 130,
        // width: (Dimensions.get("window").width / 2) - 20,
        width: "30.5%",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 5,
        alignItems: 'center',


        margin: 5
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
    }
});