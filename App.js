import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { CustomHeader, CustomDrawerContent } from './src';
import {
  HomeScreen, HomeScreenDetail, SettingsScreen, SettingsScreenDetail, CreatePost, NewPost, NotificationScreen, MemberProfile, MenuScreen, PeriodCalandar, TestScreeen, ProductScreen2, HospitalBag, HospitalBagBaby, BMICalculator, BMIMeter, IdentifyPregnancy, RegularMenstruation, BloodPresure, MatirializeDialog, Investigation, Excercise, DitHelthyMother, WeightGain, AddWeight, KickCounter, EDDCalculator,
  CalandarData, EddWebView, GrowthWebView, VaccineWebView, BreastFeeding, VerticleYearChart, VerticleYearChart2, BabyActivities, FeedingTimeChart, UrinationTime, EliminationChart, SleepingTimeChart, TestMail, WeightChart, HealthDietChart, LabourRoomPacking, MealPlan, PeriodAgenda, PeriodHistory, SpecialNotes, TestChart, AreaCharts, AddMesurement, PrograssCircular, FoodPhyramid, WightGainBarchart, WeightGainDetailsAdd, BloodPresureBarChart, BloodPresureDetailsAdd, KickCounterHister, ClinicManagement, AgendaHistory, BathTracking, BathTrackingHistroy, ProfileImageView, UserProfile, ForgotPw, ForgotPwScreen, blogWebView, offersWebView, midwifeConfirm, BillerCategories, GetBiller, BillPaymentInformation
} from './src/tab';
import { NotificationsScreen } from './src/drawer';
import { RegisterScreen, LoginScreen, Login2Screen, SplashScreen } from './src/auth';
import { FlatList } from 'react-native-gesture-handler';
import { IMAGE } from './src/constants/image';
import { CardAddWebView } from './src/tab/CardAddWebView';



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
      {/* <Drawer.Screen name="offersWebView" options={{ title: 'Offers' ,headerShown: true}} navigation={navigation} component={offersWebView} />
      <Drawer.Screen name="blogWebView" options={{ title: 'Blog' ,headerShown: true}} navigation={navigation} component={blogWebView} /> */}
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()
// class SplashComponent extends React.Component
export default class App extends React.Component {
  // export default function App() {
  render() {

    return (
      <NavigationContainer>
        <StackApp.Navigator initialRouteName="SplashScreen">
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
          <StackApp.Screen name="TestMail" component={TestMail} options={navOptionHandler} />
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
              backgroundColor: '#fbb448'
            }
          }} component={blogWebView} />
          <StackApp.Screen name="offersWebView" options={{
            title: 'Offers', headerShown: true, headerStyle: {
              backgroundColor: '#fbb448'
            }
          }} component={offersWebView} />
          <StackApp.Screen name="midwifeConfirm" options={{
            title: 'Admin confirm', headerShown: true, headerStyle: {
              backgroundColor: '#fbb448'
            }
          }} component={midwifeConfirm} />
          <StackApp.Screen name="BillerCategories" options={{
             title: 'Biller Categories',headerShown: true, headerTintColor: 'white', headerStyle: {
              backgroundColor: '#9A81FD',
            }, headerTitleStyle: {
              color: 'white'
            }
          }} component={BillerCategories} />
          <StackApp.Screen name="GetBiller" options={{
            title: 'Billers',headerShown: true, headerTintColor: 'white', headerStyle: {
              backgroundColor: '#9A81FD',
            }, headerTitleStyle: {
              color: 'white'
            }
          }} component={GetBiller} />

          <StackApp.Screen name="BillPaymentInformation"  options={{
             title: 'Biller Information',headerShown: true, headerTintColor: 'white', headerStyle: {
              backgroundColor: '#9A81FD',
            }, headerTitleStyle: {
              color: 'white'
            },
          }} component={BillPaymentInformation} />
                   <StackApp.Screen name="CardAddWebView" options={{ title: 'CardAddWebView', headerShown: true }} component={CardAddWebView} />

        </StackApp.Navigator>
      </NavigationContainer>
    );
  }
}