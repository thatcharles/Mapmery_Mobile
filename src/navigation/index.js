import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import myComponent from '../screens/myComponent'

/**
 * a mode property for the stack navigator. 
 * The value of this property is used to define a specific way to render styles and transitions. 
 * The default value of this property is card for screen transitions in iOS and Android.
 */

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNotes: {
      screen: AddNotes
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)