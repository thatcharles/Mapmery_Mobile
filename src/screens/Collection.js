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
import { FAB, List, Portal, Provider } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../redux/notesApp'

import { mock_posts } from "../posts";

const {
    Value,
    event,
    interpolate,
    Extrapolate
  } = Animated;

const {width,height} = Dimensions.get('window')

const Collection = ({navigation}) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const [loadedPosts, setLoadedPosts] = useState(mock_posts)
    const [open, setOpen] = useState(null)
    const [posts, setPosts] = useState([])

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

    const _onStateChange = ( {open} ) => {
        setOpen(open);
    }

    /**
     * Retrieving data
     */
    const postReducer = useSelector(state => state.postReducer)
    const userReducer = useSelector(state => state.userReducer)
    const userId = userReducer.loginSucces ?  userReducer.loginSucces.userId : null
    const userData = userReducer.userData ?  userReducer.userData : null
    const ID = userId ? userId: userData._id

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        if(isEmpty(postReducer)){
            /** TODO:
             * use a better query not to get all posts but only posts with the current author
             */
            dispatch(getPosts()).then(response => {
                if (response.payload.success) {
                    console.log('Posts got!')
                } else {
                    console.log('error: ',response)
                }
            })
        }
    }, [])

    useEffect(() => {
        if(!isEmpty(postReducer)){
            setPosts([])
            postReducer.postsList.posts.map(post => {
                if (post.author){
                    if (post.author._id === ID){
                        setPosts(prevState => [...prevState, post])
                    }
                }
            })
        }
    }, [postReducer])

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
                            {posts ? (
                                posts.map((item, index) => {
                                    return (
                                        <TouchableOpacity 
                                            key={'collection-posts-'+item._id}  
                                            onPress={() => {
                                                navigation.navigate('CollectionMap', {
                                                    postId: item._id,
                                                    viewOnly: false
                                                })
                                            }}
                                        >
                                            <Card_big 
                                                imgUri={require('../../assets/img/rotterdam.jpg')} 
                                                name={item.title}
                                                author={item.author.lastname + " " + item.author.name}
                                                avatar={item.author.image}
                                            />
                                        </TouchableOpacity>
                                    )
                                })
                            ):(<></>)}
                        </View>
                    ):(
                        <>
                        <View style={styles.imageContainer}>
                            
                            {loadedPosts ?(loadedPosts.map(post => 
                                {
                                    return (<GridPost key={post.id} post={post} width={130}/>)
                                }
                            )):(<></>) }
                        </View>
                        </>
                    )}
                    <View style={{height: 200, marginTop: 40, justifyContent: 'center', alignItems: 'center'}} >
                        <Text>No more posts</Text>
                    </View>
                </Animated.ScrollView>
                {selectedTab === 1 ?(
                    <FAB
                        style={styles.fab}
                        small
                        label='Randomize'
                        onPress={() => randomizePosts(loadedPosts)}
                    />
                ):(<></>)}
                                <FAB.Group
                                    open={open}
                                    icon={open ? 'close' : 'plus'}
                                    color={open ? 'white' : '#50a39b'}
                                    actions={[
                                        { icon: 'alpha-m', label: 'Mapmory Trip', onPress: () => navigation.navigate('CollectionMap',{
                                            viewOnly: false
                                        })},
                                        { icon: 'flag-variant-outline', label: 'Spot', onPress: () => console.log('Pressed Spot') },
                                    ]}
                                    onStateChange={_onStateChange}
                                    onPress={() => {}}
                                    fabStyle={{
                                        backgroundColor: open ? '#ff3d43' : 'white',
                                        borderColor: '#50a39b',
                                        borderWidth: open ? 0 : 1
                                    }}
                                />
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
