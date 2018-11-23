import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const rows = 4;
const cols = 2;
const marginHorizontal = 16;
const marginVertical = 4;
const width =
  Dimensions.get("window").width / cols - marginHorizontal * (cols + 1);
const height =
  Dimensions.get("window").height / rows - marginVertical * (rows + 1);
export default class Home extends React.Component {
  render() {
    // khai bao su dung dung  chung
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.main}>
        <View
          style={{
            width: 450,
            height: 150,
            backgroundColor: "#2782d7",
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 90
          }}
        >
          <Text style={styles.header}>TÌNH HÌNH GIAO THÔNG</Text>
        </View>
        <View style={styles.viewmenu}>

          <TouchableOpacity onPress={() => navigate("HomeMap")}>
            <View style={[styles.menu, { backgroundColor: "#1bbc9b" }]}>
              <FontAwesome style={styles.icon} name="map" />
              <Text style={styles.textmenu}>BẢN ĐỒ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("CanhBao")}>

     
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("TinTuc")}>

          <View style={[styles.menu, { backgroundColor: "#49c3f8" }]}>
            <FontAwesome style={styles.icon} name="comments" />
            <Text style={styles.textmenu}>TIN TỨC</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("TraCuuLuat")}>
          <View style={[styles.menu, { backgroundColor: "#9a59b5" }]}>
            <FontAwesome style={styles.icon} name="search" />
            <Text style={styles.textmenu}>TRA CỨU LUẬT</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("PhanAnh")}>

          <View style={[styles.menu, { backgroundColor: "#e97425" }]}>
            <FontAwesome style={styles.icon} name="comments" />
            <Text style={styles.textmenu}>PHẢN ÁNH</Text>
          </View>
         </TouchableOpacity>

       
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#e4e8ef"
  },
  image: {
    width: 420,
    height: 300
  },
  viewmenu: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },

  menu: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2, backgroundColor: "#e4e8ef" },
    backgroundColor: "#e4e8ef"
  },

  icon: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 50,
    color: "#fff"
  },
  textmenu: {
    marginTop: 5,
    fontSize: 20,
    color: "#fff"
  },
  header: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    fontSize: 30,
    color: "white"
  }
});
