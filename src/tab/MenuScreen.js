import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';

import AsyncStorage from '@react-native-community/async-storage';
import { CardViewWithIcon } from "react-native-simple-card-view";

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { IMAGE } from '../constants/image';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1




const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 25,
    },
    // card: {
    //     borderWidth: 1,
    //     padding: 25,
    //     marginTop: 25,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 0,
    //     },
    //     shadowOpacity:1,
    //     shadowRadius: 10,

    //     elevation: 11,
    // }
    card: {
        height: 115,
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
        alignItems: 'center',


        margin: 5
    }, cardHorizontal: {
        height: 150,
        backgroundColor: 'white',
        // width: 300,
        width: (Dimensions.get("window").width) - 55,
        // width: "90%",
        // backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        // alignItems: 'center',


        margin: 5
    }, scrollContainer: {
        flex: 1,
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
});


const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };
export class MenuScreen extends Component {

    initialState = {
        [_today]: { disabled: false }
    }

    constructor() {
        super();

        this.state = {
            _markedDates: this.initialState
        }
    }

    onDaySelect = (day) => {

        const _selectedDay = moment(day.dateString).format(_format);


        let marked = true;
        let markedDates = {}
        if (this.state._markedDates[_selectedDay]) {
            // Already in marked dates, so reverse current marked state
            marked = !this.state._markedDates[_selectedDay].marked;
            markedDates = this.state._markedDates[_selectedDay];
        }

        markedDates = { ...markedDates, ...{ marked } };

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates });
    }

    render() {
        const miniCardStyle = {
            padding: 5, margin: 5, elevation: 3,
        };
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 15 }}>Recommended for you</Text>
                        <View style={{ borderTopWidth: 6, borderTopColor: "#f78a2c", borderRadius: 3, marginHorizontal: 16, width: 45, marginTop: 8 }}></View>
                        <ScrollView

                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.container}>
                                {/* <Card > */}
                                <LinearGradient style={styles.cardHorizontal} colors={['#fbb146', '#f78a2c']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}
                                //  locations={[0.3, 0.6,1]} 
                                >

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>

                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Normal Healthy</Text>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}>Diet</Text>
                                                    {/* <Text style={{ marginTop: 5, fontSize: 11,   }}>how to maintain foods</Text> */}

                                                </View>
                                                <Text style={{ paddingTop: 65, fontSize: 12 }}>Food piramid</Text>
                                            </View>
                                            <View style={{ height: 70, marginLeft: -20, paddingTop: 15 }}>
                                                <Image source={IMAGE.ICON_DIET_PLAN}
                                                    style={{ height: 120, width: 190 }}>
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                                {/* </Card> */}
                                {/* <Card  > */}
                                <LinearGradient style={styles.cardHorizontal} colors={['#FDAD94', '#FC8386']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}
                                //  locations={[0.3, 0.6,1]} 
                                >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IdentifyPregnancy')}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Identify Pregnancy</Text>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}></Text>

                                                </View>
                                                {/* <Text style={{paddingTop:65,fontSize:12}}>Food piramid</Text> */}
                                            </View>
                                            <View style={{ height: 70, marginLeft: -50, paddingTop: 15 }}>
                                                <Image source={IMAGE.ICON_IDENTY_PREGNANCY}
                                                    style={{ height: 124, width: 185 }}>
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                                {/* </Card> */}
                                {/* <Card style={styles.cardHorizontal} > */}
                                <LinearGradient style={styles.cardHorizontal} colors={['#FD88AC', '#FD598B']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}
                                //  locations={[0.3, 0.6,1]} 
                                >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RegularMenstruation')}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Regular Mensturation</Text>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", marginTop: -3 }}>Period</Text>

                                                </View>
                                                {/* <Text style={{paddingTop:65,fontSize:12}}>Food piramid</Text> */}
                                            </View>
                                            <View style={{ height: 70, marginLeft: -50, paddingTop: 15 }}>
                                                <Image source={IMAGE.ICON_MENSTRUAION}
                                                    style={{ height: 124, width: 185 }}>
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                                {/* </Card> */}
                                <LinearGradient style={styles.cardHorizontal} colors={['#b6fb96', '#71f3da']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}
                                //  locations={[0.3, 0.6,1]} 
                                >
                                    {/* <Card style={styles.cardHorizontal} > */}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Investigation')}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Investigation</Text>
                                                    {/* <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold",  marginTop: -3 }}>Period</Text> */}

                                                </View>
                                                {/* <Text style={{paddingTop:65,fontSize:12}}>Food piramid</Text> */}
                                            </View>
                                            <View style={{ height: 100, marginLeft: 20, paddingTop: 0 }}>
                                                <Image source={IMAGE.ICON_INVESTIGATION}
                                                    style={{ height: 134, width: 169 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient style={styles.cardHorizontal} colors={['#fde8b1', '#fbbe91']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}

                                >

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Excercise')}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Investigation</Text>
                                                    {/* <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold",  marginTop: -3 }}>Period</Text> */}

                                                </View>
                                                {/* <Text style={{paddingTop:65,fontSize:12}}>Food piramid</Text> */}
                                            </View>
                                            <View style={{ height: 100, marginLeft: 20, paddingTop: 0 }}>
                                                <Image source={IMAGE.ICON_INVESTIGATION}
                                                    style={{ height: 134, width: 169 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient style={styles.cardHorizontal} colors={['#fde8b1', '#fbbe91']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0.9 }}

                                >

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DitHelthyMother')}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", }}>Investigation</Text>
                                                    {/* <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold",  marginTop: -3 }}>Period</Text> */}

                                                </View>
                                                {/* <Text style={{paddingTop:65,fontSize:12}}>Food piramid</Text> */}
                                            </View>
                                            <View style={{ height: 100, marginLeft: 20, paddingTop: 0 }}>
                                                <Image source={IMAGE.ICON_INVESTIGATION}
                                                    style={{ height: 134, width: 169 }}
                                                >
                                                </Image>
                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                </LinearGradient>

                            </View>
                        </ScrollView>
                        {/* <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'gray', margin: 12 }}></View> */}
                        <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 0 }}>Menu</Text>
                        {/* <View style={{borderTopWidth:6,borderTopColor:"#f78a2c",borderRadius:3,marginHorizontal:16,width:45,marginTop:8}}></View> */}
                        <View style={styles.container}>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar', {
                                    data: ''
                                })}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_MENU_PERIOD1}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>

                                        <Text style={{ marginTop: 0 }}>Calandar</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>


                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BMICalculator')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_MENU_METER}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>BMI Calculator</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>



                        </View>
                        <View style={styles.container}>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('HospitalBag')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_HOSPITAL_BAG}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>Hospital bag</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BloodPresure')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_ECG}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>Blood presure</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>

                        </View>
                        <View style={styles.container}>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('WeightGain')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_WEIGHT_SCALE}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>Weight Gain chart</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('KickCounter')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_BABY_FOOT}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>Kick Counter</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>

                        </View>
                        {/* <View style={{ borderBottomWidth: 0.4, borderBottomColor: 'gray', margin: 12 }}></View> */}
                        <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 0 }}>After pregnancy</Text>
                        <View style={{ borderTopWidth: 6, borderTopColor: "#f78a2c", borderRadius: 3, marginHorizontal: 16, width: 45, marginTop: 8 }}></View>
                        {/* <View style={{ alignItems: "center", flexDirection: "row", flexWrap: 'wrap', }}> */}
                        <View style={styles.container}>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BreastFeeding', {
                                    data: ''
                                })}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_GROUTH_CHART_1}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>

                                        <Text style={{ marginTop: 0 }}>Baby Grouth</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>


                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('VerticleYearChart2')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_BABY_BOTTLE}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>BMI cc</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>




                        </View>
                        <View style={styles.container}>

                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('BabyActivities', {
                                    data: ''
                                })}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_GROUTH_CHART_1}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>

                                        <Text style={{ marginTop: 0 }}>Baby Grouth</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>


                            <Card style={styles.card} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('TestMail')}>
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_BABY_BOTTLE}
                                                style={{ height: 45, width: 45 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 0 }}>BMI cc</Text>

                                    </View>
                                </TouchableOpacity>
                            </Card>




                        </View>

                        {/* </View> */}



                    </View>



                </ScrollView >


            </SafeAreaView >


        );
    }
}

