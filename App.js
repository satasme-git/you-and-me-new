import * as React from 'react';
import { useEffect, useState } from 'react';

import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput , Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { CustomHeader, CustomDrawerContent } from './src';
import {
  HomeScreen, HomeScreenDetail, SettingsScreen, SettingsScreenDetail, CreatePost, NewPost, NotificationScreen, MemberProfile, MenuScreen, PeriodCalandar, TestScreeen, ProductScreen2, HospitalBag, HospitalBagBaby, BMICalculator, BMIMeter, IdentifyPregnancy, RegularMenstruation, BloodPresure, MatirializeDialog, Investigation, Excercise, DitHelthyMother, WeightGain, AddWeight, KickCounter, EDDCalculator,
  CalandarData, EddWebView, GrowthWebView, VaccineWebView, BreastFeeding, VerticleYearChart, VerticleYearChart2, BabyActivities, FeedingTimeChart, UrinationTime, EliminationChart, SleepingTimeChart, WeightChart, HealthDietChart, LabourRoomPacking, MealPlan, PeriodAgenda, PeriodHistory, SpecialNotes, TestChart, AreaCharts, AddMesurement, PrograssCircular, FoodPhyramid, WightGainBarchart, WeightGainDetailsAdd, BloodPresureBarChart, BloodPresureDetailsAdd, KickCounterHister, ClinicManagement, AgendaHistory, BathTracking, BathTrackingHistroy, ProfileImageView, UserProfile, ForgotPw, ForgotPwScreen, blogWebView, offersWebView, midwifeConfirm, BillerCategories, GetBiller, UserProfile_GP, BillPaymentInformation
} from './src/tab';
import { NotificationsScreen } from './src/drawer';
import { RegisterScreen, LoginScreen, Login2Screen, SplashScreen } from './src/auth';
import { FlatList } from 'react-native-gesture-handler';
import { IMAGE } from './src/constants/image';
import { CardAddWebView } from './src/tab/CardAddWebView';
import Subscription from './src/auth/Subscription';
import TrialScreen from './src/auth/TrialScreen';
import GlobalState from './Context/GlobalState';
import Context from './Context/context';

import Modal from 'react-native-modal';
import { BarIndicator } from 'react-native-indicators';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CountDown from 'react-native-countdown-component';
import i18n from 'i18n-js';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

import RNRestart from 'react-native-restart';
// import * as RootNavigation from './RootNavigation.js';

const _format = 'YYYYMMDDHmm'
const _today = moment().format(_format)

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    height: 38,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  }
});

