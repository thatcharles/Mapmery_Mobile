import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, View, FlatList, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { List } from 'react-native-paper';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const {
  useCode,
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  and,
  not
} = Animated;

const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  // block would execute each action one by one
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

const {width,height} = Dimensions.get('window')

export default function Login() {

  const [isReady, setIsReady] = useState(false)
  const [show, setShow] = useState()

  // load image inot cache before loading the page
  const _loadAssetsAsync = async() => {
    const imageAssets = cacheImages([require('../../assets/img/rotterdam.jpg')]);

    await Promise.all([...imageAssets])
    await setIsReady(true)
  }

  /**
   *  For animation 
   * */ 
  /*
  const {clock, isShow, buttonOpacity} = useMemo(
    () => ({
      isShow: new Value(1),
      clock: new Clock(),
      buttonOpacity: new Value(1)
    }),
    [],
  );
  */
   
  const [clock, setClock] = useState(new Clock())
  const [isShow, setIsShow] = useState(new Value(1))
  const [buttonOpacity, setButtonOpacity] = useState(new Value(1))

  useEffect(() => {
    isShow.setValue(show ? 1 : 0);
  }, [show, isShow]);
  
  useCode(
    block([
      cond(and(not(clockRunning(clock)), eq(isShow, 1)), startClock(clock)),
      cond(and(clockRunning(clock), eq(isShow, 0)), stopClock(clock)),
      set(buttonOpacity, runTiming(clock, 1, 0))
    ]),
    [isShow]
  );

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3, 0],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <>
    {isReady == true ? (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: bgY }]
          }}
        >
          <Image
            source={require('../../assets/img/rotterdam.jpg')}
            style={styles.titleImage}
          />
        </Animated.View>
        <View style={styles.bottomArea}>
          <TouchableWithoutFeedback onPress={() => {
            setShow(!show)
            // console.log(show)
          }}>
            <Animated.View style={{...styles.button, 
                                  opacity: buttonOpacity,
                                  transform: [{ translateY: buttonY }]}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={{...styles.button, 
                                backgroundColor: '#2E71DC',
                                opacity: buttonOpacity,
                                transform: [{ translateY: buttonY }]}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color:'white' }}>SIGN IN WITH FACEBOOK</Text>
          </Animated.View>
        </View>
      </View>
    ) :(
      <AppLoading
          startAsync={_loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
      />
    )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  },
  titleImage: {
    flex: 1, 
    height: null, 
    width: null 
  },
  bottomArea:{
    height: height / 3,
    justifyContent: 'center'
  },
  button:{
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  }
})
