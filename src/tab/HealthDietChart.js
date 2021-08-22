import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView, Image } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
// import dummyData from './datafoodplan';
import *as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import { List, ListItem, Left, Body, Right } from 'native-base';
const stepIndicatorStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 15,
    currentStepLabelColor: '#fe7013'
}

export class HealthDietChart extends Component {
    constructor() {
        super();

        this.state = {
            currentPage: 0,
            lan: '',

            data: [
                {
                  title: '5 % ',
        
                  body:
                    i18n.t('food.5'),
                  src: IMAGE.ICON_DIET_5,
        
        
                },
                {
                  title: '20 %',
        
                  body:
                    i18n.t('food.20'),
                  src: IMAGE.ICON_DIET_20,
        
                },
                {
                  title: '35 %',
        
                  body:
                    i18n.t('food.35'),
                  src: IMAGE.ICON_DIET_35,
        
                },
                {
                  title: '40 %',
        
                  body:
                    i18n.t('food.40'),
                  src: IMAGE.ICON_DIET_40,
        
                }
        
              ]
        };
        this.viewabilityConfig = { itemVisiblePercentThreshold: 0 }
    }
     componentDidMount() {
        // this.setState({
        //     lan: await AsyncStorage.getItem('lang'),
        // });

       

    }
    keyExtractor = (item, index) => index.toString()
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('food.hedding')} bcbuttoncolor='#fff'  navigation={this.props.navigation} bdcolor='#fbb146' />
                {/* <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: -10 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{i18n.t('food.hedding')}</Text> */}
                        {/* <Text style={{ color: 'white' }}>press on foot after kick</Text> */}

                        {/* <View style={{ height: 100, padding: 10 }}>
                            <Image source={IMAGE.ICON_DIET_PLAN}
                                style={{ height: 200, width: 320 }}
                            >
                            </Image>
                        </View>
                    </View>


                </View> */}

                <Animatable.View animation="fadeInUp" style={styles.footer}>
      
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                            customStyles={stepIndicatorStyles}
                            stepCount={4}
                            direction='vertical'
                            currentPosition={this.state.currentPage}
                            // labels={this.state.data.title}
                            labels={this.state.data.map(item => item.title)}
                        />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={this.keyExtractor}
                        style={{ flexGrow: 1, marginLeft: -10 }}
                        // data={dummyData.data}
                        data={this.state.data}
                        // renderItem={this.renderPage}
                        onViewableItemsChanged={this.onViewableItemsChanged}
                        viewabilityConfig={this.viewabilityConfig}
                        renderItem={({ item }) => <ListItem
                        // style={{
                        //     height: 50, paddingTop: 15,
                        // }}
                        >
                            <View style={styles.rowItem}>
                                <Text style={styles.titleMain}>{item.title}</Text>

                                <Image source={item.src}
                                    style={{ height: 250, width: 300 }}
                                    resizeMode="cover"
                                >
                                </Image>
                                <Text style={styles.title}>{item.body}</Text>
                             
                            </View>
                        </ListItem>
                        }
                    />
                    </Animatable.View >
                {/* </View> */}
            </SafeAreaView>
        );
    }


    onViewableItemsChanged = ({ viewableItems, changed }) => {
        const visibleItemsCount = viewableItems.length;
        if (visibleItemsCount != 0) {
            this.setState({ currentPage: viewableItems[visibleItemsCount - 1].index })
        };
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        // bottom:50,
    },
    stepIndicator: {
        marginVertical: 50,
        paddingHorizontal: 20
    },
    rowItem: {
        flex: 3,
        paddingVertical: 0
    },
    titleMain: {
        flex: 1,
        fontSize: 15,
        color: '#fe7013',
        paddingVertical: 10,
        fontWeight: 'bold'
    },
    title: {
        // flex: 1,
        fontSize: 15,
        color: '#333333',
        paddingVertical: 5,
        fontWeight: 'bold'
    },
    body: {
        // flex: 1,
        fontSize: 14,
        // color: '#606060',
        lineHeight: 18,
        marginRight: -15,
        fontWeight: 'normal',
        textAlign: 'justify'
    }, header: {
        flex: 1,
    }, footer: {
        flex: 2,
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingRight: 10,
        paddingTop: 10

    }, button: {

        backgroundColor: "red",
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        marginTop: -5,
        marginLeft: 18,
        marginBottom: 10,
        // marginVertical: 5,
        //  zIndex:5
    }, buttonText: {
        fontSize: 15,
        color: '#fff',
    }
});