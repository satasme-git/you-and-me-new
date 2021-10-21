
import React, { Component } from 'react';
import { Text, View, Animated, StatusBar, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'
import { Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";
import i18n from 'i18n-js';
import { BarIndicator } from 'react-native-indicators';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-community/picker';
import RNDirectPayCardPayment from 'react-native-direct-pay-card-payment';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'choose from galary',
    quality: 1
}
export class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: new Animated.Value(0),
            isLoading: true,

            isVisible3: false,
            isVisible4: false,
            isVisible6: true,
            isVisible7: false,

            TextInputPhone: '',
            TextInputName: '',
            TextInputLastName: '',
            TextInputEmail: '',
            TextInputpassword: '',
            TextInputAddress: '',
            TextInputNIC: '',
            TextInputRoleName: '',
            TextInputRoleId: '',
            TextInputRefNic: '',
            nview: false,
            pview: false,
            abc: '',
            lan: '',
            data: [],
            cData: [],
            dataSource1: [],
            PickerValueHolder: '',
        };
    }
    state = {
        scroll: new Animated.Value(0)
    }
    showRoleDropDown() {
        this.setState({
            isVisible7: true,

        });
    }
    componentDidMount() {
        this.loadMemberDataById()
    }
    async loadMemberDataById() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> iiiii");
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
            isVisible6: true,
        });
        const { scroll } = this.state
        scroll.addListener(({ value }) => (this._value = value))
        const myArray = await AsyncStorage.getItem('member_email');
        const memberRole = await AsyncStorage.getItem('memberId');

        fetch('https://youandmenest.com/tr_reactnative/api/ge_member_byid', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_email: myArray,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                id = "";
                member_name = "";
                member_email = "";
                member_mobilenumber = "";
                member_password = "";
                member_address = "";
                member_nic = "";
                abc = "";
                role = "";
                id = responseJson.id
                member_name = responseJson.member_name
                member_lastname = responseJson.member_last_name
                member_email = responseJson.member_email
                member_mobilenumber = responseJson.member_mobilenumber
                member_password = responseJson.member_password
                member_address = responseJson.member_address
                member_nic = responseJson.member_nic
                abc = responseJson.member_image;
                role = responseJson.role_name;
                roleid = responseJson.member_role;

                this.setState({
                    isLoading: false,
                    isVisible6: false,
                    dataSource: responseJson,
                    TextInputID: id,
                    TextInputName: member_name,
                    TextInputLastName: member_lastname,
                    TextInputPhone: member_mobilenumber,
                    TextInputEmail: member_email,
                    TextInputpassword: member_password,
                    TextInputAddress: member_address,
                    TextInputNIC: member_nic,
                    TextInputRoleName: role,
                    TextInputRoleId: roleid,
                    abc: abc,
                })
                this.loadRefferalData();
                this.loadComData();
            }).catch((error) => {
                console.error(error);
            })
        this.memberRole();
    }
    memberRole() {
        fetch('https://youandmenest.com/tr_reactnative/api/view_role', {
            method: 'get',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                for (var i = 0; i < responseJson.length; i++) {
                    role_id = responseJson[i].id
                    role_name = responseJson[i].role_name
                    console.warn(role_id);
                }
                this.setState({
                    isLoading: false,
                    dataSource1: responseJson,
                });
            }).catch((error) => {
                console.error(error);
            })
    }
    handleChangeOption(itemValue) {
        if (itemValue !== 0) {
            this.setState({ PickerValueHolder: itemValue });
        }
    }
    renderContent = (label) => (
        <View style={styles.content}>
            <Text>{label}</Text>
        </View>
    )
    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                const imdata = response.data;
                this.setState({
                    isLoading: false,
                    imageSource: source,
                    abc: '',
                    dataa: imdata
                });

                this.uploadPhoto();
            }
        });
    };
    async uploadPhoto() {

        var aaaa = this.state.dataa;
        const myArray = await AsyncStorage.getItem('memberNames');
        const member_email = await AsyncStorage.getItem('member_email');
        RNFetchBlob.fetch('POST', 'https://youandmenest.com/tr_reactnative/api/upload', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'image', filename: 'image.png', type: 'image/png', data: aaaa },
            { name: 'member_email', data: member_email }
        ]).then((resp) => {
            console.log(resp.text());
            // this.loadMemberDataById();
        }).catch((err) => {
            console.log(err);
        });
        this.setState({
            isLoading: false,
            dataa: ''
        });
    }
    InputUsers() {

        const memberRole = AsyncStorage.getItem('memberId');
        this.setState({
            isLoading: true,
        });
        const { TextInputID } = this.state;
        const { TextInputName } = this.state;
        const { TextInputLastName } = this.state;
        const { TextInputEmail } = this.state;
        const { TextInputPhone } = this.state;
        const { TextInputpassword } = this.state;
        const { TextInputAddress } = this.state;
        const { TextInputNIC } = this.state;
        const { TextInputRoleId } = this.state;

        AsyncStorage.setItem('memberId', TextInputRoleId);
        fetch('https://youandmenest.com/tr_reactnative/api/update_member', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: TextInputID,
                member_name: TextInputName,
                member_last_name: TextInputLastName,
                member_email: TextInputEmail,
                member_mobilenumber: TextInputPhone,
                member_password: TextInputpassword,
                member_address: TextInputAddress,
                member_nic: TextInputNIC,
                member_role: TextInputRoleId,
            }),

        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                showMessage({
                    message: "Successfuly Updated ",
                    // description: "successfuly deleted ",
                    type: "success",
                })
                this.setState({
                    isLoading: false,
                });
            }).catch((error) => {
                console.error(error);
            })
    }
    addRefferal() {
        this.setState({
            isLoading: true,
        });
        const { TextInputRefNic } = this.state;
        const { TextInputID } = this.state;
        console.log(TextInputID)
        fetch('https://youandmenest.com/tr_reactnative/api/addrefferal', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: TextInputID,
                ref_nic: TextInputRefNic,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                });
            }).catch((error) => {
                console.error(error);
            })
    }
    async loadRefferalData() {
        // const myArray = await AsyncStorage.getItem('memberId');

        fetch('https://youandmenest.com/tr_reactnative/api/refferal/' + this.state.TextInputID, {
            method: 'get',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson,
                });
            })
            .catch((error) => {
                // console.error(error);
                this.setState({
                    errormsg: 1,
                });
            })
    }

    async loadComData() {
        // const myArray = await AsyncStorage.getItem('memberId');

        fetch('https://youandmenest.com/tr_reactnative/api/getEaning/' + this.state.TextInputID, {
            method: 'get',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    cData: responseJson,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                // console.error(error);
                // this.setState({
                //     errormsg: 1,
                // });
            })
    }
    emptyComponent = () => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F2F2F2',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>oops! There's no data here</Text>
            </View>
        );
    };
    renderItem = ({ item }) => {
        return (
            <Animatable.View animation="flipInX">
                <ListItem
                    style={{
                        paddingTop: 10,
                        flexDirection: 'row',
                        marginBottom: 15,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        marginLeft: 0,
                    }}>
                    <Left style={{ paddingLeft: 10 }}>
                        <View>
                            <Image
                                source={
                                    item.member_image != ""
                                        ? {
                                            uri:
                                                'https://youandmenest.com/tr_reactnative/public/images/Members/' +
                                                item.member_image,
                                        }
                                        : require('../images/images1.jpg')
                                }
                                style={{ width: 50, height: 50, overflow: 'hidden', borderRadius: 150 / 2 }}
                            />
                        </View>
                    </Left>
                    <Body style={{ marginLeft: -170 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 3,
                            }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>
                                {item.member_name}
                            </Text>
                        </View>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ fontSize: 10, color: 'gray' }}>
                            {item.member_nic}
                        </Text>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: 'gray',
                                marginTop: 5,
                            }}>
                            {item.member_email}
                        </Text>
                    </Body>
                </ListItem>
            </Animatable.View>
        );
    };
    setRoleData(id, roleName) {

        this.setState({
            isVisible7: false,
            TextInputRoleName: roleName,
            TextInputRoleId: id
        })
    }
    card() {
        // var reffreancenic = await AsyncStorage.getItem('member_nic');

        var reffreancenic = this.state.TextInputNIC;
        AsyncStorage.setItem('member_nic', reffreancenic);
        reffreancenic = reffreancenic.slice(0, -1);

        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>> : "+reffreancenic+" / "+ this.state.TextInputName+" / "+this.state.TextInputLastName+" / "+ this.state.TextInputEmail+" / "+this.state.TextInputPhone);

        RNDirectPayCardPayment.addCardToUser(
            'prod', //env : dev or prod
            'b8b05983596e0a837979a1107f6e3094',// apiKey
            'SY10716', // mid
            reffreancenic, //unique id of the user
            this.state.TextInputName, // firstname of the user
            this.state.TextInputLastName, // lastname of the user
            this.state.TextInputEmail, // email of the user
            this.state.TextInputPhone, // phone number of the user
            // 'chamil', // firstname of the user
            // 'pathirana', // lastname of the user
            // 'chamiljay88@mail.com', // email of the user
            // '0716460440', // phone number of the user
            
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
    renderItemRole = ({ item }) => {
        return (
            <Animatable.View animation="flipInX">
                <ListItem
                    style={{
                        // backgroundColor: 'rgba(255,255,255,0.9)',
                        marginLeft: 0,
                        paddingLeft: 15,
                        marginVertical: -7
                    }}
                    onPress={() => {
                        this.setRoleData(item.id, item.role_name);
                    }}
                >
                    {item.id==3?
                    <View>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight: 'normal' }}>
                            {item.role_name}
                        </Text>
                    </View>
                    :null
                    }
                    
                </ListItem>
            </Animatable.View>
        );
    };
    keyExtractor = (item, index) => index.toString();
    keyExtractor1 = (item, index) => index.toString();
    renderForeground = () => {
        const { scroll, isVisible4, isVisible6, isLoading, isVisible7 } = this.state
        const titleOpacity = scroll.interpolate({
            inputRange: [0, 106, 154],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.foreground}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <Animated.View style={{ opacity: titleOpacity, justifyContent: 'center', alignItems: 'center', top: -30 }}>
                    <Image
                        source={
                            this.state.abc != "" ? { uri: "https://youandmenest.com/tr_reactnative/public/images/Members/" + this.state.abc } :
                                (this.state.imageSource != null ? this.state.imageSource : require('../images/images1.jpg'))
                        }
                        style={[
                            { width: 90, height: 90, borderRadius: 25.5, backgroundColor: '#f78a2c' },
                        ]}
                    />
                    <Avatar
                        rounded
                        showEditButton
                        size={26}
                        icon={{ name: 'pencil', type: 'font-awesome', color: '#2e7d32' }}
                        containerStyle={{
                            marginTop: -22, marginLeft: 75,

                            backgroundColor: 'white',
                        }}
                        onPress={() => this.selectPhoto()}
                    />
                    <Text style={styles.message}>{this.state.TextInputName}</Text>
                    <Text style={{ color: 'white', marginBottom: 15, marginTop: -10 }}>{this.state.TextInputEmail}</Text>
                </Animated.View>
                <Modal
                    isVisible={isVisible4}
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
                                    name="mode-edit"
                                    size={25}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />
                                <Text style={{ color: 'white' }}>Add Reffaral Nic number</Text>
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
                            <Text
                                style={{
                                    color: 'black',
                                    paddingVertical: 5,
                                    marginLeft: 2,
                                    marginTop: 8,
                                }}>
                                NIC Number :
                            </Text>
                            <View
                                style={{
                                    borderColor: 'gray',
                                    borderRadius: 8,
                                    borderWidth: 0.5,
                                    backgroundColor: '#F2F2F2',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: windowWidth - 65,
                                }}>
                                <TextInput
                                    blurOnSubmit
                                    keyboardType="numeric"
                                    onChangeText={(TextInputValue) =>
                                        this.setState({ TextInputRefNic: TextInputValue })
                                    }
                                    style={{
                                        borderRadius: 8,
                                        backgroundColor: '#F2F2F2',
                                        paddingLeft: 10,
                                        width: windowWidth - 110,
                                    }}
                                    placeholder="Enter Nic Number"
                                    onEndEditing={this.clearFocus}
                                    autoFocus={false}
                                    onFocus={() =>
                                        this.setState({
                                            pview: false,
                                        })
                                    }
                                />
                                {this.state.pview == true ? (
                                    <Validation text={'Phone Number is Required'} />
                                ) : null}
                            </View>
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button
                                    title="Cancel"
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: 'red',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            isVisible4: false,
                                        })
                                    }
                                />
                                <Button
                                    title="Save"
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: 'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            isVisible4: false,
                                        });
                                        {
                                            this.addRefferal();
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={isVisible6}
                    // isVisible={isLoading}
                    transparent={true}
                    backdropOpacity={0.5}
                    animationIn={'bounceIn'}
                >
                    <View>
                        <View
                            style={{
                                backgroundColor: 'white',
                                height: 120,
                                marginHorizontal: 120,
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                                opacity: 0.9,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <BarIndicator style={{ marginTop: -20 }} color='#4E3CCE' />
                            <Text>loading ....</Text>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={isVisible7}
                    // isVisible={isLoading}
                    transparent={true}
                    backdropOpacity={0.5}
                    animationIn={'bounceIn'}
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <View
                            style={{
                                backgroundColor: 'white',
                                height: 220,
                                width: windowWidth - 100,
                                borderRadius: 5,
                                opacity: 0.9,
                            }}>

                            <Text style={{}}>{i18n.t('SignUp.pickerheading')}</Text>
                            <FlatList
                                initialScrollIndex={0}
                                nestedScrollEnabled={true}
                                contentContainerStyle={{

                                    paddingTop: StatusBar.currentHeight || 0,
                                    width: windowWidth - 25
                                }}
                                scrollEnabled={true}
                                keyExtractor={this.keyExtractor1}
                                data={this.state.dataSource1}
                                renderItem={this.renderItemRole}
                            />
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                <Button
                                    title="Cancel"
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 0,
                                        paddingVertical: 5,
                                        borderColor: 'red',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            isVisible7: false,
                                        })
                                    }
                                />

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    renderHeader = () => {
        const { scroll } = this.state
        let { navigation } = this.props
        const opacity = scroll.interpolate({
            inputRange: [0, 160, 210],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#4E3CCE' }}>
                <FlashMessage duration={1000} />
                <View style={{ width: '15%', alignItems: 'center', padding: 5, marginLeft: 4 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18, backgroundColor: 'white', padding: 5, paddingLeft: -5, width: 40, borderRadius: 15 }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon
                            name="chevron-back-outline"
                            iconStyle={{
                                fontWeight: 'normal',
                            }}
                            size={25}
                            color="black"
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerWrapper}>
                    <Animated.View style={{ opacity, }}>
                        <Text style={styles.headerTitle}>{this.state.TextInputName}</Text>
                    </Animated.View>
                    <Animated.View style={{ opacity, }}>
                        <Image
                            source={
                                this.state.abc != "" ? { uri: "https://youandmenest.com/tr_reactnative/public/images/Members/" + this.state.abc } :
                                    (this.state.imageSource != null ? this.state.imageSource : require('../images/images1.jpg'))
                            }
                            style={[
                                styles.profilePic,
                                { width: 30, height: 30, borderRadius: 50, marginLeft: -40 },
                            ]}
                        />
                    </Animated.View>
                </View>

            </View>
        )
    }
    render() {
        let { navigation } = this.props
        const { scroll } = this.state
        return (
            <StickyParallaxHeader
                foreground={this.renderForeground()}
                header={this.renderHeader()}
                parallaxHeight={200}
                headerHeight={50}
                headerSize={() => { }}
                onEndReached={() => { }}
                scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], { useNativeDriver: false })}
                tabs={[
                    {
                        title: i18n.t("profile.tabprofile"),
                        content: this.renderContent(<View style={{ padding: 10 }}>
                            <View
                                style={[styles.cardcontainer, { width: windowWidth - 25 }]}
                                activeOpacity={0.95}>
                                <View style={[styles.labelContainer,{paddingBottom: 0}]}>
                                    <View>
                                        <View>
                                            <Text style={styles.mainText}>{i18n.t("profile.userinfo")}</Text>
                                        </View>
                                        <Text style={styles.labelText}>{i18n.t('profile.username')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputName} onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} placeholder={i18n.t('profile.enterusername')} label={i18n.t('profile.username')}
                                        />
                                        <Text style={styles.labelText}>{i18n.t('profile.userlastname')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputLastName} onChangeText={TextInputValue => this.setState({ TextInputLastName: TextInputValue })} placeholder={i18n.t('profile.enterlastusername')} label={i18n.t('profile.username')}
                                        />
                                        <Text style={styles.labelText}>{i18n.t('profile.email')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputEmail} onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} placeholder={i18n.t('profile.enteremail')} label={i18n.t('profile.email')}
                                        />
                                        <Text style={styles.labelText}>{i18n.t('profile.mobile')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputPhone} onChangeText={TextInputValue => this.setState({ TextInputPhone: TextInputValue })} placeholder={i18n.t('profile.entermobile')} label={i18n.t('profile.mobile')}
                                        />
                                        
                                        <Text style={styles.labelText}>{i18n.t('profile.nic')}</Text>
                                        
                                        <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            keyboardType={'numeric'} 
                                            autoFocus={false} value={this.state.TextInputNIC} onChangeText={TextInputValue => this.setState({ TextInputNIC: TextInputValue })} placeholder={i18n.t('profile.enternic')} label={i18n.t('profile.nic')}
                                        />
                                        <Text style={{fontSize:15,marginLeft:-20,fontWeight:'bold'}}>V</Text>
                                        </View>
                                        
                                        <Text style={styles.labelText}>{i18n.t('profile.address')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputAddress} onChangeText={TextInputValue => this.setState({ TextInputAddress: TextInputValue })} placeholder={i18n.t('profile.enteraddress')} label={i18n.t('profile.address')}
                                        />
                                        <Text style={styles.labelText}>{i18n.t('profile.role')}</Text>
                                        <TouchableOpacity onPress={() =>
                                            this.showRoleDropDown()
                                        } >
                                            <View style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}>
                                                <Text

                                                    label={i18n.t('profile.address')}>{this.state.TextInputRoleName}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                                {this.state.lan == "en" ?
                                    <Button
                                        title={i18n.t('profile.button')}
                                        titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                        buttonStyle={{
                                            backgroundColor: '#4E3CCE',
                                            borderRadius: 25,
                                            width: 80,
                                            paddingHorizontal: 10,
                                            padding: 9,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() =>
                                            this.InputUsers()

                                        }
                                    /> :
                                    <Button
                                        title={i18n.t('profile.button')}
                                        titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                        buttonStyle={{
                                            backgroundColor: '#4E3CCE',
                                            borderRadius: 25,
                                            width: 160,
                                            paddingHorizontal: 10,
                                            padding: 9,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() =>
                                            this.InputUsers()

                                        }
                                    />
                                }
                            </View>
                        </View>)
                    },

                    {

                        title: i18n.t("profile.addbankcard"),
                        content: this.renderContent(
                            <View style={{ padding: 10, width: windowWidth }}>
                                <View style={{ marginLeft: 10, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <Text style={styles.mainText}>{i18n.t("profile.addbankcard2")}</Text>
                                    <Button
                                        title="Add Card"
                                        titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                        buttonStyle={{
                                            alignSelf: 'flex-end',
                                            // marginTop: 10,
                                            paddingVertical: 6,
                                            borderColor: 'white',
                                            paddingHorizontal: 10,
                                            backgroundColor: 'red',
                                            borderWidth: 0.6,
                                            borderRadius: 6,
                                        }}
                                        onPress={() =>
                                            this.card()
                                        }
                                    />
                                </View>

                            </View>
                            )

                    },
                    {
                        title: i18n.t("profile.tabreffral"),
                        content: this.renderContent(<View style={{ padding: 10 }}>
                            <View style={{ marginLeft: 10, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.mainText}>{i18n.t("profile.currnetReffral")}</Text>
                                <Button
                                    title="Add new"
                                    titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        // marginTop: 10,
                                        paddingVertical: 6,
                                        borderColor: 'white',
                                        paddingHorizontal: 10,
                                        backgroundColor: 'green',
                                        borderWidth: 0.6,
                                        borderRadius: 6,
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            isVisible4: true,
                                        })
                                    }
                                />
                            </View>
                            {/* <View
                                style={[styles.cardcontainer, { width: windowWidth - 25 }]}
                                activeOpacity={0.95}> */}
                            {/* <View style={styles.labelContainer}>
                                    <View>
                                        <View>
                                            <Text style={styles.mainText}>Current reffrels</Text>
                                        </View>

                                    </View>
                                </View> */}

                            <FlatList
                                initialScrollIndex={0}
                                nestedScrollEnabled={true}
                                contentContainerStyle={{
                                    // padding: 15,
                                    paddingTop: StatusBar.currentHeight || 0,
                                    width: windowWidth - 25
                                }}
                                //   ListEmptyComponent={this.emptyComponent}
                                scrollEnabled={true}
                                keyExtractor={this.keyExtractor}
                                data={this.state.data}
                                renderItem={this.renderItem}
                            />

                            {/* </View> */}
                        </View>)
                    },
                    {
                        title: i18n.t("profile.tabrerning"),
                        content: this.renderContent(<View style={{ padding: 10 }}>
                            <View style={{ marginLeft: 10, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={styles.mainText}>Earnings</Text>

                            </View>
                            <View
                                style={[styles.cardcontainer, { width: windowWidth - 25 }]}
                                activeOpacity={0.95}>
                                <View style={styles.labelContainer}>
                                    <View>
                                        {/* <View style={{flexDirection:'row'}}>
                                            <Text style={styles.mainText}>Earnings last month     : Rs.</Text> 
                                            
                                        </View> */}
                                        {this.state.cData.map((item,index)=>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}} key={index}>
                                        <Text style={[styles.mainText,{paddingRight:25}]}>{item.month}  </Text> 
                                        <Text style={styles.mainText}>: Rs. {item.points}.00</Text> 
                                        
                                    </View>
                                        )}

                                    </View>
                                </View>
                            </View>
                        </View>)
                    }

                ]}
                tabTextStyle={styles.tabText}
                tabTextContainerStyle={styles.tabTextContainerStyle}
                tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabTextActiveStyle={{ color: 'black' }}
                tabsContainerBackgroundColor={'#4E3CCE'}
                tabsWrapperStyle={styles.tabsWrapper}
            >
            </StickyParallaxHeader>
        )
    }
}
class RedPickerItem extends Component {
    render() {
        return (
            <Picker.Item {...this.props} style={{ color: '#fff', placeholderTextColor: '#fff' }} />
        )
    }
}