function HomeScreen4() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader bgcolor='white' title="Home" isHome={true} navigation={this.props.navigation} />

      <View style={{ flexDirection: 'row', height: 60, borderBottomColor: '#cccccc', borderBottomWidth: 1, paddingBottom: 10 }} >
        <View style={{ height: 50, padding: 12 }}>
          <Image source={IMAGE.ICON_Profile}
            style={{ height: 35, width: 35, borderRadius: 60 }}
          >
          </Image>
        </View>

        <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
          {/* <Text style={{ textAlign: 'center' }}>zczczxc</Text> */}
          <TextInput placeholder="What's on your mind" underlineColorAndroid='transparent' style={styles.TextInputStyleClass} />

        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


        <Text>Home!xx</Text>
        <TouchableOpacity style={{ marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('SettingsScreen')}
        >
          <Text>Go Home Details</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

function SettingsScreen4() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ModalScreeen({navigation}) {

  const [state, setState] = useState({
    
    lan: '',
    defaultval: 0,
    isVisible: false,
    isModalVisible: false,
    isLoading: true,
    created:0,
    expired:false,
    failed:false,

    modalLoading:true,

    time:20000,
    email:''
  });

  useEffect(() => {
    checkToken();
  }, []);

  const toggleModal = () => {
    const {isModalVisible} = this.state
    setState({
      isModalVisible: !isModalVisible,
      isLoading: false
    });
     
  };

  const checkToken = async () => {

    const role_id = await AsyncStorage.getItem('memberId');
    const token = await AsyncStorage.getItem('memberNames');
    const email = await AsyncStorage.getItem('member_email');

    this.setState({
      email: email
    });

    if (token) {

      const formData = new FormData()

      formData.append('email', email);

      fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
        method: 'POST', // or 'PUT'
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if(data[0].member_role==3){
            this.checkSubscription()
          }
          else{
              if(data[0].subscription=='FREE'){
              var date1 = moment(new Date()) //firstDate
              var date2 = moment(data[0].trial_date).add(1, 'days')

              setState({
                time: date2.diff(date1, 'seconds')*1000,
                created: date2.diff(date1, 'seconds'),
                isLoading: false,
              });
              // context.addSub('FREE');
              // context.addEmail(email);

              console.log(date2.diff(date1, 'seconds')*1000)

              if (date2.diff(date1, 'seconds')*1000 >=0){
              setTimeout(() => 
              {
                toggleModal()
                setState({
                  created: 0,
                  isLoading: false,
                });
            }
              , date2.diff(date1, 'seconds')*1000 )
              console.log('high')
            }
            else {
              toggleModal();
              console.log('low')
            }
              // var d = JSON.stringify(data)
              // console.log(data[0].subscription);
              // data[0].member_role==3?this.checkSubscription():
              // data[0].subscription == "SUCCESS" ?
              //   this.checkSubscription()
              //   :
              //   // null
              //   this.toggleModal()
              }
              // else if(data[0].subscription=='SUCCESS'){
              //   console.log('SUCCESS')

              //   this.checkSubscription()
              //   this.context.addEmail(email);
              // }
              // else {
              //   console.log('failed')
              //   this.toggleModal()
              //   this.setState({
              //       failed: true,
              //     }); 
                  
              //   this.context.addEmail(email);
              // }
          }


        })
        .catch((error) => {
        });


    }

    else {
      setState({
        isLoading: false,
      });
      // this.props.navigation.navigate('Login');

      console.log("data");
    }
  }

  const { email, isModalVisible, isLoading , created, expired,failed , modalLoading} = state

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Modal
              isVisible={isModalVisible}
              // isVisible={true}
              transparent={true}
              backdropOpacity={0.5}

              animationIn={'bounceIn'}
            >
             

              <View onLayout={()=>setTimeout(()=>{setState({modalLoading: false})}, 1000)}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: expired==true?'red':failed==true?'red':'green',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 10,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="cached"
                                    size={20}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />
                                <Text style={{ color: 'white' }}>{i18n.t('subscribe.hedding')}</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: expired==true?'red':failed==true?'red':'green',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: expired==true?'#a80606':failed==true?'#a80606':'#104c2e',
                                    marginLeft: -5,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                            }}>
                              {failed==true?
                                <Text style={{fontSize:17,paddingVertical:12}}>{i18n.t('subscribe.sub')}</Text>
                                :
                                <View>
                              <View style={{alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:17}}>{i18n.t('subscribe.in')}</Text>
                            </View>
                            {created==0?
                        <View style={{alignItems:'center',justifyContent:'center',height:40}}>
                            <BarIndicator color='#4E3CCE' size={17} />
                            </View>
                        :
                        <CountDown
                            until={created}
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#000'}}
                            onFinish={() => setState({
                              expired: true
                            })}
                            size={20}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{h:i18n.t('subscribe.h'),m: i18n.t('subscribe.m'), s: i18n.t('subscribe.s')}}
                            separatorStyle={{color: '#000',paddingBottom:20}}
                            showSeparator
                        />}
                        </View>
                        }
                        {modalLoading==true?
                        <View style={{backgroundColor:"#fff",padding:10}}>
                        <BarIndicator style={{ marginTop: 0 }} color='#4E3CCE'  size={17} />
                      </View>
                        :
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' ,alignItems:'center'}}>
                                  {
                                    expired==true?<Text style={{fontSize:17,paddingRight:20,marginTop: 10}}>{i18n.t('subscribe.expire')}</Text>:
                                    failed==true?
                                    null:
                                    <Button
                                    title={i18n.t('subscribe.use')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: 'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                    onPress={() =>{props.navigation.navigate('HomeApp');this.toggleModal()}}
                                />
                                  }
                                  {
                                    expired==true?
                                    <Button
                                    title={i18n.t('subscribe.start2')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {props.navigation.navigate('Subscription', { email: email,ref_code:_today });toggleModal()}}
                                />:
                                    failed==true?
                                    <Button
                                    title={i18n.t('subscribe.start2')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {gotoSubscribe();toggleModal()}}
                                />
                                :
                                <Button
                                title={i18n.t('subscribe.choose')}
                                titleStyle={{ color: 'black', fontSize: 17 }}
                                buttonStyle={{
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                    paddingVertical: 5,
                                    borderColor: expired==true?'red':failed==true?'red':'green',
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                }}
                                onPress={() => {props.navigation.navigate('TrialScreen');toggleModal()}}
                            />
                                  }
                            </View>
                            }
                        </View>
                    </View>


            </Modal>
    </View>
  );
}
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();



