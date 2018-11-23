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
export default class PhanAnh extends React.Component {
    constructor(props){
        super(props);
        this.state={
            HOVATEN:"",
            EMAIL:"",
            DIENTHOAI:"",
            NOIDUNG:"",
        }
    }
    button(){
        fetch("http://125.212.241.80/api/phananh.php",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "HOVATEN":this.state.HOVATEN,
                "EMAIL":this.state.EMAIL,
                "DIENTHOAI":this.state.DIENTHOAI,
                "NOIDUNG":this.state.NOIDUNG,

            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({result:responseJson.Id})
        })
        .catch((error)=>{
            console.error(error);
        })
    }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.main}>
        <View style={styles.viewtext}>
          <Text style={styles.textphananh}>PHẢN ÁNH GIAO THÔNG</Text>
          <Image
            style={styles.hinh}
            source={require("../../../HinhAnh/phananh.png")}
          />
        </View>
        <View style={styles.viewform}>
          <Text style={styles.text}>Họ và tên:</Text>
          <View style={styles.viewformtext}>
            <TextInput  
            style={styles.texthold}         
            onChangeText={(HOVATEN)=>this.setState({HOVATEN})}
            value={this.state.HOVATEN}
            placeholderTextColor="black" 

            />
          </View>
          <Text style={styles.text}>Email:</Text>
          <View style={styles.viewformtext}>
            <TextInput style={styles.texthold}
            onChangeText={(EMAIL)=>this.setState({EMAIL})} 
            value={this.state.EMAIL}
             placeholderTextColor="black" />
          </View>
          <Text style={styles.text}>Số điện thoại:</Text>
          <View style={styles.viewformtext}>
            <TextInput style={styles.texthold}
            onChangeText={(DIENTHOAI)=>this.setState({DIENTHOAI})} 
            value={this.state.DIENTHOAI} 
            placeholderTextColor="black" />
          </View>
          <Text style={styles.text}>Nội dung:</Text>
          <View
            style={{ borderWidth: 1, width: 370, height: 150, marginLeft: 10 }}
          >
            <TextInput style={{ fontSize: 15 }}
            onChangeText={(NOIDUNG)=>this.setState({NOIDUNG})} 
            value={this.state.NOIDUNG}
            placeholde="Nhập nội dung"
             />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigate("ThanhCong")}>
       <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#00c8ff",
            borderRadius: 100,
            alignSelf: "flex-end",
            marginRight: 20,
            marginBottom: 10
          }}
        >
          <FontAwesome
            style={{ color: "white", fontSize: 50, alignSelf: "center" }}
            name="angle-double-right"
          />
        </View>
       </TouchableOpacity>
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column"
  },
  viewtext: {
    flex: 1 / 3,
    backgroundColor: "#00c8ff"
  },
  textphananh: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    marginTop: 30
  },
  hinh: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  text: {
    color: "#00c8ff",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "bold"
  },
  viewform: {
    flex: 1,
    backgroundColor: "rgba(241,241,241,241)"
  },
  viewformtext: {
    marginTop: 20,
    borderBottomWidth: 1
  },
  texthold: {
    fontSize: 20
  },
  viewtextinput: {
    borderWidth: 1
  }
});
