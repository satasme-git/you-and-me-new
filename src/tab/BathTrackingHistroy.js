import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements'
import { CustomHeader } from '../index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
const db = new Database();
export class BathTrackingHistroy extends Component {
    constructor(props) {
        super(props);

        this.state = {

            _list_wgData: [],
            dbs: '',
            // stickyHeaderIndices:[2],

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
                <Text >oops! There's no data here!</Text>
            </View>);
    }
    loadData() {
        let products = [];
        let _pdate = '';
        db.listBathsTimes(this.state.dbs).then((data) => {
            products = data;
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : " + data);
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
    }
    renderItem = ({ item }) => {

        return (
            <ListItem style={{ marginTop: -10, paddingBottom: 5 }}>
                <Left >
                    <View >

                        <Icon

                            name='bath'
                            type='font-awesome'
                            color='#009688'
                            iconStyle={{ fontSize: 20, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e0f2f1', borderRadius: 8, }}
                            onPress={() => console.log('hello')} />
                    </View>
                </Left>
                {/* <Body style={{ marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.btStart}
                    </Text>
                </Body> */}
                <Body style={{ marginLeft: -120 }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.btDate}</Text>
                    <Text style={styles.dateText}>{item.btStart}  to {item.btEnd}</Text>
                    {/* <Text style={{ color: 'gray', fontSize: 12 }}>bath</Text> */}
                </Body>
                <Right >
                    <View style={styles.iconMore}>
                        <Icon
                            type='font-awesome'
                            color='gray'
                            iconStyle={{ fontSize: 18, padding: 8 }}
                            name="trash-o" color="gray"
                            onPress={() => {
                                this.deleteData(item.bpId); showMessage({

                                    message: "Hello there",
                                    description: "successfuly deleted " + `${item.bpDate}`,
                                    type: "success",
                                })
                            }}
                        />
                    </View>
                </Right >

            </ListItem>
        );

    };

    keyExtractor = (item, index) => index.toString()
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />
                {/* <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}> */}

                <View>
                    <View style={{ backgroundColor: '#fbb146', height: 120,  }}>
                        <View style={{ marginTop: 0, marginLeft: 20 }}>

                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Special Note History</Text>

                        </View>
                    </View>

                    <View style={styles.breadthPo1}>

                        <View style={{ borderBottomWidth: 0.2, borderBottomColor: 'gray', marginTop: -50, marginBottom: 50 }}></View>

                        <FlatList
                       showsHorizontalScrollIndicator={false}
  
                            style={{ backgroundColor: 'white', marginBottom: 50 }}
                            ListEmptyComponent={this.emptyComponent}
                            keyExtractor={item => item.btStart}
                            renderItem={this.renderItem}
                            // keyExtractor={this.keyExtractor}
                            data={this.state._list_wgData}

                        />

                    </View>

                </View>
                {/* </ScrollView> */}



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
    }, headerStyle: {
        flex: 1,
        height: 40,
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        color: 'white'
    }
});