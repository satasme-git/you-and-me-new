import React, {Component} from 'react';
import {
  StatusBar,
  TextInput,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {CustomHeader} from '../index';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Button} from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {Validation} from '../constants/Validation';
// import {Validation} from '../components/Validation'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class ForgotPwScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputPassword: '',
      TextInputNewPassword: '',
      TextInputRePassword: '',

      showAlert: false,
      pview:false,
      rview:false,

      isVisible:false,
      isVisible2:false
    };
  }

  state = {
    text: 'http://facebook.github.io/react-native/',
    show: true,
  };
  handleClose = () => {
    this.setState({show: false});
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };
  handleOpen() {
    this.setState({show: true});
  }

  InputUsers = () => {
    const {TextInputNewPassword} = this.state;
    const {TextInputRePassword} = this.state;

    if(TextInputNewPassword=='' && TextInputRePassword==''){
      this.setState({
        pview:true,
        rview:true
      })
    }
    else if(TextInputNewPassword==''){
      this.setState({
        pview:true,
        rview:false
      })
    }
    else if(TextInputRePassword==''){
      this.setState({
        pview:false,
        rview:true
      })
    }
    else if(TextInputRePassword!==TextInputNewPassword){
      this.setState({
        isVisible:true
      })
    }
    else{
      console.log(this.props.route.params.email)

    fetch('https://youandmenest.com/tr_reactnative/api/updatePassword', {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cus_password: TextInputNewPassword,
        cus_email:this.props.route.params.email
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
          },
          function () {},
        );
          console.log(responseJson)
        let id = responseJson.userid;

        // Alert.alert('Register success' );

        if (responseJson.id != undefined) {
          // AsyncStorage.setItem('memberNames', TextInputName).then(
          //   (responseJson) => {
          //     this.props.navigation.navigate('wherehouse');
          //   },
          // );
          // AsyncStorage.setItem('memberId', '' + responseJson.userid);
          this.setState({
            isVisible2:true
          })
        } else {
          showMessage({
            message: 'Registration fail Fail',
            description: 'Username or password incorrect',
            backgroundColor: 'red',
          });
        }

      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  render() {
    
    const {isVisible,isVisible2} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
        />

        <CustomHeader
          title="Forgot Your Password?"
          isHome={false}
          bdcolor="#fff"
          navigation={this.props.navigation}
        />

        <FlashMessage duration={1000} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 0,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  marginTop: 15,
                  color: '#00897b',
                }}>
                Reset Password{' '} {this.props.route.params.email}
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: -3}}>
                Please Enter New Password to
              </Text>
              <Text style={{fontSize: 12, color: 'gray', marginBottom: 25}}>
                Reset Your Password
              </Text>
            </View>
            <Modal 
                  isVisible={isVisible}
                  // isVisible={true}
                  backdropOpacity={0.5}
                  animationIn={'bounceIn'}
                  >
                    <View>
                      <View style={{flexDirection:'row',marginBottom:-30,zIndex:1}}>
                        <View style={{backgroundColor: '#ea3f37',height:40,width:windowWidth-100,borderTopLeftRadius:5,alignItems:'center',padding:10,flexDirection:'row'}} >
                          <MaterialIcons
                              name="error"
                              size={25}
                              color={'white'}
                              style={{alignSelf:'center',paddingRight:10}}
                          />

                          <Text style={{color:'white'}}>Error</Text>
                        </View>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 20,
                          borderTopWidth: 40,
                          borderRightColor: "transparent",
                          borderTopColor: "#ea3f37",
                        }}/>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderLeftWidth: 5,
                          borderRightWidth: 5,
                          borderBottomWidth: 10,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#940700",
                          marginLeft:-5
                        }}/>
                      </View>
                      
                     <View style={{backgroundColor:'white',padding:15,paddingTop:40,borderRadius:5}}>
                      <Text style={{fontSize:16}}>Passwords Not Matched</Text>
            
                      <Button 
                      title="Ok"
                      
                      titleStyle={{color:'black',fontSize:17}} 
                      buttonStyle={{alignSelf:'flex-end',marginTop:10,paddingVertical:5,borderColor:'#ea3f37',paddingHorizontal:20,backgroundColor:'white',borderWidth:2,borderRadius:10}}
                      onPress={()=>
                      this.setState({
                        isVisible:false
                      })
                      }
                      />
                      
                    </View> 
                    </View>
                    
                  </Modal>

                  <Modal 
                  isVisible={isVisible2}
                  // isVisible={true}
                  backdropOpacity={0.5}
                  animationIn={'bounceIn'}
                  >
                    <View>
                      <View style={{flexDirection:'row',marginBottom:-30,zIndex:1}}>
                        <View style={{backgroundColor: 'green',height:40,width:windowWidth-100,borderTopLeftRadius:5,alignItems:'center',padding:10,flexDirection:'row'}} >
                          <MaterialIcons
                              name="done"
                              size={25}
                              color={'white'}
                              style={{alignSelf:'center',paddingRight:10}}
                          />

                          <Text style={{color:'white'}}>Success</Text>
                        </View>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderRightWidth: 20,
                          borderTopWidth: 40,
                          borderRightColor: "transparent",
                          borderTopColor: "green",
                        }}/>
                        <View style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderLeftWidth: 5,
                          borderRightWidth: 5,
                          borderBottomWidth: 10,
                          borderLeftColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#104c2e",
                          marginLeft:-5
                        }}/>
                      </View>
                      
                     <View style={{backgroundColor:'white',padding:15,paddingTop:40,borderRadius:5}}>
                      <Text style={{fontSize:16}}>Successfully Updated</Text>
            
                      <Button 
                      title="Login"
                      
                      titleStyle={{color:'black',fontSize:17}} 
                      buttonStyle={{alignSelf:'flex-end',marginTop:10,paddingVertical:5,borderColor:'#3B7457',paddingHorizontal:20,backgroundColor:'white',borderWidth:2,borderRadius:10}}
                      onPress={()=>
                      {this.setState({
                        isVisible2:false
                      });this.props.navigation.navigate('Login2');}
                      }
                      />
                      
                    </View> 
                    </View>
                    
                  </Modal>


            <Animatable.View animation="fadeInUp">
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                New Password :
              </Text>
              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputNewPassword: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Enter New Password"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  pview:false
                })}
              />
              {
                this.state.pview==true?
                <Validation text={'Password is Required'} />
                :
                null
              }
            </View>
              <Text
                style={{
                  color: 'black',
                  paddingVertical: 5,
                  marginLeft: 2,
                  marginTop: 8,
                }}>
                Re-Password :
              </Text>
              <View style={{borderColor: 'gray',borderRadius: 8,borderWidth: 0.5,backgroundColor: '#F2F2F2',flexDirection:'row',alignItems:'center',width:windowWidth-30}}>
              <TextInput
                blurOnSubmit
                onChangeText={(TextInputValue) =>
                  this.setState({TextInputRePassword: TextInputValue})
                }
                style={{
                  borderRadius: 8,
                  backgroundColor: '#F2F2F2',
                  paddingLeft: 10,
                  width:windowWidth-75
                }}
                placeholder="Re-Enter New Password"
                onEndEditing={this.clearFocus}
                autoFocus={false}
                onFocus={()=>this.setState({
                  rview:false
                })}
              />
              {
                this.state.rview==true?
                <Validation text={'Re-Type Password is Required'} />
                :
                null
              }
              </View>

              <Button
                title="Reset"
                activeOpacity={0.5}
                titleStyle={{color: 'white'}}
                buttonStyle={
                  (styles.submitText,
                  {
                    backgroundColor: '#00897b',
                    borderRadius: 15,
                    width: '100%',
                    borderColor: 'white',
                    color: '#ccc',
                    padding: 15,
                    borderWidth: 1,
                    paddingHorizontal: 82,
                    marginTop:40,
                  })
                }
                // onPress={()=>{}}
                onPress={this.InputUsers}
              />

              
            </Animatable.View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    // flex: 1,
    // width: 280,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 14,
    color: 'white',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
