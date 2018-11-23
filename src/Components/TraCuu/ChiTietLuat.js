import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';;

export default class ChiTietLuat extends Component{
	 
	state={
		data:[]
	};
	fetchData = async() =>{
		const { params } = this.props.navigation.state;
    const response =  await fetch('http://125.212.241.80/api/luat_detail.php?id='+params.id);
		const products = await response.json(); // products have array data
		this.setState({data: products}); // filled data with dynamic array
	};
	componentDidMount(){
		this.fetchData();
  }
  
  
	render(){
        const {textmucphat} = styles;
    return(
		  <View style={styles.main}>
		  <FlatList
		  data={this.state.data}
		  keyExtractor={(x,i) => i}
		  renderItem={({item})=>
      <View style={styles.container}>
     
     <RkCard rkType='horizontal' style={styles.card}>
     <View style={{borderBottomWidth:2, borderBottomColor:'#adadad'}}>
         <Text style={{marginTop:20, fontSize:20, marginLeft:10, color:'#eb4124'}}>THÔNG TIN</Text>
     </View>
     <View style={{flexDirection:'row'}} rkCardContent>
     <View style={{width:50, height:50, borderRadius:100, backgroundColor:'#5ec4f3', marginLeft:10, marginTop:10}}>
         <Image style={{width:30, height:30, alignSelf:'center', marginTop:10}} source={{uri: 'http://125.212.241.80/api/HinhAnh/PhuongTien/'+item.HinhAnh}}/>
     </View>
     <RkText style={{marginTop:20, marginLeft:10, fontSize:20}}>{item.TenLuat}</RkText>
     </View>
    

        <View rkCardContent>
        
          <Text>
            Số tiền đóng phat: <Text style={textmucphat}>{item.MucPhat}</Text>
          </Text>
          
        </View>
      
      </RkCard>

       <RkCard rkType='horizontal' style={styles.card}>
        <View rkCardContent>
        <View style={{borderBottomWidth:2, borderBottomColor:'#adadad'}}>
         <Text style={{fontSize:20, marginLeft:10, color:'#eb4124'}}>THÔNG TIN LỖI</Text>
     </View>
          <RkText style={{marginTop:10}}>
            {item.NoiDung}
          </RkText>
          <RkText style={{marginTop:10}}>
            Nghị Định: <Text>{item.NghiDinh}</Text>
          </RkText>
        </View>
        
      </RkCard>
            </View>
		  }
		  />
          
        
      </View>
	
	
		);
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
  textmucphat:{
      color:'red',
      fontSize:20
  }
}));
