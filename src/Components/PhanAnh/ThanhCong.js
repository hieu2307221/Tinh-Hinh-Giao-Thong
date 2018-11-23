import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default class ThanhCong extends React.Component {
   
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
      <View>
      <FontAwesome
            style={{ color: "white", fontSize: 50, alignSelf: "center", marginTop:200 }}
            name="check"
          />
      </View>
      <Text style={{ justifyContent:'center', alignSelf:'center',marginTop:20, color:'white', fontSize:20 }}>Cảm ơn bạn đã gửi thông tin phản ánh, chúng tôi sẽ phản hồi lại bạn trong thời gian sớm nhất</Text>
      <TouchableOpacity onPress={() => navigate("Home")}>

      <View style={{
          width:350,
          height:50,
          backgroundColor:'white',
          alignSelf:'center',
          marginTop:300
      }}>
            <Text style={{alignSelf:'center',marginTop:10, color:'#e5323d', fontSize:20}} >
                QUAY VỀ TRANG CHỦ
            </Text>
      </View>
      </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:'#e5323d'
  },
  
});
