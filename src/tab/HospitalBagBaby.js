import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, Dimensions, View, SafeAreaView, ImageBackground, ScrollView,StatusBar, FlatList, Switch } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1

import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import { BarIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
const db = new Database();

export class HospitalBagBaby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            _baby_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: '',
            date: '',
            dbs: '',
            lan: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
        this.getData = this.getData.bind(this);
    }
    async loadDbVarable(result) {
        this.setState({
            dbs: result,
            lan: await AsyncStorage.getItem('lang'),
        });
        this.getData();
    }
  
    componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            date:
                year + '-' + month + '-' + date,
        });

    }

    getData = (value, value2) => {

        let data = {
            bStatus: value2,
            bId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let int;
        let result;
        if (value != null) {
            db.updateStatusBaby(this.state.dbs, data,this.state.lan).then((result) => {
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
        db.listBag(this.state.dbs).then((data) => {
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
        })
    }
    viewListData() {
        let baby_bag = [];

        db.listBabyBagItems(this.state.dbs,this.state.lan).then((data) => {


            if (data != null) {
                baby_bag = data;

                this.setState({
                    _baby_bag: baby_bag,
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
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        let value = 0;

        let { isLoading } = this.state

        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {

            return (

                <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                     <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
              
                    <CustomHeader bgcolor='#F2F2F2'gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white"  title={i18n.t('bag.Preparebabybaghead')} bcbuttoncolor='#fff'  navigation={this.props.navigation} bdcolor='#F2F2F2' />
                    {/* <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View> */}
                    {/* <View style={styles.header}> */}
                        {/* <Image style={{ width: 380, height: 290, marginLeft: 0, }}
                            source={IMAGE.ICON_BABYBAG}
                            resizeMode="contain"
                        /> */}
              
                    {/* </View> */}
                    <Animatable.View style={[styles.footer,{marginTop:0}]} animation="fadeInUpBig">
                    <ImageBackground
              source={IMAGE.ICON_BABYBAG2}
              imageStyle={{borderRadius:20,resizeMode:'cover'}}
              style={{ width: windowWidth-60, height: windowWidth-60, alignSelf:'center',justifyContent:'flex-end',borderRadius:20}}>
              <View style={{backgroundColor:'#4633cb',alignItems:'center',padding:7,borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
              <Text style={{color:'#fff'}}>{i18n.t('bag.Preparebabybaghead')}</Text>
              </View>
            </ImageBackground>
                        {/* <View style={styles.brestposition5}></View>
                        <View style={styles.brestposition6}></View> */}

                        <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}>{i18n.t('bag.Preparebabybag')}</Text>
                        <FlatList


                            keyExtractor={this.keyExtractor}
                            data={this.state._baby_bag}
                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{  paddingTop: 10,paddingBottom:10 }}
                                onPress={() => {
                                    this.getData(item.bId, item.bStatus);
  
                                }}
                            >
                                {
                                    item.bStatus == "true" ?
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

                                <Body style={{ marginLeft: -190 }}>

                                    <Text>{item.bName}</Text>
                                    <Text style={styles.dateText}>{
                                        item.bStatus == "true" ?
                                            item.bDate : ''
                                    }</Text>
                                </Body>
                                <Right>

                                    <Switch
                                        disabled={true}
                                        trackColor={{ true: '#4E3CCE', false: 'grey' }}
                                        thumbColor={'white'}
                                        value={item.bStatus == "true" ? true : false}
                                    />

                                </Right>
                            </ListItem>



                            } />


                    </Animatable.View>
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
        // flex: 2,
        backgroundColor: 'white',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,

        paddingVertical: 20,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        marginTop:15
        // justifyContent: 'center',
        // alignItems: 'center',
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
    }
    , brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -70,
        marginTop: 110,
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
        marginTop: 152,
        marginLeft: -32,
        backgroundColor: 'rgba(243, 242,242, 1)',
        borderRadius: 110,
        // overflow: 'hidden',
        zIndex: -1,

        position: 'absolute'
    }
});