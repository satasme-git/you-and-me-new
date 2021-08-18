
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

            TextInputPhone: '',

            TextInputName: '',
            TextInputEmail: '',
            TextInputpassword: '',
            TextInputAddress: '',
            TextInputNIC: '',
            TextInputRefNic: '',
            nview: false,
            pview: false,
            abc: '',
            lan: '',
            data: [],
        };


    }
    state = {
        scroll: new Animated.Value(0)
    }
    
    async componentDidMount() {
       
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
            isVisible6: true,
        });
        const { scroll } = this.state
        scroll.addListener(({ value }) => (this._value = value))


        const myArray = await AsyncStorage.getItem('member_email');


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
                console.log(responseJson);


                id = "";
                member_name = "";
                member_email = "";
                member_mobilenumber = "";
                member_password = "";
                member_address = "";
                member_nic = "";
                abc = "";

                // for (var i = 0; i < responseJson.length; i++) {

                id = responseJson.id


                member_name = responseJson.member_name
                member_email = responseJson.member_email
                member_mobilenumber = responseJson.member_mobilenumber
                member_password = responseJson.member_password

                member_address = responseJson.member_address
                member_nic = responseJson.member_nic
                // member_image = responseJson[i].member_image

                abc = responseJson.member_image;

                // }

                this.setState({
                    isLoading: false,
                    isVisible6: false,
                    dataSource: responseJson,
                    TextInputID: id,
                    TextInputName: member_name,
                    TextInputPhone: member_mobilenumber,
                    TextInputEmail: member_email,
                    TextInputpassword: member_password,
                    TextInputAddress: member_address,
                    TextInputNIC: member_nic,
                    abc: abc,

                })


  
                this.loadRefferalData();

    
            }).catch((error) => {
                console.error(error);
            })


           
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
        }).catch((err) => {
            console.log(err);
        });

        this.setState({
            isLoading: false,

            dataa: ''

        });
    }
    InputUsers() {

        this.setState({
            isLoading: true,
        });
        const { TextInputID } = this.state;
        const { TextInputName } = this.state;
        const { TextInputEmail } = this.state;
        const { TextInputPhone } = this.state;

        const { TextInputpassword } = this.state;
        const { TextInputAddress } = this.state;
        const { TextInputNIC } = this.state;



        fetch('https://youandmenest.com/tr_reactnative/api/update_member', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: TextInputID,
                member_name: TextInputName,
                member_email: TextInputEmail,
                member_mobilenumber: TextInputPhone,
                member_password: TextInputpassword,

                member_address: TextInputAddress,
                member_nic: TextInputNIC,
            }),

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

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

                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : nic inner " + responseJson);
                this.setState({
                    isLoading: false,
                });
            }).catch((error) => {
                console.error(error);
            })
    }
   async loadRefferalData() {
        // const myArray = await AsyncStorage.getItem('memberId');

        fetch('https://youandmenest.com/tr_reactnative/api/refferal/'+this.state.TextInputID, {
            method: 'get',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log("reffreadls L : " + responseJson);
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
                                // source={
                                //     require('../images/profiled.png')
                                // }

                                source={
                                    item.member_image != ""
                                      ? {
                                        uri:
                                          'https://youandmenest.com/tr_reactnative/public/images/Members/' +
                                          item.member_image,
                                      }
                                      :  require('../images/images1.jpg')
                                  }
                                style={{ width: 50, height: 50,overflow: 'hidden',borderRadius:150/2 }}
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

    keyExtractor = (item, index) => index.toString();
    renderForeground = () => {
        const { scroll, isVisible4, isVisible6, isLoading } = this.state

        const titleOpacity = scroll.interpolate({
            inputRange: [0, 106, 154],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        })
        return (
            <View style={styles.foreground}>
                <Animated.View style={{ opacity: titleOpacity }}>
                    <Image
                        source={
                            this.state.abc != "" ? { uri: "https://youandmenest.com/tr_reactnative/public/images/Members/" + this.state.abc } :
                                (this.state.imageSource !=null  ? this.state.imageSource : require('../images/images1.jpg'))
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

                            <BarIndicator style={{ marginTop: -20 }} color='#fbb146' />
                            <Text>loading ....</Text>

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
            <View style={{ flexDirection: 'row', backgroundColor: '#fbb146' }}>
                <FlashMessage duration={1000} />
                <View style={{ width: '15%', alignItems: 'center', padding: 5, marginLeft: 4 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18, backgroundColor: '#ffc470', padding: 5, paddingLeft: -5, width: 40, borderRadius: 15 }}
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
                        <Text style={styles.headerTitle}>STICKY HEADER</Text>
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
                                <View style={styles.labelContainer}>
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
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputNIC} onChangeText={TextInputValue => this.setState({ TextInputNIC: TextInputValue })} placeholder={i18n.t('profile.enternic')} label={i18n.t('profile.nic')}
                                        />
                                        <Text style={styles.labelText}>{i18n.t('profile.address')}</Text>
                                        <TextInput
                                            style={[
                                                styles.labelTextContainer,
                                                { padding: 10, width: windowWidth - 65, marginBottom: 5 },
                                            ]}
                                            autoFocus={false} value={this.state.TextInputAddress} onChangeText={TextInputValue => this.setState({ TextInputAddress: TextInputValue })} placeholder={i18n.t('profile.enteraddress')} label={i18n.t('profile.address')}
                                        />


                                    </View>
                                </View>

                                    {this.state.lan=="en"?
                                        <Button
                                        title={i18n.t('profile.button')}
                                        titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                        buttonStyle={{
                                            backgroundColor: 'red',
                                            borderRadius: 25,
                                            width: 80,
                                            paddingHorizontal:10,
                                            padding: 9,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() =>


                                            this.InputUsers()

                                        }
                                    />:
                                        <Button
                                    title={i18n.t('profile.button')}
                                    titleStyle={[styles.buttonText, { color: 'white', fontSize: 15 }]}
                                    buttonStyle={{
                                        backgroundColor: 'red',
                                        borderRadius: 25,
                                        width: 160,
                                        paddingHorizontal:10,
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
                                        <View>
                                            <Text style={styles.mainText}>Earnings last month</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>)
                    }

                ]}
                tabTextStyle={styles.tabText}
                tabTextContainerStyle={styles.tabTextContainerStyle}
                tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabsContainerBackgroundColor={'#fbb146'}
                tabsWrapperStyle={styles.tabsWrapper}
            >
            </StickyParallaxHeader>
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
        paddingLeft: 22,
    },
    message: {
        color: 'white',
        fontSize: 25,
        paddingTop: 24,
        paddingBottom: 7
    },
    headerWrapper: {
        backgroundColor: '#fbb146',
        width: '90%',
        paddingHorizontal: 24,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        margin: 12,
        marginLeft: -10
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
        backgroundColor: 'green'
    },
    tabText: {
        fontSize: 16,
        lineHeight: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: 'white'
    }, cardcontainer: {
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