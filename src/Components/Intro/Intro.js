import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import AppIntro from 'rn-app-intro-screen';
 
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor:"rgba(255, 255, 255, .9)"
    },
    title:{
      fontSize:40,
      fontWeight: 'bold',
      color:'white'   
    },
    text:{
      fontSize:20,
      alignSelf:'flex-start',
      color:'white'
    }
   
});
 
const slides = [
  {
    key: 'somethun',
    title: 'CẢNH BÁO GIAO THÔNG',
    titleStyle:styles.title,
    text: 'Hiển thị thông tin cảnh báo giao thông \n Hỗ trợ cho việc di chuyển trên đường',
    textStyle:styles.text,
    image : require('../../../HinhAnh/Intro/canhbao.png'),
    imageStyle: styles.image,
    backgroundColor: '#41afb8',
  },
  {
    key: 'somethun-dos',
    title: 'Bản đồ thông minh',
    titleStyle:styles.title,
    text: 'Hiển thị bản đồ và chỉ dẫn dường đi ngắn nhất',
    textStyle:styles.text,
    image : require('../../../HinhAnh/Intro/map.png'),
    imageStyle: styles.image,
    backgroundColor: '#ef5a58',
  },
  {
    key: 'somethun1',
    title: 'Hệ thống tra cứu luật',
    titleStyle:styles.title,
    text: 'Cập nhật thông tin mức phạt tiền phương tiện giao thông',
    textStyle:styles.text,
    image : require('../../../HinhAnh/Intro/find.png'),
    imageStyle: styles.image,
    backgroundColor: '#3f92fb',
  }
];
 
export default class Intro extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity onPress={()=>navigate('Home')}>

      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <AppIntro
        slides={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}