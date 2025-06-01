import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  Chip,
} from "@mui/material";
import {
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
} from "@mui/icons-material";

const MessageBubble = ({ message, isUser }) => {
  const { text, time, status, fileUrl, fileType, fileName, fileSize } = message;
  const [imageOpen, setImageOpen] = useState(false);

  // Handle image modal open/close
  const handleImageOpen = () => setImageOpen(true);
  const handleImageClose = () => setImageOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        mb: 2,
        maxWidth: "80%",
        alignSelf: isUser ? "flex-end" : "flex-start",
      }}
    >
      {!isUser && (
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 36,
            height: 36,
            mr: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            fontSize: "0.9rem",
          }}
        >
          {message.sender.charAt(0)}
        </Avatar>
      )}

      <Box sx={{ maxWidth: "calc(100% - 50px)" }}>
        <Paper
          elevation={isUser ? 1 : 2}
          sx={{
            p: text ? 1.5 : 0,
            pt: (!text && fileUrl && fileType === "image") ? 0.75 : 1.5,
            pb: (!text && fileUrl && fileType === "image") ? 0.75 : 1.5,
            borderRadius: 2,
            bgcolor: isUser ? "primary.main" : "background.paper",
            color: isUser ? "white" : "text.primary",
            position: "relative",
            mr: isUser ? 1 : 0,
            ml: isUser ? 0 : 1,
            boxShadow: isUser 
              ? "0 2px 5px rgba(25, 118, 210, 0.3)" 
              : "0 2px 5px rgba(0, 0, 0, 0.08)",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {/* Display file content if present */}
          {fileUrl && fileType === "image" && (
            <Box 
              sx={{ 
                position: "relative",
                "&:hover .image-overlay": {
                  opacity: 1,
                }
              }}
            >
              <Box
                component="img"
                src={fileUrl}
                alt={fileName || "Image"}
                onClick={handleImageOpen}
                sx={{
                  maxWidth: "100%",
                  maxHeight: 240,
                  borderRadius: text ? 1 : "8px 8px 0 0",
                  mb: text ? 1.5 : 0,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.01)"
                  }
                }}
              />
              
              {/* Image preview overlay */}
              <Box 
                className="image-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0,0,0,0.4)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  borderRadius: text ? 1 : "8px 8px 0 0",
                }}
              >
                <IconButton 
                  size="small" 
                  onClick={handleImageOpen}
                  sx={{ color: "white", bgcolor: "rgba(0,0,0,0.4)" }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>
              
              {/* {!text && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1.5,
                    backgroundColor: isUser ? "primary.dark" : "background.default",
                    borderTop: isUser ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography 
                    variant="body2" 
                    noWrap
                    sx={{ 
                      maxWidth: "75%",
                      color: isUser ? "rgba(255,255,255,0.9)" : "text.secondary",
                      fontSize: "0.75rem",
                    }}
                  >
                    {fileName || "Image"}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isUser ? "rgba(255,255,255,0.7)" : "text.secondary",
                      fontSize: "0.7rem",
                    }}
                  >
                    {fileSize}
                  </Typography>
                </Box>
              )} */}
            </Box>
          )}

          {/* Display document if present */}
          {fileUrl && fileType === "document" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                mb: text ? 1 : 0,
                bgcolor: isUser ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)",
                borderRadius: 1,
                border: isUser ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <FileIcon sx={{ mr: 1.5, color: isUser ? "white" : "primary.main" }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: isUser ? "white" : "text.primary",
                  }}
                >
                  {fileName}
                </Typography>
                <Chip
                  label={fileSize}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    height: 20, 
                    fontSize: '0.65rem',
                    mt: 0.5,
                    color: isUser ? "rgba(255,255,255,0.8)" : "text.secondary",
                    borderColor: isUser ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
              <Tooltip title="Download" arrow>
                <IconButton
                  size="small"
                  component="a"
                  href={fileUrl}
                  download={fileName}
                  sx={{
                    color: isUser ? "white" : "primary.main",
                    "&:hover": {
                      bgcolor: isUser ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    },
                    ml: 1,
                  }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Text message */}
          {text && (
            <Typography 
              variant="body1" 
              sx={{ 
                wordBreak: "break-word",
                fontSize: "0.95rem",
                lineHeight: 1.5,
              }}
            >
              {text}
            </Typography>
          )}

          {/* Time and status */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 0.5,
              mb: -0.5,
              gap: 2
            }}
          >
            <Typography
              variant="caption"
              sx={{ 
                color: isUser ? "rgba(255,255,255,0.7)" : "text.secondary",
                fontSize: "0.65rem",
              }}
            >
              {time}
            </Typography>
            {isUser && status && (
              <Typography
                variant="caption"
                sx={{ ml: 0.5, color: "rgba(255,255,255,0.7)" }}
              >
                {status === "sent" ? "✓" : "✓✓"}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>

      {isUser && (
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 36,
            height: 36,
            ml: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            fontSize: "0.9rem",
            backgroundImage: "linear-gradient(135deg, #1976d2 0%, #304ffe 100%)",
          }}
        >
          Y
        </Avatar>
      )}

      {/* Full-size image dialog */}
      <Dialog 
        open={imageOpen} 
        onClose={handleImageClose}
        maxWidth="lg"
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative", overflow: "hidden" }}>
          <IconButton
            size="small"
            onClick={handleImageClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={fileUrl}
            alt={fileName || "Image"}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MessageBubble;