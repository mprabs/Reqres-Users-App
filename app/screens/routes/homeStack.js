import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import welcomeScreen from '../WelcomeScreen'
import UserList from '../ListWindow'
import userDetails from '../userDetails'

const screens = {
    welcomeScreen: {
        screen: welcomeScreen,
        navigationOptions: {
            header: null
        } 
    },
    UserList: {
        screen: UserList,
        navigationOptions: {
            header: null
        } 
    },
    userDetails: {
        screen: userDetails,
        navigationOptions: {
            header: null
        } 
    }
}

const HomeStack = createStackNavigator(screens) 

export default createAppContainer(HomeStack)