import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';

export default function Subscription() {

    const route = useRoute();
    const [memberid, setMemberId] = useState(route.params.email);
    const [ref_code, setMemberRefcode] = useState(route.params.ref_code);
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const [key, setKey] = useState(0);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     // document.title = `You clicked ${count} times`;
    //     // console.log(route.params.email?route.params.email:"no")
    //   },[]);

    const getData = () => {

        const formData = new FormData()

        formData.append('email', route.params.email);

        fetch('https://youandmenest.com/tr_reactnative/api/getStatus', {
            method: 'POST', // or 'PUT'
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // setIsLogged(data)
                setData(data)
              
            })
            .catch((error) => {
            });


    };

    const INJECTED_JAVASCRIPT = `const meta = document.createElement('meta'); 
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
        meta.setAttribute('name', 'viewport'); 
        document.getElementsByTagName('head')[0].appendChild(meta); 
        (function() {
            window.ReactNativeWebView.postMessage(document.querySelector('#responseCallback').RESPONSE);
        })();`
        ;
    const webViewScript = `
    document.getElementById('gadget_url').value  ='${memberid}';
    document.getElementById('ref_code').value  ='${ref_code}';
    document.getElementById("scan").onclick = () => {
      window.ReactNativeWebView.postMessage("Hello from React Native");
    };`;

    const handleMessage = (message) => {

        let str = (message.nativeEvent.data);
        console.log(str)
        getData()
        toggleModal()

    }

    // const onNavigationStateChange=(navState)=> {
    //     console.log(navState.url)
    // }


    const html = `
<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Directpay|RecurringPayment</title>

                            
                        </head>
                        <div id="card_container"></div>
                        <style>
                            .hidden{
                                display:none;
                            }
                            </style>
                        <body>
                            
                             
                            <input type="hidden" placeholder="" id="gadget_url" />
                            <input type="hidden" placeholder="" id="ref_code" />
                            
                            <script src="https://cdn.directpay.lk/live/00061/v1/directpayCardPayment.js?v=2.0.1"></script>
                            <script>
                              var inputVal = document.getElementById("gadget_url").value; 

                              
                              var d = new Date();
                              var datestring = ("0" + d.getDate()).slice(-2) + "" + ("0"+(d.getMonth()+1)).slice(-2) + "" +
                                                d.getFullYear() + "" + ("0" + d.getHours()).slice(-2) + "" + ("0" + d.getMinutes()).slice(-2);


                            
                                DirectPayCardPayment.init({
                                    container: "card_container", //<div id="card_container"></div>
                                    merchantId: "SY10716", //your merchant_id
                                    amount: "300.00",
                                    refCode: datestring, //unique referance code form merchant
                                    currency: "LKR",
                                    type: "RECURRING",
                                    recurring: {
                                        startPaymentDate: "2021-08-30",
                                        lastPaymentDate: "2050-07-19",
                                        interval: "MONTHLY",
                                        isRetry: true,
                                        retryAttempts: 2,
                                        recurringAmount: "300.00",
                                        doFirstPayment: true,
                                    },
                                    customerEmail: inputVal,
                                    customerMobile: "+94712345467",
                                    description: "test products", //product or service description
                                    debug: true,
                                    responseCallback: responseCallback,
                                    errorCallback: errorCallback,
                                    logo: "https://test.com/directpay_logo.png",
                                    apiKey: "b8b05983596e0a837979a1107f6e3094",
                                });
                                //response callback.

            
 

                                function responseCallback(result) {
                                
                                         
                                          // Displaying the value
           
            
            
                                     document.getElementById("click").style.display ="inline-flex";
                                    console.log("successCallback-Client", result);
                                    // alert(JSON.stringify(result));




                                    // alert(result['data'].status);
                                    var request = new XMLHttpRequest();
                                    
                              
                  
                                            
                                    var data = new FormData();
                                    data.append('member', inputVal);
                                    data.append('status', result['data'].status);
                                    data.append('json', JSON.stringify(result));
                                    
                                    request.open('POST', 'https://youandmenest.com/tr_reactnative/api/subscription', true);
                                    request.send(data);
                                    request.onload = ()=>{
                                        // alert(request.response);
                                        setModalVisible(true);
                                        $:{toggleModal}

                                        
                                        $("click").removeClass("hidden")

                                        // var para = document.createElement("P");

                                        // var t = document.createTextNode(" fgff");
                                        // para.appendChild(t);
                                        // document.getElementById("click").appendChild(para);

                                    }
                                }
                    
                                //error callback
                                function errorCallback(result) {
                                    console.log("successCallback-Client", result);
                                    alert(JSON.stringify(result));
                                }
                            </script>
                            <center>
                            <div id="click" style="margin-top:-20px;align-self:center;display:none"><button id="scan" type="button" style="padding:10px"> Go Back </button></div>
                        </center>
                            </body>
                    </html>
  `;


    return (

        <View style={{ flex: 1 }}>
            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}


                injectedJavaScript={webViewScript}
                onMessage={handleMessage}
                key={key}

                source={{
                    uri: ' http://youandmenest.com/tr_reactnative/subscription.html',
                    
                }}

                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}


                
               

                // sharedCookiesEnabled={true}





                onError={() => { this.webView.reload(); }}
            />
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Hello!</Text>
                    {/* {data.length==0?
                  null:
                  <Text></Text>
                } */}
                    <View style={{ backgroundColor: 'white', width: "100%", padding: 15 }}>
                        {data.map((item) =>
                            <View key={item.id}>
                              
                                {item.subscription == "SUCCESS" ?
                                    <View>
                                        <View style={{ backgroundColor: 'green', alignSelf: 'center', paddingVertical: 5, borderRadius: 50 }}>
                                            <Icon
                                                name='check'
                                                type='evilicon'
                                                color='#fff'
                                                size={50}
                                            />

                                        </View>
                                        <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: 17 }}>YOUR TRANSACTION IS {item.subscription}</Text>
                                        <Button title="Home" onPress={() => { toggleModal(); navigation.navigate('HomeApp') }} color={'green'} />
                                    </View>
                                    :
                                    <View>
                                        <View style={{ backgroundColor: 'red', alignSelf: 'center', paddingVertical: 5, borderRadius: 50 }}>
                                            <Icon
                                                name='close-o'
                                                type='evilicon'
                                                color='#517fa4'
                                                size={50}
                                            />
                                        </View>
                                        <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: 17 }}>YOUR TRANSACTION IS {item.subscription}</Text>
                                        <Button title="Try Again" onPress={() => { setKey(key + 1); toggleModal() }} color={'red'} />
                                    </View>
                                }

                            </View>
                        )}

                    </View>

                </View>
            </Modal>

        </View>
    )
}

// const styles = StyleSheet.create({})
