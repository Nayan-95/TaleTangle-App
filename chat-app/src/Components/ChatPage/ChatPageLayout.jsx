import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import ChatHeader from "./ChatHeader";
import InputArea from "./InputArea";
import {
  Box,
  Paper,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "Sudhanshu", text: "Hey! How's it going?", time: "10:30 AM", status: "read" },
    { sender: "You", text: "All good! What about you?", time: "10:32 AM", status: "read" },
    { sender: "Sudhanshu", text: "I'm doing great! Just finishing up that project we discussed last week.", time: "10:33 AM", status: "read" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [typing, setTyping] = useState(false);
  const [selectedContact, setSelectedContact] = useState({ id: 1, name: "John", lastMessage: "See you tomorrow!", unread: 2, status: "online", avatar: null },);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const contacts = [
    { id: 1, name: "John", lastMessage: "See you tomorrow!", unread: 2, status: "online", avatar: null },
    { id: 2, name: "Emma", lastMessage: "Thanks for the help!", unread: 0, status: "offline", avatar: null },
    { id: 3, name: "Michael", lastMessage: "Let's meet up soon", unread: 0, status: "online", avatar: null },
    { id: 4, name: "Sarah", lastMessage: "I'll send the documents", unread: 5, status: "online", avatar: null },
    { id: 5, name: "David", lastMessage: "How's the project going?", unread: 0, status: "offline", avatar: null },
    { id: 6, name: "Lisa", lastMessage: "Just checking in", unread: 0, status: "online", avatar: null },
    { id: 7, name: "Mark", lastMessage: "Available for a call?", unread: 0, status: "offline", avatar: null },
    { id: 8, name: "Jennifer", lastMessage: "Take care!", unread: 0, status: "online", avatar: null },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setLoadingMessages(true);
    setTimeout(() => setLoadingMessages(false), 800);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const getRandomReply = () => {
    const replies = [
      "That sounds great!",
      "I'll check and get back to you soon.",
      "Let's discuss this in more detail.",
      "I'm not sure about that. What do you think?",
      "Absolutely! Let's do it.",
      "Can we schedule a meeting about this?",
      "I like your idea. Let me add something to it."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  

  const getStatusColor = (status) => {
    return status === "online" ? "success.main" : "text.disabled";
  };

  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const getRandomColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#00796b',
      '#e91e63',
      '#9c27b0',
      '#3f51b5',
      '#f57c00',
      '#607d8b'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      
      <Sidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredContacts={filteredContacts}
        selectedContact={selectedContact}
        handleContactClick={handleContactClick}
        getStatusColor={getStatusColor}
        getRandomColor={getRandomColor}
        getInitials={getInitials}
        theme={theme}
        isMobile={isMobile}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      
      {/* Chat area */}
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Paper sx={{
          flex: 1,
          m: 1,
          mr: 1,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 3
        }}>

          <ChatHeader
            isMobile={isMobile}
            setShowSidebar={setShowSidebar}
            selectedContact={selectedContact}
            getInitials={getInitials}
            theme={theme}
          />

          {/* Message Container Component */}
          <MessageContainer
            loadingMessages={loadingMessages}
            selectedContact={selectedContact}
            messages={messages}
            typing={typing}
            getInitials={getInitials}
          />
          
          {/* Input Area Component */}
          <InputArea
            messages={messages}
            setMessages={setMessages}
          />
          
        </Paper>
      </Zoom>
    </Box>
  );
}