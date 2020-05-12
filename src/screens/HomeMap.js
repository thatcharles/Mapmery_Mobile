import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

import MapView, {Marker, Callout} from 'react-native-maps';
import { locations } from "../locations";
import { locations_1 } from "../locations_1";
import Polyline from '@mapbox/polyline'

import { FAB, List, Avatar, Card, IconButton, Button  } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import { set } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel'

import HomeMap_actoin_card from '../components/HomeMap_action_card'
import HomeMap_model from '../components/HomeMap_model'
import HomeMapOptionWindow from '../components/HomeMapOptionWindow'

import { useSelector, useDispatch } from 'react-redux'
import { getPosts, getPlaces } from '../redux/notesApp'

const { width, height } = Dimensions.get('screen')

const carouselItems= [
    {
        title:"Item 1",
        text: "Text 1",
    },
    {
        title:"Item 2",
        text: "Text 2",
    },
    {
        title:"Item 3",
        text: "Text 3",
    },
    {
        title:"Item 4",
        text: "Text 4",
    },
    {
        title:"Item 5",
        text: "Text 5",
    },
  ]

const HomeMap = ({navigation}) => {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [isMapready, setIsMapready] = useState(false)
    const [location, setLocation] = useState(null)
    const [destination, setDestination] = useState([])
    const [desLatitude, setDesLatitude] = useState([])
    const [desLongitude, setDesLongitude] = useState([])
    const [navigateCoords, setNavigateCoords] = useState([])
    const [distance, setDistance] = useState(null)
    const [time, setTime] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isoptionArea, setIsoptionArea]  = useState(false)
    const [isoptionWindow, setIsoptionWindow]  = useState(false)
    const [places, setPlaces] = useState(null)
    const [posts, setPosts] = useState(null)
    const [placeForSelect, setPlaceforSelect] = useState(null)
    const textInput = useRef(null);

    //let textInput = null;

    const dispatch = useDispatch();
    const postReducer = useSelector(state => state.postReducer)

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    useEffect(() => {
        if(isEmpty(postReducer)){
            dispatch(getPosts()).then(response => {
                if (response.payload.success) {
                    console.log('Posts got in home Map!')
                    setPosts(response.payload.postsList.posts)
                } else {
                    console.log('error: ',response)
                }
            })
        }else{
            console.log('Home Map already has posts!')
            // console.log('Home Map Posts: ', postReducer.postsList)
            setPosts(postReducer.postsList.posts)
            postReducer.postsList.posts.map((post, index) => {
                dispatch(getPlaces()).then(response => {
                    if (response.payload.success) {
                        // console.log('places: ', response.payload.places)
                        setPlaces(response.payload.places)
                    } else {
                        console.log('error: ',response)
                    }
                })
            })
        }
    }, [])


    const findCoordinates = async() => {
		navigator.geolocation.getCurrentPosition(
			position => {
                //const location = JSON.stringify(position);
                const initLocation = JSON.parse(JSON.stringify(position))

                setLatitude(initLocation.coords.latitude)
                setLongitude(initLocation.coords.longitude)
                setIsMapready(true)

                if (location){

                    const destinations = location
                    
                    setDestination(destinations)

                    /**
                     * setDesLatitude might update the desLatitude, but we need useEffect to refresh the frontend.
                     * Since both props and state are assumed to be unchanging during 1 render.
                     * use useEffect to trigger mergeCoords()
                     */
                }
			},
			error => console.log(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
    };

    useEffect(() => {
        const latitudes = []
        const longitudes = []
        destination.map((stop, idx) => {
            latitudes.push(stop.coords.latitude)
            longitudes.push(stop.coords.longitude)
        })
        setDesLatitude(latitudes)
        setDesLongitude(longitudes)
    }, [destination])

    useEffect(() => {
        mergeCoords()
    }, [desLatitude, desLongitude])
    
    const mergeCoords = () => {
        const hasStartAndEnd = latitude !== null && desLatitude !== [] && longitude !== null && desLongitude !== []

        // console.log(desLatitude,desLongitude)
        
        if (hasStartAndEnd) {
            desLatitude.map((l, idx) => {
                var concatStart = `${latitude},${longitude}`
                var concatEnd = `${l},${desLongitude[idx]}`
                if (idx != 0){
                    concatStart = `${desLatitude[idx-1]},${desLongitude[idx-1]}`
                }
                getDirections(concatStart, concatEnd)
            })
        }
      }

    const getDirections = async(startLoc, desLoc) => {

        console.log('startPlanning:', startLoc, desLoc)
        try {
            /**
             * ToDo: use waypoint?
             */
            const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=walking&key=AIzaSyD-9UDS1WHVVTiZjXjGxIUJZBGeaHTB7aI`)
            const respJson = await resp.json();
            const response = respJson.routes[0]
            const distanceTime = response.legs[0]
            const distance = distanceTime.distance.text
            const time = distanceTime.duration.text
            const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            const newCoords = points.map(point => ({
                latitude: point[0],
                longitude: point[1]
            }))

            
            setNavigateCoords(prevState => [...prevState, newCoords]);
            //setDistance(distance)
            //setTime(time)
        } catch(error) {
            console.log('Error: ', error)
        }
    }

    // const focusTextInput = () => {
    //     // Focus the text input using the raw DOM API
    //     console.log(textInput)
    //     if (textInput) textInput.current.focus()
    //   };

    const renderMarkers = () => {
        const locations  = location
        return (
          <View>
            {
              locations.map((location, idx) => {
                const {
                  coords: { latitude, longitude }
                } = location
                return (
                  <Marker
                    key={idx+'Marker'}
                    coordinate={{ latitude, longitude }}
                    //onPress={onMarkerPress(location)}
                    icon='home'
                  >
                    <Callout
                        tooltip
                        onPress={() => {
                            setPlaceforSelect(location)
                            setIsoptionWindow(true)
                        }}
                    >
                        <View style={{display: 'flex', height:60, marginLeft: 30}}>
                            <View style={styles.bubble}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 3, alignContent: 'center', justifyContent: 'center'}}>
                                        <Text>
                                            {location.name}
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                    <IconButton icon="plus" onPress={() => {props.setIsoptionArea(true)}} color='#50a39b'/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Callout>
                  </Marker>
                )
              })
            }
          </View>
        )
    }


    useEffect(() => { setLocation([]) }, [])
    useEffect(() => {
        findCoordinates()
    }, [location])

    const _renderItem = ({item,index}) => {
        return (
                <HomeMap_actoin_card setIsoptionArea={setIsoptionArea} item={item}/>
          )
    }

    const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const orderA = a.order;
        const orderB = b.order;
      
        let comparison = 0;
        if (orderA > orderB) {
          comparison = 1;
        } else if (orderB > orderA) {
          comparison = -1;
        }
        return comparison;
      }

    useEffect(() => {
        if(posts && places){
            let currentPost = posts[activeIndex]
            // console.log('current post: ', currentPost)
            let currentPlaces= []
            places.map(place => {
                if(place.postId === currentPost._id){
                    currentPlaces.push(place)
                }
            })
            currentPlaces.sort(compare)
            setNavigateCoords([])
            setLocation(currentPlaces)
        }
    }, [activeIndex,posts,places])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                {isMapready ? (
                    <MapView 
                    showsUserLocation
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    >
                        {navigateCoords ? (
                            <>
                            {renderMarkers()}
                            {
                                navigateCoords.map((polyline, idx) =>(
                                    <MapView.Polyline
                                        key={idx + 'Polyline'}
                                        strokeWidth={2}
                                        strokeColor='#50a39b'
                                        coordinates={polyline}
                                    />
                                ))
                            }
                            </>
                        ):(<></>)}
                    </MapView>
                ):(<></>)}
                <FAB
                    style={styles.fab}
                    color='#50a39b'
                    small
                    icon='close'
                    onPress={() =>
                        navigation.navigate('HomeBottomTabNavigator')
                    }
                />
                <View>
                    <HomeMap_model setIsoptionArea={setIsoptionArea} isoptionArea={isoptionArea}/>
                </View>
                <View>
                    <HomeMapOptionWindow 
                        place={placeForSelect || null}
                        imgUri={require('../../assets/img/rotterdam.jpg')} 
                        setIsoptionWindow={setIsoptionWindow} 
                        isoptionWindow={isoptionWindow} 
                        setIsoptionArea={setIsoptionArea}
                    />
                </View>
                
                <View style={styles.buttonScroll}>
                    <Carousel
                        layout={"default"}
                        ref={ref => React.createRef()}
                        data={posts ? posts : null}
                        sliderWidth={400}
                        itemWidth={250}
                        renderItem={_renderItem}
                        onSnapToItem = { index => setActiveIndex(index) } 
                    />
                </View>
            </View>
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
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    fab: {
      position: 'absolute',
      marginHorizontal: 30,
      marginVertical: 50,
      left: 0,
      backgroundColor: 'white',
      top: 0
    },
    buttonScroll:{
        position: 'absolute',
        bottom: 30
    },
    slide:{
        flex:0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cards: {
        backgroundColor: 'white',
        width: width * 0.6,
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0,height: 8},
        borderRadius: 15
    },
    bubble: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        width: width * 0.5,
        height: 50,
        display: `flex`,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
    }
})

export default HomeMap
