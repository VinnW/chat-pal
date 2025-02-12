import { useState, useEffect} from 'react'
import './chat.css'
import Person from './person.tsx'
import BlankProfilePic from './assets/blank-pp.png'
import OptionsIcon from './assets/options-lines.png'
import AddContactIcon from './assets/add-contact.png'
import io from 'socket.io-client'

const socket = io("http://localhost:8080")

function Chat(){
  const [showChat, setShowChat] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  
  const [text, setText] = useState("")
  const [messages, setMessages] = useState<string[]>([])
  const [contacts, setContacts] = useState<string[]>([])
  const [contactName, setContactName] = useState("")


  const sendMessage = async () => {
    socket.emit("send_message", text)
  }

  const addContact = async () => {
    socket.emit("add_contact", contactName)
  }

  const requestContacts = async () => {
    socket.emit("request_contacts", contacts)
  }

  let previousName = ""
  const toggleChat = (name: string) => {
    socket.emit("send_name", name);
  if(name != previousName || name == ""){
    setShowChat(true)
  }else{
    setShowChat(false)
  }
  previousName = name
}

  useEffect(() => {
    requestContacts()
    socket.on("receive_contacts", (contact) => {
      setContacts(contact)
    })
  }, [])


  return(
    <>
    <div className='container'>

      <div className="left-container">
        <div className='chat-title-options'>
          <h1 className='chat-text'>Chat</h1>
          <img className='burger-options' src={OptionsIcon} onClick={() => setShowOptions(!showOptions)}></img>
        </div>

        {showOptions && (
          <div className='options-container'>
            <div className='add-contacts-container' onClick={() => setShowAddContact(!showAddContact)}>
              <img className='add-contacts-icon' src={AddContactIcon}></img>
              <p className='add-contacts'>Add Contact</p>
            </div>
          </div>
        )}
        
        {contacts.map((contact) => (
          <Person onClick = {() => {toggleChat(contact)}} image={BlankProfilePic} name={contact}></Person>
        ))}
      </div>

      {showChat && (
        <div className="right-container">
        {messages.map((message) => (
          <div className='chat-container'>
            <p className="bubble-chat-text">{message}</p>
          </div>
        ))}

        <div className='bottom-func'>
            <input className='message-input' type="text" placeholder="Type a message..." value={text}
            onChange={(e) => setText(e.target.value)}></input>
            <button className='send-btn' onClick={() => {setMessages([...messages, text]), sendMessage()}}>Send</button>
        </div>
      </div>
      )}

      {showAddContact && (
        <div className='right-container'>
            <h1 className='add-contact-header'>Add Contact</h1>
            <input className='username-input' type="text" placeholder="Username" value = {contactName} onChange={(e) => setContactName(e.target.value)}></input>
            <button className='add-contact-btn' onClick={() => {addContact(),
            setTimeout(() => {
              requestContacts()
            }, 300) 
            }}>Add</button>
        </div>
      )}

    </div>
  </>
  )
  
}

  export default Chat