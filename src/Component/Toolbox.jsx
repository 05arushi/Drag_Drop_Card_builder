import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { Element, useEditor } from "@craftjs/core";
import { Container } from "./Container/Container";
import { Card } from "./Card/Card";
import { Button as CustomButton } from "./Button/Button";
import { Text } from "./Text/Text";
import { GalleryComponent } from "./Gallery/GalleryComponent";
import ListComponent from "./ListComponent/ListComponent";
import Divider from "./Divider/Divider";
import Table from "./Table/Table";
import ImageUpload from "./Image/ImageUpload";
import Video from "./Video/Video";
import AudioComponent from "./AudioComponent/AudioComponent";
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const toolboxItems = [
  { icon: <SmartButtonIcon />, label: "Button", element: <CustomButton text="Click me" size="small" /> },
  { icon: <TextFieldsIcon />, label: "Text", element: <Text text="Hi world" /> },
  { icon: <HighlightAltOutlinedIcon />, label: "Container", element: <Element is={Container} background={'#d7cbcb7e'} padding={20} onclick={true} canvas /> },
  { icon: <InsertPhotoOutlinedIcon />, label: "Image", element: <ImageUpload /> },
  { icon: <GridOnIcon />, label: "Table", element: <Table /> },
  { icon: <ViewAgendaOutlinedIcon />, label: "Card", element: <Card /> },
  { icon: <FormatListBulletedIcon />, label: "List", element: <ListComponent /> },
  { icon: <CollectionsOutlinedIcon />, label: "Gallery", element: <GalleryComponent /> },
  { icon: <HorizontalRuleIcon />, label: "Divider", element: <Divider /> },
  { icon: <VideocamIcon />, label: "Video", element: <Video /> },
  { icon: <AudiotrackIcon />, label: "Audio", element: <AudioComponent /> },
];

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Box px={2} py={2}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        Drag to add
      </Typography>
      <Grid container spacing={2}>
        {toolboxItems.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Button
              ref={(ref) => ref && connectors.create(ref, item.element)}
              startIcon={item.icon}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                backgroundColor: "#1f1f2e",
                color: "#fff",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 2,
                padding: "10px 12px",
                boxShadow: "0px 2px 4px rgba(192, 192, 192, 0.4)",
                "&:hover": {
                  backgroundColor: "#2a2a3d"
                }
              }}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
