import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-date-picker';
import Database from '../Database';
const db = new Database();
import { TextInput } from 'react-native-paper';
export class SpecialNotes extends Component {
    constructor(props) {
        super(props);
        const select_date = this.props.route.params.select_date;

        this.state = {
            isLoading: true,
            date: select_date,
            TextInputdaValue: '',
            _list_kcData: [],
            TextInputNoteValue: '',
            _kick_count: 0,
            increment: 0,
            dbs: '',
        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })
        // this.getData = this.getData.bind(this);
        this.loadDbVarable = this.loadDbVarable.bind(this);
    }
    loadDbVarable(result) {
        this.setState({
            dbs: result,
        });
        // this.getaAllClickData();
    }
    saveData() {
        let data = {
            _note: this.state.TextInputNoteValue,
            _date: this.state.date,
        }
        db.addNote(this.state.dbs, data).then((result) => {
            this.props.navigation.goBack();
            //  goBack();
        }).catch((err) => {

        })
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <View>
                        <View style={{ backgroundColor: '#fbb146', height: 150, }}>
                            <Text style={{ fontSize: 20, marginTop: 0, marginLeft: 15, fontWeight: 'bold', color: 'white' }}>Add Special Note</Text>
                        </View>

                        <View style={styles.breadthPo1}>
                            <Text style={{ paddingBottom: 10, fontSize: 12 }}>Select date</Text>
                            <DatePicker
                                mode="date"
                                enableAutoDarkMode={true}
                                date={this.state.date}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            <TextInput multiline={true} autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputNoteValue: TextInputValue })} style={{ marginTop: 0 }} label="Notes" />
                            <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                                <Text style={styles.buttonText}>Add note</Text>


                            </TouchableOpacity>
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
        bottom: 115,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
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
    }, button: {
        backgroundColor: "#f78a2c",
        padding: 10,
        borderRadius: 25,
        marginTop: 25,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    }, buttonText: {
        fontSize: 15,
        color: '#fff',


    }
});