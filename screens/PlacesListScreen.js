import React,{useEffect} from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'

import {loadPlaces} from '../store/actions/placesActions'


const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadPlaces())
    }, [dispatch])

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={places}
            renderItem={(itemData) => {
                return <PlaceItem
                    image={itemData.item.image}
                    onSelect={() => { 
                        props.navigation.navigate('PlaceDetail',{
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id
                        })
                     }}
                    title={itemData.item.title}
                    address={itemData.item.address}
                />
            }}
        />
    )
}

PlacesListScreen.navigationOptions = navData => {


    return {
        headerTitle: 'All Places',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add Place'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={
                        () => {
                            navData.navigation.navigate('NewPlace')
                        }
                    }
                />
            </HeaderButtons>
        )
    }

}

const styles = StyleSheet.create({

})

export default PlacesListScreen