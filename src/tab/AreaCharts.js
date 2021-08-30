import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Button, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList, StatusBar } from 'react-native';
import { CustomHeader } from '../index';
import Database from '../Database';
import { ECharts } from "react-native-echarts-wrapper";
import { BarIndicator } from 'react-native-indicators';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import *as Animatable from 'react-native-animatable';
import i18n from 'i18n-js';
const db = new Database();
var colors = ['#5793f3', '#d14a61', '#675bba'];

export class AreaCharts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            basicOkCancelVisible: false,
            lan: '',
            data: {
                title: {
                    // text: 'වයසට අදාල බර ප්‍රස්ථාරය'
                },
                color: colors,

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: [i18n.t('growthchart.ugradu'), i18n.t('growthchart.mdyastha'), i18n.t('growthchart.aduavadanama'), i18n.t('growthchart.niyamith'), i18n.t('growthchart.adhi'), i18n.t('growthchart.yourbaby')],
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        boundaryGap: true,
                        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: i18n.t('growthchart.ugradu'),
                        type: 'line',

                        xAxisIndex: 0,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'red',
                                opacity: 0.2,
                                lineStyle: {
                                    color: 'red',
                                    opacity: 0.3
                                }
                            }
                        },
                        areaStyle: { color: '#ef9a9a', },
                        data: []
                    },
                    {
                        name: i18n.t('growthchart.mdyastha'),
                        type: 'line',
                        smooth: true,

                        itemStyle: {
                            normal: {
                                color: '#f57c00',
                                opacity: 0.2,
                                color: '#f57c00',
                                lineStyle: {
                                    color: '#f57c00',
                                    opacity: 0.3
                                }
                            }
                        },
                        areaStyle: { color: 'yellow', opacity: 0.2 },

                        data: []
                    },
                    {
                        name: i18n.t('growthchart.aduavadanama'),
                        type: 'line',

                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'green',
                                opacity: 0.2,
                                color: 'green',
                                lineStyle: {
                                    color: 'green',
                                    opacity: 0.3
                                }
                            }
                        },
                        areaStyle: { color: 'white', opacity: 0.2 },
                        data: []
                    },
                    {
                        name:  i18n.t('growthchart.niyamith'),
                        type: 'line',
                        smooth: true,

                        itemStyle: {
                            normal: {
                                color: 'green',
                                opacity: 0.2,
                                color: 'green',
                                lineStyle: {
                                    color: 'green',
                                    opacity: 0.3
                                }
                            }
                        },
                        areaStyle: { color: 'green', opacity: 0.05 },
                        data: []
                    }, {
                        name: i18n.t('growthchart.adhi'),
                        type: 'line',

                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#bdbdbd',
                                opacity: 0.2,
                                color: '#bdbdbd',
                                lineStyle: {
                                    color: '#bdbdbd',
                                    opacity: 0.3
                                }
                            }
                        },

                        label: {
                            normal: {
                                // show: true,
                                position: 'top'
                            }
                        },

                        data: []
                    }, {
                        name: i18n.t('growthchart.yourbaby'),
                        type: 'line',
                        smooth: true,
                        stack: '-10',
                        position: 'absolute',
                        itemStyle: {
                            normal: {
                                color: 'blue',
                                lineStyle: {
                                    color: 'blue',
                                    //opacity: 1
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },

                        data: []
                    }


                ]
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

        db.listBabyDetails(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
                this.setState({
                    isLoading: false,

                });
            } else {
                let { bbGender, } = this.props
                for (var i = 0; i < result.length; i++) {
                    bbGender = result[i].bbGender;

                }
                let temp2 = [];
                const self = this;
                let dbtable;
                // WightvsLength
                if (bbGender == "Girl") {
                    dbtable = 'Wightgirl';
                } else if (bbGender == "Boy") {
                    dbtable = 'WightvsLength';
                }

                db.listWeghtData(this.state.dbs, dbtable).then((data) => {
                    let result = data;
                    if (result == 0) {
                        this.setState({
                            isLoading: false,
                        });
                    } else {
                        var temp2 = [];
                        var temp3 = [];
                        var temp4 = [];
                        var temp5 = [];
                        var temp6 = [];
                        var temp7 = [];
                        var temp8 = [];
                        var _monthDate;
                        const dataClone = { ...self.state.data }
                        for (var i = 0; i < result.length; i++) {
                            temp2.push(parseFloat([result[i].wlSam]));
                            temp4.push(parseFloat([result[i].wlMan]));
                            temp5.push(parseFloat([result[i].wlNw]));
                            temp6.push(parseFloat([result[i].wlOw]));
                            temp7.push(parseFloat([result[i].wlhw]));
                            temp8.push(parseFloat([result[i].wlbaby]));
                        }
                        dataClone.series[0].data = temp2;
                        dataClone.series[1].data = temp4;
                        dataClone.series[2].data = temp5;
                        dataClone.series[3].data = temp6;
                        dataClone.series[4].data = temp7;
                        dataClone.series[5].data = temp8;
                        self.setState({
                            isLoading: false,
                            data: dataClone,
                        });

                    }
                }).catch((err) => {
                    console.log(err);
                })

            }
        }).catch((err) => {
            console.log(err);
        })





    }
    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#4E3CCE' />
            );
        }
        else {
            return (

                <SafeAreaView style={{ flex: 1 }}>
                      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <CustomHeader bgcolor='#F2F2F2'  gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' title={i18n.t('growthchart.heading')} navigation={this.props.navigation} bdcolor='#F2F2F2' />
                    <ECharts
                        option={this.state.data} height={300} 
                    />
                </SafeAreaView>
            );
        }
    }
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }, chartContainer: {
        flex: 1
    }, actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});