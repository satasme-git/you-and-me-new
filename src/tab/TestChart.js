import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Button, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import Database from '../Database';
import { ECharts } from "react-native-echarts-wrapper";
import { BarIndicator } from 'react-native-indicators';
const db = new Database();
export class TestChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            data: {
                title: {
                    text: 'ECharts demo'
                },
                tooltip: {},
                legend: {
                    data:['销量']
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
        let temp2 = [];
        const self = this;
        db.listBloodPresure(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {

                this.setState({
                    isLoading: false,

                });

            } else {
               
                var temp3 = [];
                var _monthDate;
                const dataClone = { ...self.state.data }
                for (var i = 0; i < result.length; i++) {
                    _monthDate = result[i].bpDate.substring(5, 10);
                    temp2.push(parseFloat([result[i].bpValue]));
                    temp3.push([_monthDate]);


                }

                console.log("sdasdadasd : "+temp2);
                // dataClone.xAxis.data = temp3;
     
                dataClone.series[0].data = temp2;
                // dataClone.series[0].type = "bar";
                self.setState({
                    isLoading: false,
                    data: dataClone,
                });

            }
        }).catch((err) => {
            console.log(err);
        })
    }



    render() {
        let { isLoading } = this.state
        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        }
        else {
            return (

                <SafeAreaView style={{ flex: 1 }}>
                    <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                    <Button title="Start" onPress={this.initChart} />

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
    }
});