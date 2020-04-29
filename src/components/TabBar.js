import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import posed from "react-native-pose";

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 4;
const SpotLight = posed.View({
  route0: { x: 0},
  route1: { x: tabWidth},
  route2: { x: tabWidth * 2},
  route3: { x: tabWidth * 3}
});

const S = StyleSheet.create({
  container: { flexDirection: "row", height: 52, elevation: 5,  backgroundColor: "#FF0058"},
  tabButton: { flex: 0.9, justifyContent: "center", alignItems: "center" },
  spotLight: {
    width: tabWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  spotLightInner: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20
    //borderBottomLeftRadius: 10,
    //borderBottomRightRadius: 10
  },
  scaler: { flex: 0.9, alignItems: "center", justifyContent: "center" }
});

const Scaler = posed.View({
    active: { scale: 1 },
    inactive: { scale: 0.9 }
  });


const TabBar = props => {
    const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation
    } = props;
  
    const { routes, index: activeRouteIndex } = navigation.state;
  
    return (
      <View style={S.container}>
        <View style={StyleSheet.absoluteFillObject}>
            <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
                <View style={S.spotLightInner} />
            </SpotLight>
        </View>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
  
          return (
            <TouchableOpacity
              key={routeIndex}
              style={S.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
            <Scaler style={S.scaler} pose={isRouteActive ? "active" : "inactive"}>
              {renderIcon({ route, focused: isRouteActive, tintColor })}
            </Scaler>
            {/*<Text style={{fontSize: 10, color: 'white'}}>{getLabelText({ route})}</Text>*/}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
  export default TabBar;