import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, ImageBackground, StatusBar, TouchableOpacity, Text, Image, Dimensions, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { IMAGE } from '../constants/image';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-community/async-storage';
// import RNDirectPayCardPayment from 'react-native-direct-pay-card-payment';
const hashAlgorithm = CONSTANTS.HashAlgorithms.sha256;
const hmacAlgorithm = CONSTANTS.HmacAlgorithms.HmacSHA512;
const EventName = CONSTANTS.Events.onBatchReccieved;
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { List, ListItem, Left, Body, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment' // 2.20.1
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
const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)
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
            _billerName: '',
            TextInputAccount: '',
            TextInputAmount: '',
            data: [],
            _card_id: '',
            isLoading: true,
            isSelectedCard: false,
            _mask: '',
            phoneError: '',
            amountError: '',
            isVisible: false,
            isVisible1: false,
            _signature: '',
            _transactionReferance: '',
            loading: false,
            isVisible2: false,
            errorMessage:""
        };

    }
    async componentDidMount() {
        const billerName = await AsyncStorage.getItem('billerName');
        this.props.navigation.setOptions({
            title: billerName,
        });
       
    }
    emptyComponent = () => {
        return (
          <View
            style={{
            
              
              justifyContent: 'center',
              alignItems: 'center',
              height: windowHeight / 4,
              width:windowWidth,
             
            }}>
            <Text>Please add a card</Text>
          </View>
        );
      };
    async openRbSheet() {
        const { TextInputAccount } = this.state;
        const { TextInputAmount } = this.state;
        if (TextInputAccount == '' && TextInputAmount == '') {
            this.setState({
                phoneError: "Please enter Acount/Phone number",
                amountError: "Please enter Amount",
            })
        } else if (TextInputAccount == '' && TextInputAmount != '') {
            this.setState({
                phoneError: "Please enter  Acount/Phone number",
                amountError: "",
            })
        } else if (TextInputAccount != '' && TextInputAmount == '') {
            this.setState({
                phoneError: "",
                amountError: "Please enter Amount",
            })
        } else {
            this.setState({
                phoneError: "",
                amountError: "",
            });
            this.walletBalance();
        }
    }
    //Wallet balance 2.4
    walletBalance() {
        const { TextInputAmount } = this.state;

        JSHmac("a1840a1b-986d-4c22-b16d-e3d9db64db46", "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
            .then(hash => {
                fetch('https://prod.directpay.lk/v2/backend/external/api/getWalletBalance', {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + hash,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        // this.setState({
                        //   categoryData: responseJson.data.categoryData,
                        // });

                        if (responseJson.data.success == true) {
                            if (parseFloat(responseJson.data.balance) > parseFloat(TextInputAmount)) {
                                // this.cardListSignatureGenerate();
                                console.log(">>>>>>>>>>>>>>>>>>>>>> 1. error account : " )
                                this.validateAccount();
                            } else {
                                console.log(">>>>>>>>>>>>>>>>>>>>>> 1. walert balance : " + responseJson.data.balance + " amount : " + TextInputAmount)
                                this.setState({
                                    isVisible1: true,
                                });
                            }
                        }
                    }).catch((error) => {
                        console.error(error);

                    })
            })
            .catch(e => console.log(e));
    }

    //card list signature generate
    async cardListSignatureGenerate() {
        const billerName = await AsyncStorage.getItem('billerName');
        const { TextInputName } = this.state;


        var reffreancenic = await AsyncStorage.getItem('member_nic');
        reffreancenic = reffreancenic.slice(0, -1);

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+reffreancenic);


        // const reffrence=parseFloat(_today+ref);
        fetch('http://youandmenest.com/tr_reactnative/opnssl_key_generate.php?ref=' + reffreancenic, {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(">>>>>>>>>>>>>>>>>>>>>> 123. walert balance : " + responseJson)

                this.setState({
                    // _billercode:billercode,
                    _billerName: billerName,
                });
                this.getCardList(responseJson);

            }).catch((error) => {
                console.error(error);
            })
        this.RBSheet.open();
    }
    async getCardList(signature) {
        var reffreancenic = await AsyncStorage.getItem('member_nic');
        reffreancenic = reffreancenic.slice(0, -1);

        fetch('https://prod.directpay.lk/v1/mpg/api/external/cardManagement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'b8b05983596e0a837979a1107f6e3094',
                'Signature': signature,
            },
            body: JSON.stringify({
                "merchantId": "SY10716",
                "reference": reffreancenic,
                "type": "LIST_CARD"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                
                if(responseJson.cardList!=null){
                    this.setState({
                        isLoading: false,
                        data: responseJson.cardList,
    
                    });
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 3. signature generate card empty  ne: "+responseJson.cardList)
                }else{
                    this.setState({
                        isLoading: false,
                      
    
                    });
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 3. signature generate card empty : "+responseJson.cardList)
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 3.1. signature : "+signature)
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 3.2. signature : "+reffreancenic)
                }
                

            }).catch((error) => {
                console.error(error);

            })
    }
    async generateSignaature() {
        const { TextInputName } = this.state;
   
        
        var reffreancenic = await AsyncStorage.getItem('member_nic');
        reffreancenic = reffreancenic.slice(0, -1);
 
  
        fetch('http://youandmenest.com/tr_reactnative/opnssl_key_generate.php?ref=' + reffreancenic, {
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
        const { TextInputAccount } = this.state;
        const billercode = await AsyncStorage.getItem('billerCode');


        JSHmac(TextInputAccount + billercode + "a1840a1b-986d-4c22-b16d-e3d9db64db46", "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
            .then(hash => {
                fetch('https://prod.directpay.lk/v2/backend/external/api/validateAccountAction', {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + hash,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "accountNumber": TextInputAccount,
                        "billerCode": billercode,
                        "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
                    }),
                   
                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(">>>>"+hash);
                        console.log(">>>>"+TextInputAccount);
                        console.log(">>>>"+billercode);
                        if (responseJson.data.success == true) {
                            console.log(">>>>>>>>>>>>>>>>>>>>>> 2. Validate Acount: " + billercode + " acount : " + TextInputAccount + " res : " + responseJson.data.success);
                            this.cardListSignatureGenerate();
                        } else {
                            console.log("account validation error");
                            this.setState({
                                isVisible:true,
                                errorMessage: responseJson.data.message
                            });
                        }
                        console.log(responseJson.data);
                    }).catch((error) => {
                        console.error(error);

                    })
            })
            .catch(e => console.log(e));
    }
    getWaletBalance() {
        const cat_id = category;
        JSHmac(cat_id + "a1840a1b-986d-4c22-b16d-e3d9db64db46", "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
            .then(hash => {
                fetch('https://prod.directpay.lk/v2/backend/external/api/retrieveBillers', {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + hash,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "categoryId": cat_id,
                        "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
                    }),

                }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(">>>>>>>>>>>>>>>>??????????????????????????? : " + this.state.billers)

                        this.setState({
                            billers: responseJson.data.billerData,
                            // loadin: 1,
                        });
                        // console.log(responseJson.data.billerData);
                    }).catch((error) => {
                        console.error(error);
                    })
            }
                // console.log(hash)
            )
            .catch(e => console.log(e));
    }
    setSectedCardDataToButton(mask, cardId) {
        this.setState({
            isSelectedCard: true,
            _mask: mask
        });
        this.selectedCardSignature(cardId)
    }
    async selectedCardSignature(card_id) {
        const { TextInputAmount } = this.state;
        this.setState({
            _card_id: card_id,
        });

        const { TextInputName } = this.state;


        var reffreancenic = await AsyncStorage.getItem('member_nic');
        var email = await AsyncStorage.getItem('member_email');

        reffreancenic = reffreancenic.slice(0, -1);
        fetch('http://youandmenest.com/tr_reactnative/selected_card_key_generate.php?ref=' + reffreancenic + "&cardid=" + card_id + "&nic=" + 982073428 + "&amount=" + TextInputAmount+"&email="+email, {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                // this.selectedCardPayment(responseJson);
                console.log(">>>>>>>>>>>>>>>>>>>>>> 4. signature selected card  : "+responseJson.signature)

                this.setState({
                    _signature: responseJson.signature,
                    _transactionReferance: responseJson.value
                });

                // this.testPhpCard();
            }).catch((error) => {
                console.error(error);
            })
    }
   async selectedCardPayment() {
        var reffreancenic = await AsyncStorage.getItem('member_nic');
        var email = await AsyncStorage.getItem('member_email');
        reffreancenic = reffreancenic.slice(0, -1);
        this.setState({
            loading: true,
        })
        const { TextInputAmount } = this.state;
        fetch('https://prod.directpay.lk/v1/mpg/api/external/cardManagement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Signature': this.state._signature,
                'x-api-key': 'b8b05983596e0a837979a1107f6e3094',

            },
            body: JSON.stringify({
                "amount": TextInputAmount,
                "cardId": this.state._card_id,
                "currency": "LKR",
                "merchantId": "SY10716",
                "refCode": parseFloat(reffreancenic),
                "reference": email,
                "type": "CARD_PAY"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(">>>>>>>>ref code L 2: " + responseJson.data.status);
                // console.log(">>>>>>>>ref code card id: " +this.state._card_id);
                // console.log(">>>>>>>>ref code ref code: " + reffreancenic);
                if (responseJson.data.status == "FAILED") {
                    this.setState({
                        isVisible: true,
                        errorMessage: responseJson.data.description
                    });
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 5. selected card payment fail  : "+responseJson.data.description)
                    this.RBSheet.close();
                } else if (responseJson.data.status == "SUCCESS") {
                    // console.log(">>>>>>>>ref code L: " + responseJson.data.reference);
                    console.log(">>>>>>>>>>>>>>>>>>>>>> 5. selected card payment pass  : "+responseJson.data.status)
                    this.doBillPayment();
                    // reference
                }else{
                    this.setState({
                        isVisible1: true,
                    });   
                }
            }).catch((error) => {
                console.error(error);
            })
    }
    async doBillPayment() {
        const { TextInputAccount } = this.state;
        const { TextInputAmount } = this.state;
        const billercode = await AsyncStorage.getItem('billerCode');
        let referance = this.state._transactionReferance
        JSHmac(TextInputAccount + TextInputAmount + billercode + "a1840a1b-986d-4c22-b16d-e3d9db64db46" + referance, "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
            .then(hash => {
                fetch('https://prod.directpay.lk/v2/backend/external/api/payBillAction', {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + hash,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "accountNumber": TextInputAccount,
                        "amount": TextInputAmount,
                        "billerCode": billercode,
                        "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
                        "reference": referance
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
        
                        if (responseJson.data.success == true) {
                            console.log(">>>>>>>>>>>>>>>>>>>>>> 6. do bil payment pass : "+responseJson.status)
                            this.setState({
                                loading: false,
                                isVisible2: true
                            });
                            this.checkPayment();
                        } else {
                            console.log(">>>>>>>>>>>>>>>>>>>>>> 6. do bil payment fail  : "+responseJson.status)
                            this.setState({
                                isVisible1: true,
                                loading: false,
                            });
                        }
                        console.log(responseJson.data);
                    }).catch((error) => {
                        console.error(error);

                    })
            })
            .catch(e => console.log(e));
    }
    checkPayment(){
        let referance = this.state._transactionReferance
        JSHmac("a1840a1b-986d-4c22-b16d-e3d9db64db46" + referance, "b42e20ddb267ce11f036675bf52b41dee5a72d1ae338d5a354e9796a67d022e1", CONSTANTS.HmacAlgorithms.HmacSHA256)
        .then(hash => {
            fetch('https://prod.directpay.lk/v2/backend/external/api/payBillAction', {
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + hash,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "merchantId": "a1840a1b-986d-4c22-b16d-e3d9db64db46",
                    "reference": referance
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
    
                    if (responseJson.data.success == true) {
                        console.log(">>>>>>>>>>>>>>>>>>>>>> 7. check payment : "+responseJson.status)
                        this.setState({
                            loading: false,
                            // isVisible2: true
                        });
                        this.checkPayment();
                    } else {
                        console.log(">>>>>>>>>>>>>>>>>>>>>> 7. check payment  : "+responseJson.status)
                        this.setState({
                            // isVisible1: true,
                            loading: false,
                        });
                    }
                    console.log(responseJson.data);
                }).catch((error) => {
                    console.error(error);

                })
        })
        .catch(e => console.log(e));
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
                        // this.selectedCardSignature(item.cardId)
                        this.setSectedCardDataToButton(item.mask, item.cardId)
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
                                width: windowWidth - 150,
                                height: windowHeight / 5,
                                // paddingLeft: 30,
                                // paddingBottom: 0,
                                // paddingTop: 13,

                                padding: 10
                            }}>
                            <View style={{ bottom: 0, paddingLeft: 0, bottom: 6 }}>
                                <View style={{ width: windowWidth / 3, height: 45 }}>
                                    <Text style={(styles.dateText, { color: 'white', margin: 8, fontSize: 12, })}>
                                        {item.issuer}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ bottom: -28 }}>
                                <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>  {item.mask}</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: -10, width: windowWidth / 1.8, marginTop: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 14, marginLeft: 15 }}>  {item.cardId}</Text>
                                    <Text style={{ color: 'white', fontSize: 14, }}>  {item.brand}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>

            </ListItem>
        );
    };
    keyExtractor = (item, index) => index.toString();
    render() {
        let { isLoading, isSelectedCard, isVisible, isVisible1, loading, isVisible2,TextInputAmount } = this.state

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
                                <Text style={styles.labelText}>Account/Phone Number</Text>
                                <TextInput
                                    style={[
                                        styles.labelTextContainer,
                                        { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                    ]}
                                    autoFocus={false} onChangeText={TextInputValue => this.setState({ TextInputAccount: TextInputValue })} placeholder="Enter Phone Number Here"
                                />
                                <Text style={{ color: 'red' }}>{this.state.phoneError}</Text>
                                <Text style={styles.labelText}>Amount</Text>
                                <TextInput
                                    style={[
                                        styles.labelTextContainer,
                                        { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                    ]}
                                    keyboardType="numeric"
                                    autoFocus={false} value={this.state.TextInputAmount} onChangeText={TextInputValue => this.setState({ TextInputAmount: TextInputValue })} placeholder="Enter Amount Here"
                                />
                                <Text style={{ color: 'red' }}>{this.state.amountError}</Text>
                                <Text style={styles.labelText}>Remark</Text>

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
                            title="Select Your Card"
                            titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                            buttonStyle={{
                                backgroundColor: 'orange',
                                borderRadius: 8,
                                // width: 100,
                                paddingHorizontal: 10,
                                padding: 11,
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
                        <View style={{ flex: 1, marginBottom: 30, paddingHorizontal: 10 }}>
                            <View style={{ paddingLeft: 20, }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Please Select your card</Text>
                            </View>
                            {isLoading ?
                                <View style={{ width: windowWidth, height: windowHeight / 4, justifyContent: 'center', alignItems: 'center' }}>
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
                            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                    <Text>You will be Paying Rs {TextInputAmount} via seleted</Text>
                                    <Text>payment method to</Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state._billerName}</Text>
                                </View>
                                {
                                    isSelectedCard ?
                                        <Button
                                            title={this.state._mask}
                                            loading={loading}
                                            titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                            buttonStyle={{
                                                backgroundColor: '#4E3CCE',
                                                borderRadius: 5,
                                                // width: 100,
                                                paddingHorizontal: 10,
                                                padding: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            onPress={() =>
                                                this.selectedCardPayment()
                                            }

                                        /> : <Button
                                            title="Select Payemt Card"
                                            titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                            buttonStyle={{
                                                backgroundColor: 'rgb(190,190,190)',
                                                borderRadius: 5,
                                                // width: 100,
                                                paddingHorizontal: 10,
                                                padding: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}

                                        />
                                }
                            </View>

                        </View>
                    </ScrollView>
                </RBSheet>
                <Modal
                    isVisible={isVisible}
                    // isVisible={true}
                    backdropOpacity={0.5}
                    animationIn={'bounceIn'}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#ea3f37',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 10,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="error"
                                    size={25}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />

                                <Text style={{ color: 'white' }}>Error</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: '#ea3f37',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: '#940700',
                                    marginLeft: -5,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                            }}>
                            <Text style={{ fontSize: 14 }}>
                              {this.state.errorMessage}
                                , Please try again later
                            </Text>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                <Button
                                    title="Ok"
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: '#ea3f37',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isVisible: false,
                                            loading:false
                                        });
                                        {
                                            // this.deleteCartItemByModal();
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={isVisible1}
                    // isVisible={true}
                    backdropOpacity={0.5}
                    animationIn={'bounceIn'}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#ea3f37',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 8,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="error"
                                    size={25}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />

                                <Text style={{ color: 'white' }}>Error</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: '#ea3f37',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: '#940700',
                                    marginLeft: -5,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 50,
                                borderRadius: 5,
                            }}>
                            <Text style={{ fontSize: 14, justifyContent: 'center', alignItems: 'center' }}>
                                Something went wrong, Please try again later
                            </Text>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                <Button
                                    title="Ok"
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 15,
                                        paddingVertical: 5,
                                        borderColor: '#ea3f37',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isVisible1: false,
                                        });
                                        {
                                            this.props.navigation.navigate('BillerCategories');
                                            // this.deleteCartItemByModal();
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={isVisible2}
                    // isVisible={true}
                    backdropOpacity={0.5}
                    animationIn={'bounceIn'}>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: 'green',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 10,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="done"
                                    size={25}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />

                                <Text style={{ color: 'white' }}>Success</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: 'green',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: '#104c2e',
                                    marginLeft: -5,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                            }}>
                            <Text style={{ fontSize: 16 }}>
                                Payment is successful
                            </Text>

                            <Button
                                title="Ok"
                                titleStyle={{ color: 'black', fontSize: 17 }}
                                buttonStyle={{
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                    paddingVertical: 5,
                                    borderColor: '#3B7457',
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    this.setState({
                                        isVisible2: false,
                                    });
                                    this.RBSheet.close();
                                    this.props.navigation.navigate('BillerCategories');
                                }}
                            />
                        </View>
                    </View>
                </Modal>

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