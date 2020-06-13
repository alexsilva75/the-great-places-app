import React, { useState, useCallback } from 'react'
import { ScrollView, View, Button, Text, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { addPlace } from '../store/actions/placesActions'

import Colors from '../constants/Colors'

import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'
 
const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage]=useState()
    const [selectedLocation, setSelectedLocation] = useState()
    
    const pickedLocation = props.navigation.getParam('pickedLocation')

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const onLocationPickedHandler = useCallback((pickedLocation) => {
        //console.log('Picked Location in New Place Screen: ', pickedLocation)
        setSelectedLocation(pickedLocation)
    },[])


    const savePlaceHandler = () => {
        dispatch(addPlace(
            titleValue, 
            selectedImage,
            selectedLocation
            ))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imageUri) =>{

        setSelectedImage(imageUri)
        console.log(imageUri)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <View>
                    <ImagePicker onImageTaken={imageTakenHandler} />
                    <LocationPicker 
                        navigation={props.navigation}
                        onLocationPicked={onLocationPickedHandler}
                        />
                </View>
                <Button
                    title='Save Place'
                    color={Colors.primaryColor}
                    onPress={savePlaceHandler}
                />

            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen