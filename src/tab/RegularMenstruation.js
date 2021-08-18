import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';
import { CustomHeader } from '../index';
import Icon from 'react-native-vector-icons/Fontisto';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
export class RegularMenstruation extends Component {
    constructor() {
        super();
        this.state = {
            lan: '',
        }
    }
    async componentDidMount() {
        this.setState({
            lan: await AsyncStorage.getItem('lang'),
        });

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
                <CustomHeader bgcolor='#fff'  titleColor="black" gradient1="#fff"gradient2="#fff" title={i18n.t('menstruation.title')} bcbuttoncolor='#F2F2F2' navigation={this.props.navigation} bdcolor='#fff' />
                <View style={styles.header}>
                    <Image style={{ width: 500, height: 350, marginLeft: -60, marginTop: -20 }}
                        source={IMAGE.ICON_REGULAR_MENSTRUATION_BACK}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.cardHeading}>{i18n.t('menstruation.subheadding')}</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <View style={{ padding: 2 }}>

                            <View style={styles.cardContainer}>
                                {/* <View style={styles.cardHeaderContainer}>
                                </View> */}
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_URINE_TEST} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub1')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                {/* <View style={styles.cardHeaderContainer}>
                                </View> */}
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_MORNING_SICK} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub2')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                {/* <View style={styles.cardHeaderContainer}>
                                </View> */}
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_SERUM_TEST} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub3')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                {/* <View style={styles.cardHeaderContainer}>
                                </View> */}
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_PREGNANCY} />
                                    <Text style={styles.cardName}>{i18n.t('menstruation.sub4')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <Text style={{ paddingTop: 10 }}> {i18n.t('menstruation.tagline')}
                            </Text>
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    }, header: {
        flex: 1,
        backgroundColor: '#fff'
    }, cardHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    cardHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardMore: {
        fontWeight: 'bold',
        color: 'gray',
    },
    cardName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }, cardAvatar: {
        height: 55,
        width: 55,
        backgroundColor: 'white',
        borderRadius: 10,
    }, cardBody: {
        padding: 10,
        flexDirection: "row",
        // marginTop: 8,
        borderRadius: 10,
        backgroundColor: '#8970EF',
        elevation: 2,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingBottom: 5,
    },
    iconMore: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },cardContainer:{
        marginBottom:15
    }
});