import React, { Component } from 'react';
// import React, { Component } from 'react-native';
import { Text, ScrollView, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import { CustomHeader } from '../index';
// import { List, ListItem } from 'react-native-elements'
import { List, ListItem, Thumbnail } from 'native-base';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/EvilIcons';

// import { Card, CardItem, Button } from 'react-native-elements'

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'choose from galary',
    quality: 1
}

const styles = StyleSheet.create({
    TextInputStyleClass: {
        textAlign: 'center',
        // height: 200,

        backgroundColor: "#FFFFFF"
    }
});
export class NewPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            TextInputPost: '',
            imageSource: null,

            memberName: '',
        }

    }
    InputUsers = () => {
        const { TextInputPost } = this.state;
        // Alert.alert("hello");

        fetch('http://youandmenest.com/tr_reactnative/addpost.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_name: this.state.memberName,
                title: TextInputPost,

            })
        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);

            }).catch((error) => {
                console.error(error);
            })
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    };
    componentDidMount() {
        AsyncStorage.getItem('memberNames').then((mamberN) => {
            if (mamberN) {
                this.setState({ memberName: mamberN });
                console.log(this.state.memberName);
            }
        });
    }

    render() {

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <CustomHeader bgcolor='#FFFFFF' title="Create Post" isPost={true} navigation={this.props.navigation} bdcolor='#cccccc' />

                <View style={{ flexDirection: 'row', height: 60, paddingBottom: 10, }} >
                    <View style={{ height: 50, padding: 15 }}>
                        <Image source={IMAGE.ICON_Profile}
                            style={{ height: 35, width: 35, borderRadius: 60 }}
                        >
                        </Image>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10 }}>

                        <Text style={{ fontWeight: "bold" }}>{this.state.memberName}</Text>

                        {/* underlineColorAndroid='transparent' */}
                    </View>
                </View>
                <View style={{ flex: 1, padding: 0, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                    <TextInput autoFocus={false} multiline={true} underlineColorAndroid="transparent"
                        onChangeText={TextInputValue => this.setState({ TextInputPost: TextInputValue })}
                        placeholder="What's Your mind" style={styles.TextInputStyleClass} onPress={() => this.props.navigation.navigate('NewPost')}>
                        <Text style={{ padding: 8, paddingStart: 20, color: 'grey', fontSize: 25 }}> </Text>
                    </TextInput>
                    {/* <Image
                        source={this.state.imageSource!=null?this.state.imageSource:require('../images/back.png')}
                    /> */}
                    <TouchableOpacity style={{ flexDirection: 'row', height: 50, paddingBottom: 10, borderColor: '#cccccc', borderWidth: 0.5 }} onPress={this.selectPhoto.bind(this)} >
                        <View style={{ height: 50, paddingTop: 10, paddingLeft: 12, paddingEnd: 12 }}>
                            <Image source={IMAGE.ICON_CAMERA}
                                style={{ height: 26, width: 26, borderRadius: 0 }}
                            >
                            </Image>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
                            <Text style={{ fontWeight: "normal" }}>Photo/Video</Text>

                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', height: 50, paddingBottom: 10, borderBottomColor: '#cccccc', borderBottomWidth: 0.5 }} >
                        <View style={{ height: 50, paddingTop: 10, paddingLeft: 12, paddingEnd: 12 }}>
                            <Image source={IMAGE.ICON_TAG_FRIEND}
                                style={{ height: 26, width: 26, borderRadius: 0 }}
                            >
                            </Image>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
                            <Text style={{ fontWeight: "normal" }}>Tag Friend</Text>


                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, paddingBottom: 10, borderBottomColor: '#cccccc', borderBottomWidth: 0.5 }} >
                        <View style={{ height: 50, paddingTop: 10, paddingLeft: 12, paddingEnd: 12 }}>
                            <Image source={IMAGE.ICON_HAPPY_IMOGI}
                                style={{ height: 26, width: 26, borderRadius: 0 }}
                            >
                            </Image>
                        </View>

                        <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
                            <Text style={{ fontWeight: "normal" }}>Tag Friend</Text>


                        </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 20 }}
                        onPress={this.InputUsers }

                   >

                        <Text >
                            POST
                         </Text>

                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        );
    }
}
