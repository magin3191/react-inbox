import React, { Component } from 'react'
import './App.css'
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import Navbar from './components/Navbar'
import Message from './components/Message'
let allSelected=true

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  toggleRead = (message) => {

    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].read = !newMessages[index].read
    this.setState({messages:newMessages})
  }

  toggleCheck = (message,e) =>{
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].selected = !newMessages[index].selected
    this.setState({messages:newMessages})
  }

  toggleStar = (message, e) => {
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].starred = !newMessages[index].starred
    this.setState({messages:newMessages})
  }

  selectAll =() =>{
    let selectedMessages = this.state.messages.slice(0);
    if(allSelected === true){
      selectedMessages.map(mess => {
        mess.selected = true
        this.setState({messages:selectedMessages})
      })
      allSelected = false
    }
    else{
      selectedMessages.map(mess => {
        mess.selected = false
        this.setState({messages:selectedMessages})
      })
      allSelected = true
    }
  }

   markAsRead = (message) => {

    let newMessages = this.state.messages.slice(0)
      newMessages.map(message=>{
      if(message.selected===true){
        message.read=true
      }
    })
    this.setState({messages:newMessages})
  }

  markAsUnread = (message) => {
    let newMessages = this.state.messages.slice(0)
      newMessages.map(message=>{
        if(message.selected===true){
          message.read=false
        }
        this.setState({messages:newMessages})
      })
  }

  del = (message) => {
    let arr = [];
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message=>{
      if(!message.selected ===true){
        arr.push(message)
      }
    })
    this.setState({messages:arr})
  }


applyLabel = (value) => {
  let newMessages = this.state.messages.slice(0)
  newMessages.map(message =>{
    if(message.selected && message.labels.indexOf(value) ==-1){
      message.labels.push(value)
    }
  })
  this.setState({messages: newMessages})

}

removeLabel = (value) => {
  let newMessages = this.state.messages.slice(0)
  newMessages.map(message =>{
    if(message.selected && message.labels.indexOf(value) !==-1){
      let index = message.labels.indexOf(value)
       message.labels.splice(index,1)
    }
  })
    this.setState({messages: newMessages})
}


  unreadCount = (messages) =>{
    let count =0
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message=>{

    if(message.read===false){
      count ++
    }

  })

  return count
}


setButtonState = (messages) => {
  let count = 0
  let selectClass=''
  let newMessages = this.state.messages.slice(0)
  newMessages.map(message=>{
    if(message.selected === true){
      count ++
    }
  })
    if(count > 0 || count < newMessages.length){
      selectClass = 'fa fa-minus-square-o'
    }
    if(count === newMessages.length){
      selectClass = 'fa fa-check-square-o'
    }
    if(count===0){
      selectClass = 'fa fa-square-o'
    }

  return selectClass
}


unclickable = (messages) => {
  let count = 0
  let disabled =''
  let newMessages = this.state.messages.slice(0)
  newMessages.map(message=>{
    if(message.selected===true){
      count ++
    }
    if(count > 0){

      disabled = ''
    }
    if(count===0){
      disabled = 'disabled'
    }

  })
  return disabled
}





  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Toolbar  selectAll={this.selectAll} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} del={this.del} applyLabel={this.applyLabel} removeLabel={this.removeLabel} unreadCount={this.unreadCount} setButtonState={this.setButtonState} unclickable={this.unclickable}/>
          <MessageList messages={this.state.messages} toggleRead={this.toggleRead} toggleCheck={this.toggleCheck} toggleStar={this.toggleStar} />
        </div>
      </div>
    )
  }
}

export default App
