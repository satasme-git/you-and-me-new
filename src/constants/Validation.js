import React, { useState, useEffect } from 'react'
import {Image, Dimensions, StyleSheet, TouchableOpacity,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Popover, PopoverController } from 'react-native-modal-popover';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Validation =({ text })=>{
    return(
        <PopoverController>
        {({
          openPopover,
          closePopover,
          popoverVisible,
          setPopoverAnchor,
          popoverAnchorRect,
        }) => (
          <React.Fragment>
            <TouchableOpacity
            ref={setPopoverAnchor}
            onPress={openPopover}
            >
                <Icon
                    name="error"
                    size={25}
                    color={'red'}
                    style={{alignSelf:'center',paddingLeft:15}}
                />
            </TouchableOpacity>
            <Popover
              contentStyle={styles.content}
              arrowStyle={styles.arrow}
              backgroundStyle={styles.background}
              visible={popoverVisible}
              onClose={closePopover}
              fromRect={popoverAnchorRect}
              supportedOrientations={['portrait', 'landscape']}
              placement={'bottom'}
              >
              <Text style={{color:'white'}}>{text}</Text>
            </Popover>
          </React.Fragment>
        )}
      </PopoverController> 
    )
}
const styles = StyleSheet.create({
    ////////////////// manoj
    content: {
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderRadius: 0,
      borderTopWidth:3,
      borderColor:'rgba(255,0,0,0.9)'
    },
    arrow: {
      borderTopColor: 'rgba(255,0,0,0.9)',
    },
    background: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },

  });

export {Validation};