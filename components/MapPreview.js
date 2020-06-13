import React from 'react'
import { 
    View, 
    Image,
    TouchableOpacity, 
    StyleSheet 
} from 'react-native'
import ENV from '../env'

const MapPreview = props => {
    try {
        let imagePreviewUrl

        if (props.location) {
            imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
                props.location.lat
                },${props.location.lng
                }&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
                props.location.lat},${
                props.location.lng}&key=${ENV.googleAPIKey}`
        }

        console.log('Image Preview: '+ imagePreviewUrl)

        return (
            <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
                {props.location ? 
                    <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> 
                    :
                     props.children}
            </TouchableOpacity>
        )
    } catch (err) {
        console.log(err)
    }

}


const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    },
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default MapPreview