import { ADD_PLACE, SET_PLACES } from "../actions/placesActions"

import Place from '../../models/place'

const INITIAL_STATE = {
    places: []
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ADD_PLACE: {
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.imagePath,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng
            )

            return { places: state.places.concat(newPlace) }
        }

        case SET_PLACES: {
            return {
                places: action.places.map(
                    pl => new Place(
                        pl.id.toString(),
                        pl.title,
                        pl.imageUri,
                        pl.address,
                        pl.lat,
                        pl.lng
                    )
                )
            }
        }
    }

    return state
}