import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,TouchableOpacity, Image } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import {
    RkText,
    RkCard,
    RkStyleSheet,
  } from 'react-native-ui-kitten';
export default class TraCuu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `http://125.212.241.28/giaothongmap/api`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.ds_luatgiaothong,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.ds_luatgiaothong;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
         
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.TIeuDe.toUpperCase() } ${item.PhuongTien.toUpperCase() } ${item.MucPhat.toUpperCase() }`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Nhập Nội Dung..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    const {navigate} = this.props.navigation;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
        style={styles.container}
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={()=>navigate('ChiTietLuat',{id:item.Id})}>
      <RkCard rkType='horizontal' style={styles.card}>
       <View>
        <Text style={styles.textTieuDe}>{`${item.TIeuDe}`}</Text>
       </View>
        <View rkCardContent>
         
          <Text>
            Mức Phạt Tiền: <Text style={styles.textGiaTien}>{`${item.MucPhat}`}</Text>
          </Text>
          
          <Text style={styles.post}>Phương Tiện: <Text style={styles.textPhuongTien}>{item.PhuongTien}</Text></Text>
        </View>
        <View rkCardFooter>
        </View>
      </RkCard>
    </TouchableOpacity>
          )}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}
const styles = RkStyleSheet.create(theme => ({
    container: {
      backgroundColor: theme.colors.screen.scroll,
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    card: {
      marginVertical: 8,
    },
    post: {
      marginTop: 13,
      //alignSelf: 'flex-end',

    },
  textTieuDe:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  textGiaTien:{
    fontSize:20,
    color:'red'
  },
  textPhuongTien:{
    fontSize:20,
    color:'#2782d7',
    fontWeight:'bold'
  }
  }));
  