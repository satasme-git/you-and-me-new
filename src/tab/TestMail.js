/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Alert, Button, StyleSheet, Text,TouchableOpacity,Image } from 'react-native';

import RNSmtpMailer from "react-native-smtp-mailer";


export class TestMail extends Component {
    someFunction() {
        RNSmtpMailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
            username: "chamilpathirana19",
            password: "shamal@2019",
            from: "chamilpathirana19@gmail.com",
            recipients: "chamiljay88@gmail.com",
            // bcc: ["bccEmail1", "bccEmail2"], //completely optional
            subject: "subject",
            htmlBody: "<h1>header</h1><p>body</p>",
            attachmentPaths: [
            //   RNFS.ExternalDirectoryPath + "/image.jpg",
            //   RNFS.DocumentDirectoryPath + "/test.txt",
            //   RNFS.DocumentDirectoryPath + "/test2.csv",
            //   RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
            //   RNFS.DocumentDirectoryPath + "/zipFile.zip",
            //   RNFS.DocumentDirectoryPath + "/image.png"
            ],
            attachmentNames: [
              "image.jpg",
              "firstFile.txt",
              "secondFile.csv",
              "pdfFile.pdf",
              "zipExample.zip",
              "pngImage.png"
            ], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
            attachmentTypes: ["img", "txt", "csv", "pdf", "zip", "img"] //needed for android, in ios-only application, leave it empty: attachmentTypes:[]. Generally every img(either jpg, png, jpeg or whatever) file should have "img", and every other file should have its corresponding type.
          })
            .then(success => console.log(success))
            .catch(err => console.log(err));
      }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Text>dfasdasdad</Text>
            <TouchableOpacity onPress={this.someFunction.bind(this)}>
            <View>
              <Image
                //We are showing the Image from online
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sms.png',
                }}
                //You can also show the image from you project directory like below
                //source={require('./Images/sms.png')}
                style={styles.ImageStyle}
              />
              <Text style={styles.text}>Send SMS</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
} const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#000',
    },
    text: {
      color: 'black',
      textAlign:'center',
      fontSize: 25,
      marginTop:16,
    },
    ImageStyle: {
      height: 150,
      width: 150,
      resizeMode: 'stretch',
    },
  });