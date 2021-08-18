import React, { Component } from 'react';
import { Text, ScrollView, Image, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Badge } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import i18n from 'i18n-js';
import FlashMessage, { showMessage } from "react-native-flash-message";

// import RNFetchBlob from 'react-native-fetch-blob';
import { BarIndicator } from 'react-native-indicators';
const options = {
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'choose from galary',
  quality: 1
}
export class MemberProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: "",
      TextInputID: '',
      TextInputName: '',
      TextInputEmail: '',
      TextInputpassword: '',
      TextInputAddress: '',
      memberNames: '',
      imageSource: null,
      dataa: null,
      abc: '',
      lan: '',
    }
  }
  InputUsers() {
    const { TextInputID } = this.state;
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;

    const { TextInputpassword } = this.state;
    const { TextInputAddress } = this.state;
    fetch('https://youandmenest.com/tr_reactnative/updateUser.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: TextInputID,
        member_name: TextInputName,
        member_email: TextInputEmail,

        member_password: TextInputpassword,

        member_address: TextInputAddress,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // Alert.alert(responseJson);
        showMessage({
          message: "Successfuly Updated ",
          // description: "successfuly deleted ",
          type: "success",
        })
      }).catch((error) => {
        console.error(error);
      })

  }
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('memberNames');
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
    // Alert.alert('AynStoreage : '+myArray);
    const data = new FormData();
    data.append("get_about", "true");

    return fetch('https://youandmenest.com/tr_reactnative/get_user_by_id.php?mname=' + myArray, {
      method: 'post',
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        id = "";
        member_name = "";
        member_email = "";
        member_mobilenumber = "";
        member_password = "";
        member_address = "";
        abc = "";

        for (var i = 0; i < responseJson.length; i++) {

          id = responseJson[i].id
          member_name = responseJson[i].member_name
          member_email = responseJson[i].member_email
          member_mobilenumber = responseJson[i].member_mobilenumber
          member_password = responseJson[i].member_password

          member_address = responseJson[i].member_address
          // member_image = responseJson[i].member_image

          abc = responseJson[i].member_image;

        }
        // s
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          TextInputID: id,
          TextInputName: member_name,
          TextInputEmail: member_email,
          TextInputpassword: member_password,
          TextInputAddress: member_address,
          abc: abc,

          // imageSource: source,

        }, function () { })

      }).catch((error) => {
        console.error(error)
      })
  }
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
    RNFetchBlob.fetch('POST', 'https://youandmenest.com/tr_reactnative/upload.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: 'image.png', type: 'image/png', data: aaaa },
      { name: 'member_id', data: myArray }
    ]).then((resp) => {
      // console.log(resp.text());
    }).catch((err) => {
      console.log(err);
    });

    this.setState({
      isLoading: false,

      dataa: ''

    });
  }
  render() {
    let { isLoading } = this.state
    if (isLoading) {
      return (
        <BarIndicator color='#fbb146' />
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <CustomHeader bgcolor='#fbb146' title={i18n.t('profile.headding')} isHome={true} navigation={this.props.navigation} bdcolor='#fbb146' />
          <FlashMessage duration={1000} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1 }}>
              <View style={{ marginTop: 0, marginLeft: 20 }}>
                {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Baby activity</Text> */}
                {/* <Text style={{ color: 'white' }}>Pregnancy Due Date Calculator</Text> */}
              </View>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bottom: 110 }}>
              {/* <Image source={{ uri: "https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/" + this.state.abc }} style={{ width: 50, height: 50 }} /> */}


              <Avatar
                rounded
                showEditButton
                size={150}
                source={
                  this.state.abc != '' ? { uri: "https://youandmenest.com/tr_reactnative/" + this.state.abc } :
                    (this.state.imageSource !== null ? this.state.imageSource : require('../images/profiled.png'))
                }
                containerStyle={{
                  margin: 10, shadowColor: 'rgba(0,0,0, .4)', // IOS
                  shadowOffset: { height: 3, width: 8 }, borderWidth: 6, borderColor: 'white', // IOS
                  shadowOpacity: 3, // IOS
                  shadowRadius: 5, elevation: 8
                }}
                onEditPress={() => console.log('edit button pressed')}
                onLongPress={() => console.log('component long pressed')}
                onPress={() => this.props.navigation.navigate('ProfileImageView')}
                editButton={{
                  name: 'edit'
                }}
                showAccessory
                onAccessoryPress={() => this.selectPhoto()}
                accessory={{ size: 33, style: { backgroundColor: 'gray', height: 42, paddingTop: 3, width: 42, borderRadius: 25, alignItems: 'center', alignContent: 'center' } }}
              >

              </Avatar>
              <View style={{ marginLeft: 0, flexDirection: 'column', marginBottom: -150 }}>
                <Title style={styles.title} >

                </Title>
                <Caption style={styles.caption}>
                  {this.state.TextInputEmail}
                </Caption>
              </View>

            </View>

            <View style={{
              flex: 1, justifyContent: 'center', paddingHorizontal: 15,
              paddingVertical: 0,
            }}>
              <TextInput autoFocus={false} value={this.state.TextInputName} onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label={i18n.t('profile.username')} ></TextInput>

              <TextInput autoFocus={false} value={this.state.TextInputEmail} onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label={i18n.t('profile.email')} ></TextInput>

              <TextInput autoFocus={false} value={this.state.TextInputpassword} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label={i18n.t('profile.password')}  ></TextInput>

              <TextInput autoFocus={false} value={this.state.TextInputAddress} onChangeText={TextInputValue => this.setState({ TextInputAddress: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label={i18n.t('profile.address')} ></TextInput>
              <TouchableOpacity style={{ marginTop: 30 }}
                onPress={() => {
                  this.InputUsers();
                }}


              >
                <LinearGradient colors={['#fbb146', '#f78a2c']}

                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0.9 }}
                  // locations={[0.3, 0.6,1]} 
                  style={styles.linearGradient}>
                  <Text style={styles.buttonText}>
                    {i18n.t('profile.button')}
                  </Text>
                </LinearGradient>

              </TouchableOpacity>



            </View>
          </ScrollView>


        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9100',


    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,

    elevation: 2,
  }, userInfoSection: {
    paddingLeft: 20,
  },
  header: {

    justifyContent: 'center',
    // alignItems: 'center',

    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    height: 180

  },
  title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18
  }, text: {
    color: 'gray',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  }, footer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',

    paddingHorizontal: 10,
    // paddingVertical: 30,
    height: 500

  }, container: {

  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  }, buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }, circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  }, linearGradient: {

    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },


});
