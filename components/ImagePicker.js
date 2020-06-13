import React, { useState } from 'react'
import {
    View,
    Button,
    Image,
    Text,
    StyleSheet,
    Alert
} from 'react-native'

import * as ExpoImagePicker from 'expo-image-picker'
import * as ExpoPermissions from 'expo-permissions'

import Colors from '../constants/Colors'

const ImagePicker = props => {
    const [pickedImage, setPickedImage] = useState()

    const verifyPermissions = async () => {
        const result = await ExpoPermissions.askAsync(ExpoPermissions.CAMERA , ExpoPermissions.CAMERA_ROLL)

        if (result.status !== 'granted') {
            Alert.alert(
                'Insuficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            )
            return false
        }

        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        const image = await ExpoImagePicker.launchCameraAsync(
            {
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            }
        )
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <Text>No picture picked yet.</Text> :

                    <Image
                        style={styles.image}
                        source={{ uri: pickedImage }}
                    />
                }

                <Button
                    title='Take Image'
                    color={Colors.primaryColor}
                    onPress={takeImageHandler}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 250,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,

    },
    image: {
        width: '100%',
        height: '80%',
        borderColor: '#ccc',
        borderWidth: 1

    }
})

export default ImagePicker