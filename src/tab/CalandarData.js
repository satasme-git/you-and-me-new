import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

import { CustomHeader } from '../index';

export class CalandarData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
    componentDidMount() {
        this.props.route.params.data;
        //const data = this.props.navigation.getParam('data');
        this.setState({
            data: this.props.route.params.data,
        });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <CustomHeader bgcolor='white' title="Settinfgs detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Setting details!</Text>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.props.navigation.navigate('PeriodCalandar', {
                            data: this.state.datam
                        })
                    }}>
                        {/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BMIMeter')}> */}
                        <Text style={styles.buttonText}>Edit EDD  Date</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
} const styles = StyleSheet.create({

    button: {
        backgroundColor: "#f78a2c",
        padding: 10,
        borderRadius: 25,
        // marginTop: 5,

        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',

    },
});