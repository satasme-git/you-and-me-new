import PushNotification from 'react-native-push-notification';

export default class CustomPushNotification {

    testPush(data) {

        // let { _title, _message, _ticker, _bigText, _subText} = this.props
        PushNotification.localNotificationSchedule({
            channelId:"test-channel",

            title: data._title, // (optional, for iOS this is only used in apple watch, the title will be the app name in other devices)
            message: "My Notification Message",// (required)

            ticker: "My Notification Ticker", // (optional)

            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_launcher", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: data._bigText, // (optional) default: "message" prop
           // subText: "Reminder from MyApp", // (optional) default: none

            // date: new Date(Date.now()+20*1000), // in 60 secs
             date: new Date(data.date), // in 60 secs
            allowWhileIdle:true,
            repeatTime: "day",
            

         
         
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            repeatType: 1, 
        });
    }

}