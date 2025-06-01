import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Fab,
  Menu,
  MenuItem,
  InputAdornment,
  Zoom,
  Typography,
  Fade,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import {
  EmojiEmotions as EmojiIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Mic as MicIcon,
  Image as ImageIcon,
  InsertDriveFile as InsertDriveFileIcon,
  CameraAlt as CameraIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import EmojiPicker from 'emoji-picker-react';

// Helper function to get current time
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Helper function to get random reply (for demo purposes)
const getRandomReply = () => {
  const replies = [
    "I see what you mean",
    "That's interesting!",
    "Let me check on that",
    "Thanks for sharing",
    "Great point",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
};

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const InputArea = ({
  messages,
  setMessages,
}) => {
  // Refs for file inputs
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  
  // State for attachment menu
  const [attachMenuAnchor, setAttachMenuAnchor] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  // Send text message
  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, {
        sender: "You",
        text: input,
        time: getCurrentTime(),
        status: "sent"
      }]);
      setInput("");
    }
  };

  // Send file/image message
  const sendFileMessage = (file, type) => {
    // Create object URL for preview
    const fileUrl = URL.createObjectURL(file);
    
    setMessages([...messages, {
      sender: "You",
      fileType: type,
      fileName: file.name,
      fileUrl: fileUrl,
      fileSize: formatFileSize(file.size),
      time: getCurrentTime(),
      status: "sent",
      text: input.trim() !== "" ? input : null
    }]);
    
    setInput("");
    setFilePreviewUrl(null);
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    if (file) {
      sendFileMessage(file, 'image');
    }
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    if (file) {
      sendFileMessage(file, 'document');
    }
  };

  // Simulate typing effect for demo
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "You") {
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          const simulatedReply = {
            sender: "Sudhanshu",
            text: getRandomReply(),
            time: getCurrentTime(),
            status: "read"
          };
          setMessages(prev => [...prev, simulatedReply]);
        }, 2000);
      }, 1000);
    }
  }, [messages]);
  
  // Handle opening and closing the attachment menu
  const handleAttachClick = (event) => {
    setAttachMenuAnchor(event.currentTarget);
  };
  
  const handleAttachClose = () => {
    setAttachMenuAnchor(null);
  };
  
  // Handle file selection
  const handleFileSelection = (e, fileHandler) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        file: file,
        handler: fileHandler === handleImageUpload ? 'image' : 'document',
        name: file.name,
        size: formatFileSize(file.size)
      });
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
      } else {
        setFilePreviewUrl(null);
      }
    }
    handleAttachClose();
  };
  
  // Send message with or without attachment
  const handleSend = () => {
    if (selectedFile) {
      if (selectedFile.handler === 'image') {
        handleImageUpload(selectedFile.file);
      } else {
        handleFileUpload(selectedFile.file);
      }
      setSelectedFile(null);
    } else if (input.trim()) {
      sendMessage();
    }
  };

  // Handle Emoji selection 
  const handleEmoji = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setEmojiOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Clean up object URLs when unmounted
  useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [filePreviewUrl]);
  
  return (
    <Box
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: "#e0e0e0",
        bgcolor: "background.paper",
        display: "flex",
        alignItems: "center",
        gap: 1,
        position: "relative",
      }}
    >
      {/* Emoji Button with Picker */}
      <Box sx={{ position: 'relative' }}>
        <Tooltip title="Emoji" arrow>
          <IconButton
            color="primary"
            onClick={() => setEmojiOpen(!emojiOpen)}
            sx={{
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
              transition: "all 0.3s",
            }}
          >
            <EmojiIcon />
          </IconButton>
        </Tooltip>
        
        {emojiOpen && (
          <ClickAwayListener onClickAway={() => setEmojiOpen(false)}>
            <Paper 
              ref={emojiPickerRef}
              elevation={5}
              sx={{ 
                position: 'absolute', 
                bottom: '100%', 
                left: -70, 
                zIndex: 1000,
                borderRadius: 2,
                overflow: 'hidden',
                mt: -1,
                mb: 1,
              }}
            >
              <EmojiPicker 
                onEmojiClick={handleEmoji} 
                width={320}
                height={400}
              />
            </Paper>
          </ClickAwayListener>
        )}
      </Box>
      
      {/* Attachment Button */}
      <Tooltip title="Attach" arrow>
        <IconButton
          color="primary"
          onClick={handleAttachClick}
          sx={{
            "&:hover": {
              backgroundColor: "primary.light",
              color: "white",
            },
            transition: "all 0.3s",
          }}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      
      {/* Attachment Menu */}
      <Menu
        anchorEl={attachMenuAnchor}
        open={Boolean(attachMenuAnchor)}
        onClose={handleAttachClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            mt: -1,
          }
        }}
      >
        <MenuItem onClick={() => imageInputRef.current.click()}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
            <ImageIcon color="primary" />
            <Typography variant="body2">Photo</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => fileInputRef.current.click()}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
            <InsertDriveFileIcon color="primary" />
            <Typography variant="body2">Document</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => cameraInputRef.current.click()}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
            <CameraIcon color="primary" />
            <Typography variant="body2">Camera</Typography>
          </Box>
        </MenuItem>
      </Menu>
      
      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={imageInputRef}
        onChange={(e) => handleFileSelection(e, handleImageUpload)}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => handleFileSelection(e, handleFileUpload)}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        ref={cameraInputRef}
        onChange={(e) => handleFileSelection(e, handleImageUpload)}
      />
      
      {/* Selected file preview */}
      {selectedFile && (
        <Fade in={selectedFile !== null}>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              right: 0,
              p: 1.5,
              mx: 2,
              mb: 1,
              bgcolor: "background.paper",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
              {/* Preview image if available */}
              {filePreviewUrl ? (
                <Box
                  component="img"
                  src={filePreviewUrl}
                  alt={selectedFile.name}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    objectFit: "cover",
                    border: "1px solid #eaeaea",
                  }}
                />
              ) : (
                <InsertDriveFileIcon 
                  color="primary"
                  sx={{ fontSize: 38 }}
                />
              )}
              
              <Box sx={{ overflow: "hidden", flex: 1 }}>
                <Typography 
                  variant="body2" 
                  fontWeight={500}
                  sx={{ 
                    maxWidth: "200px", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis", 
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedFile.size}
                </Typography>
              </Box>
            </Box>
            
            <IconButton 
              size="small" 
              onClick={() => {
                setSelectedFile(null);
                if (filePreviewUrl) {
                  URL.revokeObjectURL(filePreviewUrl);
                  setFilePreviewUrl(null);
                }
              }}
              sx={{
                bgcolor: "#f5f5f5",
                "&:hover": {
                  bgcolor: "#e0e0e0",
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Fade>
      )}
      
      {/* Input Field */}
      <Box
        sx={{
          flex: 1,
          animation: "fadeIn 0.5s",
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        }}
      >
        <TextField
          fullWidth
          placeholder={selectedFile ? "Add a message..." : "Type a message..."}
          variant="outlined"
          size="small"
          multiline
          maxRows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Voice Message" arrow>
                  <IconButton edge="end" color="primary">
                    <MicIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "22px",
              backgroundColor: "background.paper",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0,0,0,0.1)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
                borderWidth: 1,
              },
              transition: "all 0.3s",
              pl: 2,
              pr: 1,
            },
          }}
        />
      </Box>
      
      {/* Send Button */}
      <Zoom in={(input.trim() !== "") || selectedFile !== null}>
        <Fab
          color="primary"
          size="medium"
          onClick={handleSend}
          sx={{
            boxShadow: "0 2px 5px rgba(25, 118, 210, 0.3)",
            backgroundImage: "linear-gradient(135deg, #1976d2 0%, #304ffe 100%)",
            "&:hover": {
              backgroundImage: "linear-gradient(135deg, #1565c0 0%, #283593 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
            },
            transition: "all 0.2s",
          }}
        >
          <SendIcon />
        </Fab>
      </Zoom>
      
      {/* Mic Button for empty input and no attachment */}
      {input.trim() === "" && !selectedFile && (
        <Tooltip title="Voice Message" arrow>
          <Fab
            color="primary"
            size="medium"
            sx={{
              boxShadow: "0 2px 5px rgba(25, 118, 210, 0.3)",
              backgroundImage: "linear-gradient(135deg, #1976d2 0%, #304ffe 100%)",
              "&:hover": {
                backgroundImage: "linear-gradient(135deg, #1565c0 0%, #283593 100%)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
              },
              transition: "all 0.2s",
            }}
          >
            <MicIcon />
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default InputArea;