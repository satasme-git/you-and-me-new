import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image,StatusBar, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import Unorderedlist from 'react-native-unordered-list';
import Steps from 'react-native-step-indicator';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import ViewPager from '@react-native-community/viewpager';
import LinearGradient from 'react-native-linear-gradient';
const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 5', 'Page 5'];

const firstIndicatorConfigs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#fbb146',
    separatorFinishedColor: '#fbb146',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fbb146',
    stepIndicatorUnFinishedColor: '#aaaaaa',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 11,
    currentStepLabelColor: '#fbb146'
};





export class MealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            lan: ''
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });

    }
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#4E3CCE" />
                <CustomHeader bgcolor='#fbb146' gradient1="#4E3CCE" gradient2="#9A81FD" titleColor="white" title="" bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#fbb146' />

                <LinearGradient start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.9 }} colors={['#4E3CCE', '#9A81FD']} style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{i18n.t('mealPlan.MealPlan')}</Text>

                    </View>
                </LinearGradient>
                {/* <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>{i18n.t('mealPlan.MealPlan')}</Text>
                  
                    </View>
                </View> */}

                <View style={styles.footer}>

                    <View style={styles.container}>
                        <View style={styles.stepIndicator}>
                            <Steps
                                customStyles={firstIndicatorConfigs}
                                stepCount={7}
                                direction='horizontal'
                                currentPosition={this.state.currentPage}
                                labels={[i18n.t('mealPlan.early'), i18n.t('mealPlan.breack'), i18n.t('mealPlan.midmor'), i18n.t('mealPlan.lunch'), i18n.t('mealPlan.evening'), i18n.t('mealPlan.dinner'), i18n.t('mealPlan.bedtime')]}
                            />
                        </View>

                        <ViewPager
                            style={{ flexGrow: 1 }}
                            ref={(viewpager) => { this.viewpager = viewpager }}
                            initialPage={this.state.currentPage}
                            onPageSelected={(eventDate) => this.handleHorizontalScroll(eventDate.nativeEvent)}
                        >
                            {PAGES.map((page, index) => this.renderViewPagerPage(page, index))}
                        </ViewPager>

                    </View>

                </View>

            </LinearGradient>
        );
    }
    handleHorizontalScroll = ({ position }) => {
        this.setState({ currentPage: position })
    };
    renderViewPagerPage = (data, index) => {
        return (

            <View style={styles.page} key={index}>
                {
                    index == 0 ?
                        <View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentInsetAdjustmentBehavior="automatic"
                                style={styles.scrollView}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.early')}</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                    <Image source={IMAGE.ICON_EARLY_MORNING}
                                        style={{ height: 240, width: 390 }}>
                                    </Image>
                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.tea_or_coffee')}</Text></Unorderedlist>
                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.buiscu')}</Text>
                                    </Unorderedlist>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        index == 1 ?
                            <View>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentInsetAdjustmentBehavior="automatic"
                                    style={styles.scrollView}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.breack')}</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                        <Image source={IMAGE.ICON_EARLY_MORNING2}
                                            style={{ height: 200, width: 390 }}>
                                        </Image>
                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.chapathi')}</Text></Unorderedlist>
                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.egg')}</Text>
                                        </Unorderedlist>
                                    </View>
                                </ScrollView>
                            </View>
                            : index == 2 ?
                                <View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentInsetAdjustmentBehavior="automatic"
                                        style={styles.scrollView}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.midmor')}</Text>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                            <Image source={IMAGE.ICON_MID_MORNING}
                                                style={{ height: 290, width: 350 }}>
                                            </Image>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.milk250')} </Text></Unorderedlist>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.biscuits2pcs')}</Text></Unorderedlist>
                                            <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.appleorrang')} </Text></Unorderedlist>
                                        </View>
                                    </ScrollView>
                                </View>
                                : index == 3 ?
                                    <View>
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            contentInsetAdjustmentBehavior="automatic"
                                            style={styles.scrollView}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.lunch')}</Text>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                <Image source={IMAGE.ICON_MID_LUNCH}
                                                    style={{ height: 340, width: 390 }}>
                                                </Image>
                                                <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.cookedrice')} </Text></Unorderedlist>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    :
                                    index == 4 ?
                                        <View>
                                            <ScrollView
                                                showsVerticalScrollIndicator={false}
                                                contentInsetAdjustmentBehavior="automatic"
                                                style={styles.scrollView}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.evening')}</Text>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                    <Image source={IMAGE.ICON_EVENING}
                                                        style={{ height: 340, width: 390 }}>
                                                    </Image>
                                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.biscuits2pcs')}</Text></Unorderedlist>
                                                    <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.fruitonchoice')} </Text>
                                                    </Unorderedlist>
                                                </View>
                                            </ScrollView>
                                        </View>
                                        :
                                        index == 5 ?
                                            <View>
                                                <ScrollView
                                                    showsVerticalScrollIndicator={false}
                                                    contentInsetAdjustmentBehavior="automatic"
                                                    style={styles.scrollView}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.dinner')}</Text>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                        <Image source={IMAGE.ICON_DINNER}
                                                            style={{ height: 260, width: 380 }}>
                                                        </Image>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.cokkedrice3cup')} </Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.meat')}  </Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.cookeddal')} </Text></Unorderedlist>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.vegitable')} </Text></Unorderedlist>
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            :

                                            <View>
                                                <ScrollView
                                                    showsVerticalScrollIndicator={false}
                                                    contentInsetAdjustmentBehavior="automatic"
                                                    style={styles.scrollView}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{i18n.t('mealPlan.bedtime')}</Text>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
                                                        <Image source={IMAGE.ICON_BET_TIME}
                                                            style={{ height: 340, width: 240 }}>
                                                        </Image>
                                                        <Unorderedlist bulletUnicode={0x29BF} color='gray' style={{ fontSize: 17 }}><Text>{i18n.t('mealPlan.oneglas')}</Text></Unorderedlist>

                                                    </View>
                                                </ScrollView>
                                            </View>



                }
            </View>
        )
    };

}
const styles = StyleSheet.create({

    stepIndicator: {
        // marginVertical: 50
        marginTop: 20
    },
    page: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 30
        // justifyContent: 'center',
        // alignItems: 'center'
    }, button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {
        flex: 6,
        backgroundColor: '#f3f3f3',

    }, header: {
        flex: 3,
        backgroundColor: '#fbb146'

    }, container: {
        flex: 1,

    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 55,
        elevation: 5, // Android
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }, breadthPo1: {

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        bottom: 130,
        zIndex: 5,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,

    }, breadthPo2: {

        justifyContent: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        backgroundColor: 'white',
        // bottom: -190,
        marginBottom: 10,
        width: '95%',
        borderRadius: 10,
        elevation: 2,
        padding: 12,

    }, header: {
        flex: 0,
    }, footer: {
        flex: 6,
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingRight: 10,
        paddingTop: 10

    },
});