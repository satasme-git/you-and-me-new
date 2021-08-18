import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1
import { CustomHeader } from '../index';

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)
export class AddWeight extends Component {
    initialState = {
        [_today]: { disabled: false }
    }

    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,
            pName: '',
            isLoading: false,
            ovulation_date: '',
            next_period_date: '',
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <CustomHeader bgcolor='#f2f2f2' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
                <View style={{
                    backgroundColor: 'white', marginVertical: 5, marginHorizontal: 10,
                    //  borderRadius: 16,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.7,
                    shadowRadius: 8,
                }}>
                    <Calendar
                        theme={{
                            dotColor: 'pink',
                            height: 150,
                            // backgroundColor: 'white',
                            // selectedDayBackgroundColor: 'white',
                            selectedDayTextColor: 'white',
                        }}
                        // style={{
                        //     borderWidth: 1,
                        //     borderColor: 'gray',
                        //     height: 150
                        //   }}
                        // we use moment.js to give the minimum and maximum dates.
                        //minDate={_today}
                        // maxDate={_maxDate}


                        // hideArrows={true}

                        // onDayPress={this.onDaySelect}
                        // onPress={() => this.RBSheet.open()}
                      //  onDayPress={this.onDaySelect}

                        // onDaySelect={()=>this.RBSheet.open()}

                        // markedDates={{
                        //     '2020-08-25': { selected: true, selectedColor: 'green' },
                        //     '2020-08-26': { selected: true, selectedColor: 'red' }
                        // }}

                        // markingType='multi-period'
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
                       // markedDates={this.state._markedDates}
                    // markingType={'multi-dot'}

                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', }}>



                </View>

            </SafeAreaView>
        );
    }
} const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff9100'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        marginTop: 20,
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        height: 500

    }


});
