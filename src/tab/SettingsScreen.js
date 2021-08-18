import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { CustomHeader } from '../index';

export class SettingsScreen extends Component {
  constructor(props){
    super(props)
  //   PushNotification.localNotificationSchedule({

  //     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
  //     message: "My Notification Message",// (required)

  //     ticker: "My Notification Ticker", // (optional)

  //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
  //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
  //     subText: "This is a subText", // (optional) default: none


  // date: new Date(Date.now()) // in 60 secs

  //   });
  }
  testPush() {
  //   PushNotification.localNotificationSchedule({

  //     title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
  //     message: "My Notification Message",// (required)

  //     ticker: "My Notification Ticker", // (optional)

  //     largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
  //     smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //     bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
  //     subText: "This is a subText", // (optional) default: none


  // date: new Date(Date.now()) // in 60 secs

  //   });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        {/* <CustomHeader bgcolor='white' title="Settinfgs" isHome={true} navigation={this.props.navigation}  bdcolor='#f2f2f2'/> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Setting!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>Go Settings Details</Text>
            {/* <Text onPress={() => this.testPush()}>Hello</Text> */}
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}