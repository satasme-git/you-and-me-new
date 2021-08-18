import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';
import { IMAGE } from './constants/image';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import { Avatar, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
export class CustomDrawerContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      name: '',
      abc: '',
      lan: '',
    }
  }
  doLogout() {
    AsyncStorage.removeItem("memberNames").then(
      res => {
        this.props.navigation.navigate('Login');
        AsyncStorage.removeItem("memberId");
      }
    );
  }
  async componentDidMount() {
    const name = await AsyncStorage.getItem('memberNames');
    const myArray = await AsyncStorage.getItem('member_email');
    this.setState({
      userName: myArray,
      name: name,
      lan: await AsyncStorage.getItem('lang'),
    });


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
      

          // abc = "";

          // abc = responseJson.member_image;


          this.setState({
              isLoading: false,
  
              abc: responseJson.member_image,

          })


      }).catch((error) => {
          console.error(error);
      })

  }
  render() {
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', opacity: 0.9 }}>

        <ScrollView>

          <ImageBackground
            source={require('./images/undraw_pilates_gpdb.png')}
            style={{ width: 300, paddingLeft: 20, paddingBottom: 10, paddingTop: 50, backgroundColor: '#fbb146' }}
          >

            <Avatar
              rounded
              showEditButton
              size={90}
              // source={{ uri: "https://youandmenest.com/tr_reactnative/public/images/Members/" + this.state.abc }
              // }

              source={
                this.state.abc != ""
                  ? {
                    uri:
                      'https://youandmenest.com/tr_reactnative/public/images/Members/' +
                      this.state.abc,
                  }
                  :  require('./images/images1.jpg')
              }

              onEditPress={() => console.log('edit button pressed')}
              onLongPress={() => console.log('component long pressed')}
              onPress={() => this.props.navigation.navigate('ProfileImageView')}
              editButton={{
                name: 'edit'
              }}

            >

            </Avatar>
            <Text style={{ color: "black", fontSize: 15, marginTop:10}}>{this.state.name}</Text>
            <Text style={{ color: "black", fontSize: 15, }}>{this.state.userName}</Text>
          </ImageBackground>

          <TouchableOpacity style={[styles.FacebookStyle,{marginTop:20}]} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Icon
              name="home-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 20,paddingTop:20
              }}
              size={21}
              color="black"
            />

           
            <Text style={styles.TextStyle}>{i18n.t('drawer.home')} </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('member')}>
           
          <Icon
              name="person-outline"
              iconStyle={{
                fontSize: 25,
                fontWeight: 'normal',

                padding: 25,paddingTop:20
              }}
              size={23}
              color="black"
            />
  
            <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}>{i18n.t('drawer.profile')} </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('UserProfile')}>
          <Icon
              name="person-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 25,paddingTop:20
              }}
              size={21}
              color="black"
            />
            <Text style={styles.TextStyle}>{i18n.t('drawer.profile')} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('offersWebView')}>
          <Icon
              name="gift-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 25,paddingTop:20
              }}
              size={21}
              color="black"
            />
            <Text style={styles.TextStyle}>{i18n.t('drawer.offers')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('blogWebView')}>
          <Icon
              name="newspaper-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 25,paddingTop:20
              }}
              size={21}
              color="black"
            />
            <Text style={styles.TextStyle}>{i18n.t('drawer.blog')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('BillerCategories')}>
          <Icon
              name="newspaper-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 25,paddingTop:20
              }}
              size={21}
              color="black"
            />
            <Text style={styles.TextStyle}>{i18n.t('drawer.billpay')}</Text>
          </TouchableOpacity>
          
          
          <View style={styles.SeparatorLine} />
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => this.doLogout()}>
           
          <Icon
              name="power-outline"
              iconStyle={{
                fontSize: 21,
                fontWeight: 'normal',
                padding: 25,paddingTop:20
              }}
              size={21}
              color="black"
            />
            <Text style={styles.TextStyle}>{i18n.t('drawer.logut')} </Text>
          </TouchableOpacity>
        

        </ScrollView>


      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  profile: {
    width: 80,
    height: 80,
    borderWidth: 8,
    borderRadius: 40,
    borderColor: '#fff'
  }, FacebookStyle: {
    flexDirection: 'row',
    marginLeft: 25,
    alignItems: 'center',
    // borderBottomWidth: 0.3,
    // borderBottomColor: 'gray',
    // backgroundColor: '#f78a2c',
    //borderWidth: .5,
    // borderColor: '#fff',
    height: 50,

    //borderRadius: 5,
    // margin: 5,

  }, ImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',

  }, TextStyle: {
    // color:'#fff'
    marginLeft:15
  },SeparatorLine:{
    borderWidth:0.2,
    marginTop:15,
    borderBottomColor:'black'
  }
});