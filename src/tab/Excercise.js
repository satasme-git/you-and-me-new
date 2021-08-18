import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import AsyncStorage from '@react-native-community/async-storage';
import { CustomHeader } from '../index';
import i18n from 'i18n-js';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export class Excercise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
    }
  }
  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('memberNames');
    this.setState({
      userName: myArray,
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f2f2f2" />
        <CustomHeader bgcolor='#f2f2f2' gradient1="#F2F2F2" gradient2="#F2F2F2" titleColor="white" title="" bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#f2f2f2' />

        <View style={styles.header}>
          <View style={styles.backgroundImage} >
            {/* <Text>fdadadsadasd dsaasdasdad</Text>
            <Text>fdadadsadasd dsaasdasdad</Text>
            <Text>fdadadsadasd dsaasdasdad</Text>
            <Text>fdadadsadasd dsaasdasdad</Text>
            <Text>fdadadsadasd dsaasdasdad</Text> */}
            <ImageBackground
              source={IMAGE.ICON_EXCERCISE}
              style={{ width: 300, height: 270, marginLeft: 15, alignItems: 'flex-start', resizeMode: 'cover', position: 'absolute' }}>
              <View>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{i18n.t('excersice.headding')} {this.state.userName}</Text>
              <Text>{i18n.t('excersice.subheadding')}</Text>
              </View>
            </ImageBackground>
            {/* <Image style={{ width: 250, height: 270, marginLeft: 10, }}
              source={IMAGE.ICON_EXCERCISE}
              resizeMode="contain"
            /> */}
            {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Prepare baby bag</Text>


                    </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ paddingLeft: 18, paddingTop: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.t('excersice.subheadding')}</Text>
            <Text style={{ color: 'gray' }}>{i18n.t('excersice.subtopic')}</Text>
          </View>
          <ScrollView

            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
              {/* <Card > */}
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG1}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG2}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG3}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG4}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG5}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG6}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
            </View>

          </ScrollView>
        </View>

      </SafeAreaView>
    );
  }
} const styles = StyleSheet.create({

  button: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    borderRadius: 25,
    // width:'200',
    width: 150,

    marginTop: 15,
    marginLeft: 18,
    marginVertical: 5
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, dateText: {
    fontSize: 11,
    color: 'grey',
  }, insText: {
    color: "grey",
    fontSize: 12,
    marginLeft: 19,

  }, footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingVertical: 30,
    //  paddingHorizontal: 20
  }, header: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }, backgroundImage: {
    // height: height,
    position: "absolute",

    resizeMode: 'cover',

    // resizeMode: 'cover', // or 'stretch'
  }, container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  }, card: {
    height: 185,
    // width: (Dimensions.get("window").width / 2) - 20,
    // width: "45%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',


    margin: 5
  }
});