import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch,StatusBar } from 'react-native';

import { CustomHeader } from '../index';

import { List, ListItem, Left, Body, Right } from 'native-base';
import *as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import { BarIndicator } from 'react-native-indicators';
import { ECharts } from "react-native-echarts-wrapper";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import i18n from 'i18n-js';
const db = new Database();

export class KickCounterHister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            lan: '',
            date: '',
            dbs: '',
            _list_kcData: [],
            data: {
                backgroundColor: '#F2F2F2',
                title: {
                    // text: "    "+i18n.t('kick.kickchart')
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                series: [{

                    data: [],
                    // name: 'a',
                    type: 'bar',
                    showBackground: true,

                    backgroundStyle: {
                        color: 'green'
                    }
                }]
                , xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },

            }
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        this.loadDbVarable = this.loadDbVarable.bind(this);
        this.getData = this.getData.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.getData();
    }

    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });
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

            // this.getaAllClickData(status);

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    onRef = ref => {
        if (ref) {
            this.chart = ref;
        }
    };
    getData = () => {
        let temp2 = [];
        const self = this;
        db.listAllKickCount(this.state.dbs).then((results) => {
            result = results;

            var temp3 = [];
            var _monthDate;
            const dataClone = { ...self.state.data }
            for (var i = 0; i < result.length; i++) {
                _monthDate = result[i].kcDate.substring(5, 10);
                temp2.push(parseFloat([result[i].kcCount]));
                temp3.push([_monthDate]);
            }
            dataClone.series[0].data = temp2;
            dataClone.xAxis.data = temp3;
            this.setState({
                isLoading: false,
                _list_kcData: results,
                data: dataClone,
            });

        }).catch((err) => {
            console.log(err);
        });



    }
    deleteData(id) {

        this.setState({
            // isLoading: true
        });
        db.deleteKicks(this.state.dbs, id).then((result) => {

            this.getData();
            // this.getaAllClickData();

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    keyExtractor = (item, index) => index.toString()
    render() {

        let value = 0;

        let { isLoading } = this.state

        if (isLoading) {
            return (
                <BarIndicator color='#4E3CCE' />
            );
        } else {

            return (

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                   <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <FlashMessage duration={1000} />
                    <CustomHeader bgcolor='#F2F2F2' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('kick.kickchart')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#F2F2F2' />
                    {/* <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View> */}
                    {/* <View style={styles.header}>
                        
                    </View> */}

                    
                    <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={styles.header}>

                        <View style={{ marginTop: 0, marginLeft: 20,marginBottom:10 }}>

                            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{i18n.t('kick.kickchart')}</Text> */}
                            
                        </View>
                        <ECharts
                            option={this.state.data} height={300}
                        />
                       
                    </LinearGradient>

                    <Animatable.View style={styles.footer} animation="fadeInUpBig">
                        <View style={styles.brestposition5}></View>
                        <View style={styles.brestposition6}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15 }}>
                            <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold" }}>{i18n.t('blood.buttonhis')}</Text>
                            <Icon
                                name='bar-chart'
                                type='font-awesome'
                                color='gray'
                                iconStyle={{ fontSize: 15, paddingTop: 5 }}
                                onPress={() => console.log('hello')} />
                        </View>

                        <FlatList


                            keyExtractor={this.keyExtractor}
                            data={this.state._list_kcData}
                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{ height: 60, paddingTop: 20 }}
                                onPress={() => {
                                    this.getData(item.bId, item.bStatus);
                                    // this.props.navigation.navigate('ProductDetails', {
                                    //   prodId: `${item.hId}`,
                                    // });
                                }}
                            >

                                <Left >
                                    {/* <Icon
                                        name='line-chart'
                                        type='font-awesome'
                                        color='#009688'
                                        iconStyle={{ fontSize: 17, paddingTop: 13, paddingBottom: 13, paddingLeft: 8, paddingRight: 8, backgroundColor: '#b2dfdb', borderRadius: 8, }}
                                        onPress={() => console.log('hello')} /> */}
                                        <Icon
                                name='bar-chart'
                                type='font-awesome'
                                color='gray'
                                iconStyle={{ fontSize: 15, paddingTop: 5 }}
                                onPress={() => console.log('hello')} />
                                </Left>


                                <Body style={{ marginLeft: -170 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text>{item.kcDate}</Text>
                                            <Text style={styles.dateText}><Text style={{ fontWeight: 'normal', fontSize: 14 }}>{i18n.t('kick.kick')} :</Text> {

                                                item.kcCount
                                            }</Text>
                                        </View>
                                        <View style={{ marginLeft: 15, }}>
                                            <Text style={{ fontSize: 11, color: 'gray', paddingBottom: 5 }}>{i18n.t('kick.first')}</Text>
                                            <Text>{item.kcFirstTime}</Text>
                                        </View>
                                        <View style={{ marginLeft: 15, }}>
                                            <Text style={{ fontSize: 11, color: 'gray', paddingBottom: 5 }}>{i18n.t('kick.last')}</Text>
                                            <Text>{item.kcLastTime}</Text>
                                        </View>
                                    </View>

                                </Body>
                                <Right>

                                    <View >
                                        <Icon
                                            type='font-awesome'
                                            color='gray'
                                            iconStyle={{ fontSize: 18,padding:5 }}
                                            name="trash-o" color="gray"
                                            onPress={() => {
                                                this.deleteData(item.kcId); showMessage({

                                                    message: "Hello there",
                                                    description: "successfuly deleted " + `${item.wgDate}`,
                                                    type: "success",
                                                })
                                            }}
                                        />
                                    </View>
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
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold'
    }, insText: {
        color: "grey",
        fontSize: 12,
        marginLeft: 19,

    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        paddingVertical: 20,
        //  paddingHorizontal: 20
    }, header: {
        flex: 2,
        backgroundColor: '#F2F2F2'
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