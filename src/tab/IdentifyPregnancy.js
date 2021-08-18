import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, SafeAreaView, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { IMAGE } from '../constants/image';
import { CustomHeader } from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Fontisto';
import i18n from 'i18n-js'; 
export class IdentifyPregnancy extends Component {
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
        // '#4E3CCE', '#9A81FD'
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
                <CustomHeader bgcolor='#fff' gradient1="#fff"gradient2="#fff"  titleColor="black" bcbuttoncolor='#F2F2F2' title={i18n.t('identfy_preg.title')}  navigation={this.props.navigation} bdcolor='#fff' />
                <View style={styles.header}>
                    <Image style={{ width: 450, height: 260, marginLeft: -30, marginTop: 0 }}
                        source={IMAGE.ICON_IDENTY_PREGNANCY_BACK}
                        resizeMode="contain"
                    />

                </View>
                <View style={styles.footer}>
                <Text style={styles.cardHeading}>{i18n.t('identfy_preg.subheadding')} </Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <View style={{ padding: 2 }}>

                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_MORNING_SICK} />
                                    <Text style={styles.cardName}>{i18n.t('identfy_preg.sub1')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_URINE_TEST} />
                                    <Text style={styles.cardName}>{i18n.t('identfy_preg.sub2')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_SERUM_TEST} />
                                    <Text style={styles.cardName}>{i18n.t('identfy_preg.sub3')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardContainer}>
                                <View style={styles.cardHeaderContainer}>
                                </View>
                                <View style={styles.cardBody}>
                                    <Image style={styles.cardAvatar} source={IMAGE.ICON_SCANING} />
                                    <Text style={styles.cardName}>{i18n.t('identfy_preg.sub4')}</Text>
                                    <View style={styles.iconMore}>
                                        <Icon name="angle-right" color="gray" />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </ScrollView>

                </View>


            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    footer: {
        flex: 4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    }, header: {
        flex: 2,
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
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    }, cardAvatar: {
        height: 55,
        width: 55,
        backgroundColor: '#fff',
        borderRadius: 10,
 

    }, cardBody: {

        padding: 20,
        flexDirection: "row",
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#8970EF',
        elevation: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingBottom: 10,
    },
    iconMore: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },cardContainer:{
        marginBottom:10
    }
});


