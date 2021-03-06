import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Alert,Image,Modal,ScrollView,KeyboardAvoidingView,FlatList } from 'react-native';
import MyHeader from '../components/MyHeader';
import db from "../config";
import firebase from 'firebase';
export default class BookDonateScreen extends Component{
constructor(){
super();
this.state={
    requestedBooksList:[]
},
this.requestRef=null
getRequestedBookList=()=>{
    this.requestRef=db.collection('requested_books')
    .onSnapshot((snapshot)=>{
        var requestedBooksList=snapshot.docs.map(document=>document.data());
        this.setState({requestedBooksList:requestedBooksList})
    })
}


}
keyExtractor=(item,index)=>index.toString()

renderItem=({item})=>{
    return(
        <View style={{borderBottomWidth:2}}>
        <Text>{"bookId"+item.book_name}</Text>
        <Text>{"reasonToRequest"+item.reason_to_request}</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={{color:'blue'}}> Donate </Text>
        </TouchableOpacity>
        </View>
        
    )
}
    render(){

return(
    <View style={{flex:1}}>
    <MyHeader title="Donate Books"/>
    <View style={{flex:1}}>
    {this.state.requestedBooksList.length === 0
        ? (<View style={styles.subContainer}>
            <Text style= {{fontSize: 20}}>List Of All Requested Books</Text>
          </View>)
        :(<FlatList keyExtractor={this.keyExtractor}
            data={this.state.requestedBooksList}
            renderItem={this.renderItem}
        />)


    }
    </View>
          </View>
)

    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center',
    
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })