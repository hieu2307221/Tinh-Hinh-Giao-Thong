import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
export default class CanhBao extends React.Component {
constructor(props){
  super(props);
  this.state={
    vitri:{
      latitude: 10.806064,
    longitude: 106.715971,
    latitudeDelta: 0.00001,
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
 <Marker
      coordinate={{
        latitude: 10.8058479,
        longitude: 106.7137556,
      }}
      title={'asd'}
      description={'dsa'}
    />
              
              
            
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