const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}
const StackSetting = createStackNavigator()

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingsScreen} options={navOptionHandler} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
    // screenOptions={({ route }) => ({
    // tabBarLabel: ({ focused, color, size }) => {
    //           let iconName;

    //           if (route.name === 'Home') {
    //             iconName = focused
    //               ? IMAGE.ICON_HOME
    //               : IMAGE.ICON_HOME_BLACK;
    //           } else if (route.name === 'Settings') {
    //             iconName = focused
    //               ? IMAGE.ICON_SETTING
    //               : IMAGE.ICON_SETTING_BLACK;
    //           }

    //           // You can return any component that you like here!
    //           return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
    //         },
    //       })}
    //       tabBarOptions={{
    //         activeTintColor: 'red',
    //         inactiveTintColor: 'gray',
    //       }}

    // tabBarOptions={{
    //     showIcon: false, 

    //     showLabel: true,
    //     activeTintColor: '#8e0000',
    //     labelStyle: {},
    //   }}
    >
      <Tab.Screen
        name="Post"
        component={CreatePost}


        options={navOptionHandler, {
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_HOME_BLACK
              : IMAGE.ICON_HOME;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingStack}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_SETTING_BLACK
              : IMAGE.ICON_SETTING;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}


        options={navOptionHandler, {
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_BELL_BLACK
              : IMAGE.ICON_BELL_WHITE;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}
      />
      <Tab.Screen
        name="member"
        component={MemberProfile}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_USER_BLACK
              : IMAGE.ICON_USER_WHITE;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />
      <Tab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_MENU_ORRANGE
              : IMAGE.ICON_MENU;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />


    </Tab.Navigator>
    // {/* // </NavigationContainer> */}
  )
}
// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused
//               ? IMAGE.ICON_HOME
//               : IMAGE.ICON_HOME_BLACK;
//           } else if (route.name === 'Settings') {
//             iconName = focused
//               ? IMAGE.ICON_SETTING
//               : IMAGE.ICON_SETTING_BLACK;
//           }

//           // You can return any component that you like here!
//           return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'red',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Settings" component={SettingStack} />
//     </Tab.Navigator>

