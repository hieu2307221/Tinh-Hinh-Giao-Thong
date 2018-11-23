import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions,Image } from 'react-native';
import { MapView, Constants, Location } from 'expo';
import CheckLocation from './Permission';
import MapViewDirections from 'react-native-maps-directions';
import Loader from './Loader';
const { Marker, AnimatedRegion, Polyline } = MapView;
import { GOOGLE_KEY } from './constant';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
  static navigationOptions = {
    title: 'Map',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      routeCoordinates: [],
      coordinate: new AnimatedRegion({
        latitude: null,
        longitude: null,
        canhbao:[]
      }),
    };
  }
  
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert(
        'Alert',
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        [{ text: 'OK', onPress: () => false }],
        { cancelable: false },
      );
    } else {
      this.getLocationPermission();
    }
    fetch('http://125.212.241.80/api/map.php')
    .then((respone)=> respone.json())
    .then((responeJosn)=>{
      this.setState({
        isLoading:false,
        canhbao:responeJosn.map,
      });
    })
    .catch(()=>{alert('Du lieu ko ta dc')});
  }

  getLocationPermission = async () => {
    const hasPermission = await CheckLocation.hasLocationPermission();
    if (hasPermission) {
      this.getCurrentLocation();
    }
  };

  watchLocation = async () => {
    const { coordinate } = this.state;
    await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 0,
      },
      position => {
        const { routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        if (this.marker) {
          coordinate.timing(newCoordinate).start();
         
        }

        // below code not working in expo app - react native issue with expo: https://github.com/react-community/react-native-maps/issues/2251
        // if (Platform.OS === 'android') {
        //   if (this.marker) {
        //     this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
        //   }
        // } else {
        //   coordinate.timing(newCoordinate).start();
        // }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
        });
      },
    );
  };

  getCurrentLocation = () => {
    Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    }).then(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        origin: {
          latitude,
          longitude,
        },
      });

      this.setDestination();
    });
  };

  setDestination = () => {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'no data');
    const details = navigation.getParam('details', 'no details');

    const address = data.description;
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;

    this.setState({
      destination: {
        latitude,
        longitude,
      },
    });

    this.watchLocation();
  };

  getMapRegion = () => ({
    latitude: this.state.latitude || LATITUDE,
    longitude: this.state.longitude || LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  
  render() {
    if (this.state.latitude === null && this.state.longitude === null) {
      return <Loader loading text="Chờ 1 xíu....." />;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation ={true}
          followUserLocation ={true}
          loadingEnabled
          provider="google"
          ref={c => (this.mapView = c)}
          initialRegion={this.state.latitude ? this.getMapRegion() : null}
        >
           {
              this.state.canhbao.map((cb,i)=> {
             return <Marker
              image={source={uri: 'http://125.212.241.80/api/HinhAnh/CanhBao/icon/'+cb.icon}}
              coordinate={{
                latitude:parseFloat(`${cb.KinhDo}`),
                longitude:parseFloat(`${cb.ViDo}`) 
              }}>
        <MapView.Callout style={{width:250, height:200, paddingTop:10}}>
        <View style={{flex:1}}>
        <Image
          style={{width:250, height: 150, resizeMode:'cover'}}
          source={{uri: 'http://125.212.241.80/api/HinhAnh/CanhBao/HinhAnh/'+cb.HinhAnh}}
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
          
          <MapViewDirections 
            origin={this.state.origin}
            destination={this.state.destination}
            apikey={GOOGLE_KEY}
            strokeWidth={3}
            strokeColor="blue"
            onReady={result => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
          />
          <MapView.Marker
          coordinate={ this.state.destination }
        />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});
