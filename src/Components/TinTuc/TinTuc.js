import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText,
} from 'react-native-ui-kitten';
 import { Ionicons, FontAwesome } from '@expo/vector-icons';
export default class TinTuc extends React.Component {
constructor(props){
  super(props);
  this.state={
    dataSource:[],
    isLoading:true,
    trang:0,
    LoadTin:true,
   
  }
}
loadmore(){
  this.setState({
    trang: this.state.trang +1
  },()=>{
    fetch('http://125.212.241.80/api/ds_tintuc.php?page='+this.state.trang)
  .then((respone)=> respone.json())
  .then((responeJosn)=>{
    this.setState({
      dataSource:this.state.dataSource.concat(responeJosn),
    });
  });
  });
}
componentDidMount(){
  fetch('http://125.212.241.80/api/ds_tintuc.php?page=1')
  .then((respone)=> respone.json())
  .then((responeJosn)=>{
    this.setState({
      isLoading:false,
      dataSource:responeJosn,
    });
  })
  .catch(()=>{alert('Du lieu ko ta dc')});
}
  render() {
const {navigate} = this.props.navigation;
    return (
      this.state.isLoading
      ?
      <View style={[styles.container, styles.horizontal, styles.loading]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      :     
        <FlatList
        keyExtractor={item => item.Id}
       style={styles.container}
        data={this.state.dataSource}
        refreshing={this.state.LoadTin}
        onEndReachedThreshold="-0.2"
        onEndReached={()=>{this.loadmore()}}
        renderItem={({item}) => 
        <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={()=>navigate('NoiDung',{id:item.Id})}>
      <RkCard rkType='horizontal' style={styles.card}>
              <Image rkCardImg source={{uri: 'http://125.212.241.80/api/HinhAnh/'+item.HinhAnh}}/>

        <View rkCardContent>
          <Text style={styles.tieude}>{item.TieuDe}</Text>
          <Text style={styles.noidung} >
            {item.NoiDung}
          </Text>
          <View style={{flexDirection:'row',marginTop:10}}>
          <FontAwesome style={{fontSize:20, marginTop:10, marginRight:2}} name="user" />
          <RkText style={styles.post}>Admin</RkText>
          <RkText style={{marginLeft:140, marginTop:12}}>Ngày Đăng:{item.ThoiGian}</RkText>

          </View>
        </View>
       
      </RkCard>
      </TouchableOpacity>
      
  }
  
/>


  )
  
}
}
const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: '#f0f1f5',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
  },
  post: {
    marginTop: 13,
  },
  tieude:{
    fontSize: 20,
    FontAwesome:'blod'
  },
  noidung:{
    marginLeft: 5,
  }
  
}));

