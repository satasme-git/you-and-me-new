import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image,StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGE } from '../constants/image';
export class SplashScreen extends Component {
    constructor(props) {
        super(props)
        setTimeout(()=>{
            this.props.navigation.navigate('Login')
        },1000)

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor="#9A81FD" />
                <LinearGradient colors={['#9A81FD', '#4E3CCE']} style={styles.gradient}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:-20 }}>
                        <Image style={{ width: 190,   }}
                            source={IMAGE.ICON_LOGO2}
                            resizeMode="contain"
                        />
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    circleGradient: {
        margin: 1,
        backgroundColor: "white",
        borderRadius: 5
    }, submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
    },
    submitText: {
        paddingTop: 20,
        paddingBottom: 20,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 8,

    }, buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 14,
        color: 'black',
        backgroundColor: 'transparent',
    }


    , container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    }

});
