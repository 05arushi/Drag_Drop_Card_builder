import React, { useRef } from 'react';
import { Typography, Grid, Box, Button as MUIButton } from '@mui/material';
import { Toolbox } from './Component/Toolbox';
import { SettingsPanel } from './Component/SettingsPanel';
import MainCanvas from './Component/MainCanvas/MainCanvas';
import { Button } from './Component/Button/Button';
import { Container } from './Component/Container/Container';
import { InsideContainer } from './Component/InsideContainer/InsideContainer';
import { Card } from './Component/Card/Card';
import { Text } from './Component/Text/Text';
import Table from './Component/Table/Table';
import ImageUpload from './Component/Image/ImageUpload';
import { GalleryComponent } from './Component/Gallery/GalleryComponent';
import Divider from './Component/Divider/Divider';
import Video from './Component/Video/Video';
import AudioComponent from './Component/AudioComponent/AudioComponent';
import ListComponent from './Component/ListComponent/ListComponent';
import { Editor, Frame, Element} from "@craftjs/core";
import { makeStyles } from '@mui/styles';
import { IconButton, Popover } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import SaveIcon from '@mui/icons-material/Save';
import 'pattern.css';
import SaveOptions from './Component/SaveOptions';

const useStyles = makeStyles({
  root: {
    padding: '16px',
    height: '100vh',
    overflowY: 'auto',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  canvasArea: {
    padding: '20px',
    borderRight: '1px solid #ddd',
    marginTop: '5px',
    marginBottom: '5px',
    overflowX: 'hidden',
    overflowY: 'auto',

    // Mobile responsiveness
    '@media screen and (max-width: 600px)': {
      padding: '10px',
      borderRight: 'none',
    }
  },
});

function App() {

  const classes = useStyles();
  const canvasRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const [saveAnchorEl, setSaveAnchorEl] = React.useState(null);

  const handleSaveClick = (event) => {
    setSaveAnchorEl(event.currentTarget);
  };

  const handleCloseSavePopover = () => {
    setSaveAnchorEl(null);
  };

  const openSavePopover = Boolean(saveAnchorEl);

  const open = Boolean(anchorEl);
  const id = open ? 'toolbox-popover' : undefined;
  const popoverRef = React.useRef();

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleView = () => {
    setIsMobileView(prev => !prev);
  };


  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: isMobileView ? '#0f172a' : '#f7e7ce',
      }}
    >
      <Box
        sx={{
          width: isMobileView ? 375 : '100%',
          height: isMobileView ? 667 : '100vh',
          maxHeight: '100vh',
          border: isMobileView ? '12px solid #444' : 'none',
          borderRadius: isMobileView ? '24px' : 0,
          boxShadow: isMobileView ? 5 : 0,
          bgcolor: isMobileView ? '#1e293b' : '#f7e7ce',
          position: 'relative',
        }}
      >
        <Editor
          resolver={{
            MainCanvas,
            Card,
            Button,
            Text,
            Container,
            InsideContainer,
            ImageUpload,
            Table,
            GalleryComponent,
            Divider,
            Video,
            AudioComponent,
            ListComponent
          }}
        >
          <Grid container spacing={2} wrap="nowrap">
            {/* Main Canvas Area */}
            <Grid size={12} className={classes.canvasArea}>
              <Box ref={canvasRef} >
                <Frame>
                  <Element is={MainCanvas} isMobileView={isMobileView} canvas>
                    {/* this is the dropable zone */}
                  </Element>
                </Frame>
              </Box>
            </Grid>

            <SettingsPanel />

            <Box
              position="absolute"
              top={20}
              right={20}
              zIndex={1000}
              display="flex"
              alignItems="center"
              gap={1}
              bgcolor="#111827"
              borderRadius={2}
              px={2}
              py={1}
              boxShadow={4}
            >
              <IconButton
                onClick={(e) => setAnchorEl((prev) => !prev)}
                sx={{ color: '#ffffff' }}
              >
                <AddCircleIcon fontSize="medium" />
              </IconButton>

              <IconButton
                onClick={handleToggleView}
                sx={{ color: '#ffffff' }}
              >
                {isMobileView ? (
                  <PhoneAndroidIcon fontSize="medium" />
                ) : (
                  <PersonalVideoIcon fontSize="medium" />
                )}
              </IconButton>

              <IconButton
                onClick={handleSaveClick}
                sx={{ color: '#ffffff' }}
              >
                <SaveIcon fontSize="medium" />
              </IconButton>

              <Popover
                open={openSavePopover}
                anchorEl={saveAnchorEl}
                onClose={handleCloseSavePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: '#1f1f2e',
                    color: '#fff',
                    mt: 1,
                    p: 1,
                    borderRadius: 2,
                  }
                }}
              >
               <SaveOptions canvasRef={canvasRef} />
              </Popover>

              {open && (
                <Box
                  ref={popoverRef}
                  position="absolute"
                  top={70}
                  right={0}
                  bgcolor="#fff"
                  boxShadow={3}
                  borderRadius={2}
                  zIndex={1000}
                  p={2}
                  minWidth={300}
                  sx={{ backgroundColor: '#1f1f2e' }}
                >
                  <Toolbox />
                </Box>
              )}
            </Box>
          </Grid>
        </Editor>
      </Box>
    </Box>
  );

}

export default App;
