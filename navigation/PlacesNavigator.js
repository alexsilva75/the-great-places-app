import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'

import Colors from '../constants/Colors'
import CustomHeaderButton from '../components/HeaderButton'

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : '',

        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
       
    }
})


export default createAppContainer(PlacesNavigator)
