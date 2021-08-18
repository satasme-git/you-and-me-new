import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, Image, ImageBackground, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import ActionButton from 'react-native-action-button';
import { TextInput } from 'react-native-paper';
import { LineChart, } from "react-native-chart-kit";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Swipeout from 'react-native-swipeout';
import { BarIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import i18n from 'i18n-js';
const db = new Database();
var j = 0;
const _formatTime = 'hh:mm:ss';
const _format = 'YYYY-MM-DD'
const screenWidth = Dimensions.get("window").width;
const _today = moment().format(_format)
export class FeedingTimeChart extends Component {
    constructor(props) {
        var today = new Date(),

            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes();
        super(props);
        this.state = {
            isLoading: true,
            selectedDate: new Date(),
            TextInputdaValue: '',
            _current_time: time,
            _list_feeding_time: [],
            dbs: '',
            _updateRbSheet: 0,
            _updateId: '',
            lan: '',
            data: {
                labels: ["."],

                datasets: [
                    {
                        data: [0],
                        // strokeWidth: 2,
                        color: (opacity = 1) => `rgba(230,230,230,${opacity})`, // optional
                    },

                ]
            }


        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        // this.getData = this.getData.bind(this);
        this.loadDbVarable = this.loadDbVarable.bind(this);

    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });


        this.getaAllFeedingData();
        this.getData();
    }

    getData() {

        const self = this;
        db.listFeedingCountByDate(this.state.dbs).then((data) => {
            let result = data;
            var temp2 = [];
            var temp3 = [];

            var _monthDate;
            const dataClone = { ...self.state.data }
            if (result == 0) {
                dataClone.datasets[0].data = [0];
                dataClone.labels = ["."];
                self.setState({
                    isLoading: false,
                    data: dataClone,

                });
            } else {

                for (var i = 0; i < result.length; i++) {
                    _monthDate = result[i].fdDate.substring(5, 10);

                    temp2.push(parseInt([result[i].countfd]));
                    temp3.push([_monthDate]);


                }
                dataClone.labels = temp3;
                dataClone.datasets[0].data = temp2;


                self.setState({
                    isLoading: false,
                    data: dataClone,

                });

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    saveData() {
        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);

        let data = {
            // pId: this.state.pId,
            fdDate: _selectedDay.toString(),
            fdTime: moment().format(_formatTime),
            fdText: this.state.TextInputdaValue

        }

        db.addFeedingTime(this.state.dbs, data).then((result) => {

            this.getaAllFeedingData();
            this.getData();
            this.setState({
                isLoading: false,
                TextInputdaValue: '',

            });
            //   this.props.navigation.state.params.onNavigateBack;
            //   this.props.navigation.goBack();
        }).catch((err) => {
            console.log(err);

        })


    }

    updateListData() {
        this.RBSheet.close();
        const _format = 'YYYY-MM-DD'
        const _selectedDay = moment(this.state.selectedDate).format(_format);
        let data = {
            fdId: this.state._updateId,
            fdDate: _selectedDay.toString(),
            fdTime: moment().format(_formatTime),
            fdText: this.state.TextInputdaValue

        }
        db.updateFeeding(this.state.dbs, data).then((result) => {
            this.getaAllFeedingData();
            this.getData();
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
    deleteData(id) {

        this.setState({
            // isLoading: true
        });
        db.deleteFeeding(this.state.dbs, id).then((result) => {

            this.getData();
            this.getaAllFeedingData();
            // this.getaAllClickData();

        }).catch((err) => {
            console.log(err);
            this.setState = {
                // isLoading: false
            }
        })
    }
    getaAllFeedingData() {

        db.listAllFeedingTime(this.state.dbs).then((results) => {

            result = results;

            this.setState({
                isLoading: false,
                _list_feeding_time: results,
            });


        }).catch((err) => {
            console.log(err);
        })
    }
    emptyComponent = () => {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text >{i18n.t('special_notes.oops')}</Text>
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
                        this.deleteData(item.fdId)
                        // Alert.alert("sfssadadad");


                    },
                    text: 'Delete', type: 'delete',
                }
                ,
                {
                    onPress: () => {
                        this.updateData(item.fdId, item.fdDate, item.fdText);
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
                        paddingTop: 15,
                    }}
                >
                    <Left>
                        <View style={styles.iconMore}>

                            <Icon
                                name='check-circle'
                                type='font-awesome'
                                color='#009688'
                                iconStyle={{ fontSize: 20, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e0f2f1', borderRadius: 8, }}
                                onPress={() => console.log('hello')} />
                        </View>
                    </Left>
                    <Body style={{ marginLeft: -160 }}>
                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.fdDate}</Text>
                        <Text style={styles.dateText}>{item.fdTime} <Text style={{ color: 'gray' }}>{item.fdText}</Text></Text>
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

        const chartConfig = {
            backgroundGradientFrom: "#ce93d8",
            backgroundGradientFromOpacity: 10,
            backgroundGradientTo: "#4a148c",
            backgroundGradientToOpacity: 0.8,
            color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 3, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
        };

        if (isLoading) {
            return (

                <BarIndicator color='#fbb146' />

            );
        }
        else {
            return (

                <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                    <FlashMessage duration={1000} />
                    <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title="" bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                    <ActionButton buttonColor="#4E3CCE" onPress={() =>
                        this.RBSheet.open()
                    }
                        style={{ position: 'absolute', zIndex: 999 }}
                    >
                    </ActionButton>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 100, zIndex: -1 }}>
                            <View style={{ marginTop: 0, marginLeft: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{i18n.t('babyactivity.feeding')}</Text>
                            </View>
                        </LinearGradient>
                        <View style={styles.container}>

                            <Card style={[styles.card, { backgroundColor: 'white' }]} >

                                <View style={{ alignItems: "center" }} >

                                    <LineChart
                                        data={this.state.data}
                                        width={Dimensions.get("window").width - 20}
                                        // yAxisLabel={"$"}
                                        height={175}
                                        // bezier
                                        verticalLabelRotation={-10}
                                        chartConfig={chartConfig}
                                        fromZero={true}
                                        style={{
                                            marginVertical: 0,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            </Card>

                        </View>

                        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: -50 }}>
                            <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>{i18n.t('kick.buttonhis')}</Text>
                            <SafeAreaView style={{ flex: 1 }}>
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
                                    // scrollEnabled={false}
                                    keyExtractor={this.keyExtractor}
                                    ListEmptyComponent={this.emptyComponent}
                                    data={this.state._list_feeding_time}
                                    renderItem={this.renderItem}

                                />
                            </SafeAreaView>
                        </View>
                    </ScrollView>
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
                            {this.state._updateRbSheet == 0 ?
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
                                            <Text style={styles.buttonText}>{i18n.t('special_notes.add')} </Text>
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
                                        markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
                                    />
                                    {/* <TextInput /> */}
                                    <TextInput autoFocus={false} value={this.state.TextInputdaValue} onChangeText={TextInputValue => this.setState({ TextInputdaValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="Enter comment" />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                        <TouchableOpacity onPress={() => this.updateListData()} style={styles.buttonUpdate}>
                                            <Text style={styles.buttonText}>{i18n.t('special_notes.update')} </Text>
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

    }, header: {
        flex: 2,
        backgroundColor: '#fbb146'

    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        bottom: 70,
        zIndex: 5,
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
        backgroundColor: 'white',
        marginBottom: 10,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,

    }, card: {
        height: 175,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',

        margin: 5
    }, button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 340,
        alignItems: 'center',
        marginTop: 15
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
    }
});