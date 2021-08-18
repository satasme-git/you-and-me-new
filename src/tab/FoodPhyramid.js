import React,{Component} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import PushNotification from 'react-native-push-notification';

import {CustomHeader} from '../index';
 
export class FoodPhyramid extends Component{

  testPush() {
    PushNotification.localNotification({

      title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
      message: "My Notification Message",// (required)

      ticker: "My Notification Ticker", // (optional)

      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none

    });
  }
    render(){
        return (
            <SafeAreaView style={{ flex: 1 }}>
              
              <CustomHeader bgcolor='white' title="Settinfgs detail" navigation={this.props.navigation}  bdcolor='#f2f2f2'/>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Setting details!</Text>
                <Text style={styles.welcome} onPress={()=>this.testPush()}>Hello</Text>
              </View>
        
            </SafeAreaView>
          );
    }
}