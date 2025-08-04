import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Button as MaterialButton,
  IconButton,
  Drawer,
  Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEditor } from "@craftjs/core";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const SettingsPanel = () => {
  const drawerTimeout = useRef(null);
  const isDraggingIntent = useRef(false);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("text");

  const { selected, dragged, actions } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    const isDragging = state.events.dragged;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        related: state.nodes[currentNodeId].related,
        settings: state.nodes[currentNodeId].related.settings,
        props: state.nodes[currentNodeId].data.props || {},
      };
    }

    return { selected, dragged: isDragging };
  });

  useEffect(() => {
    const handleMouseDown = () => {
      isDraggingIntent.current = false;
      drawerTimeout.current = setTimeout(() => {
        isDraggingIntent.current = true;
      }, 150);
    };

    const handleMouseUp = () => {
      clearTimeout(drawerTimeout.current);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(drawerTimeout.current);
    };
  }, []);


  useEffect(() => {
    clearTimeout(drawerTimeout.current);

    if (dragged.size > 0) return;

    drawerTimeout.current = setTimeout(() => {
      if (isDraggingIntent.current) return;

      if (selected?.name === "Container" && selected?.props?.onclick) {
        setOpen(true);
      } else if (selected && selected?.name !== "InsideContainer") {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, 200);
  }, [selected, dragged]);


  const handleClose = () => {
    setOpen(false);
    setActiveTab("text");
    actions.clearEvents();
  }

  const handleDelete = () => {
    if (selected?.id) {
      actions.delete(selected.id);
      setOpen(false);
    }
  }

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Grid container direction="column" spacing={2}>
          <Grid>
            <Grid sx={{ p: 1, borderRadius: 1 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{selected?.name}</Typography>
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => setActiveTab("text")}
                    sx={{
                      color: '#000',
                      bgcolor: activeTab === "text" ? '#e0e0e0' : 'transparent',
                      '&:hover': {
                        bgcolor: activeTab === "text" ? '#d5d5d5' : '#f0f0f0',
                      },
                    }}
                  >
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                  {(selected?.related?.styleSettings) && (
                    <IconButton
                      size="small"
                      onClick={() => setActiveTab("style")}
                      sx={{
                        color: '#000',
                        bgcolor: activeTab === "style" ? '#e0e0e0' : 'transparent',
                        '&:hover': {
                          bgcolor: activeTab === "style" ? '#d5d5d5' : '#f0f0f0',
                        },
                      }}
                    >
                      <DesignServicesIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={handleClose}
                    sx={{ color: '#000' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid>
            {selected?.settings && activeTab === "text" && React.createElement(selected.settings)}
            {selected?.settings && selected?.related?.styleSettings && activeTab === "style" &&
              React.createElement(selected.related.styleSettings)}
          </Grid>

          <Divider />
          {selected?.name !== "MainCanvas" && (
            <Grid>
              <MaterialButton variant="contained" color="error" onClick={handleDelete} fullWidth>
                Delete
              </MaterialButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </Drawer >
  );
};
