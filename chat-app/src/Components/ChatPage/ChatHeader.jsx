import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Phone as PhoneIcon,
  Videocam as VideocamIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const ChatHeader = ({
  isMobile,
  setShowSidebar,
  selectedContact,
  getInitials,
  theme,
}) => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        borderRadius: "8px 8px 0 0",
        boxShadow: 0,
        background: "linear-gradient(90deg, #1976d2 0%, #304ffe 100%)",
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {/* Menu Button for Mobile */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setShowSidebar(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Contact Avatar and Name */}
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "success.main",
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            },
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: "white",
              color: "primary.main",
              mr: 2,
              boxShadow: 1,
            }}
          >
            {getInitials(selectedContact.name)}
          </Avatar>
        </Badge>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {selectedContact.name}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {selectedContact.status}
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Action Buttons */}
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Voice Call" arrow>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <PhoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Video Call" arrow>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <VideocamIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search" arrow>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More" arrow>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;