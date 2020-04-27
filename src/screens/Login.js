import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, TextInput } from 'react-native'
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';

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
  not,
  concat
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

  // load image into cache before loading the page
  const _loadAssetsAsync = async() => {
    const imageAssets = cacheImages([require('../../assets/img/rotterdam.jpg')]);

    await Promise.all([...imageAssets])
    await setIsReady(true)
  }

  /**
   *  Method 1. Utilize useEffect and useCode to change buttonOpacity with animation. Need to maintain multiple variables. Less clean.
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

  const [clock, setClock] = useState(new Clock())
  const [isShow, setIsShow] = useState(new Value(1))

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
  */
   
  const [buttonOpacity, setButtonOpacity] = useState(new Value(1))

  /**
   * Method 2. Use Gesture Handler to change buttonOpacity with animation. Less variables. Clean and easy to read.
   */
  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          )
        ])
    }
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          )
        ])
    }
  ]);
  
  /**
   * inputRange would take buttonOpacity in and outputRange is the corresponding output value
   */
  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputZIndex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
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
          <Svg height={height + 50} width={width}>
            <ClipPath id='clip'>
              <Circle r={height + 50} cx={width / 2}/>
            </ClipPath>
            <Image
              href={require('../../assets/img/rotterdam.jpg')}
              width={width}
              height={height + 50}
              preserveAspectRatio= 'xMidYMid slice' // preserveAspectRatio set image to fill the screen
              clipPath='url(#clip)'
            />
          </Svg>
        </Animated.View>
        <View style={styles.bottomArea}>
          {/** Legacy for method 1.
           * 
          <TouchableWithoutFeedback onPress={() => {
            setShow(!show)
          }}>
            <Animated.View style={{...styles.button, 
                                  opacity: buttonOpacity,
                                  transform: [{ translateY: buttonY }]}}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          */}
          <TapGestureHandler onHandlerStateChange={onStateChange}>
            <Animated.View style={{...styles.button, 
                                  opacity: buttonOpacity,
                                  transform: [{ translateY: buttonY }]}}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View style={{...styles.button, 
                                backgroundColor: '#2E71DC',
                                opacity: buttonOpacity,
                                transform: [{ translateY: buttonY }]}}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color:'white' }}>SIGN IN WITH FACEBOOK</Text>
          </Animated.View>
          <Animated.View style={{zIndex: textInputZIndex,
                                opacity: textInputOpacity,
                                transform: [{translateY: textInputY}],
                                height: height / 3,
                                ...StyleSheet.absoluteFill,
                                top: null,
                                justifyContent: 'center'}}
          >
            <TapGestureHandler onHandlerStateChange={onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{fontSize: 15,
                                        transform: [{rotate: concat(rotateCross,'deg')}]}}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput 
              placeholder="EMAIL"
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <TextInput 
              placeholder="PASSWORD"
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <Animated.View style={styles.button}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>SIGN IN</Text>
            </Animated.View>
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
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  textInput: {
    height: 50,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 0.5,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)'
  }
})
