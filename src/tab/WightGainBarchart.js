
import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { CustomHeader } from '../index';
import Database from '../Database';
import { ECharts } from "react-native-echarts-wrapper";
import *as Animatable from 'react-native-animatable';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Swipeout from 'react-native-swipeout';
import RBSheet from "react-native-raw-bottom-sheet";
import CalendarStrip from 'react-native-slideable-calendar-strip';
import FlashMessage, { showMessage } from "react-native-flash-message";
import moment from 'moment'; // 2.20.1
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';

// import Echarts from 'native-echarts';
const db = new Database();
var swipeoutBtns = [
  {
    text: 'Button'
  }
]

export class WightGainBarchart extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  onButtonClearPressed = () => {
    this.chart.clear();
  };
  refreshFlatList = (deletedKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: deletedKey,
      };
    });
  }
  constructor() {
    super();
    this.state = {
      deletedRowKey: null,
      selectedDate: new Date(),
      prodId: '',
      prodName: '',
      prodDesc: '',
      dbs: '',
      isLoading: false,
      basicOkCancelVisible: false,
      lan: '',
      data: {
        // color: ['#4cabce', '#d50000', '#003366', '#e5323e'],
        color: ['#4cabce', '#d50000', '#003366'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [ i18n.t('weightGain.min'),  i18n.t('weightGain.your'), i18n.t('weightGain.max'),]
        },

        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        backgroundColor: ' white',
        series: [
          {
            // name: 'Forest',
            type: 'bar',
            name: i18n.t('weightGain.min'),
            stack: 'color',
            barGap: 0,
            // label: labelOption,
            data: [0]
          },
          {
            name: i18n.t('weightGain.your'),
            type: 'bar',
            // label: labelOption,
            data: [0]
          },
          {
            name: i18n.t('weightGain.max'),
            type: 'bar',
            //  label: labelOption,
            data: [0]
          },



        ]

      }
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  async componentDidMount() {
    this.setState({
        lan: await AsyncStorage.getItem('lang'),
    });
}
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.getData();
    // this.viewListData();
  }
  getData() {
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];
    var temp5 = [];
    var _monthDate;
    var tempMin = 0;
    var weight_firstMonth = 0;
    var finalValue = 0;
    var minValue = 0;
    var maxValue = 0;
    var temppp = 0;
    var temppp2 = 0;
    var tempmax = 0;
    const self = this;
    const dataClone = { ...self.state.data }
    db.listWeightGain(this.state.dbs).then((data) => {

      result = data;
      if (result == 0) {
        for (var i = 0; i < 3; i++) {


        }
        dataClone.series[0].data = [1, 1, 1];
        dataClone.series[1].data = [1, 1, 1];
        dataClone.series[2].data = [1, 1, 1];

        // dataClone.xAxis[0].data = [0,0,0];
        dataClone.color[0] = ['rgba(242, 242,242, 0.2)'];
        dataClone.color[1] = ['rgba(242, 242,242, 0.1)'];
        dataClone.color[2] = ['rgba(242, 242,242, 0.2)'];

        this.setState({
          isLoading: false,
          _list_wgData: '',


        });
      } else {

        for (var i = 0; i < result.length; i++) {
          if (i == 0) {
            weight_firstMonth = [result[i].wgValue];
          }
          _monthDate = result[i].wgDate.substring(5, 10);
          temp2.push(parseFloat([result[i].wgValue]));
          temp3.push([_monthDate]);
          if (tempMin != 0) {

            minValue += (12 / 10);
            maxValue += (14 / 10);
            temppp = parseFloat(weight_firstMonth) + parseFloat(minValue.toFixed(2));
            tempmax = parseFloat(weight_firstMonth) + parseFloat(maxValue.toFixed(2));

            temp4.push(temppp);
            temp5.push(tempmax);

          } else {

            temppp = weight_firstMonth;
            tempmax = weight_firstMonth;
            temp4.push(parseFloat(temppp));
            temp5.push(parseFloat(tempmax));

          }

          tempMin = [result[i].wgValue];

        }
        dataClone.xAxis[0].data = temp3;
        dataClone.series[1].data = temp2;
        dataClone.series[0].data = temp4;
        dataClone.series[2].data = temp5;

        self.setState({
          isLoading: false,
          data: dataClone,
          _list_wgData: data,
          _min_weight: temppp,
          _max_weight: tempmax,
        });

      }
    }).catch((err) => {
      console.log(err);
    });
    db.lastWeightGain(this.state.dbs).then((data) => {

      result = data;
      if (result != 0) {
        var _lastValue = result;
        self.setState({
          _lastWeigtValue: _lastValue,
        });

      }
    }).catch((err) => {
      console.log(err);
    })
  }
  
  saveData() {
    this.RBSheet.close();
    const _format = 'YYYY-MM-DD'
    const _selectedDay = moment(this.state.selectedDate).format(_format);

    this.setState({
      // isLoading: false,
    });
    let data = {
      // pId: this.state.pId,
      wgDate: _selectedDay.toString(),
      wgValue: parseInt(this.state.TextInpuPbValue)
    }

    db.addWGvalue(this.state.dbs, data).then((result) => {
      // console.log(result);
      this.getData();

      //   this.props.navigation.state.params.onNavigateBack;
      //   this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);

    })
    this.getData();
  }

  deleteData(id) {

    this.setState({
      // isLoading: true
    });
    db.deleteWeight(this.state.dbs, id).then((result) => {

      this.getData();
      // this.getaAllClickData();

    }).catch((err) => {
      console.log(err);
      this.setState = {
        // isLoading: false
      }
    })
  }
  keyExtractor = (item, index) => index.toString();
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direaction) => {

      }, onOpen: (secId, rowId, direaction) => {

      },
      right: [
        {
          onPress: () => {

          },
          text: 'Delete', type: 'delete'
        }
      ],
      // rowId?
      sectionId: 1

    };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        <CustomHeader bgcolor='#ffc15a'gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" bcbuttoncolor='#fff' title={i18n.t('weightGain.wgchart')} navigation={this.props.navigation} bdcolor='#ffc15a' />
        <FlashMessage duration={1000} />
        <View style={styles.header}>

          <ECharts
            option={this.state.data}
            height={300}

          />
          {/* <Swipeout right={swipeoutBtns}>
            <View>
              <Text>Swipe me left</Text>
            </View>
          </Swipeout> */}

        </View>
        <Animatable.View style={styles.footer} animation="fadeInLeft">

          <View style={{ padding: 5 }}>
            <Text style={{ paddingVertical: 10, fontSize: 18, marginLeft: 18, fontWeight: 'bold' }}>{i18n.t('weightGain.buttonhis')}</Text>

            <FlatList

              style={{
                backgroundColor: 'white', marginVertical: 0,
                //  borderRadius: 16,
                // elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.7,
                shadowRadius: 8,
                marginBottom: 50,

              }}
              ListEmptyComponent={this.emptyComponent}
              keyExtractor={this.keyExtractor}
              data={this.state._list_wgData}

              // renderItem={this.renderItem}

              renderItem={({ item }) =>
                <Swipeout {...swipeSettings} style={{ backgroundColor: 'white' }}>
                  <ListItem
                    style={{
                      height: 50, paddingTop: 15,

                    }}

                    parentFlatList={this}
                  >


                    <Left >
                      <Icon
                        name='bar-chart'
                        type='font-awesome'
                        color='#009688'
                        iconStyle={{ fontSize: 20, paddingLeft: 10, paddingRight: 10,backgroundColor: '#e0f2f1', borderRadius: 8, }}
                        onPress={() => console.log('hello')} />
                    </Left>

                    <Body style={{ marginLeft: -160 }}>
                      <Text style={{ color: 'gray', fontSize: 12 }}>{item.wgDate}</Text>
                      <Text style={styles.dateText}>{item.wgValue} kg</Text>
                    </Body>
                    <Right>
                      <View style={styles.iconMore}>
                        <Icon
                          type='font-awesome'
                          color='gray'
                          iconStyle={{ fontSize: 18 }}
                          name="trash-o" color="gray"
                          onPress={() => {
                            this.deleteData(item.wgId); showMessage({

                              message: "Hello there",
                              description: "successfuly deleted " + `${item.wgDate}`,
                              type: "success",
                            })
                          }}
                        />
                      </View>
                    </Right>
                  </ListItem>
                </Swipeout>
              }
            />

          </View>

          {/* </View> */}

        </Animatable.View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          // closeOnPressMask={false}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20
            }
          }}

        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{ flex: 1 }}>
              <CalendarStrip

                selectedDate={this.state.selectedDate}
                onPressDate={(date) => {
                  this.setState({ selectedDate: date });

                }}
                onPressGoToday={(today) => {
                  this.setState({ selectedDate: today });
                }}
                onSwipeDown={() => {
                  // alert('onSwipeDown');
                }}
                markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
              />



              {/* <TextInput /> */}
              <TextInput autoFocus={false} keyboardType='numeric' onEndEditing={this.clearFocus} onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="Enter weight value" />
              <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                onPress={() => this.props.navigation.navigate('PeriodCalandar', {
                data: ''
              })}
                <Text style={styles.buttonText}>Add Weight </Text>


              </TouchableOpacity>

            </View>
          </ScrollView>
        </RBSheet>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  footer: {
    flex: 2,
    backgroundColor: 'white',
    // borderTopLeftRadius: 30,
    borderTopRightRadius: 50,
    // paddingVertical: 30,
    //  paddingHorizontal: 20
  }, header: {
    flex: 3,
    backgroundColor: '#ffc15a'
    // justifyContent: 'center',
    // alignItems: 'center',
  }

})