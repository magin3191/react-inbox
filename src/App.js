import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import Navbar from './components/Navbar'
import Message from './components/Message'
import Compose from './components/Compose'
let allSelected = true


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({
      messages: json._embedded.messages
    })
  }

  composeMail = async (message) => {
    const response = await fetch('http://localhost:8082/api/messages',{
      method:'POST',
      body:JSON.stringify({
        subject: message.subject,
        body:message.body
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const newMessage = await response.json()
    this.setState({messages:[...this.state.messages,newMessage]})
  }

  toggleRead = message => {
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].read = !newMessages[index].read
    this.setState({ messages: newMessages })
  }

  toggleCheck = (message, e) => {
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].selected = !newMessages[index].selected
    this.setState({ messages: newMessages })
  }

  toggleStar = async (message, e) => {
    const obj = {
      'messageIds': [message.id],
      'command': 'star',
      'star': !message.starred
    }

    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].starred = !newMessages[index].starred
    this.setState({ messages: newMessages })

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  selectAll = () => {
    let selectedMessages = this.state.messages.slice(0)
    if (allSelected === true) {
      selectedMessages.map(mess => {
        mess.selected = true
        this.setState({ messages: selectedMessages })
      })
      allSelected = false
    } else {
      selectedMessages.map(mess => {
        mess.selected = false
        this.setState({ messages: selectedMessages })
      })
      allSelected = true
    }
  }

  markAsRead = async () => {
    let array=[]


    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected === true) {
        array.push(message.id)
        message.read = true
        message.selected=false
      }
    })
    const obj = {
    'messageIds': array,
    'command': 'read',
    'read': true
    }

    this.setState({ messages: newMessages })

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  markAsUnread  = async () => {
    let array = []
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected === true) {
        array.push(message.id)
        message.read = false
        message.selected = false
      }
    })

      const obj = {
      'messageIds': array,
      'command': 'read',
      'read': false
      }
      this.setState({ messages: newMessages })

      await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
  }

  del = async () => {

    let arr = []
    let ids=[]
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (!message.selected === true) {
        arr.push(message)
      }
      else {ids.push(message.id)}
    })
    let obj = {
      'messageIds': ids,
      'command':'delete'
    }
    this.setState({ messages: arr })
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  applyLabel = value => {
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected && message.labels.indexOf(value) == -1) {
        message.labels.push(value)
      }
    })
    this.setState({ messages: newMessages })
  }

  removeLabel = value => {
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected && message.labels.indexOf(value) !== -1) {
        let index = message.labels.indexOf(value)
        message.labels.splice(index, 1)
      }
    })
    this.setState({ messages: newMessages })
  }

  unreadCount = messages => {
    if (!this.state.messages.length) {
      return 0
    }
    let count = 0
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.read === false) {
        count++
      }
    })

    return count
  }

  setButtonState = messages => {
    if (!this.state.messages.length) {
      return 0
    }
    let count = 0
    let selectClass = ''
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected === true) {
        count++
      }
    })
    if (count > 0 || count < newMessages.length) {
      selectClass = 'fa fa-minus-square-o'
    }
    if (count === newMessages.length) {
      selectClass = 'fa fa-check-square-o'
    }
    if (count === 0) {
      selectClass = 'fa fa-square-o'
    }

    return selectClass
  }

  unclickable = messages => {
    if (!this.state.messages.length) {
      return 0
    }
    let count = 0
    let disabled = ''
    let newMessages = this.state.messages.slice(0)
    newMessages.map(message => {
      if (message.selected === true) {
        count++
      }
      if (count > 0) {
        disabled = ''
      }
      if (count === 0) {
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
          <Toolbar
            selectAll={this.selectAll}
            markAsRead={this.markAsRead}
            markAsUnread={this.markAsUnread}
            del={this.del}
            applyLabel={this.applyLabel}
            removeLabel={this.removeLabel}
            unreadCount={this.unreadCount}
            setButtonState={this.setButtonState}
            unclickable={this.unclickable}
          />
          <Route path='/compose'
            render={()=>(
              <Compose composeMail={this.composeMail} />
            )}/>


          <MessageList
            messages={this.state.messages}
            toggleRead={this.toggleRead}
            toggleCheck={this.toggleCheck}
            toggleStar={this.toggleStar}
          />
        </div>
      </div>
    )
  }
}

export default App
