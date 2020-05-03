import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'
import DraggableFlatList from "react-native-draggable-flatlist";

import MapView, {Marker, Callout} from 'react-native-maps';
import { locations } from "../locations";
import { locations_1 } from "../locations_1";
import Polyline from '@mapbox/polyline'

import { FAB, List, Avatar, Card, IconButton, Button, Image  } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import { set } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel'

import HomeMap_actoin_card from '../components/HomeMap_action_card'
import HomeMap_model from '../components/HomeMap_model'
import HomeMapOptionWindow from '../components/HomeMapOptionWindow'
import Info_model from '../components/Info_model'
import DraggableFlatListComponent from '../components/DraggableFlatListComponent'
import GooglePlacesInput from '../components/GooglePlacesInput'


const { width, height } = Dimensions.get('screen')

const CollectionMap = ({navigation}) => {
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
    const [searchResults, setSearchResults] = useState(null)
    const [isInfoModel, setIsInfoModel] = useState(false)
    //const [data, setData] = useState(exampleData)
    const textInput = useRef(null);

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

        console.log(desLatitude,desLongitude)
        
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
                    anchor={{x: 0.5, y: 0.8}}
                  >
                    <View style={{flex:1}}>
                        <IconButton icon="map-marker" color='red' size={idx === activeIndex? 50: 40}/>
                    </View>
                    <Callout
                        tooltip
                        onPress={() => {setIsoptionWindow(true)}}
                    >
                        <View style={{display: 'flex', height:50, marginLeft: 30}}>
                            <View style={styles.bubble}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 3, alignContent: 'center', justifyContent: 'center'}}>
                                        <Text>
                                            Midtown Marta station, Atlanta
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

    /**
     * Insert blue marker to the trip
     */
    const insertLocation = (latitude, longitude) => {
        console.log(location)
        const newLocation = {
                name: "New Location",
                address: "330 happy street",
                coords: {
                latitude: latitude, 
                longitude: longitude
                },
                image_url: "https://media.glassdoor.com/l/de/cd/ae/b6/the-face-shop.jpg"
            }
        setLocation(prevState => [...prevState, newLocation])
    }

    /**
     * Render unordered markers
     */
    const renderUnorderedMarkers = () => {
        const locations  = locations_1
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
                    pinColor='blue'
                  >
                    <Callout
                        tooltip
                        onPress={() => {
                            insertLocation(latitude, longitude)
                        }}
                    >
                        <View style={{display: 'flex', height:60, marginLeft: 30}}>
                            <View style={styles.bubble}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 3, alignContent: 'center', justifyContent: 'center'}}>
                                        <Text>
                                            Midtown Marta station
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


    useEffect(() => { setLocation(locations) }, [])
    useEffect(() => {
        //console.log(location)
        setNavigateCoords([])
        findCoordinates()
    }, [location])

    const renderMarker = () => {
        let lat = 0.0
        let lng = 0.0
        if (searchResults){
            lat = searchResults.details.geometry.location.lat
            lng = searchResults.details.geometry.location.lng
            return (
                <View>
                  <Marker
                      key={'newlySearchedMarker'}
                      coordinate={{
                          latitude: lat, longitude: lng
                          }}
                      pinColor='orange'
                  >
                      <Callout
                          tooltip
                          onPress={() => {
                              insertLocation(lat, lng)
                              setSearchResults(null)
                          }}
                      >
                          <View style={{display: 'flex', height:60, marginLeft: 30}}>
                              <View style={styles.bubble}>
                                  <View style={{flexDirection: 'row'}}>
                                      <View style={{flex: 3, alignContent: 'center', justifyContent: 'center'}}>
                                          <Text>
                                              New Marker
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
                </View>
              )
        }
        
        return (<></>)
    }

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
                            {renderUnorderedMarkers()}
                            {renderMarker()}
                            {
                                navigateCoords.map((polyline, idx) =>(
                                    <MapView.Polyline
                                        key={idx + 'Polyline'}
                                        strokeWidth={2}
                                        strokeColor="red"
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
                <FAB
                    style={styles.fab_right}
                    color='#50a39b'
                    small
                    icon='information-outline'
                    onPress={() => {setIsInfoModel(true)}}
                />
                <View style={styles.search}>
                    <Icon
                        name='ios-search' 
                        size={25} 
                        style={{marginHorizontal: 15, marginTop: 7, color: '#50a39b'}}
                    />
                    <TextInput 
                        placeholder='search'
                        placeholderTextColor='grey'
                        underlineColorAndroid='transparent'
                        style={{flex: 1, fontWeight: '700', backgroundColor: 'white', height: 40}}
                        onFocus={() =>  navigation.navigate('GooglePlacesInput', {
                            setSearchResults
                        })}
                    />
                </View>
                <View>
                    <HomeMap_model setIsoptionArea={setIsoptionArea} isoptionArea={isoptionArea}/>
                </View>
                <View>
                    <HomeMapOptionWindow imgUri={require('../../assets/img/rotterdam.jpg')} setIsoptionWindow={setIsoptionWindow} isoptionWindow={isoptionWindow} setIsoptionArea={setIsoptionArea}/>
                </View>
                <View>
                    <Info_model isInfoModel={isInfoModel} setIsInfoModel={setIsInfoModel}/>
                </View>
                {location ? (
                <View style={styles.buttonScroll}>
                    <DraggableFlatListComponent location={location} setLocation={setLocation} setActiveIndex={setActiveIndex}/>
                </View>
                ) : (<></>)}
                
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
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)"
    },
    fab_right: {
        position: 'absolute',
        marginHorizontal: 30,
        marginVertical: 50,
        right: 0,
        backgroundColor: 'white',
        top: 0
    },
    search: {
        position: 'absolute',
        flexDirection: 'row', 
        alignSelf: 'center', 
        width: width / 2,
        height: 40, 
        marginHorizontal: 30,
        marginVertical: 50,
        backgroundColor: 'white', 
        borderRadius: 20, 
        top: 0,
        elevation: 5,
        overflow: 'hidden'
    }
})

export default CollectionMap
