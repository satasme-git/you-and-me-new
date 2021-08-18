import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Icon } from 'react-native-elements';
import { IMAGE } from './constants/image';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
  text: {
    height: 40, backgroundColor: 'white', borderRadius: 5, padding: 10,
  },
  textvalid: {
    backgroundColor: 'red',
  },
  textinvalid: {
    backgroundColor: 'green',
  },
});


export class CustomHeader extends Component {
  render() {
    let { navigation, isHome, title, bgcolor, bdcolor, isPost, bcbuttoncolor,gradient1,gradient2,titleColor } = this.props
    return (
      <LinearGradient 
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0.9 }}
      colors={[gradient1, gradient2]}
      style={{ flexDirection: 'row', height: 60,paddingTop:5, backgroundColor: bgcolor, borderBottomColor: bdcolor, borderBottomWidth: 0 }}
      >
      {/* <View style={{ flexDirection: 'row', height: 55, backgroundColor: bgcolor, borderBottomColor: bdcolor, borderBottomWidth: 1 }} > */}


        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            isHome ?
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="menu-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    // paddingLeft: 15,
                    // paddingRight: 15,
                    // paddingTop: 3,
                    padding: 25, paddingTop: 20
                  }}
                  size={30}
                  color="black"
                  onPress={() => navigation.openDrawer()}
                />
                {/* <Icon
                  // raised
                  name='bars'
                  type='font-awesome'
                  color='white'
                  iconStyle={{ fontSize: 30,fontWeight:'normal' }}
                  onPress={() => navigation.openDrawer()} /> */}
                {/* <Image style={{ width: 28, height: 28, marginLeft: 0,padding:4 }}
                  source={IMAGE.ICON_MENU_ICON}
                  resizeMode="contain"

                /> */}
              </TouchableOpacity>
              // #ffc470
              :
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18, backgroundColor: bcbuttoncolor, padding: 5, paddingLeft: -5, width: 40, borderRadius: 13 }}
                onPress={() => this.props.navigation.goBack()}
              >


                <Icon
                  name="chevron-back-outline"
                  iconStyle={{
                    fontSize: 25,
                    fontWeight: 'normal',
                    // paddingLeft: 15,
                    // paddingRight: 15,
                    // paddingTop: 3,
                    padding: 25, paddingTop: 20
                  }}
                  size={25}
                  color="black"
                  onPress={() => this.props.navigation.goBack()}
                />

                {/* <Icon
                  // raised
                  name='angle-left'
                  type='font-awesome'
                  color='black'
                  iconStyle={{ fontSize: 34,marginLeft:6 }}
                  onPress={() => this.props.navigation.goBack()} /> */}

                {/* <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={IMAGE.ICON_BACK}
                  resizeMode="contain"
                /> */}
                {/* <Text>Back</Text> */}
              </TouchableOpacity>

          }

        </View>



        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: titleColor, fontSize: 15, fontWeight: 'bold' }}>{title}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            isPost ? <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image style={{ width: 20, height: 20, marginRight: 10 }}
                source={IMAGE.ICON_SAVE_POST}
                resizeMode="contain"

              />
            </TouchableOpacity>
              : null

          }

        </View>
      {/* </View> */}
      </LinearGradient>
    )
  }
}