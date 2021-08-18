
import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase, StatusBar, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
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
import moment from 'moment'; // 2.20.1
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import FlashMessage, { showMessage } from "react-native-flash-message";
import SegmentedControlTab from "react-native-segmented-control-tab";
import i18n from 'i18n-js';
// import Echarts from 'native-echarts';
const db = new Database();
var swipeoutBtns = [
  {
    text: 'Button'
  }
]

export class BloodPresureBarChart extends Component {
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
      selectedIndex: 0,
      // backgr,
      selectedDate: new Date(),
      prodId: '',
      prodName: '',
      prodDesc: '',
      dbs: '',
      lan: '',
      isLoading: false,
      basicOkCancelVisible: false,
      data: {
        colors: ['#4cabce', '#d50000', '#003366'],
        // title: {
        //   text: 'Systolic',

        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [i18n.t('blood.high'), i18n.t('blood.Pre'), i18n.t('blood.ideal'), i18n.t('blood.low')]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 70,
          }
        ],
        series: [
          {
            name: i18n.t('blood.high'),
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: 'red',
                opacity: 0.9,
                lineStyle: {
                  color: 'red',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'red', opacity: 0.2 },
            data: []
          },
          {
            name: i18n.t('blood.Pre'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'yellow',
                opacity: 0.9,
                lineStyle: {
                  color: 'yellow',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'yellow', opacity: 0.2 },
            data: []
          },
          {
            name: i18n.t('blood.ideal'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'green',
                opacity: 0.9,
                lineStyle: {
                  color: 'green',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'green', opacity: 0.2 },
            data: []
          },
          {
            name:i18n.t('blood.low'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'blue',
                lineStyle: {
                  color: 'blue',
                  opacity: 0.2
                }
              }
            },
            areaStyle: { color: 'blue', opacity: 0.3 },
            data: []
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',

            itemStyle: {
              normal: {
                color: 'red',
                lineStyle: {
                  color: 'red',
                  opacity: 0.2
                }
              }
            },
            areaStyle: { color: 'red', opacity: 0.2 },
            data: []
          },

          {
            name: i18n.t('blood.your'),
            type: 'bar',
            data: [],
          }
        ]
      },

      data2: {
        colors: ['#4cabce', '#d50000', '#003366'],
        // title: {
        //   text: 'Diastolic',

        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: [i18n.t('blood.high'), i18n.t('blood.Pre'), i18n.t('blood.ideal'), i18n.t('blood.low')]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 40,
          }
        ],
        series: [
          {
            name: i18n.t('blood.high'),
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: 'red',
                opacity: 0.9,
                lineStyle: {
                  color: 'red',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'red', opacity: 0.2 },
            data: []
          },
          {
            name: i18n.t('blood.Pre'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'yellow',
                opacity: 0.9,
                lineStyle: {
                  color: 'yellow',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'yellow', opacity: 0.2 },
            data: []
          },
          {
            name:i18n.t('blood.ideal'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'green',
                opacity: 0.9,
                lineStyle: {
                  color: 'green',
                  opacity: 0.9
                }
              }
            },
            areaStyle: { color: 'green', opacity: 0.2 },
            data: []
          },
          {
            name: i18n.t('blood.low'),
            type: 'line',
            // stack: '总量',
            itemStyle: {
              normal: {
                color: 'blue',
                lineStyle: {
                  color: 'blue',
                  opacity: 0.2
                }
              }
            },
            areaStyle: { color: 'blue', opacity: 0.3 },
            data: []
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',

            itemStyle: {
              normal: {
                color: 'red',
                lineStyle: {
                  color: 'red',
                  opacity: 0.2
                }
              }
            },
            areaStyle: { color: 'red', opacity: 0.2 },
            data: []
          },

          {
            name: i18n.t('blood.your'),
            type: 'bar',
            data: [],
          }
        ]
      }
    };
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })
    this.loadDbVarable = this.loadDbVarable.bind(this);
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };
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
    var temp6 = [];
    var temp7 = [];
    var temp8 = [];

    var temp9 = [];
    var temp10 = [];
    var temp11 = [];
    var temp12 = [];
    var temp13 = [];
    var _monthDate;
    const self = this;
    const dataClone = { ...self.state.data }
    const dataClone2 = { ...self.state.data2 }
    db.listBloodPresure(this.state.dbs).then((data) => {
      let result = data;
      if (result == 0) {

        this.setState({
          isLoading: false,
          _list_bpData: '',

        });

      } else {


        for (var i = 0; i < result.length; i++) {
          _monthDate = result[i].bpDate.substring(5, 10);

          temp3.push([_monthDate]);
          temp4.push(parseFloat([result[i].bpslow]));
          temp5.push(parseFloat([result[i].bpsideal]));
          temp6.push(parseFloat([result[i].bpsprehigh]));
          temp7.push(parseFloat([result[i].bpshigh]));
          temp8.push(parseFloat([result[i].bpValue]));


          temp9.push(parseFloat([result[i].bpdlow]));
          temp10.push(parseFloat([result[i].bpdideal]));
          temp11.push(parseFloat([result[i].bpdprehigh]));
          temp12.push(parseFloat([result[i].bpdhigh]));
          temp13.push(parseFloat([result[i].bpdstValue]));
        }
        dataClone.xAxis[0].data = temp3;
        dataClone.series[0].data = temp7;
        dataClone.series[1].data = temp6;
        dataClone.series[2].data = temp5;
        dataClone.series[3].data = temp4;
        dataClone.series[5].data = temp8;

        dataClone2.xAxis[0].data = temp3;
        dataClone2.series[5].data = temp13;
        dataClone2.series[3].data = temp9;
        dataClone2.series[2].data = temp10;
        dataClone2.series[1].data = temp11;
        dataClone2.series[0].data = temp12;

        self.setState({
          isLoading: false,
          data: dataClone,
          data2: dataClone2,
          _list_bpData: data,
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


    }).catch((err) => {
      console.log(err);

    })
    this.getData();
  }
  deleteData(id) {

    this.setState({
      // isLoading: true
    });
    db.deleteBlood(this.state.dbs, id).then((result) => {

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
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#fff" />
        <FlashMessage duration={1000} />
        <CustomHeader bgcolor='white'  gradient1="transparent" gradient2="transparent" title={i18n.t('blood.bldchart')} bcbuttoncolor='#F2F2F2' navigation={this.props.navigation} bdcolor='white' />
        <View style={styles.header}>

          <View style={{ marginTop: 0, marginLeft: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{i18n.t('blood.chartheadding')}</Text>
         
          </View>
          <SegmentedControlTab
        values={[i18n.t('blood.syst'), i18n.t('blood.dias')]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}

            borderRadius={0}
            tabsContainerStyle={{ height: 40, backgroundColor: '#F2F2F2' }}
            tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderColor: 'transparent', borderRadius: 5 }}
            activeTabStyle={{ backgroundColor: 'white', margin: 2 }}
            tabTextStyle={{ color: '#444444', fontWeight: 'bold' }}
            activeTabTextStyle={{ color: '#888888' }}
          />
          {this.state.selectedIndex === 0
            &&

            <ECharts
              option={this.state.data}
            // height={300}
            />

          }
          {this.state.selectedIndex === 1
            && <ECharts
              option={this.state.data2}
            // height={300}
            />
          }
          {/* </View> */}


          {/* <Swipeout right={swipeoutBtns}>
            <View>
              <Text>Swipe me left</Text>
            </View>
          </Swipeout> */}

        </View>
        <Animatable.View style={styles.footer} animation="fadeInLeft">

          <View style={{ padding: 5, marginBottom: 30 }}>
          <Text style={{ paddingVertical: 10, fontSize: 18, marginLeft: 18, fontWeight: 'bold' }}>{i18n.t('blood.buttonhis')}</Text>

            <FlatList

              style={{ backgroundColor: '#ffc15a', marginBottom: 20 }}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.emptyComponent}
              data={this.state._list_bpData}
              // renderItem={this.renderItem}

              renderItem={({ item }) => <ListItem
                style={{ paddingTop: 8, paddingBottom: 8, borderBottomColor: 'white' }}

              >
                <Left >
                  <Icon
                    name='heartbeat'
                    type='font-awesome'
                    color='red'
                    iconStyle={{ fontSize: 20, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, backgroundColor: '#ffa726', borderRadius: 8, }}
                    onPress={() => console.log('hello')} />
                </Left>

                <Body style={{ marginLeft: -170 }}>
                  <Text style={{ color: 'white', fontSize: 13 }}>{item.bpDate}</Text>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontSize: 12, marginTop: 2 }}>Systolic </Text>
                    <Text style={styles.dateText}>{item.bpValue} mm hg</Text>
                    <Text style={{ color: '#fff', fontSize: 12, marginTop: 3 }}> Diastolic</Text>
                    <Text style={styles.dateText}> {item.bpdstValue} mm hg</Text>
                  </View>
                </Body>
                <Right>
                  <View style={styles.iconMore}>
                    <Icon
                      type='font-awesome'
                      color='white'
                      iconStyle={{ fontSize: 18, padding: 8 }}
                      name="trash-o" color="white"
                      onPress={() => {
                        this.deleteData(item.bpId); showMessage({

                          message: "Hello there",
                          description: "successfuly deleted " + `${item.bpDate}`,
                          type: "success",
                        })
                      }}
                    />
                  </View>

                </Right>
              </ListItem>
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
    backgroundColor: '#ffc15a',
    // borderTopLeftRadius: 30,
    borderTopRightRadius: 50,
    // paddingVertical: 30,
    //  paddingHorizontal: 20

  }, header: {
    flex: 3,
    // backgroundColor: '#ffc15a'
    // justifyContent: 'center',
    // alignItems: 'center',
  }, container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'red'
  },

})