import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput} from 'react-native'
import * as Permissions from 'expo-permissions';

import MapView, {Marker, Callout} from 'react-native-maps';
import { locations } from "../locations";
import Polyline from '@mapbox/polyline'

import { FAB, List } from 'react-native-paper'
import HorizontalCard_small from '../components/home/HorizontalCard_small'
import { set } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel'

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
                    //setDesLatitude(sampleLocation.coords.latitude)
                    //setDesLongitude(sampleLocation.coords.longitude)

                    /**
                     * setDesLatitude might update the desLatitude, but we need useEffect to refresh the frontend.
                     * Since both props and state are assumed to be unchanging during 1 render.
                     * 
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
        // if (hasStartAndEnd) {
        //     const concatStart = `${latitude},${longitude}`
        //     const concatEnd = `${desLatitude[0]},${desLongitude[0]}`
        //     getDirections(concatStart, concatEnd)
        // }
      }

    const getDirections = async(startLoc, desLoc) => {
        console.log('startPlanning:', startLoc, desLoc)
    try {
        /**
         * ToDo: use waypoint.
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
                    // onPress={onMarkerPress(location)}
                    icon='home'
                  >
                    <Callout>
                        <View style={{padding: 10, backgroundColor: 'white', marginHorizontal: 20, elevation: 1, marginTop: Platform.OS === 'android'? 30 : null}}>
                            <TextInput 
                                placeholder='Try'
                                placeholderTextColor='grey'
                                underlineColorAndroid='transparent'
                                style={{flex: 1, fontWeight: '700', backgroundColor: 'white', height: 40}}
                            />
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
        findCoordinates()
    }, [location])

    let cards = [];
    cards.push(
        <View style={styles.slide}>
            <View style={styles.cards}>
            </View>
        </View>
    );    
    cards.push(
        <View style={styles.slide}>
            <View style={styles.cards}>
            </View>
        </View>
    );    
    cards.push(
        <View style={styles.slide}>
            <View style={styles.cards}>
            </View>
        </View>
    );    

    const _renderItem = ({item,index}) => {
        return (
            <View style={{
                backgroundColor:'white',
                borderRadius: 5,
                height: 130,
                paddingHorizontal: 30,
                marginHorizontal: 5}}
            >
              <Text style={{fontSize: 30}}>{item.title}</Text>
              <Text>{item.text}</Text>
            </View>
          )
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
                <View style={styles.buttonScroll}>
                    <Carousel
                        layout={"default"}
                        ref={ref => React.createRef()}
                        data={carouselItems}
                        sliderWidth={400}
                        itemWidth={250}
                        renderItem={_renderItem}
                        onSnapToItem = { index => setActiveIndex(index) } 
                        
                    />
                    {/*
                    <ScrollView
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={width - 40}
                        snapToAlignment={"center"}
                        showsHorizontalScrollIndicator={false}
                    >
                        {cards}
                    </ScrollView>
                    */}
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
})

export default HomeMap
