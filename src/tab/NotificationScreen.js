import React,{Component} from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';

import AsyncStorage from '@react-native-community/async-storage';


 
export class NotificationScreen extends Component{

    render(){
        return (
     
            <SafeAreaView style={{ flex: 1 }}>
             
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               
        
              </View>
        
            </SafeAreaView>
          );
    }
}

