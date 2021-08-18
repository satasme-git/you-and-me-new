import React, { Component } from 'react';
import { Text, LogBox, View, SafeAreaView, Button, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// console.disableYellowBox=true;
LogBox.ignoreAllLogs(true);

import { LineChart, } from "react-native-chart-kit";
import Database from '../Database';
import ActionButton from 'react-native-action-button';

import DialogInput from 'react-native-dialog-input';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

import {
  MaterialDialog,
  MultiPickerMaterialDialog,
  SinglePickerMaterialDialog
} from "react-native-material-dialog";

const db = new Database();

const w = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;


export class MatirializeDialog extends Component {


  constructor(props) {
    super(props);
    this.state = {

      basicNoActionsVisible: false,
      basicNoTitleVisible: false,
      basicOkCancelVisible: false,
      basicCustomLabelsVisible: false,
      basicCustomColorsVisible: false,
      basicScrolledListVisible: false,
      basicMapVisible: false,
      multiPickerVisible: false,
      multiPickerSelectedItems: [],
      scrolledMultiPickerVisible: false,
      scrolledMultiPickerSelectedItems: [],
      singlePickerVisible: false,
      singlePickerSelectedItem: undefined,
      scrolledSinglePickerVisible: false,
      scrolledSinglePickerSelectedItem: undefined,



      visible: true,
      isLoading: true,
      dataSource: 10,
      data: {
        labels: ["january", "feb"],

        datasets: [
          {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
          },
          {
            data: [80, 80, 80],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          }, {
            data: [120, 120, 120],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          },
        ]
      }
    }
  }

  FloatingButtonEvent = () => {
    Alert.alert("dasdasdasd");
  }
  componentDidMount() {
    this.getData();
    // const self = this;
    // return fetch('https://api.mockaroo.com/api/12a7ead0?count=20&key=8ba88000')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     const dataClone = { ...self.state.data }
    //     const values = responseJson.map(value => value.Weight);

    //     dataClone.datasets[0].data = values;

    //     console.log("))))))))) : "+values);

    //     self.setState({
    //       //isLoading: false,
    //       data: dataClone,
    //     });


    //     console.log(JSON.stringify(responseJson))
    //     var temp = [];
    //     for (var i = 0; i < responseJson.length; i++) {
    //       console.log(responseJson[i].Weight)
    //       temp.push(responseJson[i].Weight)
    //       temp.push(responseJson[i].Weight)
    //     }

    //     this.setState({
    //       dataSource: temp
    //     })
    //     console.log("^^^^^^ :" + this.state.data);

    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  // componentDidMount() {
  // this.getData();
  // }
  getData() {
    const self = this;
    db.listBloodPresure().then((data) => {
      console.log(">>>> : " + data);
      result = data;
      if (result == 0) {
        db.addItemOfBloodPresure().then((result) => {
          // console.log(">>>> : " + data);

        }).catch((err) => {
          console.log(err);
        })
      } else {
        //  const dataClone = {...self.state.data}



        console.log(">>>>k : " + data);
        var temp2 = [];
        var temp3 = [];
        var temp4 = [];
        const dataClone = { ...self.state.data }
        for (var i = 0; i < result.length; i++) {

          // dataClone.datasets[0].data = result[i].bpValue;
          // const values = responseJson.map(value =>result[i].bpValue);

          //  dataClone.datasets[0].data = parseInt(result[i].bpValue);
          // console.log(">>>> ()()() ### : " + result[i].bpValue)
          // {
          //   x: xValue,
          //   y: yValue1
          // }


          // console.log(">>>>((((())))) ### : " + this.state.data)

          temp2.push([result[i].bpValue]);
          temp3.push([result[i].bpDate]);
          temp4.push([result[i].bpId]);

          // temp2.push("{" + result[i].x + ":'" + result[i].bpDate + "'," + result[i].y + ":" + result[i].bpValue + "}")

          // this.setState({
          //   dataSource: temp2,
          //   //  data: dataClone.datasets[0].data,
          // })
          // console.log("@@@@ : " + result[i].x);
        }
        dataClone.labels = temp3;
        dataClone.datasets[0].data = temp2;
        dataClone.datasets[1].data = temp4;

        self.setState({
          isLoading: false,
          data: dataClone,
        });

        console.log("$$$$ : " + temp3);
        // console.log("@@@@ >>>> dasdadasdasd:fff " + this.state.dataSource);

        //  this.viewListData();
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const data = {
      labels: ["feasdasdasdasdb"],
      datasets: [
        {
          data: [50],
          // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          // strokeWidth: 2 // optional
        }
      ],
      legend: ["Rainy Days"] // optional
    };
    const chartConfig = {
      backgroundGradientFrom: "#F57C00",
      backgroundGradientFromOpacity: 10,
      backgroundGradientTo: "#F57C00",
      backgroundGradientToOpacity: 0.8,
      color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    // let sampleData = [

    //   {
    //     seriesName: 'series2',
    //     data= [
    //       {
    //         x: '2020-10-20',
    //         y: [50]
    //       },


    //     ],
    //     color: 'red'
    //   }
    // ]
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='white' />


          {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linerGradient}
          colors={['#fff', '#fff', '#fff']}
        >
          <View style={styles.line}></View>
          <View style={[styles.line,{top:120,left:-100}]}></View>
          <View style={[styles.line,{top:140,left:0}]}></View>
        </LinearGradient> */}


          {/* <CustomHeader bgcolor='white' title="Settinfgs" isHome={true} navigation={this.props.navigation}  bdcolor='#f2f2f2'/> */}


          <View style={{ flex: 1, }}>


            <Card style={styles.cardHorizontal} >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
                <LineChart
                  data={this.state.data}
                  width={Dimensions.get("window").width - 20}
                  // yAxisLabel={"$"}
                  height={175}
                  bezier
                  verticalLabelRotation={-10}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 0,
                    borderRadius: 16
                  }}
                />

              </TouchableOpacity>
            </Card>

            {/* <PureChart
              data={[
                {
                  x: '2020-07-25',
                  y: 50
                }
              ]}

              type='line' width={'100%'} height={200} /> */}
            {/* <PureChart data={sampleData} type="line" /> */}

            {/* 
          <Text>Setting!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>Go Settings Details</Text>
          </TouchableOpacity> */}
            <Text>Previous data</Text>
            <Card style={styles.cardHorizontal1} >
              <Text>dasdasda</Text>
            </Card>

          </View>



          <View style={styles.contentContainer}>
            <View style={styles.sectionContainer}>
              <Text >MaterialDialog</Text>

              <TouchableOpacity
                onPress={() => this.setState({ basicNoActionsVisible: true })}
              >
                <View style={styles.button}>
                  <Text >TITLE & NO ACTIONS</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ basicNoTitleVisible: true })}
              >
                <View style={styles.button}>
                  <Text >NO TITLE & OK/CANCEL</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ basicOkCancelVisible: true })}
              >
                <View style={styles.button}>
                  <Text >TITLE & OK/CANCEL</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ basicCustomLabelsVisible: true })
                }
              >
                <View style={styles.button}>
                  <Text >NO TITLE & CUSTOM LABELS</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ basicCustomColorsVisible: true })
                }
              >
                <View style={styles.button}>
                  <Text >CUSTOM COLORS</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ basicScrolledListVisible: true })
                }
              >
                <View style={styles.button}>
                  <Text >
                    SCROLLED WITH A CUSTOM LIST
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ basicMapVisible: true })}
              >
                <View style={styles.button}>
                  <Text >CUSTOM CONTENT</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <Text >MultiPickerMaterialDialog</Text>

              <TouchableOpacity
                onPress={() => this.setState({ multiPickerVisible: true })}
              >
                <View style={styles.button}>
                  <Text >MULTI PICKER</Text>
                </View>
              </TouchableOpacity>
              <Text numberOfLines={1}>
                {this.state.multiPickerSelectedItems.length === 0
                  ? "No items selected."
                  : `Selected: ${this.state.multiPickerSelectedItems
                    .map(item => item.label)
                    .join(", ")}`}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ scrolledMultiPickerVisible: true })
                }
              >
                <View style={styles.button}>
                  <Text >SCROLLED MULTI PICKER</Text>
                </View>
              </TouchableOpacity>
              <Text numberOfLines={1} >
                {this.state.scrolledMultiPickerSelectedItems.length === 0
                  ? "No items selected."
                  : `Selected: ${this.state.scrolledMultiPickerSelectedItems
                    .map(item => item.label)
                    .join(", ")}`}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text >SinglePickerMaterialDialog</Text>

              <TouchableOpacity
                onPress={() => this.setState({ singlePickerVisible: true })}
              >
                <View style={styles.button}>
                  <Text >SINGLE PICKER</Text>
                </View>
              </TouchableOpacity>
              <Text numberOfLines={1}>
                {this.state.singlePickerSelectedItem === undefined
                  ? "No item selected."
                  : `Selected: ${this.state.singlePickerSelectedItem.label}`}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ scrolledSinglePickerVisible: true })
                }
              >
                <View style={styles.button}>
                  <Text >SCROLLED SINGLE PICKER</Text>
                </View>
              </TouchableOpacity>
              <Text numberOfLines={1} >
                {this.state.scrolledSinglePickerSelectedItem === undefined
                  ? "No item selected."
                  : `Selected: ${this.state.scrolledSinglePickerSelectedItem.label}`}
              </Text>
            </View>
          </View>
          <MaterialDialog
          title={"Information"}
          visible={this.state.basicNoActionsVisible}
          onCancel={() => {
            this.setState({ basicNoActionsVisible: false });
          }}
        >
          <Text >
            You logged out of the application.
          </Text>
        </MaterialDialog>


        
        <MaterialDialog
          visible={this.state.basicNoTitleVisible}
          onOk={() => {
            this.setState({ basicNoTitleVisible: false });
          }}
          onCancel={() => {
            this.setState({ basicNoTitleVisible: false });
          }}
        >
          <Text >Set alarm?</Text>
        </MaterialDialog>

        <MaterialDialog
          title={"Use Google's Location Service?"}
          visible={this.state.basicOkCancelVisible}
          onOk={() => {
            this.setState({ basicOkCancelVisible: false });
          }}
          onCancel={() => {
            this.setState({ basicOkCancelVisible: false });
          }}
        >
          <Text >
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </Text>
        </MaterialDialog>

        <MaterialDialog
          visible={this.state.basicCustomLabelsVisible}
          okLabel="KEEP"
          onOk={() => {
            this.setState({ basicCustomLabelsVisible: false });
          }}
          cancelLabel="DISCARD"
          onCancel={() => {
            this.setState({ basicCustomLabelsVisible: false });
          }}
        >
          <Text >Discard draft?</Text>
        </MaterialDialog>

        <MaterialDialog
          visible={this.state.basicCustomColorsVisible}
          title={"Save the conversation?"}
          titleColor="#F0F0F0"
          colorAccent="#6ABED0"
          backgroundColor="#181712"
          okLabel="SAVE"
          onOk={() => {
            this.setState({ basicCustomColorsVisible: false });
          }}
          cancelLabel="DISCARD"
          onCancel={() => {
            this.setState({ basicCustomColorsVisible: false });
          }}
        >
          <Text >
            Store the conversation log in Google Drive.
          </Text>
        </MaterialDialog>

        <MaterialDialog
          visible={this.state.basicScrolledListVisible}
          title={"Scrollable list"}
          scrolled
          onOk={() => {
            this.setState({ basicScrolledListVisible: false });
          }}
          onCancel={() => {
            this.setState({ basicScrolledListVisible: false });
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {LONG_LIST.map(row => (
              <TouchableOpacity key={row}>
                <View style={styles.row}>
                  <Text >{row}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </MaterialDialog>

        <MaterialDialog
          visible={this.state.basicMapVisible}
          addPadding={false}
          title={"Location list"}
          onOk={() => {
            this.setState({ basicMapVisible: false });
          }}
          onCancel={() => {
            this.setState({ basicMapVisible: false });
          }}
        >
    
        </MaterialDialog>

        <MultiPickerMaterialDialog
          title={"Pick some elements!"}
          items={SHORT_LIST.map((row, index) => ({ value: index, label: row }))}
          visible={this.state.multiPickerVisible}
          selectedItems={this.state.multiPickerSelectedItems}
          onCancel={() => this.setState({ multiPickerVisible: false })}
          onOk={result => {
            this.setState({ multiPickerVisible: false });
            this.setState({ multiPickerSelectedItems: result.selectedItems });
          }}
        />

        <MultiPickerMaterialDialog
          title={"Pick some more elements!"}
          scrolled
          items={LONG_LIST.map((row, index) => ({ value: index, label: row }))}
          visible={this.state.scrolledMultiPickerVisible}
          selectedItems={this.state.scrolledMultiPickerSelectedItems}
          onCancel={() => this.setState({ scrolledMultiPickerVisible: false })}
          onOk={result => {
            this.setState({ scrolledMultiPickerVisible: false });
            this.setState({
              scrolledMultiPickerSelectedItems: result.selectedItems
            });
          }}
        />

        <SinglePickerMaterialDialog
          title={"Pick one element!"}
          items={SHORT_LIST.map((row, index) => ({ value: index, label: row }))}
          visible={this.state.singlePickerVisible}
          selectedItem={this.state.singlePickerSelectedItem}
          onCancel={() => this.setState({ singlePickerVisible: false })}
          onOk={result => {
            this.setState({ singlePickerVisible: false });
            this.setState({ singlePickerSelectedItem: result.selectedItem });
          }}
        />

        <SinglePickerMaterialDialog
          title={"Pick one element!"}
          scrolled
          items={LONG_LIST.map((row, index) => ({ value: index, label: row }))}
          visible={this.state.scrolledSinglePickerVisible}
          selectedItem={this.state.scrolledSinglePickerSelectedItem}
          onCancel={() => this.setState({ scrolledSinglePickerVisible: false })}
          onOk={result => {
            this.setState({ scrolledSinglePickerVisible: false });
            this.setState({
              scrolledSinglePickerSelectedItem: result.selectedItem
            });
          }}
        />



        </ScrollView>
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="#f78a2c" onPress={() => {
            this.setState({ visible: true });
          }}>
            {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

          </ActionButton>
          {/* <DialogInput
          dialogIsVisible={this.state.dialogIsVisible}
          closeDialogInput={() => this.setState({ dialogIsVisible: false })}
          submitInput={(textValue) => console.warn(textValue)}
          outerContainerStyle={{ backgroundColor: 'rgba(0,0,0, 0.75)' }}
          containerStyle={{ backgroundColor: 'rgba(255,0,0, 0.2)', borderColor: 'red', borderWidth: 5 }}
          titleStyle={{ color: 'white' }}
          title="This is the title"
          subTitleStyle={{ color: 'white' }}
          subtitle="This is the subtitle"
          placeholderInput="This is the text inside placeholder..."
          placeholderTextColor="black"
          textInputStyle={{ borderColor: 'black', borderWidth: 2 }}
          secureTextEntry={false}
          buttonsStyle={{ borderColor: 'white' }}
          textCancelStyle={{ color: 'white' }}
          submitTextStyle={{ color: 'white', fontStyle: 'italic' }}
          cancelButtonText="CANCEL"
          submitButtonText="CONFIRM" */}
          {/* /> */}

          {/* <MaterialDialog
            title="Use Google's Location Service?"
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            onCancel={() => this.setState({ visible: false })}>
   
          </MaterialDialog>; */}

          {/* 
<Modal
    visible={this.state.visible}
    swipeDirection={['up', 'down']} // can be string or an array
    swipeThreshold={200} // default 100
    onSwipeOut={(event) => {
      this.setState({ visible: false });
    }}
  >
    <ModalContent>
     <Text>sdfsdfsdf

     </Text>
    </ModalContent>
  </Modal> */}

        
        </View>
      </SafeAreaView>


    );
  }
}

const LONG_LIST = [
  "List element 1",
  "List element 2",
  "List element 3",
  "List element 4",
  "List element 5",
  "List element 6",
  "List element 7",
  "List element 8",
  "List element 9",
  "List element 10",
  "List element 12",
  "List element 13",
  "List element 14",
  "List element 15",
  "List element 16",
  "List element 17",
  "List element 18",
  "List element 19"
];

const SHORT_LIST = ["List element 1", "List element 2", "List element 3"];
const styles = StyleSheet.create({
  linerGradient: {
    height: (screenWidth * 3) / 8,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  },
  line: {
    position: 'absolute',
    width: screenWidth,
    top: 100,
    left: -200,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [
      {
        rotate: '-35deg',
      }
    ],
    borderRadius: 60
  }, header: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  }, cardHorizontal1: {
    height: 175,
    backgroundColor: 'white',
    // width: 300,
    width: (Dimensions.get("window").width - 20),
    // width: "90%",
    // backgroundColor: "white",
    borderRadius: 8,
    // padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    // alignItems: 'center',
    marginHorizontal: 10
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  }, actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'red',
  },  contentContainer: {
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20
  },
  sectionContainer: {
    paddingVertical: 16
  },
  navigationBar: {

    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#3F51B5",
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        zIndex: 10
      }
    })
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 88,
    height: 36,
    borderRadius: 2,
    backgroundColor: "#E8EAF6",
    elevation: 2,
    paddingHorizontal: 16,
    marginTop: 16
  },
  scrollViewContainer: {
    paddingTop: 8
  },
  row: {
    height: 48,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  mapView: {
    height: 200,
    width: 280
  }

});
