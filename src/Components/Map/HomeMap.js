import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_KEY } from './constant';
import { MapView } from 'expo'
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class HomeMap extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  handleSearch(data, details) {
    this.props.navigation.navigate('Map', {
      data,
      details,
    });
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}

        showsUserLocation={true}
        region={this.state.region}
        onRegionChange={region => this.setState({ region })}
        onRegionChangeComplete={region => this.setState({ region })}
      >
        <GooglePlacesAutocomplete
          placeholder="Tìm Nơi Muốn Đến......"
          
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) =>
            // 'details' is provided when fetchDetails = true
            this.handleSearch(data, details)
          }
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_KEY,
            language: 'en', // language of the results
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              marginTop:10
            },
            textInput:{
              marginTop:14
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            types: 'country',
          }}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />

      </MapView>
    );
  }

}

