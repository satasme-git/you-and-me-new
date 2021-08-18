import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, View,StatusBar, TextInput, TouchableHighlight, DrawerLayoutAndroidBase, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { Avatar } from 'react-native-elements';
import Database from '../Database';
import { CustomHeader } from '../index';
import { Icon } from 'react-native-elements';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Swipeout from 'react-native-swipeout';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
const db = new Database();
const _formatTime = 'hh:mm:ss';

// const time = moment().format(_formatTime);

// const handleTimerComplete = () => alert("custom completion function");

const options = {

  text: {
    fontSize: 49,
    color: 'black',
    marginLeft: 7,
    marginTop: 10,
  }
};

export class BathTracking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      timerReset: false,
      stopwatchReset: false,
      _times: '',
      dbs: '',
      _start_Time: '',
      _end_time: '',
      _list_wgData: [],
      lan: '',

    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })
    this.loadDbVarable = this.loadDbVarable.bind(this);

    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.toggleStartwatch = this.toggleStartwatch.bind(this);
  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.loadData();
  }
  toggleStartwatch() {
    var start_Time = this.getFormattedTime();
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
      _start_Time: start_Time
    });

  }
  async componentDidMount() {
    this.setState({
      lan: await AsyncStorage.getItem('lang'),
    });
  }
  loadData() {
    let products = [];
    let _pdate = '';
    db.listBathsTimes(this.state.dbs).then((data) => {
      products = data;

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
  deleteData(id) {

    this.setState({
      // isLoading: true
    });
    db.deleteBath(this.state.dbs, id).then((result) => {

      this.loadData();
      // this.getaAllClickData();

    }).catch((err) => {
      console.log(err);
      this.setState = {
        // isLoading: false
      }
    })
  }
  emptyComponent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Text >{i18n.t('special_notes.oops')}</Text>
      </View>);
  }
  renderItem = ({ item }) => {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direaction) => {

      }, onOpen: (secId, rowId, direaction) => {

      },
      left: [
        {
          onPress: () => {
            this.deleteData(item.btId); showMessage({
              message: "Hello there",
              description: "successfuly deleted ",
              type: "success",
              hideOnPress: false,
            })
          },
          text: 'Delete', type: 'delete',
        }

      ],
      // rowId?
      sectionId: 1

    };
    return (
      <Swipeout {...swipeSettings} style={{ backgroundColor: 'white' }}>
        <ListItem style={{ marginTop: -10, paddingBottom: 5 }}>
          <Left >
            <View >

              <Icon
                name='check-circle'
                type='font-awesome'
                color='#009688'
                iconStyle={{ fontSize: 20, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#e0f2f1', borderRadius: 8, }}
                onPress={() => console.log('hello')} />
            </View>
          </Left>

          <Body style={{ marginLeft: -120 }}>
            <Text style={{ color: 'gray', fontSize: 12 }}>{item.btDate}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.btStart}  to {item.btEnd}</Text>

          </Body>
          <Right >
            <View style={styles.iconMore}>
              <Icon
                type='font-awesome'
                color='gray'
                iconStyle={{ fontSize: 25, padding: 8 }}
                name="angle-double-right" color="gray"

              />
            </View>
          </Right >

        </ListItem>
      </Swipeout>
    );

  };
  toggleStopwatch() {
    var end_time = this.getFormattedTime();
    this.setState({

      stopwatchStart: false,
      stopwatchReset: true,
      _end_time: end_time
    });

    let data = {
      date: moment().format("YYYY-MM-DD"),
      startTime: this.state._start_Time,
      endtime: end_time
    }
    db.addPBathTime(this.state.dbs, data).then((result) => {

    }).catch((err) => {
      console.log(err);

    });
    this.loadData();
  }

  resetStopwatch() {
    this.setState({
      stopwatchStart: false,
      stopwatchReset: true
    });

  }

  getFormattedTime() {
    var times = moment().format(_formatTime);

    return times;
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView >
        <FlashMessage duration={1000} />
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
        <CustomHeader bgcolor='#fbb146'  gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title=""  bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />

        <LinearGradient start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ height: 45, }}>

          <View style={{ marginTop: 0, marginLeft: 20 }}>

            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 5 }}>{i18n.t('babyactivity.bathtime')}</Text>

          </View>
        </LinearGradient>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Stopwatch laps msecs start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}

            getTime={this.getFormattedTime} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          {!this.state.stopwatchStart ?

            <Avatar
              rounded
              showEditButton
              size={62}

              icon={{ name: 'play', type: 'font-awesome', color: 'white' }}
              containerStyle={{
                //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                marginRight: 70,
                shadowOffset: { height: 3, width: 8 },
                borderWidth: 1, borderColor: 'white', // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 5, elevation: 2,
                backgroundColor: '#388e3c',


              }}
              onPress={this.toggleStartwatch}

            />
            :

            <Avatar
              rounded
              showEditButton
              size={62}
              icon={{ name: 'stop', type: 'font-awesome', color: 'white', }}
              containerStyle={{
                //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
                marginRight: 70,
                shadowOffset: { height: 3, width: 8 },
                borderWidth: 1, borderColor: 'white', // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 5, elevation: 2,
                backgroundColor: 'red'
              }}
              onPress={this.toggleStopwatch}
            />

          }

          <Avatar
            rounded
            showEditButton
            size={62}
            icon={{ name: 'undo', type: 'font-awesome', color: 'white' }}
            containerStyle={{
              //  shadowColor: 'rgba(0,0,0, 0.4)', // IOS
              shadowOffset: { height: 3, width: 8 },
              borderWidth: 1, borderColor: 'white', // IOS
              shadowOpacity: 3, // IOS
              shadowRadius: 5, elevation: 2,
              backgroundColor: '#fbb146'
            }}
            onPress={this.resetStopwatch}
          />



        </View>
        <View style={{ marginTop: 20, backgroundColor: 'white' }} >


          <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>{i18n.t('kick.buttonhis')}</Text>

          <FlatList
            showsHorizontalScrollIndicator={false}

            style={{ backgroundColor: 'white', marginBottom: 20 }}
            ListEmptyComponent={this.emptyComponent}
            keyExtractor={item => item.btStart}
            renderItem={this.renderItem}
            // keyExtractor={this.keyExtractor}
            data={this.state._list_wgData}

          />
        </View>
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
  }
})