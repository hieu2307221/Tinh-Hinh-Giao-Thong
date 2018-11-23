import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';;

export default class ChiTietCanhBao extends Component{	   
	render(){
    const { params } = this.props.navigation.state;

    return(
		  <View style={styles.main}>
        <Text>{params.ID}</Text>
		</View>
	
		);
	}
}
const styles=StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'blue'
    }
})