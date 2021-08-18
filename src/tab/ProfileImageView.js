
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Dimensions, Image, Text, View, TextInput, DrawerLayoutAndroidBase, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';

const db = new Database();

export class ProfileImageView extends Component {
    static navigationOptions = {
        title: 'Add Product',
    };
    constructor() {
        super();
        this.state = {
            prodId: '',
            prodName: '',
            prodDesc: '',
            abc: '',
            isLoading: false,
        };
    }
    async componentDidMount() {
        const myArray = await AsyncStorage.getItem('member_email');
        // Alert.alert('AynStoreage : '+myArray);
        const data = new FormData();
        data.append("get_about", "true");

  
        fetch('https://youandmenest.com/tr_reactnative/api/ge_member_byid', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member_email: myArray,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
      
                this.setState({
                    isLoading: false,

                    abc: responseJson.member_image,
      
                })
      
      
            }).catch((error) => {
                console.error(error);
            })
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveProduct() {
        this.setState({
            isLoading: true,
        });
        let data = {
            prodId: this.state.prodId,
            prodName: this.state.prodName,
            prodDesc: this.state.prodDesc

        }
        db.addProduct(data).then((result) => {
            console.log(result);
            this.setState({
                isLoading: false,
            });
            //   this.props.navigation.state.params.onNavigateBack;
            //   this.props.navigation.goBack();
        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="black" />
                <View style={{ color: 'white',backgroundColor:'black' ,alignItems:'flex-end',paddingTop:10,paddingEnd:20}}>
                <Button
                  title="Skip"
                  type="outline"
                  titleStyle={{ color: 'white',fontWeight:'normal',fontSize:14 }}
                  buttonStyle={styles.submitText, { borderRadius: 25,width:80, borderColor: 'white', color: '#ccc', padding: 7, borderWidth: 0.5,marginBottom:0 }}
                  onPress={() => this.props.navigation.goBack() }

                />
                </View>
                <View style={{ flex: 1, backgroundColor: 'black' }}>

                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={420}
                        imageHeight={420}>
                        <Image style={{ height: 400 }}
                            source={{ uri: "https://youandmenest.com/tr_reactnative/public/images/Members/" + this.state.abc }} />
                    </ImageZoom>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    }
})