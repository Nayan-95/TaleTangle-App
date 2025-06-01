import React from "react";
import {
  Box,
  Typography,
  TextField,
  Tooltip,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Chip,
  InputAdornment,
  Paper,
  Drawer,
  Zoom,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";

const Sidebar = ({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  selectedContact,
  handleContactClick,
  getStatusColor,
  getRandomColor,
  getInitials,
  theme,
  isMobile,
  showSidebar,
  setShowSidebar,
}) => {
  const sidebarContent = (
    <Box sx={{ width: 320, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.dark",
          color: "white",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Chats
        </Typography>
        <Tooltip title="New Chat" arrow>
          <Fab
            color="secondary"
            size="small"
            onClick={() => alert("Create new chat")}
            sx={{ boxShadow: 3 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 2, py: 1.5, backgroundColor: "primary.main", color: "white" }}>
        <TextField
          fullWidth
          placeholder="Search chats..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.7)" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&::placeholder": {
                color: "rgba(255,255,255,0.7)",
              },
            },
          }}
        />
      </Box>

      {/* Contact List */}
      <List sx={{ overflow: "auto", flex: 1, pt: 0 }}>
        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            button
            onClick={() => handleContactClick(contact)}
            sx={{
              borderRadius: 0,
              borderLeft: selectedContact?.id === contact.id ? 4 : 0,
              borderLeftColor: "secondary.main",
              backgroundColor:
                selectedContact?.id === contact.id ? "action.selected" : "transparent",
              "&:hover": {
                backgroundColor: "action.hover",
                transform: "translateY(-2px)",
                transition: "transform 0.2s",
              },
              transition: "all 0.2s",
            }}
          >
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: getStatusColor(contact.status),
                    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: getRandomColor(contact.name),
                    boxShadow: 1,
                  }}
                >
                  {getInitials(contact.name)}
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={contact.lastMessage}
              primaryTypographyProps={{ fontWeight: "medium" }}
              secondaryTypographyProps={{ noWrap: true }}
            />
            {contact.unread > 0 && (
              <Chip
                label={contact.unread}
                color="secondary"
                size="small"
                sx={{ height: 20, minWidth: 20, fontSize: "0.75rem" }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Zoom in={true} style={{ transitionDelay: "200ms" }}>
          <Paper
            sx={{
              width: 320,
              m: 1,
              ml: 1,
              mr: 0,
              borderRadius: 2,
              display: { xs: "none", md: "block" },
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            {sidebarContent}
          </Paper>
        </Zoom>
      )}

      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;