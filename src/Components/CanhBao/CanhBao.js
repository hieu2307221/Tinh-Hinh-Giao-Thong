import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
export default class CanhBao extends React.Component {
constructor(props){
  super(props);
  this.state={
    vitri:{
      latitude: 10.806064,
    longitude: 106.715971,
    latitudeDelta: 0.001,
    longitudeDelta: 0.008,
    },
    canhbao:[]
  }
}
componentDidMount(){
    fetch('http://hieutranapi.tk/api/map.php')
    .then((respone)=> respone.json())
    .then((responeJosn)=>{
      this.setState({
        isLoading:false,
        canhbao:responeJosn.map,
      });
    })
    .catch(()=>{alert('Du lieu ko ta dc')});
  }
  render() {

    return (
  <View style={styles.main}>
        <View style={styles.viewmap}>
        <MapView
       showsUserLocation
       style={{flex:1}}
      initialRegion={this.state.vitri}
      >
   {
              this.state.canhbao.map((cb,i)=> {
             return <Marker
              image={source={uri: 'http://hieutranapi.tk/api/HinhAnh/CanhBao/icon/'+cb.icon}}
              coordinate={{
                latitude:parseFloat(`${cb.KinhDo}`),
                longitude:parseFloat(`${cb.ViDo}`) 
              }}>
        <MapView.Callout style={{width:250, height:200, paddingTop:10}}>
        <View style={{flex:1}}>
        <Image
          style={{width:250, height: 150, resizeMode:'cover'}}
          source={{uri: 'http://hieutranapi.tk/api/HinhAnh/CanhBao/HinhAnh/'+cb.HinhAnh}}
        />
        <Text>
          Địa điểm: <Text style={{fontWeight:'bold',
          fontSize:10}}>{cb.TenDuong}</Text>
        </Text>
        <Text>
        Tình trạng: <Text style={{color:'red', fontWeight:'bold', fontSize:15}}>{cb.TinhTrang}</Text>
        </Text>
        <Text>
        Thời Gian: 
        <Text style={{fontSize:15}}>{cb.NoiDung}</Text>
        </Text>
        </View>
        </MapView.Callout>
              </Marker>
   }
              )
            }
              
              
            
    </MapView>
        </View>
        <View style={styles.viewbutton}>
        
              
        </View>
  </View>
    );
  }
}
const styles= StyleSheet.create({
    main:{
        flex:1
    },
    viewmap:{
        flex:1
    },
    viewbutton:{
        flex:1/15,
        backgroundColor:'rgba(241,241,241,241)',
    }
})