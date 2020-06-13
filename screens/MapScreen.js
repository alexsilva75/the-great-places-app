import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Platform, TouchableOpacity,StyleSheet, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'

import Colors from '../constants/Colors'

const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation')
    const readonly = props.navigation.getParam('readonly')

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : -12.5606959,
        longitude: initialLocation ? initialLocation.lng : -38.7053925,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = event => {

        if(readonly){
            return
        }
        //console.log(event)
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }       

    let markerCoordinates

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        //console.log('Saving location: ', selectedLocation.lat, ' / ', selectedLocation.lng)
        if(selectedLocation){
            props.navigation.navigate('NewPlace', {
                pickedLocation: selectedLocation
            })
        }else{
            Alert.alert('Pick up a location on the map!')
        }
        
    }, [selectedLocation]) 

    useEffect(()=>{
        props.navigation.setParams({savePickedLocationFunction: savePickedLocationHandler})
    },[savePickedLocationHandler])

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {markerCoordinates ?
                <Marker
                    title='Picked Location'
                    coordinate={markerCoordinates}
                >
                </Marker>
                :
                null
            }
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const readonly = navData.navigation.getParam('readonly')

    if(readonly){
        return {}
    }
    return {
        headerRight: (
            <TouchableOpacity 
                style={styles.headerButton}
                onPress={navData.navigation.getParam('savePickedLocationFunction')}
                >
                <Text style={styles.headerButtonText}>
                    Save
                </Text>
            </TouchableOpacity>
            // <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            //     <Item 
            //         title='Save' 
            //         iconName={Platform.OS=== 'android' ? 'md-checkmark' : 'ios-checkmark'}
            //     />
            // </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
})

export default MapScreen