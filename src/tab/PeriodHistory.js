import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { List, ListItem, Left, Body, Right } from 'native-base';
import Database from '../Database';
import { Icon } from 'react-native-elements';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
const db = new Database();
import FlashMessage, { showMessage } from "react-native-flash-message";
export class PeriodHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _list_bpphistory: [],
            lan: '',
            dbs: '',
            data: {
                title: {
                    text: 'ECharts demo'
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        this.getData();
        // this.getDataA();
        // this.viewListData();
    }
    // getData() {
    //     const self = this;
    //     db.PeriodHistory(this.state.dbs).then((datas) => {
    //         result = datas;
    //         var pPeriod_Id = null;
    //         var pcat_Id = null;

    //         for (var i = 0; i < result.length; i++) {
    //             availabel = 1,
    //                 pDateandMonth = result[i].pName,
    //                 pcat_Id = result[i].pCatId,
    //                 pPeriod_Id = result[i].pId

    //         }
    //         self.setState({
    //             isLoading: false,

    //             _list_bpphistory: datas,
    //         });

    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    deleteData(id) {

        this.setState({
            // isLoading: true
        });
        db.deletePeriod(this.state.dbs, id).then((result) => {

            this.getData();
            // this.getaAllClickData();

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
            isLoading: false,
        });
        this.getData();

    }
    onRef = ref => {
        if (ref) {
            this.chart = ref;
        }
    };
    getData() {
        const self = this;
        db.PeriodHistory(this.state.dbs).then((datas) => {
            result = datas;
            var pPeriod_Id = null;
            var pcat_Id = null;

            for (var i = 0; i < result.length; i++) {
                availabel = 1,
                    pDateandMonth = result[i].pName,
                    pcat_Id = result[i].pCatId,
                    pPeriod_Id = result[i].pId

            }
            self.setState({
                isLoading: false,

                _list_bpphistory: datas,
            });

        }).catch((err) => {
            console.log(err);
        })

        let temp2 = [];

        db.getPeriodHistory(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
                this.setState({
                    isLoading: false,
                });
            } else {
                var temp3 = [];
                var _monthDate;
                const dataClone = { ...self.state.data }
                const end2 = moment('2020-11-21', 'YYYY-MM-DD');
                const start = moment('2020-10-21', 'YYYY-MM-DD');
                const range3 = moment.range(start, end2);

                var firstOvDate = range3.snapTo('day');
                var datess = firstOvDate.diff('days');

                var temp = 0;
                var phDate = "";
                for (var i = 0; i < result.length; i++) {
                    // _monthDate = result[i].bpDate.substring(5, 10);
                    // temp2.push(parseFloat([result[i].pName]));
                    // temp3.push([_monthDate]);
                    phDate = result[i].pName;
                    temp = phDate;
                }
           
                dataClone.series[0].data = temp2;
                self.setState({
                    isLoading: false,
                    data: dataClone,
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    keyExtractor = (item, index) => index.toString()
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('period_calan.history')}  bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                <FlashMessage duration={1000} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={{marginTop:30}}>

                    <View>

                        {/* <View style={{ backgroundColor: '#fbb146', height: 60, zIndex: -1 }}>

                        <Text style={{ fontSize: 20, marginTop: 0, marginLeft: 15, fontWeight: 'bold', color: 'white' }}>{i18n.t('period_calan.history')}</Text>
                        </View> */}

                        <View style={styles.breadthPo1}>

                            <FlatList

                                style={{ backgroundColor: 'white' }}
                                keyExtractor={this.keyExtractor}
                                ListEmptyComponent={this.emptyComponent}
                                data={this.state._list_bpphistory}
                                // renderItem={this.renderItem}

                                renderItem={({ item }) => <ListItem
                                    style={{ height: 50, paddingTop: 15 }}

                                >
                                    <Left>
                                        <Icon

                                            name='calendar'
                                            type='font-awesome'
                                            color='pink'

                                            onPress={() => console.log('hello')} />
                                    </Left>
                                    <Body style={{ marginLeft: -150 }}>
                                    <Text style={[{ color: 'gray', fontSize: 12 }, styles.dateText]}>{item.bpValue}{i18n.t('period_calan.periodstdate')}</Text>
                                        <Text style={{ fontSize: 15 }}>{item.pName}</Text>

                                    </Body>
                                    <Right>
                                        <View style={styles.iconMore}>

                                        </View>

                                    </Right>
                                </ListItem>
                                }
                            />

                        </View>

                    </View>
                    {/* <View style={{ height: 500 }}>
                        <ECharts
                            option={this.state.data} height={300}
                        />
                    </View> */}
                </ScrollView>



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
        backgroundColor: '#fbb146'
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

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        bottom: 20,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        // padding: 12,
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
    }
});