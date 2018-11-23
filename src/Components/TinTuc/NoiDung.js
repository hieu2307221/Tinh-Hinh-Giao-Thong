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

export default class NoiDung extends Component{
	 
	state={
		data:[]
	};
	fetchData = async() =>{
		const { params } = this.props.navigation.state;
    const response =  await fetch('http://125.212.241.80/api/tintuc_detail.php?id='+params.id);
		const products = await response.json(); // products have array data
		this.setState({data: products}); // filled data with dynamic array
	};
	componentDidMount(){
		this.fetchData();
  }
  
  
	render(){
const {navigate} = this.props.navigation;
    return(
		  <View style={styles.main}>
		  <FlatList
		  data={this.state.data}
		  keyExtractor={(x,i) => i}
		  renderItem={({item})=>
      <View style={{flex:1}}>
    <ScrollView style={styles.root}>
      <RkCard>
        <Image rkCardImg source={{uri: 'http://125.212.241.80/api/HinhAnh/'+item.HinhAnh}}/>
        <View rkCardHeader>
          <View>
            <Text style={styles.title}>{item.TenTinTuc}</Text>
            
          </View>
          
        </View>

      </RkCard>
      <Text style={styles.textnodung}>{item.NoiDungChiTiet}</Text>

    </ScrollView>

    </View>
		  }
		  />
          
        
      </View>
	
	
		);
	}



}
const styles = RkStyleSheet.create(theme => ({
  main:{
      flex:1,
      
  },
  title: {
    marginBottom: 5,
    fontSize:15,
    fontWeight:'bold'
  },
  button:{
      flex:1/8,
      backgroundColor: "#2782d7",
  },
  textbutton:{
      alignSelf: 'center',
      fontSize: 20,
      marginTop: 10,
      color:'#fff',
      fontWeight: 'bold',
},
textnodung:{
  fontSize:15
}
}));
