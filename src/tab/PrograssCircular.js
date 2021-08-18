import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-ionicons'
import CircleSlider from '../../CircleSlider';
export class PrograssCircular extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: 1,
          totalDays: 30,
          month: '',
          color: '#dee2e3',
          activeDates: [12, 6, 8, 18,17,18,19,20,21,22,23,24]
        };
    
    
      };
    
      componentDidMount() {
        this.gettingInformation();
      }
    
    
    
    
      gettingInformation = () => {
        var date = new Date();
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var value = date.getDate();
        var totalDays = lastDay.getDate();
        this.setState({ value: value, totalDays: totalDays, month: month[date.getMonth()] })
    
      }
      fun = (value) => {
        this.state.activeDates.indexOf(value) != -1 ? this.setState({ color: '#9281f7' }) : this.setState({ color: '#dee2e3' })
        this.setState({ value })
      }
   
    
    render() {
        const width = 120;
        var { value, totalDays, month, color, activeDates } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                

                <View style={styles.container}></View>
          <StatusBar backgroundColor='#b5ddfb' />


     


          <View style={{
            alignItems: 'center',
            width: '100%',
            padding:50
          }}>




        
            <CircleSlider
              arcDirection={'CW'}
              backgroundColor={"#dee2e3"}
              btnRadius={14}
              dotColor={'#9281f7'}
              dotSize={7}
              dotValues={activeDates}
              btnColor='red'
              sliderRadius={120}
              sliderWidth={25}
              startDegree={1}
              maxValue={totalDays}
              value={value}
              // onPressInnerCircle={(value) => console.log(`Inner: ${value}`)}
              // onPressOuterCircle={(value) => console.log(`Outer: ${value}`)}
              onValueChange={(value) => this.fun(value)}
              endGradient={"#b5ddfb"}
              // startGradient={"#b5ddfb"}
            />


          </View>





        


       





     

            </SafeAreaView>
        );
    }
} const styles = StyleSheet.create({
    detailTxt: {
      marginTop: 5,
      fontSize: 14,
      color: '#fff'
    },
    dateTxt: {
      marginTop: 15,
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    },
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
  });
  