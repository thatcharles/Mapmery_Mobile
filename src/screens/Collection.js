import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import Animated, {Transition, Transitioning} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput, Appbar } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import Card_big from '../components/home/Card_big'
import Card_2col from '../components/home/Card_2col'
import Tab from '../components/Tab'
import GridPost from '../components/GridPost'
import { FAB, List } from 'react-native-paper'

import { posts } from "../posts";

const {
    Value,
    event,
    interpolate,
    Extrapolate
  } = Animated;

const {width,height} = Dimensions.get('window')

const Collection = () => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [loadedPosts, setLoadedPosts] = useState(posts)

    const scrollY2 = new Value(0)
    let startHeaderHeight = 80
    let endHeaderHeight = 50

    if (Platform.OS === 'android') {
        startHeaderHeight = 110 + StatusBar.currentHeight
        endHeaderHeight = 80 + StatusBar.currentHeight
    }

    const animatedHeaderHeight = interpolate(scrollY2, {
        inputRange:[0,50],
        outputRange: [startHeaderHeight, endHeaderHeight],
        extrapolate: Extrapolate.CLAMP
    })

    const selectTab = tabIndex => {
        /**
         * Call this to envoke the Transition
         */
        ref.current.animateNextTransition();
        setSelectedTab(tabIndex)
    }

    const ref = React.createRef()

    const transition = (
        /** 
         * Can be Together or Sequence 
         * Together would run the transitions in parallel, Sequence would run the transitions 1 by 1
        */
        <Transition.Together>
            <Transition.Change />
        </Transition.Together>
    )

    const randomizePosts = posts => {
        /** 
         * Need to make a copy before sorting. Otherwise the result won't update
         * Use posts.pop() to pop the last item
         */ 
        const shuffledPosts = posts.slice(0).sort(() => 0.5 - Math.random());
    
        ref.current.animateNextTransition();
        setLoadedPosts(shuffledPosts)
      };

    useEffect(() => {
        ref.current.animateNextTransition();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <Transitioning.View 
                ref={ref}
                transition={transition}
                style={{flex: 1}}
            >
                <Animated.View style={{ height: startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                    <View style={{ flexDirection:'row',padding: 10, backgroundColor: 'white', marginHorizontal: 20, marginTop: Platform.OS === 'android'? 30 : null}}>
                        <Text
                            style={{flex: 1, fontSize: 28 ,fontWeight: '700', backgroundColor: 'white'}}
                        >
                            Collection
                        </Text>
                    </View>
                    <View style={{...styles.tabContainer}}>
                        <View
                            style={[
                            {
                                position: "absolute",
                                height: 37,
                                width: (width - 30) / 2 - 80,
                                borderBottomWidth: 2,
                                borderBottomColor: 'Black',
                                // how do left and right work?
                                left: selectedTab === 0 ? 40 : null,
                                right: selectedTab === 1 ? 40 : null
                            }
                            ]}
                        />
                        <TouchableOpacity onPress={() => selectTab(0)} style={{flex:1}}>
                            <Tab tab='Journey' isSelected={selectedTab === 0 ? true : false}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectTab(1)} style={{flex:1}}>
                            <Tab tab='Spot' isSelected={selectedTab === 1 ? true : false}/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.ScrollView
                    scrollEventThrottle={16}
                    style={{flex:1, backgroundColor: 'white'}}
                    onScroll={
                            event(
                                [
                                    {
                                        // when we scroll, put y offset into scrollY variable
                                        nativeEvent:{contentOffset:{y:scrollY2}}
                                    }
                                ]
                            )
                        }
                >
                    {selectedTab === 0 ?(
                        <View style={{marginTop: 40, paddingHorizontal: 20}}>
                            <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'Journey 2'}/>
                            <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'Journey example'}/>
                            <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'Journey nice'}/>
                            <Card_big imgUri={require('../../assets/img/rotterdam.jpg')} name={'Journey LA'}/>
                        </View>
                    ):(
                        <>
                        <View style={styles.imageContainer}>
                            {loadedPosts.map(post => 
                                {
                                    return (<GridPost key={post.id} post={post} width={130}/>)
                                }
                            )}
                        </View>
                        </>
                    )}
                </Animated.ScrollView>
                {selectedTab === 1 ?(
                    <FAB
                        style={styles.fab}
                        small
                        label='Randomize'
                        onPress={() => randomizePosts(loadedPosts)}
                    />
                ):(<></>)}
            </Transitioning.View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabContainer: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        width: width - 30,
        marginHorizontal: 20,
        overflow: 'hidden'
    },
    imageContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around"
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 10
    }
})

export default Collection
