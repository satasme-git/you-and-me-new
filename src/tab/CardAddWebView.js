
import React,{Component} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';

import { WebView } from 'react-native-webview';
import HTML_FILE from '../constants/index.html';


 export class CardAddWebView extends Component{
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {


      isLoading: false,
      _customerEmail:'chamiljay88@gmail.com',
      _merchantId:"II07510"
    };
  }
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
        <WebView
        style={{flex: 1}}
        
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})