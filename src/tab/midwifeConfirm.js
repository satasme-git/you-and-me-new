
import React,{Component} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View,Text, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import { Button } from 'react-native-elements';


 export class midwifeConfirm extends Component{
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',

      isLoading: false,
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
        <View >
            <View style={{padding:10,alignItems:'center',justifyContent:'center'}}>
                 <Text >Please be patient until your account is accepted by the administrator</Text>
                 <Text>Thank you !</Text>
            </View>

        </View>
    
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