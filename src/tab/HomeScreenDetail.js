import React,{Component} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import {CustomHeader} from '../index';
 
export class HomeScreenDetail extends Component{
    render(){
        return (
            <SafeAreaView style={{ flex: 1 }}>
              <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation}  bdcolor='#f2f2f2'/>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home Detailsdd!</Text>
        
              </View>
        
            </SafeAreaView>
          );
    }
}