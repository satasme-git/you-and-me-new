
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, Text, Image, Dimensions, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { IMAGE } from '../constants/image';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
import RNDirectPayCardPayment from 'react-native-direct-pay-card-payment';
const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;
const hmacAlgorithm = CONSTANTS.HmacAlgorithms.HmacSHA512;
const EventName = CONSTANTS.Events.onBatchReccieved;
import RBSheet from "react-native-raw-bottom-sheet";
import { List, ListItem, Left, Body, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
export class BillPaymentInformation extends Component {
    static navigationOptions = {
        title: 'Add Product',
    };
    constructor() {
        super();
        this.state = {
            prodId: '',
            prodName: '',
            prodDesc: '',
            _billerCode: "",
            TextInputAccount: '',
            data: [],
            _card_id: '',
            isLoading: true,
        };
    }

    generateSignaature() {
        const { TextInputName } = this.state;
        fetch('http://youandmenest.com/tr_reactnative/opnssl_key_generate.php?ref=' + 987654321, {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    // isLoading: false
                });
                console.log("signature : " + responseJson);
            }).catch((error) => {
                console.error(error);
            })




    }
    async validateAccount() {
        // const { TextInputAccount } = this.state;
        // const billercode = await AsyncStorage.getItem('billerCode');


        // JSHmac(TextInputAccount + billercode + "bcaad5b1-bafa-4527-83b6-a3b7119dbd76", "a419f2b7652b09c34518f09759b4dba6089fab38d792609b8bb9daf8343875cd", CONSTANTS.HmacAlgorithms.HmacSHA256)
        //     .then(hash => {
        //         fetch('https://dev.directpay.lk/v2/backend/external/api/validateAccountAction', {
        //             method: 'post',
        //             headers: {
        //                 'Authorization': 'Bearer ' + hash,
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 "accountNumber": TextInputAccount,
        //                 "billerCode": billercode,
        //                 "merchantId": "bcaad5b1-bafa-4527-83b6-a3b7119dbd76",
        //             }),
        //         }).then((response) => response.json())
        //             .then((responseJson) => {
        //                 // this.setState({
        //                 //     categoryData: responseJson.data,
        //                 // });
        //                 if (responseJson.data.success == true) {

        //                 }
        //                 console.log(responseJson.data);
        //             }).catch((error) => {
        //                 console.error(error);

        //             })
        //     })
        //     .catch(e => console.log(e));


        this.card();
    }
    card() {
        RNDirectPayCardPayment.addCardToUser(
            'dev', //env : dev or prod
            '7c62d2fdd3d4edf99e97be9838dd2fd7bac316578bffc37ef68100d516fa7409',// apiKey
            'II07510', // mid
            '647874783c3423d23223e', //unique id of the user
            'chamil', // firstname of the user
            'pathirana', // lastname of the user
            'chamiljay88@mail.com', // email of the user
            '0716460440', // phone number of the user
            (_err, _r) => {
                if (_err) {//failed

                    console.log('code: ' + _err.code);
                    console.log('message: ' + _err.message);
                } else {//successfully added the card

                    console.log('id: ' + _r.id); // id (token) of the added card
                    console.log('mask: ' + _r.mask); // masked card number
                    console.log('reference: ' + _r.reference); // unique user id as the reference
                    console.log('brand: ' + _r.brand); // brand of the card (Visa / Mastercared)
                }
            },
        )
    }
    openRbSheet() {
        const { TextInputName } = this.state;
        fetch('http://youandmenest.com/tr_reactnative/opnssl_key_generate.php?ref=' + 987654321, {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


        }).then((response) => response.json())
            .then((responseJson) => {
                // this.setState({

                //     isLoading: false
                // });
                this.getCardList(responseJson);

            }).catch((error) => {
                console.error(error);
            })


        this.RBSheet.open();
    }
    getCardList(signature) {
        fetch('https://dev.directpay.lk/v1/mpg/api/external/cardManagement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '7c62d2fdd3d4edf99e97be9838dd2fd7bac316578bffc37ef68100d516fa7409',
                'Signature': signature,
            },
            body: JSON.stringify({
                "merchantId": "II07510",
                "reference": "987654321",
                "type": "LIST_CARD"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    data: responseJson.cardList,

                });

            }).catch((error) => {
                console.error(error);

            })

    }
    selectedCardSignature(card_id) {
        this.setState({
            _card_id: card_id,
        });

        const { TextInputName } = this.state;
        fetch('http://youandmenest.com/tr_reactnative/selected_card_key_generate.php?ref=' + 987654321 + "&cardid=" + card_id + "&nic=" + 982073428, {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


        }).then((response) => response.json())
            .then((responseJson) => {
                this.selectedCardPayment(responseJson);
                console.log("signatures : " + responseJson);
                // this.testPhpCard();
            }).catch((error) => {
                console.error(error);
            })
    }

    selectedCardPayment(signature) {

        fetch('https://dev.directpay.lk/v1/mpg/api/external/cardManagement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Signature': signature,
                'x-api-key': '7c62d2fdd3d4edf99e97be9838dd2fd7bac316578bffc37ef68100d516fa7409',

            },
            body: JSON.stringify({
                "amount": 100.00,
                "cardId": this.state._card_id,
                "currency": "LKR",
                "merchantId": "II07510",
                "refCode": 987654321,
                "reference": "982073428V",
                "type": "CARD_PAY"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(">>>>>>>>ref code L: " + responseJson);

            }).catch((error) => {
                console.error(error);

            })
    }
    renderItem = ({ item }) => {

        return (

            <ListItem
                style={{
                    marginBottom: 10,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: item.color,
                    // backgroundColor:'#FFEDD2'
                }}>
                <TouchableOpacity
                    onPress={() =>
                        this.selectedCardSignature(item.cardId)
                    }
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: -20,
                            // marginLeft: 5,
                            // marginBottom: -20,
                        }}>
                        <ImageBackground
                            source={require('../images/Biller/Platinum_Card.png')}
                            style={{
                                width: windowWidth - 40,
                                height: windowHeight / 3.5,
                                // paddingLeft: 30,
                                // paddingBottom: 0,
                                // paddingTop: 13,

                                padding: 10
                            }}>
                            <View style={{ bottom: 0, paddingLeft: 10 }}>
                                <Text style={(styles.dateText, { fontWeight: 'bold', color: 'white', margin: 10, fontSize: 20 })}>
                                    {item.brand}
                                </Text>
                            </View>
                            <View style={{ bottom: -70 }}>


                                <Text style={{ color: 'white', fontSize: 24, marginLeft: 10 }}>  {item.mask}</Text>
                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 15 }}>  {item.cardId}</Text>
                            </View>
                        </ImageBackground>



                    </View>
                </TouchableOpacity>
            </ListItem>
        );

    };

    keyExtractor = (item, index) => index.toString();
    render() {
        let { isLoading, } = this.state

        // if (this.state.isLoading) {
        //     return (
        //         <View style={styles.activity}>
        //             <ActivityIndicator size="large" color="#0000ff" />
        //         </View>
        //     )
        // }
        return (
            <ScrollView >
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#9A81FD" />
                <View style={{ padding: 8 }}>
                    <View
                        style={[styles.cardcontainer, { width: windowWidth - 20 }]}
                        activeOpacity={0.95}>
                        <View style={styles.labelContainer}>
                            <View>
                                <View style={{}}>
                                    {/* <Text style={styles.mainText}>qqqq</Text> */}
                                    <Image style={{ height: 230, width: 300, alignItems: 'center', justifyContent: 'center' }}
                                        source={IMAGE.ICON_RELOAD}
                                        resizeMode="stretch"


                                    />
                                </View>
                                <Text style={styles.labelText}>Phone Number</Text>
                                <TextInput
                                    style={[
                                        styles.labelTextContainer,
                                        { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                    ]}
                                    autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputAccount: TextInputValue })} placeholder="Enter Phone Number Here"
                                />
                                <Text style={styles.labelText}>Amount</Text>
                                <TextInput
                                    style={[
                                        styles.labelTextContainer,
                                        { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                    ]}
                                    autoFocus={false} value={this.state.TextInputEmail} onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} placeholder="Enter Amount Here"
                                />
                                <Text style={styles.labelText}>Remark</Text>
                                <Text>sasd</Text>
                                <TextInput
                                    style={[
                                        styles.labelTextContainer,
                                        { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                    ]}
                                    autoFocus={false} value={this.state.TextInputPhone} onChangeText={TextInputValue => this.setState({ TextInputPhone: TextInputValue })} placeholder="Remarks"
                                />





                            </View>
                        </View>


                        <Button
                            title="Recharge"
                            titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                            buttonStyle={{
                                backgroundColor: 'orange',
                                borderRadius: 5,
                                // width: 100,
                                paddingHorizontal: 10,
                                padding: 9,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() =>

                                // this.generateSignaature()

                                this.openRbSheet()
                                // this.validateAccount()

                            }
                        />



                    </View>
                </View>
                {/* <View style={styles.subContainer}>
                    <TextInput
                        placeholder={'Product ID'}
                        value={this.state.prodId}
                        onChangeText={(text) => this.updateTextInput(text, 'prodId')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        placeholder={'Product Name'}
                        value={this.state.prodName}
                        onChangeText={(text) => this.updateTextInput(text, 'prodName')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Product Description'}
                        value={this.state.prodDesc}
                        onChangeText={(text) => this.updateTextInput(text, 'prodDesc')}
                    />
                </View>


                <View style={styles.button}>
                    <Button
                        large
                        leftIcon={{ name: 'save' }}
                        title='Save'
                        onPress={() => this.saveProduct()} />
                </View> */}
                <RBSheet

                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={400}
                    openDuration={700}
                    customStyles={{
                        container: {
                            // justifyContent: "center",
                            // alignItems: "center",
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            backgroundColor: '#F2F2F2'
                        }
                    }}
                >

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <View style={{ flex: 1, marginBottom: 30 }}>
                            <View style={{ paddingLeft: 20, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Please Select your card</Text>
                            </View>
                            {isLoading ?
                                <View style={{ width: windowWidth, height: windowHeight / 3, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    
                                </View>

                                : <FlatList
                                    horizontal
                                    contentContainerStyle={{
                                        // paddingTop: StatusBar.currentHeight || 0,
                                    }}
                                    ListEmptyComponent={this.emptyComponent}
                                    scrollEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                />
                            }
                            <View style={{paddingLeft:25,paddingRight:25}}>
                            <Button
                                title="Recharge"
                                titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                buttonStyle={{
                                    backgroundColor: 'orange',
                                    borderRadius: 5,
                                    // width: 100,
                                    paddingHorizontal: 10,
                                    padding: 9,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                
                            />
                            </View>
                      
                        </View>
                    </ScrollView>



                </RBSheet>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        marginBottom: 20,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelTextContainer: {
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 10,
        color: 'rgb(25,25,25)',
    },
    labelText: {
        fontSize: 13,
        lineHeight: 16,
        color: 'black',
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontFamily: 'AvertaStd-Semibold',
        letterSpacing: 0.8,
    }
    , cardcontainer: {
        marginTop: 12,
        shadowColor: 'rgb(35,35,35)',
        shadowOffset: {
            width: 2,
            heght: 2,
        },
        shadowRadius: 40,
        shadowOpacity: 0.08,
        borderWidth: 2,
        borderColor: 'rgb(246,245,248)',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 16,
    }, labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
    },
})