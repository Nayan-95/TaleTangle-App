import React, { useRef, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import MessageBubble from "./MessageBubble";

const ChatArea = ({ messages, typing }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f5f5",
      }}
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
          isUser={message.sender === "You"}
        />
      ))}

      {/* Typing indicator */}
      {typing && (
        <Box sx={{ display: "flex", alignItems: "center", ml: 1, mb: 2 }}>
          <CircularProgress size={16} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Sudhanshu is typing...
          </Typography>
        </Box>
      )}

      {/* This element is used for auto-scrolling */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatArea;