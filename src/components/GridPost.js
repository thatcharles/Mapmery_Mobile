  
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const GridPost = ({ post, width }) => {
  return (
    <View key={post.id} style={{
      width: width,
      height: width,
      marginVertical: 10,
      marginLeft: 20, 
      borderWidth: 0.5, 
      borderColor: '#dddddd'}}
    >
      <View style={{flex:2}}>
          <Image source={post.uri}
                  style={{flex:1, width: null, height: null, resizeMode: 'cover'}}
          ></Image>
      </View>
      <View style={{flex:1}}>
          <Text style={{flex:1, paddingLeft: 10, paddingTop: 10}}>{post.name}</Text>
      </View>
    </View>


  );
};

export default GridPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});