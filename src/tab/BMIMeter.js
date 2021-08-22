import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';

import AsyncStorage from '@react-native-community/async-storage';
import RNSpeedometer from 'react-native-speedometer';

import *as Animatable from 'react-native-animatable';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import * as Progress from 'react-native-progress';
// import FusionCharts from "react-native-fusioncharts";
import Speedometer from 'react-native-speedometer-chart';
import { ECharts } from "react-native-echarts-wrapper";
import { color } from 'react-native-reanimated';
import i18n from 'i18n-js';
export class BMIMeter extends Component {
    state = {
        value: 0,
        _bmiVal: 0,
        _height: 0,
        _weight: 0,
        _colorPrograssbar: '',
        lan: '',
    };
    // componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
     componentDidMount = async () => {
        const bmiValue = await AsyncStorage.getItem('bmi_value');
        let colorval;
        if (bmiValue < 18.5) {
            colorval = "#ffab00"
        } else if (18.5 < bmiValue && bmiValue < 25) {
            colorval = "#009624"
        } else if (25 < bmiValue && bmiValue < 30) {
            colorval = "#ff6d00"
        } else if (bmiValue > 30) {
            colorval = "red"
        }
        this.setState({
            value: 20,
            _bmiVal: await AsyncStorage.getItem('bmi_value'),
            _height: await AsyncStorage.getItem('height'),
            _weight: await AsyncStorage.getItem('weight'),
            _colorPrograssbar: colorval,
            lan: await AsyncStorage.getItem('lang'),
        });



    }

    // onChange = (value) => this.setState({ value: 20});
    render() {
        // option = {
        //     tooltip: {
        //         formatter: '{a} <br/>{b} : {c}%'
        //     },
        //     toolbox: {
        //         feature: {
        //             restore: {},
        //             saveAsImage: {}
        //         }
        //     },
        //     series: [
        //         {
        //             name: '业务指标',
        //             type: 'gauge',
        //             detail: { formatter: '{value}%' },
        //             data: [{ value: 50, name: '完成率' }]
        //         }
        //     ]
        // };
        // setInterval(function () {
        //     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        //     // myChart.setOption(option, true);
        // }, 2000);
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader bgcolor='#F2F2F2' gradient1="transparent" gradient2="transparent" bcbuttoncolor='#fff' title={i18n.t('bmi.result')} navigation={this.props.navigation} bdcolor='#F2F2F2' />
                <View style={{ flex: 1 }}>

                    <View style={styles.innerCircle} />
                    <View style={styles.innerCircle2} />
                    <View style={styles.innerCircle3} />

                    <Image style={{ width: 160, height: 380, alignSelf: "center", }}
                        source={IMAGE.ICON_FEMALE}
                        resizeMode="stretch"
                    />

                </View>
                <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}

                    >
                        {/* <View style={{ padding: 30 }}> */}
                        <Card style={styles.card} >
                            <View style={{ alignItems: "center" }} >
                                {/* <View style={{ }}> */}
                                <Text style={{ fontSize: 70, fontWeight: "bold", marginTop: -10, }}>{this.state._bmiVal}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: -10 }}>
                                    <Text style={{ paddingEnd: 20, color: 'grey' }}>  {i18n.t('bmi.height')} : {this.state._height} m</Text>
                                    <Text style={{ color: 'grey' }}> {i18n.t('bmi.weight')} : {this.state._weight} kg</Text>
                                </View>
                                {/* </View> */}
                                {/* <Text>Perfect weigth  </Text> */}
                                <Progress.Bar style={{ marginTop: 15 }} progress={this.state._bmiVal / 40} height={10} color={this.state._colorPrograssbar} borderRadius={0} width={300} />
                                <View style={{ flexDirection: "row", marginBottom: 15 }}>
                                    <View style={styles.innerCircle5} >
                                        <Text style={{ color: '#000', fontSize: 9 }}>0-18.5</Text>
                                    </View>
                                    <View style={styles.innerCircle6} >
                                        <Text style={{ color: '#fff', fontSize: 9 }}>18.5-25</Text>
                                    </View>
                                    <View style={styles.innerCircle7} >
                                        <Text style={{ color: '#fff', fontSize: 9 }}>25-30</Text>
                                    </View>
                                    <View style={styles.innerCircle8} >
                                        <Text style={{ color: '#fff', fontSize: 9 }}> {'>'}30 </Text>
                                    </View>
                                </View>
                            </View>
                        </Card>

                        <View style={{  paddingLeft: 45,paddingRight:45 }}>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:0.2,borderColor:'gray',paddingBottom:13,paddingTop:13 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#ffd600', marginRight: 10 }}></View>
                                    <Text >{i18n.t('bmi.uw')}</Text>
                                </View>
                                <Text>0 - 18.5</Text>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:0.2,borderColor:'gray',paddingBottom:13,paddingTop:13 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#1faa00', marginRight: 10 }}></View>
                                    <Text >{i18n.t('bmi.hw')}</Text>
                                </View>
                                <Text>18.5 - 25</Text>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:0.2,borderColor:'gray',paddingBottom:13,paddingTop:13 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#ff6d00', marginRight: 10 }}></View>
                                    <Text >{i18n.t('bmi.ow')}</Text>
                                </View>
                                <Text>25 - 30</Text>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between',borderBottomWidth:0.2,borderColor:'gray',paddingBottom:13,paddingTop:13 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#d50000', marginRight: 10 }}></View>
                                    <Text >{i18n.t('bmi.ob')}</Text>
                                </View>
                                <Text>{'>'} 30</Text>
                            </View>
                        </View>


                     
                        <View style={{ marginTop: 40, padding: 10 }}>


                        </View>
                        {/* <ECharts
                            option={option} height={300}
                        /> */}
                    </ScrollView>
                </Animatable.View>


            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        height: 25,
        fontSize: 16,
        marginVertical: 50,
        marginHorizontal: 20,
    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    }, header: {
        flex: 1,

    },
    innerCircle: {
        borderRadius: 35,
        width: 60,
        height: 60,
        marginLeft: 215,
        backgroundColor: 'pink',
        position: 'absolute',
    },
    innerCircle2: {
        borderRadius: 35,
        width: 60,
        height: 60,
        marginLeft: 70,
        marginTop: 40,
        backgroundColor: '#bbdefb',
        position: 'absolute',
    },
    innerCircle3: {
        borderRadius: 35,
        width: 50,
        height: 50,
        marginLeft: 105,
        marginTop: 120,
        backgroundColor: '#c8e6c9',
        position: 'absolute',
    }, card: {

        backgroundColor: "white",
        borderRadius: 25,

        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',
        margin: 20
    }, innerCircle5: {
        width: 138.75,
        height: 30,
        backgroundColor: '#ffd600',
        justifyContent: 'center',
        alignItems: 'center'
    }, innerCircle6: {
        width: 48.75,
        height: 30,
        backgroundColor: '#1faa00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle7: {
        width: 37.5,
        height: 30,
        backgroundColor: '#ff6d00',
        justifyContent: 'center',
        alignItems: 'center'
    }, innerCircle8: {
        width: 75,
        height: 30,
        backgroundColor: '#d50000',
        justifyContent: 'center',
        alignItems: 'center'
    },
});