import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import DraggableFlatList from "react-native-draggable-flatlist";
import Collection_card from './Collection_card'
import Animated, { set } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'

// name has to be the same
import { locations } from "../locations";

const {width,height} = Dimensions.get('window')
 
// const exampleData = [...Array(20)].map((d, index) => ({
//   key: `item-${index}`, // For example only -- don't use index as your key!
//   label: index,
//   backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
//     5}, ${132})`
// }));
 
class DraggableFlatListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      data: []
    })
  }

  componentDidMount = () =>  {
    this.setState(
      { data: this.props.location }
    )
    // console.log('DraggableFlatListComponent: ', this.props.gestureHandler)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState(
        { data: this.props.location },
        //() => console.log('data in DraggableFlatListComponent:', this.state)
      )
    }
  }
 
  renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 180,
          width: width * 0.65,
          backgroundColor: isActive ? '#dddddd' : 'transparent',
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 15
        }}
        onLongPress={drag}
      >
        <Collection_card 
          name={item.name} 
          body={item.body}
          imgUri={require('../../assets/img/rotterdam.jpg')} 
          style={{elevation: 10}} 
          setEditModel={this.props.setEditModel}/>
      </TouchableOpacity>
    );
  };
 
  render() {
    return (
      <View style={{ flex: 1}}>
        <DraggableFlatList
          horizontal={true}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => {
            this.setState({ data })
            this.props.setLocation(data)
          }}
          onScrollOffsetChange={(offset)=>{
            //console.log('offset: ', offset)
            this.props.setActiveIndex(parseInt(offset / 177))
          }}
        />
      </View>
    );
  }
}
 
export default DraggableFlatListComponent;