const styles = StyleSheet.create({
    content: {
        height: 1000,
        marginTop: 0
    },
    foreground: {
        flex: 1,
        justifyContent: 'flex-end',
        // paddingLeft: 22,
    },
    message: {
        color: 'white',
        fontSize: 25,
        paddingTop: 4,
        paddingBottom: 7
    },
    headerWrapper: {
        backgroundColor: '#4E3CCE',
        width: '90%',
        paddingHorizontal: 24,
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        // margin: 0,
        marginTop: 13,
        marginLeft: -10,

    },
    tabsWrapper: {
        paddingVertical: 12
    },
    tabTextContainerStyle: {
        backgroundColor: 'transparent',
        borderRadius: 18,
        marginBottom: 10
    },
    tabTextContainerActiveStyle: {
        backgroundColor: 'white',



    },
    tabText: {
        fontSize: 16,
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: 'white'
    }, cardcontainer: {
        marginTop: 5,
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
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
    },
    labelTextContainer: {
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 16,
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
    },
    mainText: {
        fontSize: 20,
        lineHeight: 24,
        color: 'black',
        paddingTop: 8,
        paddingBottom: 20,
        fontFamily: 'AvertaStd-Semibold',
    },
    radioButtonText: {
        paddingVertical: 8,
        fontSize: 12,
        color: 'gray',
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 24,
        color: 'black',
        fontFamily: 'AvertaStd-Semibold',
    },
})