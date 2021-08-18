import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const db = new Database();

export class VerticleYearChart2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,
            items: {},
            dbs: '',
            _babybDate: '',
            _bcg: '',
            _opv: '',
            _opvp: '',
            _opvp2: '',
            _mmr: '',
            _je: '', _opvdt: '', _mmr2: '', _opvdt5: '', _hpv1: '', _hpv2: '', _atd: '', _rb_strt: '',
            _rb_end: '',
            lan: ''
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
        this.loadData();
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });
    }
    loadData() {
        db.listBabyDetails(this.state.dbs).then((data) => {
            let result = data;
            if (result == 0) {
            } else {
                let { babybDate } = this.props
                for (var i = 0; i < result.length; i++) {
                    babybDate = result[i].bbDate;
                }
                this.setState({
                    isLoading: false,
                    _babybDate: babybDate,
                });

            }
        }).catch((err) => {
            console.log(err);
        })

        let updatedMarkedDates = '';
        let products = [];
        let _pdate = '';
        let bcg, opv, opvp, opvp2, mmr, je, opvdt, mmr2, opvdt5, hpv1, hpv2, atd, rb_strt, rb_end = 0;
        db.listProduct(this.state.dbs).then((data) => {
            products = data;

            for (var i = 0; i < products.length; i++) {
                _pdate = products[i].pName
                _pcatId = products[i].pCatId
                _pDescription = products[i].pDescription



                if (_pcatId == 3) {
                    var babayBirgDay = this.state._babybDate;
                    if (babayBirgDay != "") {

                        let nextVaaccination = moment(babayBirgDay).add(_pdate, 'day').format('YYYY-MM-DD');
                        if (_pdate == 14) {
                            bcg = nextVaaccination;
                        } if (_pdate == 60) {
                            opv = nextVaaccination;
                        } if (_pdate == 120) {
                            opvp = nextVaaccination;
                        } if (_pdate == 180) {
                            opvp2 = nextVaaccination;
                        } if (_pdate == 270) {
                            mmr = nextVaaccination;
                        }

                        if (_pdate == 360) {
                            je = nextVaaccination;
                        } if (_pdate == 540) {
                            opvdt = nextVaaccination;
                        }
                        if (_pdate == 1095) {
                            mmr2 = nextVaaccination;
                        } if (_pdate == 1825) {
                            opvdt5 = nextVaaccination;
                        }
                        if (_pdate == 3650) {
                            hpv1 = nextVaaccination;
                        }
                        if (_pdate == 3830) {
                            hpv2 = nextVaaccination;
                        } if (_pdate == 4015) {
                            atd = nextVaaccination;
                        } if (_pdate == 5475) {
                            rb_strt = nextVaaccination;
                        } if (_pdate == 16060) {
                            rb_end = nextVaaccination;
                        }
                        // rb_strt,rb_end

                        je, opvdt, mmr2, opvdt5, hpv1, hpv2, atd

                        this.setState({
                            isLoading: false,
                            _bcg: bcg,
                            _opv: opv,
                            _opvp: opvp,
                            _opvp2: opvp2,
                            _mmr: mmr,

                            _je: je,
                            _opvdt: opvdt,
                            _mmr2: mmr2,
                            _opvdt5: opvdt5,
                            _hpv1: hpv1,
                            _hpv2: hpv2,
                            _atd: atd,

                            _rb_strt: rb_strt,
                            _rb_end: rb_end
                        });

                    }


                }


            }


        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })

    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' title="" navigation={this.props.navigation} bdcolor='#fbb146' />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>
                        <LinearGradient start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 175, zIndex: -1 }}>
                            {/* <View style={{ backgroundColor: '#fbb146', height: 175, zIndex: -1 }}> */}
                            <View style={{ marginTop: 0, marginLeft: 20 }}>

                                <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('vaccine.vaccineheadding')}</Text>
                                {/* <Text style={{ color: 'white' }}>Yesterday remaining 12 kg</Text> */}
                            </View>
                        </LinearGradient>

                        <View style={styles.breadthPo1}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{i18n.t('vaccine.firstyesr')}</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{i18n.t('vaccine.4weeks')}</Text>
                            <Text style={{ paddingLeft: 10 }}>{i18n.t('vaccine.4w_vaccine')}</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._bcg}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{i18n.t('vaccine.2month')}</Text>
                            <Text style={{ paddingLeft: 10 }}>{i18n.t('vaccine.2m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opv}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{i18n.t('vaccine.4month')}</Text>
                            <Text style={{ paddingLeft: 10 }}>{i18n.t('vaccine.4m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvp}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{i18n.t('vaccine.6month')}</Text>
                            <Text style={{ paddingLeft: 10 }}>{i18n.t('vaccine.6m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvp2}</Text>

                            <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{i18n.t('vaccine.9month')}</Text>
                            <Text style={{ paddingLeft: 10 }}>{i18n.t('vaccine.9m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 10, color: 'red', fontWeight: 'bold' }}>{this.state._mmr}</Text>
                        </View>
                        <View style={{ marginTop: -120 }}></View>

                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{i18n.t('vaccine.secondyesr')}</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text style={{ paddingTop: 10, }}>{i18n.t('vaccine.12month')} {i18n.t('vaccine.12m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._je}</Text>
                            <Text style={{ paddingTop: 10, }}>{i18n.t('vaccine.18month')} {i18n.t('vaccine.18m_vaccine')}</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvdt}</Text>
                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{i18n.t('vaccine.preschooage')}</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text >{i18n.t('vaccine.3rdyear')} {i18n.t('vaccine.preschool_vaccine')}</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._mmr2}</Text>
                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{i18n.t('vaccine.schoolage')}</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>


                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text>{i18n.t('vaccine.5rdyear')} {i18n.t('vaccine.5rdyear_vaccine')} </Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._opvdt5}</Text>

                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text>{i18n.t('vaccine.10rdyear')} {i18n.t('vaccine.10thyear_vaccine')} </Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._hpv1}</Text>

                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text>{i18n.t('vaccine.hpvsecont')}  </Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._hpv2}</Text>

                            <Text style={{ paddingTop: 5 }}><Text>{'\u2022'}</Text> {i18n.t('vaccine.11rdyear')} {i18n.t('vaccine.11thyear_vaccine')}</Text>
                            <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._atd}</Text>

                        </View>
                        <View style={styles.breadthPo2}>
                            <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{i18n.t('vaccine.15rdyear')}</Text>
                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>
                            <Text style={{ paddingTop: 10, }}>{i18n.t('vaccine.15thyear_vaccine')}</Text>
                            <Text style={{ paddingLeft: 0, color: 'red', fontWeight: 'bold' }}>{this.state._rb_strt} - {this.state._rb_end}
                            </Text>
                            <Text style={{ paddingBottom: 10, paddingTop: 5, color: 'green' }}>
                                {i18n.t('vaccine.discription')}

                            </Text>
                            {/* <Text style={{ paddingLeft: 0, paddingBottom: 10, color: 'red', fontWeight: 'bold' }}>{this.state._atd}</Text> */}

                        </View>


                        {/* <WebView source={{ uri: 'https://reactnative.dev/' }} />; */}
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            title={i18n.t('edd.moredetailsbtn')}
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{ borderRadius: 25, backgroundColor: '#e91e63', borderColor: '#e91e63', color: '#e91e63', padding: 12, borderWidth: 1, marginBottom: 20, marginTop: 15 }}
                            onPress={() => this.props.navigation.navigate('Vaccine details')}
                        />

                    </View>
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

    }, header: {
        flex: 2,
        backgroundColor: '#fbb146'

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

    }
});