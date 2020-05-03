import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import DraggableFlatList from "react-native-draggable-flatlist";
import Collection_card from './Collection_card'

// name has to be the same
import { locations } from "../locations";

const {width,height} = Dimensions.get('window')
 
const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));
 
class DraggableFlatListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      data: []
    })
  }

  componentDidMount = () =>  {
    this.setState(
      { data: this.props.location },
      () => console.log('data:', this.state)
    )
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState(
        { data: this.props.location },
        () => console.log('data:', this.state)
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
          marginHorizontal: 10
        }}
        onLongPress={drag}
      >
        <Collection_card imgUri={require('../../assets/img/rotterdam.jpg')} style={{elevation: 10}}/>
      </TouchableOpacity>
    );
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          horizontal={true}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => {
            //console.log('data after drag', data)
            this.setState({ data })
            this.props.setLocation(data)
          }}
          onScrollOffsetChange={(offset)=>{
            this.props.setActiveIndex(parseInt(offset / 180))
          }}
        />
      </View>
    );
  }
}
 
export default DraggableFlatListComponent;