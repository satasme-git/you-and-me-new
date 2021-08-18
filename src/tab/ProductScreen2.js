import React,{Component} from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export class ProductScreen2 extends Component{

//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: 'Product List',
//       headerRight: (
//         <Button
//           buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
//           icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
//           onPress={() => { 
//             navigation.navigate('AddProduct', {
//               onNavigateBack: this.handleOnNavigateBack
//             }); 
//           }}
//         />
//       ),
//     };
//   };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: [],
      notFound: 'Products not found.\nPlease click (+) button to add it.'
    };
  }

  componentDidMount() {
    console.log("eeeeeeeeeeeee");
    this.getProducts();
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getProducts();
    });
  }ll

  getProducts() {
    // console.log("lllllllllllllllllllllllllllllllll...");
    let products = [];
    db.listProduct().then((data) => {
      products = data;
    //   console.log("fdasdasda"+data);
      this.setState({
        products,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.prodName}
    //   leftAvatar={{
    //     source: item.prodImage && { uri: item.prodImage },
    //     title: item.prodName[0]
    //   }}
    //   onPress={() => {
    //     this.props.navigation.navigate('ProductDetails', {
    //       prodId: `${item.prodId}`,
    //     });
    //   }}
      chevron
      bottomDivider
    />
  )

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
            <Text>a</Text>
          {/* <ActivityIndicator size="large" color="#0000ff"/> */}
        </View>
      )
    }
    if(this.state.products.length === 0){
      return(
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.products}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  }
});