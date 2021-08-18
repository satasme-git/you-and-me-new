import React, { Component } from 'react';
import { Alert, FlatList, Text, ScrollView, Image, View, SafeAreaView, ListView, TouchableOpacity, ActivityIndicator, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';

import { List, ListItem, Left, Body, Right } from 'native-base';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// import { ActivityIndicator } from 'react-native-paper';


const styles = StyleSheet.create({
    TextInputStyleClass: {
        textAlign: 'center',
        height: 38,
        borderWidth: 0.5,
        borderColor: '#aaaaaa',
        borderRadius: 20,
        backgroundColor: "#FFFFFF"
    }, inputsContainer: {
        flex: 1
    },
    fullWidthButton: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullWidthButtonText: {
        fontSize: 24,
        color: 'white'
    }, container: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    line: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        height: 50
    },
    textLabel: {
        height: 50,
        fontSize: 18,
        backgroundColor: 'blue',
        alignItems: 'center'
    },
    textBox: {
        color: 'grey',
        height: 50,
        fontSize: 18,
        flexGrow: 1,
        alignItems: 'center',
        padding: 12
    }, container: {
        marginTop: 20,
        backgroundColor: '#f5fcff'
    }, itemRow: {
        borderBottomColor: '#ccc',
        marginTop: 10,
        borderBottomWidth: 1
    }, itemImage: {
        width: '100%',
        // height: 200,
        resizeMode: 'cover'
    }, loader: {
        marginTop: 10,
        alignItems: 'center'
    }

});

handleLoadMore = () => {
    this.setState({ page: this.state.page + 1, isLoading: true }, this.getData)
}

export class CreatePost extends Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         dataSource: []
    //     }
    // }
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            // dataSource: []
            page: 1,
            isLoading: false
        }
    }
    renderItem = ({ item }) => {

        <View>
            <View>
                <Text>asdasdas{item.id}</Text>
                <Text>{item.title}</Text>
                <Text>{item.post_image}</Text>
                <Text>{item.member_name}</Text>
            </View>
        </View>

    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.getData)
        // this.getData()
        // return fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/posts.php')
        //     .then((response) => response.json())
        //     .then((responseJson) => {

        //         this.setState({
        //             dataSource: responseJson

        //         }, function () { })
        //         // Alert.alert(
        //         //     " data",
        //         //     " data - " + this.state.dataSource
        //         // )
        //     }).catch((error) => {
        //         console.error(error)
        //     })

    }

    renderRow = ({ item }) => {
        return (
            <Card>
                <View style={styles.itemRow}>
                    <View style={{ flexDirection: 'row', height: 60, paddingBottom: 10, }} >

                        <View style={{ height: 50, padding: 10 }}>
                            <Image source={IMAGE.ICON_Profile}
                                style={{ height: 35, width: 35, borderRadius: 60 }}
                            >
                            </Image>
                        </View>

                        <View style={{ flex: 2, paddingTop: 8, paddingEnd: 0 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.member_name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 11, color: 'grey' }}>2h .</Text>
                                <Icon name="heart" style={{ color: '#0A69FE', paddingTop: 3 }} />
                            </View>

                        </View>
                    </View>
                    <Text >{item.title}</Text>
                    <Text >{item.id}</Text>
                    {/* <Text>{item.post_image}</Text> */}
                    <CardImage style={styles.itemImage}
                        source={{ uri: item.post_image }}
                    />
                    {/* <Image source={{uri:item.url}} style={styles.itemImage}/> */}

                    <CardAction
                        separator={true}>
                        <View style={styles.line}>

                            <View style={styles.textBox}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="like" style={{ color: '#0A69FE', padding: 0, fontSize: 25 }} />
                                    <Text>Like</Text>

                                </View>
                            </View>
                            <View style={styles.textBox}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="comment" style={{ color: '#0A69FE', fontSize: 25 }} />
                                    <Text>Comment</Text>

                                </View>
                            </View>
                            <View style={styles.textBox}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="share-google" style={{ color: '#0A69FE', fontSize: 25 }} />
                                    <Text>Share</Text>

                                </View>
                            </View>
                        </View>

                    </CardAction>
          
                </View>
            </Card>
        )
    }
    getData = async () => {
        const apiURL = "http://youandmenest.com/tr_reactnative/posts.php"
        fetch(apiURL).then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    data: this.state.data.concat(resJson),
                    isLoading: false
                })
            })
    }
    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View> : null
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#f2f2f2' }}>
                <View style={{ flexDirection: 'row', height: 60, borderBottomColor: '#cccccc', borderBottomWidth: 1, paddingBottom: 10 }} >
                    <View style={{ height: 50, padding: 12 }}>
                        <Image source={IMAGE.ICON_Profile}
                            style={{ height: 35, width: 35, borderRadius: 60 }}
                        >
                        </Image>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
                        {/* <Text style={{ textAlign: 'center' }}>zczczxc</Text> */}
                        <TouchableOpacity style={styles.TextInputStyleClass} onPress={() => this.props.navigation.navigate('NewPost')}>
                            <Text style={{ padding: 8, paddingStart: 20, color: 'grey' }}>What's on your mind </Text>
                        </TouchableOpacity>
                        {/* underlineColorAndroid='transparent' */}
                    </View>
                </View>

                <FlatList
                  
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={this.renderFooter}
                  
                />
                {/* <FlatList

                    data={this.state.dataSource}
                    // renderItem={this.renderItem}


                    renderItem={({ item }) => <ListItem >
                        <Card>
                            <View style={{ flexDirection: 'row', height: 60, paddingBottom: 10, }} >

                                <View style={{ height: 50, padding: 10 }}>
                                    <Image source={IMAGE.ICON_Profile}
                                        style={{ height: 35, width: 35, borderRadius: 60 }}
                                    >
                                    </Image>
                                </View>

                                <View style={{ flex: 2, paddingTop: 8, paddingEnd: 0 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.member_name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 11, color: 'grey' }}>2h .</Text>
                                        <Icon name="heart" style={{ color: '#0A69FE', paddingTop: 3 }} />
                                    </View>

                                </View>
                            </View>
                            <View>
                                <Text style={{ padding: 10 }}>{item.title}</Text>
                            </View>
                            <CardImage
                                source={{ uri: 'http://bit.ly/2GfzooV' }}
                            />
                            <CardAction
                                separator={true}>
                                <View style={styles.line}>

                                    <View style={styles.textBox}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name="like" style={{ color: '#0A69FE', padding: 0, fontSize: 25 }} />
                                            <Text>Like</Text>

                                        </View>
                                    </View>
                                    <View style={styles.textBox}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name="comment" style={{ color: '#0A69FE', fontSize: 25 }} />
                                            <Text>Comment</Text>

                                        </View>
                                    </View>
                                    <View style={styles.textBox}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name="share-google" style={{ color: '#0A69FE', fontSize: 25 }} />
                                            <Text>Share</Text>

                                        </View>
                                    </View>
                                </View>

                            </CardAction>
                        </Card>

                    </ListItem>
                    } /> */}
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
