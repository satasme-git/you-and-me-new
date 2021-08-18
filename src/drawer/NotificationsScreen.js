import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';

import AsyncStorage from '@react-native-community/async-storage';

export class NotificationsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: "",
      TextInputID: '',
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
      TextInputpassword: '',
      TextInputAddress: '',
      memberNames: '',
    }
  }

  InputUsers = () => {
    const { TextInputID } = this.state;
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputpassword } = this.state;
    const { TextInputAddress } = this.state;
    fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/updateUser.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: TextInputID,
        member_name: TextInputName,
        member_email: TextInputEmail,
        member_mobilenumber: TextInputPhoneNumber,
        member_password: TextInputpassword,

        member_address: TextInputAddress,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);


      }).catch((error) => {
        console.error(error);
      })
  }

  async componentDidMount() {
    const myArray = await AsyncStorage.getItem('memberNames');
    // Alert.alert('AynStoreage : '+myArray);
    const data = new FormData();
    data.append("get_about", "true");

    return fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/get_user_by_id.php?mname=' + myArray, {
      method: 'post',
      body: data,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        id = "";
        member_name = "";
        member_email = "";
        member_mobilenumber = "";
        member_password = "";
        member_address = "";

        for (var i = 0; i < responseJson.length; i++) {

          id = responseJson[i].id
          member_name = responseJson[i].member_name
          member_email = responseJson[i].member_email
          member_mobilenumber = responseJson[i].member_mobilenumber
          member_password = responseJson[i].member_password

          member_address = responseJson[i].member_address

        }
        this.setState({
          dataSource: responseJson,
          TextInputID: id,
          TextInputName: member_name,
          TextInputEmail: member_email,
          TextInputPhoneNumber: member_mobilenumber,
          TextInputpassword: member_password,
          TextInputAddress: member_address,
        }, function () { })
      }).catch((error) => {
        console.error(error)
      })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader bgcolor='#ff9100' title="Profile" navigation={this.props.navigation} bdcolor='#f2f2f2' />
        <View style={styles.header}>

          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Avatar.Image
                source={{
                  uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'
                }}
                size={70}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title} >

                </Title>
                <Caption style={styles.caption}>
                  chamiljay88@gmail.com
                                </Caption>
              </View>
            </View>
          </View>

        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={{
            flex: 1, justifyContent: 'center', paddingHorizontal: 15,
            paddingVertical: 0,
          }}>


            <TextInput value={this.state.TextInputName} onChangeText={TextInputValue => this.setState({ TextInputName: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="User Name" ></TextInput>
            {/* <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item }) => <ListItem >

                <Body>
                  <Text>Name</Text>
              
                </Body>
                <Right>
                  <TouchableOpacity onPress={this.Action_click(this)}>
                    <Text   >edits</Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              }>
            </FlatList> */}


            <TextInput value={this.state.TextInputEmail} onChangeText={TextInputValue => this.setState({ TextInputEmail: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="User Name" ></TextInput>
            <TextInput value={this.state.TextInputPhoneNumber} onChangeText={TextInputValue => this.setState({ TextInputPhoneNumber: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Mobile Number" ></TextInput>
            <TextInput value={this.state.TextInputpassword} onChangeText={TextInputValue => this.setState({ TextInputpassword: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Password" ></TextInput>

            <TextInput value={this.state.TextInputAddress} onChangeText={TextInputValue => this.setState({ TextInputAddress: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 10 }} label="Address" ></TextInput>
            <TouchableOpacity style={{ marginTop: 30 }} onPress={this.InputUsers} >
              <LinearGradient colors={['#fbb146', '#f78a2c']}
                // '#ffd600',
                // locations={[1,0.3,0.5]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.9 }}
                // locations={[0.3, 0.6,1]} 
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  Sign in
  </Text>
              </LinearGradient>

            </TouchableOpacity>

          </View>
        </ScrollView>


      </SafeAreaView>
    );
  }
}

// export default CodeTR=StackNavigator({

// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9100',


    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,

    elevation: 2,
  }, userInfoSection: {
    paddingLeft: 20,
  },
  header: {

    justifyContent: 'center',
    // alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ff9100',
    height: 120

  },
  title: {
    color: '#85375a',
    fontWeight: 'normal',
    fontSize: 18
  }, text: {
    color: 'gray',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  }, footer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',

    paddingHorizontal: 10,
    // paddingVertical: 30,
    height: 500

  }, container: {

  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 50,
    width: 50,
  },


});