//   )
// }

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  return (
    // <Drawer.Navigator initialRouteName="MenuTab" drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
    //   <Drawer.Screen name="MenuTab" component={TabNavigator} />
    // <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    // </Drawer.Navigator>
    <Drawer.Navigator initialRouteName="HomeScreen" drawerStyle={{ backgroundColor: 'transparent' }} drawerContent={() => <CustomDrawerContent navigation={navigation} />}>

      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="member" component={MemberProfile} />
      <Drawer.Screen name="UserProfile" navigation={navigation} component={UserProfile} />
      <Drawer.Screen name="UserProfile_GP" navigation={navigation} component={UserProfile_GP} />

      {/* <Drawer.Screen name="offersWebView" options={{ title: 'Offers' ,headerShown: true}} navigation={navigation} component={offersWebView} />
      <Drawer.Screen name="blogWebView" options={{ title: 'Blog' ,headerShown: true}} navigation={navigation} component={blogWebView} /> */}
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()
// class SplashComponent extends React.Component
export default class App extends React.Component {

  static contextType = Context;
  // export default function App() {
    constructor(props) {
      super(props)

      this.state = {
        lan: '',
        defaultval: 0,
        isVisible: false,
        isModalVisible: false,
        isLoading: true,
        created:0,
        expired:false,
        failed:false,
  
        modalLoading:true,

        time:20000,
        email:''
      }

    }
    componentDidMount () {
      this.checkToken()
      let {time} = this.state;
      
   }
   
    toggleModal = () => {
      const {isModalVisible} = this.state
      this.setState({
        isModalVisible: !isModalVisible,
        isLoading: false
      });
       
    };

    checkToken = async () => {

      const role_id = await AsyncStorage.getItem('memberId');
      const token = await AsyncStorage.getItem('memberNames');
      const email = await AsyncStorage.getItem('member_email');

      this.setState({
        email: email
      });

      if (token) {
  
        const formData = new FormData()
  
        formData.append('email', email);
  
        fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
          method: 'POST', // or 'PUT'
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if(data[0].member_role==3){
              this.checkSubscription()
            }
            else{
                if(data[0].subscription=='FREE'){
                var date1 = moment(new Date()) //firstDate
                var date2 = moment(data[0].trial_date).add(1, 'days')
  
                this.setState({
                  time: date2.diff(date1, 'seconds')*1000,
                  // created: date2.diff(date1, 'seconds'),
                  isLoading: false,
                });
                this.context.addSub('FREE');
                this.context.addEmail(email);
  
                console.log(date2.diff(date1, 'seconds')*1000)

                if (date2.diff(date1, 'seconds')*1000 >=0){
                setTimeout(() => 
                {
                  this.toggleModal()
                  this.setState({
                    created: 0,
                    isLoading: false,
                  });
              }
                , date2.diff(date1, 'seconds')*1000 )
                console.log('high')
              }
              // else {
              //   this.toggleModal();
              //   console.log('low')
              // }
                // var d = JSON.stringify(data)
                // console.log(data[0].subscription);
                // data[0].member_role==3?this.checkSubscription():
                // data[0].subscription == "SUCCESS" ?
                //   this.checkSubscription()
                //   :
                //   // null
                //   this.toggleModal()
                }
                // else if(data[0].subscription=='SUCCESS'){
                //   console.log('SUCCESS')
  
                //   this.checkSubscription()
                //   this.context.addEmail(email);
                // }
                // else {
                //   console.log('failed')
                //   this.toggleModal()
                //   this.setState({
                //       failed: true,
                //     }); 
                    
                //   this.context.addEmail(email);
                // }
            }
  
  
          })
          .catch((error) => {
          });
  
  
      }
  
      else {
        this.setState({
          isLoading: false,
        });
        // this.props.navigation.navigate('Login');
  
        console.log("data");
      }
    }
  render() {
    const { navigation } = this.props;
    const { email, isModalVisible, isLoading , created, expired,failed , modalLoading} = this.state
    
      

    const gotoSubscribe = async () => {

      const email = await AsyncStorage.getItem('member_email');
      // const nic = await AsyncSStorage.getItem('member_nic');
      
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : "+nic);
      this.props.navigation.navigate('Subscription', { email: email,ref_code:_today });
  
    };
    
    return (
      <GlobalState>
      <NavigationContainer>

         <Modal
              isVisible={isModalVisible}
              // isVisible={true}
              transparent={true}
              backdropOpacity={0.5}

              animationIn={'bounceIn'}
            >
             

              <View onLayout={()=>setTimeout(()=>{this.setState({modalLoading: false})}, 1000)}>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginBottom: -30,
                                zIndex: 1,
                            }}>
                            <View
                                style={{
                                    backgroundColor: expired==true?'red':failed==true?'red':'green',
                                    height: 40,
                                    width: windowWidth - 100,
                                    borderTopLeftRadius: 5,
                                    alignItems: 'center',
                                    padding: 10,
                                    flexDirection: 'row',
                                }}>
                                <MaterialIcons
                                    name="cached"
                                    size={20}
                                    color={'white'}
                                    style={{ alignSelf: 'center', paddingRight: 10 }}
                                />
                                <Text style={{ color: 'white' }}>{i18n.t('subscribe.hedding')}</Text>
                            </View>
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderRightWidth: 20,
                                    borderTopWidth: 40,
                                    borderRightColor: 'transparent',
                                    borderTopColor: expired==true?'red':failed==true?'red':'green',
                                }}
                            />
                            <View
                                style={{
                                    width: 0,
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderLeftWidth: 5,
                                    borderRightWidth: 5,
                                    borderBottomWidth: 10,
                                    borderLeftColor: 'transparent',
                                    borderRightColor: 'transparent',
                                    borderBottomColor: expired==true?'#a80606':failed==true?'#a80606':'#104c2e',
                                    marginLeft: -5,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 15,
                                paddingTop: 40,
                                borderRadius: 5,
                            }}>
                              {failed==true?
                                <Text style={{fontSize:17,paddingVertical:12}}>{i18n.t('subscribe.sub')}</Text>
                                :
                                <View>
                              <View style={{alignItems:'center',justifyContent:'center'}}>
                              <Text style={{fontSize:17}}>{i18n.t('subscribe.in')}</Text>
                            </View>
                            {/* {created==0?
                        <View style={{alignItems:'center',justifyContent:'center',height:40}}>
                            <BarIndicator color='#4E3CCE' size={17} />
                            </View>
                        : */}
                        <CountDown
                            until={created}
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#000'}}
                            onFinish={() => this.setState({
                              expired: true
                            })}
                            size={20}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{h:i18n.t('subscribe.h'),m: i18n.t('subscribe.m'), s: i18n.t('subscribe.s')}}
                            separatorStyle={{color: '#000',paddingBottom:20}}
                            showSeparator
                        />
                        {/* } */}
                        </View>
                        }
                        {modalLoading==true?
                        <View style={{backgroundColor:"#fff",padding:10}}>
                        <BarIndicator style={{ marginTop: 0 }} color='#4E3CCE'  size={17} />
                      </View>
                        :
                            <View
                                style={{ flexDirection: 'row', justifyContent: 'flex-end' ,alignItems:'center'}}>
                                  {
                                    expired==true?<Text style={{fontSize:17,paddingRight:20,marginTop: 10}}>{i18n.t('subscribe.expire')}</Text>:
                                    failed==true?
                                    null:
                                    <Button
                                    title={i18n.t('subscribe.use')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: 'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                    onPress={() =>{this.props.navigation.navigate('HomeApp');this.toggleModal()}}
                                />
                                  }
                                  {
                                    expired==true?
                                    <Button
                                    title={i18n.t('subscribe.log')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {RNRestart.Restart();this.toggleModal()}}
                                />
                                // null
                                :
                                    failed==true?
                                    <Button
                                    title={i18n.t('subscribe.start2')}
                                    titleStyle={{ color: 'black', fontSize: 17 }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        marginTop: 10,
                                        paddingVertical: 5,
                                        borderColor: expired==true?'red':failed==true?'red':'green',
                                        paddingHorizontal: 20,
                                        backgroundColor: 'white',
                                        borderWidth: 2,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {this.gotoSubscribe();this.toggleModal()}}
                                />
                                :
                                <Button
                                title={i18n.t('subscribe.choose')}
                                titleStyle={{ color: 'black', fontSize: 17 }}
                                buttonStyle={{
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                    paddingVertical: 5,
                                    borderColor: expired==true?'red':failed==true?'red':'green',
                                    paddingHorizontal: 20,
                                    backgroundColor: 'white',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                }}
                                onPress={() => {this.props.navigation.navigate('TrialScreen');this.toggleModal()}}
                            />
                                  }
                            </View>
                            }
                        </View>
                    </View>


            </Modal>



        
          <StackApp.Navigator initialRouteName="SplashScreen">
          {/* <StackApp.Screen name="App" component={DrawerNavigator} options={navOptionHandler} /> */}
            <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler} />
            <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
            <StackApp.Screen name="Login2" component={Login2Screen} options={navOptionHandler} />
            <StackApp.Screen name="SplashScreen" component={SplashScreen} options={navOptionHandler} />
            <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
            <StackApp.Screen name="NewPost" component={NewPost} options={navOptionHandler} />
            <StackApp.Screen name="PeriodCalandar" component={PeriodCalandar} options={navOptionHandler} />
            <StackApp.Screen name="TestScreeen" component={TestScreeen} options={navOptionHandler} />
            <StackApp.Screen name="ProductScreen2" component={ProductScreen2} options={navOptionHandler} />
            <StackApp.Screen name="HospitalBag" component={HospitalBag} options={navOptionHandler} />
            <StackApp.Screen name="HospitalBagBaby" component={HospitalBagBaby} options={navOptionHandler} />
            <StackApp.Screen name="BMICalculator" component={BMICalculator} options={navOptionHandler} />
            <StackApp.Screen name="BMIMeter" component={BMIMeter} options={navOptionHandler} />
            <StackApp.Screen name="IdentifyPregnancy" component={IdentifyPregnancy} options={navOptionHandler} />
            <StackApp.Screen name="RegularMenstruation" component={RegularMenstruation} options={navOptionHandler} />
            <StackApp.Screen name="BloodPresure" component={BloodPresure} options={navOptionHandler} />
            <StackApp.Screen name="MatirializeDialog" component={MatirializeDialog} options={navOptionHandler} />
            <StackApp.Screen name="Investigation" component={Investigation} options={navOptionHandler} />
            <StackApp.Screen name="Excercise" component={Excercise} options={navOptionHandler} />
            <StackApp.Screen name="DitHelthyMother" component={DitHelthyMother} options={navOptionHandler} />
            <StackApp.Screen name="WeightGain" component={WeightGain} options={navOptionHandler} />
            <StackApp.Screen name="AddWeight" component={AddWeight} options={navOptionHandler} />
            <StackApp.Screen name="KickCounter" component={KickCounter} options={navOptionHandler} />
            <StackApp.Screen name="EDDCalculator" component={EDDCalculator} options={navOptionHandler} />
            <StackApp.Screen name="CalandarData" component={CalandarData} options={navOptionHandler} />
            <StackApp.Screen name="BreastFeeding" component={BreastFeeding} options={navOptionHandler} />
            <StackApp.Screen name="VerticleYearChart" component={VerticleYearChart} options={navOptionHandler} />
            <StackApp.Screen name="VerticleYearChart2" component={VerticleYearChart2} options={navOptionHandler} />
            <StackApp.Screen name="BabyActivities" component={BabyActivities} options={navOptionHandler} />
            <StackApp.Screen name="FeedingTimeChart" component={FeedingTimeChart} options={navOptionHandler} />
            <StackApp.Screen name="UrinationTime" component={UrinationTime} options={navOptionHandler} />
            <StackApp.Screen name="EliminationChart" component={EliminationChart} options={navOptionHandler} />
            <StackApp.Screen name="SleepingTimeChart" component={SleepingTimeChart} options={navOptionHandler} />
           
            <StackApp.Screen name="WeightChart" component={WeightChart} options={navOptionHandler} />
            <StackApp.Screen name="HealthDietChart" component={HealthDietChart} options={navOptionHandler} />
            <StackApp.Screen name="LabourRoomPacking" component={LabourRoomPacking} options={navOptionHandler} />
            <StackApp.Screen name="MealPlan" component={MealPlan} options={navOptionHandler} />
            <StackApp.Screen name="PeriodAgenda" component={PeriodAgenda} options={navOptionHandler} />
            <StackApp.Screen name="PeriodHistory" component={PeriodHistory} options={navOptionHandler} />
            <StackApp.Screen name="SpecialNotes" component={SpecialNotes} options={navOptionHandler} />
            <StackApp.Screen name="TestChart" component={TestChart} options={navOptionHandler} />
            <StackApp.Screen name="AreaChart" component={AreaCharts} options={navOptionHandler} />
            <StackApp.Screen name="AddMesurement" component={AddMesurement} options={navOptionHandler} />
            <StackApp.Screen name="PrograssCircular" component={PrograssCircular} options={navOptionHandler} />
            <StackApp.Screen name="FoodPhyramid" component={FoodPhyramid} options={navOptionHandler} />
            <StackApp.Screen name="WightGainBarchart" component={WightGainBarchart} options={navOptionHandler} />
            <StackApp.Screen name="WeightGainDetailsAdd" component={WeightGainDetailsAdd} options={navOptionHandler} />
            <StackApp.Screen name="BloodPresureBarChart" component={BloodPresureBarChart} options={navOptionHandler} />
            <StackApp.Screen name="BloodPresureDetailsAdd" component={BloodPresureDetailsAdd} options={navOptionHandler} />
            <StackApp.Screen name="KickCounterHister" component={KickCounterHister} options={navOptionHandler} />
            <StackApp.Screen name="ClinicManagement" component={ClinicManagement} options={navOptionHandler} />
            <StackApp.Screen name="AgendaHistory" component={AgendaHistory} options={navOptionHandler} />
            <StackApp.Screen name="BathTracking" component={BathTracking} options={navOptionHandler} />
            <StackApp.Screen name="BathTrackingHistroy" component={BathTrackingHistroy} options={navOptionHandler} />
            <StackApp.Screen name="ProfileImageView" component={ProfileImageView} options={navOptionHandler} />
            <StackApp.Screen name="Vaccine details" options={{ title: 'Details view' }} component={VaccineWebView} />
            <StackApp.Screen name="EddWebView" options={{ title: 'Estimated date of delivery' }} component={EddWebView} />
            <StackApp.Screen name="GrowthWebView" options={{ title: 'Growth chart details' }} component={GrowthWebView} />
            <StackApp.Screen name="Forgotpw" options={{ title: 'Forgotpw', headerShown: false }} component={ForgotPw} />
            <StackApp.Screen name="ForgotPwScreen" options={{ title: 'ForgotPwScreen', headerShown: false }} component={ForgotPwScreen} />
            <StackApp.Screen name="blogWebView" options={{
              title: 'Blog', headerShown: true, headerStyle: {
                backgroundColor: '#4E3CCE'
              }, headerTitleStyle: {
                color: 'white'
              }
            }} component={blogWebView} />
            <StackApp.Screen name="offersWebView" options={{
              title: 'Offers', headerShown: true, headerStyle: {
                backgroundColor: '#4E3CCE'
              }, headerTitleStyle: {
                color: 'white'
              }
            }} component={offersWebView} />
            <StackApp.Screen name="midwifeConfirm" options={{
              title: 'Admin confirm', headerShown: true, headerStyle: {
                backgroundColor: '#4E3CCE'
              }
            }} component={midwifeConfirm} />
            <StackApp.Screen name="BillerCategories" options={{
              title: 'Biller Categories', headerShown: true, headerTintColor: 'white', headerStyle: {
                backgroundColor: '#9A81FD',
              }, headerTitleStyle: {
                color: 'white'
              }
            }} component={BillerCategories} />
            <StackApp.Screen name="GetBiller" options={{
              title: 'Billers', headerShown: true, headerTintColor: 'white', headerStyle: {
                backgroundColor: '#9A81FD',
              }, headerTitleStyle: {
                color: 'white'
              }
            }} component={GetBiller} />

            <StackApp.Screen name="BillPaymentInformation" options={{
              title: 'Biller Information', headerShown: true, headerTintColor: 'white', headerStyle: {
                backgroundColor: '#9A81FD',
              }, headerTitleStyle: {
                color: 'white'
              },
            }} component={BillPaymentInformation} />
            <StackApp.Screen name="CardAddWebView" options={{ title: 'CardAddWebView', headerShown: true }} component={CardAddWebView} />

            <StackApp.Screen name="Subscription" options={{ headerShown: true }} component={Subscription} />
         
            <StackApp.Screen name="TrialScreen" options={{ headerShown: false }} component={TrialScreen} /> 
            </StackApp.Navigator>
        </NavigationContainer>
      </GlobalState>
    );




    
  }
}