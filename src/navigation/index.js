import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import Login from '../screens/Login'
import Test from '../screens/test'

/**
 * a mode property for the stack navigator. 
 * The value of this property is used to define a specific way to render styles and transitions. 
 * The default value of this property is card for screen transitions in iOS and Android.
 */

const StackNavigator = createStackNavigator(
  {
    Login:{
      screen: Login
    },
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    },
    Test: {
      screen: Test
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)