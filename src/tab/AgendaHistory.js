import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements'
import { CustomHeader } from '../index';
import i18n from 'i18n-js';
import Database from '../Database';
import FlashMessage, { showMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
const db = new Database();
export class AgendaHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {

            _list_wgData: [],
            dbs: '',
            lan: '',

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
    emptyComponent = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' }}>
                <Text >{i18n.t('special_notes.oops')}!</Text>
            </View>);
    }
    loadData() {
        let products = [];
        let _pdate = '';
        db.listNotes(this.state.dbs).then((data) => {
            products = data;

            this.setState({
                isLoading: false,
                _list_wgData: data,

            });

        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })
    } deleteData(id) {

        this.setState({
            // isLoading: true
        });
        db.deletePeriod(this.state.dbs, id).then((result) => {

            this.loadData();
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

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <FlashMessage duration={1000} />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('special_notes.historynote')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0.9 }}
                            colors={['#4E3CCE', '#9A81FD']} style={[styles.gradient, { height: 80, zIndex: -1 }]}>

                            {/* <View style={{ backgroundColor: '#fbb146', height: 120, zIndex: -1 }}> */}
                            <View style={{ marginTop: 0, marginLeft: 20 }}>

                                {/* <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('special_notes.historynote')}</Text> */}

                            </View>
                        </LinearGradient>

                        <View style={styles.breadthPo1}>

                            <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', margin: 0 }}></View>

                            <FlatList

                                style={{
                                    // backgroundColor: 'white', marginVertical: 0,
                                    //  borderRadius: 16,
                                    // elevation: 2,
                                    // shadowColor: '#000',
                                    // shadowOffset: { width: 0, height: 3 },
                                    // shadowOpacity: 0.7,
                                    // shadowRadius: 8,

                                }}
                                ListEmptyComponent={this.emptyComponent}
                                keyExtractor={this.keyExtractor}
                                data={this.state._list_wgData}

                                // renderItem={this.renderItem}

                                renderItem={({ item }) => <ListItem
                                    style={{
                                        paddingTop: 8, paddingBottom: 8

                                    }}
                                >
                                    <Left >
                                        <Icon
                                            name='file-text'
                                            type='font-awesome'
                                            color='#009688'
                                            iconStyle={{ fontSize: 18, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: '#b2dfdb', borderRadius: 8, }}
                                            onPress={() => console.log('hello')} />
                                    </Left>
                                    {/* <Left>
                                        <View style={styles.iconMore}>

                                            <Icon

                                                name='paste'
                                                type='font-awesome'
                                                color='#6a1b9a'
                                                iconStyle={{ fontSize: 18, paddingTop: 8, paddingBottom: 8, paddingLeft: 11, paddingRight: 11, backgroundColor: '#f3e5f5', borderRadius: 8, }}
                                                onPress={() => console.log('hello')} />
                                        </View>
                                    </Left> */}
                                    <Body style={{ marginLeft: -140 }}>
                                        <Text style={{ color: 'gray', fontSize: 12 }}>{item.pTime}</Text>
                                        <Text style={styles.dateText}>{item.pName}</Text>
                                        <Text style={styles.dateText}>{item.pDescription}</Text>
                                    </Body>
                                    <Right>
                                        <View style={styles.iconMore}>
                                            <Icon
                                                type='font-awesome'
                                                color='gray'
                                                iconStyle={{ fontSize: 18 }}
                                                name="trash-o" color="gray"
                                                onPress={() => {
                                                    this.deleteData(item.pId); showMessage({

                                                        message: "Hello there",
                                                        description: "successfuly deleted " + `${item.pName}`,
                                                        type: "success",
                                                    })
                                                }}
                                            />
                                        </View>
                                    </Right>
                                </ListItem>
                                }
                            />

                        </View>

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
        bottom: 80,
        zIndex: 5,
        width: '100%',
        // borderRadius: 0,
        elevation: 2,
        padding: 12,
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