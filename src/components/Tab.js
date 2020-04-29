import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Tab = ({ tab, isSelected }) => (
    <View style={styles.tab}>
        <Text style={{flex: 1, fontSize: 18 ,fontWeight: '500', color: isSelected ? 'black' : 'grey'}}>
            {tab}
        </Text>
    </View>
);
export default Tab;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5, 
    marginHorizontal: 10
  }
});