import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, FlatList, ListView, Image } from 'react-native';
import PushNotification from 'react-native-push-notification';
import StepIndicator from 'react-native-step-indicator';
import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';
// import { Icon } from 'react-native-elements';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
// import dummyData from './data';
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
    labelSize: 11,
    currentStepLabelColor: '#fe7013'
}

export class VerticleYearChart extends Component {
    constructor() {
        super();

        this.state = {
            currentPage: 0,
            data: [
                {
                    title: i18n.t('dietplan.carb'),

                    body:
                        i18n.t('dietplan.carb_detail'),
                    src: IMAGE.ICON_CARBOHIDRATE,

                },
                {
                    title: i18n.t('dietplan.protein'),

                    body:
                        i18n.t('dietplan.protein_detail'),
                    src: IMAGE.ICON_PROTEIN,

                },
                {
                    title: i18n.t('dietplan.fat'),

                    body:
                        i18n.t('dietplan.fat_detail'),
                    src: IMAGE.ICON_FAT,

                },
                {
                    title: i18n.t('dietplan.vita'),

                    body:
                        i18n.t('dietplan.vita_detail'),
                    src: IMAGE.ICON_VITAMIN_A,

                },
                {
                    title: i18n.t('dietplan.vitb'),
                    body:
                        i18n.t('dietplan.vitb_detail'),
                    src: IMAGE.ICON_VITAMIN_B,

                },
                {
                    title: i18n.t('dietplan.vitc'),
                    body:
                        i18n.t('dietplan.vitc_detail'),
                    src: IMAGE.ICON_VITAMIN_C,

                },
                {
                    title: i18n.t('dietplan.vitd'),
                    body:
                        i18n.t('dietplan.vitd_detail'),
                    src: IMAGE.ICON_VITAMIN_D,


                },
                {
                    title: i18n.t('dietplan.vite'),
                    body:
                        i18n.t('dietplan.vite_detail'),
                    src: IMAGE.ICON_VITAMIN_E,

                }, {
                    title: i18n.t('dietplan.salt'),
                    body:
                        i18n.t('dietplan.salt_detail'),
                    src: IMAGE.ICON_MINERAL,

                },

            ],
        };
        this.viewabilityConfig = { itemVisiblePercentThreshold: 0 }
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });
    }
    keyExtractor = (item, index) => index.toString()
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title={i18n.t('dietplan.hedding')} bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />
                <LinearGradient start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={styles.header}>


                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: -10 }}>
                        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{i18n.t('dietplan.hedding')}</Text> */}

                    </View>
                    <View style={{ marginHorizontal: 10, zIndex: 5, top: 22 }}>
                        {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MealPlan')}>
                            <Text style={styles.buttonText}>{i18n.t('dietplan.mealplan')}</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MealPlan')} style={[styles.buttonh, { backgroundColor: 'white', }]}>
                            <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                                {/* <View style={{ backgroundColor: 'red', padding: 8, borderRadius: 40 }}> */}
                                  
                                    <Icon
                                        name="fast-food-outline"
                                        style={{paddingHorizontal:5}}
                                        size={15}
                                        color="#4633cb"
                                    />
                                {/* </View> */}
                                <Text style={styles.buttonText}>{i18n.t('dietplan.mealplan')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>

                <View style={styles.footer}>

                    {/* <View style={styles.container}> */}
                    <View style={styles.stepIndicator}>
                        <StepIndicator
                            customStyles={stepIndicatorStyles}
                            stepCount={9}
                            direction='vertical'
                            currentPosition={this.state.currentPage}
                            labels={this.state.data.map(item => item.title)}
                        />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={this.keyExtractor}
                        style={{ flexGrow: 1 }}
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
                                    style={{ height: 270, width: 350 }}
                                    resizeMode="cover"
                                >
                                </Image>
                                <Text style={styles.title}>{item.body}</Text>
                                {/* <Text style={styles.body}>{item.content}</Text>
                                <Text style={styles.body}>{item.content}</Text> */}

                            </View>
                        </ListItem>
                        }
                    />
                    {/* </View> */}
                </View>
            </LinearGradient>
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
        color: '#606060',
        lineHeight: 18,
        marginRight: -15,
        fontWeight: 'normal',
        textAlign: 'justify'
    }, header: {
        flex: 1,

    }, footer: {
        flex: 6,
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingRight: 10,
        paddingTop: 10,
        marginTop:0

    }, button: {

        backgroundColor: "red",
        padding: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 110,
        marginTop: -5,
        marginLeft: 18,
        marginBottom: 10,
        // marginVertical: 5,
        //  zIndex:5
    }, buttonText: {
        fontSize: 13,
        color: '#4633cb',
        padding: 2,
    }, buttonh: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
        // marginTop: 18,
        width: 100,
        elevation: 10,
        shadowColor: '#30C1DD',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        marginHorizontal: 10,
    }
});