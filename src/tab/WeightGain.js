import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions, FlatList, ScrollView } from 'react-native';
import { IMAGE } from '../constants/image';

import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { LineChart, } from "react-native-chart-kit";
import * as Progress from 'react-native-progress';
import Database from '../Database';
// import Icon from 'react-native-vector-icons/Fontisto';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import *as Animatable from 'react-native-animatable';

import CalendarStrip from 'react-native-slideable-calendar-strip';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-paper';
import moment from 'moment' // 2.20.1
import { BarIndicator, } from 'react-native-indicators';
import ActionButton from 'react-native-action-button';
import FlashMessage, { showMessage } from "react-native-flash-message";
const w = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;


const db = new Database();
export class WeightGain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _list_wgData: [],
      _lastWeigtValue: 0,
      _min_weight: 0,
      _max_weight: 0,
      selectedDate: new Date(),
      visible: true,
      isLoading: true,
      TextInpuPbValue: '',
      basicOkCancelVisible: false,
      dataSource: 10,
      dbs: '',
      data: {
        labels: ["i"],

        datasets: [
          {
            data: [0],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,255,255,${opacity})`, // optional
          },
          {
            data: [0],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(156,39,176, ${opacity})`, // optional
          },
          {
            data: [0],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,255,0, ${opacity})`, // optional
          },
        ]
      }
    }
    db.initDB().then((result) => {
      this.loadDbVarable(result);
    })
    this.loadDbVarable = this.loadDbVarable.bind(this);

  }
  componentDidMount() {
    // this.getData();
  }
  loadDbVarable(result) {
    this.setState({
      dbs: result,
    });
    this.getData();
    // this.viewListData();
  }
  emptyComponent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' }}>
        <Text >oops! There's no data here!</Text>
      </View>);
  }
  getData() {

    const self = this;
    db.listWeightGain(this.state.dbs).then((data) => {

      result = data;
      if (result == 0) {
        this.setState({
          isLoading: false,
          _list_wgData: '',

        });
      } else {

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
        const dataClone = { ...self.state.data }
        for (var i = 0; i < result.length; i++) {
          if (i == 0) {
            weight_firstMonth = [result[i].wgValue];
          }
          _monthDate = result[i].wgDate.substring(5, 10);
          temp2.push([result[i].wgValue]);
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
            temp4.push(temppp);
            temp5.push(parseFloat(tempmax) + 0.001);

          }

          tempMin = [result[i].wgValue];

        }


        dataClone.labels = temp3;
        dataClone.datasets[0].data = temp2;
        dataClone.datasets[1].data = temp4;
        dataClone.datasets[2].data = temp5;
        self.setState({

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

  saveWeight() {
    this.props.navigation.navigate('AddWeight')
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
  }
  keyExtractor = (item, index) => index.toString()
  render() {
    const chartConfig = {
      backgroundGradientFrom: "#90caf9",
      backgroundGradientFromOpacity: 10,
      backgroundGradientTo: "#1565c0",
      backgroundGradientToOpacity: 0.8,
      color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader bgcolor='#f2f2f2' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
        <FlashMessage duration={1000} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{ flex: 1 }}>
            {/* <View style={styles.backgroundImage} > */}
            {/* <Card  style={styles.cardHorizontal}> */}
            <LineChart
              data={this.state.data}

              width={Dimensions.get("window").width - 20}
              // yAxisLabel={"$"}
              height={175}
              // bezier
              verticalLabelRotation={-10}
              chartConfig={chartConfig}
              style={{
                marginVertical: 0,
                borderRadius: 16,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.7,
                shadowRadius: 8,
                // alignItems: 'center',
                backgroundColor: '#1565c0',
                marginHorizontal: 10
              }}
            />
            {/* </Card> */}

            <Animatable.View animation="zoomInUp" style={{ flex: 1, alignItems: 'center', }}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                  <View style={[styles.squrecolor, {
                    backgroundColor: 'white'
                  }]} />
                  <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Your weight</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                  <View style={[styles.squrecolor, {
                    backgroundColor: '#9c27b0'

                  }]} />
                  <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Min weight</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                  <View style={[styles.squrecolor, {
                    backgroundColor: '#ffc107'
                  }]} />
                  <Text style={{ fontSize: 12, color: 'gray', paddingLeft: 10 }}>Max weight</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                <Text >Your last weight values</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray", marginTop: 8 }}>{this.state._min_weight}<Text style={{ color: 'gray', fontSize: 15 }}>kg</Text></Text>
                  <Text style={{ color: 'gray', fontSize: 12, marginTop: -8 }}>MIn value</Text>
                </View>

                <Text style={{ fontSize: 60, fontWeight: "bold", marginTop: 0, marginHorizontal: 40 }}>{this.state._lastWeigtValue}<Text style={{ marginTop: 35, fontSize: 20, }}>kg</Text></Text>

                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 28, fontWeight: "bold", color: "gray", marginTop: 8 }}>{this.state._max_weight}<Text style={{ color: 'gray', fontSize: 15 }}>kg</Text></Text>
                  <Text style={{ color: 'gray', fontSize: 12, marginTop: -8 }}>Max value</Text>
                </View>
              </View>

              <Progress.Bar progress={this.state._lastWeigtValue / 150} width={screenWidth - 20} color={'#f78a2c'} style={{ marginTop: 0 }} borderRadius={5} />
              <View style={{ flexDirection: "row", marginBottom: 15 }}>

                <View style={styles.innerCircle6} >
                  <Text style={{ color: '#fff', fontSize: 9 }}>{'<'}Under weight</Text>
                </View>
                <View style={styles.innerCircle7} >
                  <Text style={{ color: '#fff', fontSize: 9 }}>Normal weight</Text>
                </View>
                <View style={styles.innerCircle8} >
                  <Text style={{ color: '#fff', fontSize: 9 }}> {'>'}Over weight </Text>
                </View>
              </View>
            </Animatable.View >

            <Animatable.View animation="fadeInUp" style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
              <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>

              <FlatList

                style={{
                  backgroundColor: 'white', marginVertical: 0,
                  //  borderRadius: 16,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.7,
                  shadowRadius: 8,

                }}
                ListEmptyComponent={this.emptyComponent}
                keyExtractor={this.keyExtractor}
                data={this.state._list_wgData}

                // renderItem={this.renderItem}

                renderItem={({ item }) => <ListItem
                  style={{
                    height: 50, paddingTop: 15,

                  }}
                >
                  <Left>
                    <View style={styles.iconMore}>

                      <Icon

                        name='line-chart'
                        type='font-awesome'
                        color='gray'
                        iconStyle={{ fontSize: 18 }}
                        onPress={() => console.log('hello')} />
                    </View>
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
                }
              />
            </Animatable.View>
            {/* </View> */}

          </View>
          {/* <TouchableOpacity onPress={() =>
                this.RBSheet.open()
              } style={{
              
                backgroundColor: '#f78a2c',
                 padding: 10,
                borderRadius: 25,
               // marginTop: 20,
                alignSelf: 'flex-end',
                position: 'relative',
                bottom: 35,
               zIndex:999,

              }}>
                <Text style={styles.buttonText}>Period Start ?</Text>


              </TouchableOpacity> */}
          {/* <View style={styles.footer}>
          <View style={{ paddingLeft: 18, paddingTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Most Popular Exercises</Text>
            <Text style={{ color: 'gray' }}>Keeps your waist in shape</Text>
          </View>
          <ScrollView

            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
             
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

         
        </View> */}

        </ScrollView>
        <ActionButton buttonColor="#f78a2c" onPress={() =>
          this.RBSheet.open()
        }
          style={{ zIndex: 999 }}
        >
          {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

        </ActionButton>
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
                <Text style={styles.buttonText}>Add Weight </Text>


              </TouchableOpacity>

            </View>
          </ScrollView>
        </RBSheet>
      </SafeAreaView>
    );

  }
} const styles = StyleSheet.create({

  button: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    borderRadius: 25,
    // width:'200',
    width: (Dimensions.get("window").width - 50),
    marginTop: 15,
    marginLeft: 18,
    marginVertical: 5,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, dateText: {
    fontSize: 15,
    color: '#000',
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
  }, cardHorizontal: {
    height: 175,
    backgroundColor: 'white',
    // width: 300,
    width: (Dimensions.get("window").width - 20),
    // width: "90%",
    // backgroundColor: "white",
    borderRadius: 16,
    // padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    // alignItems: 'center',
    marginHorizontal: 10
  }, squrecolor: {
    width: 13, height: 13, elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
  }, innerCircle6: {
    width: (screenWidth - 20) / 3,
    height: 20,
    backgroundColor: '#ffc107',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle7: {
    width: (screenWidth - 20) / 3,
    height: 20,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center'
  }, innerCircle8: {
    width: (screenWidth - 20) / 3,
    height: 20,
    backgroundColor: '#e81e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
});