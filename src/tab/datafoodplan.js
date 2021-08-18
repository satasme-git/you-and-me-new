import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList, ListView, Image } from 'react-native';
import { IMAGE } from '../constants/image';
export default {
  data: [
    {
      title: '5 % ',

      body:
        'Fat, Oil ,Sugar,Sweeat',
      src: IMAGE.ICON_DIET_5,
    

    },
    {
      title: '20 %',

      body:
        'Meat, Fish,Milk,Eggs',
      src: IMAGE.ICON_DIET_20,
     
    },
    {
      title: '35 %',

      body:
        'Fruit, Vegitable',
      src: IMAGE.ICON_DIET_35,
     
    },
    {
      title: '40 %',

      body:
        'Bread,Pasta, Cereals',
      src: IMAGE.ICON_DIET_40,
     
    }

  ],
};