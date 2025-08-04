import { useState } from "react";
import { useNode } from "@craftjs/core";
import { ColorPicker, useColor } from "react-color-palette";
import PaletteIcon from "@mui/icons-material/Palette";
import { Box, IconButton, Typography, MenuItem, Menu, Slider, Divider, Select, Button } from "@mui/material";

function TextSettingsStyle() {

    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props,
    }));

    const [color, setColor] = useColor(props.textColor || "#000000");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [shadowcolor, setShadowColor] = useColor(props.textShadowColor || "#ffffff");
    const [shadowanchorEl, setShadowAnchorEl] = useState(null);
    const shadowopen = Boolean(shadowanchorEl);
    const handleShadowClick = (event) => {
        setShadowAnchorEl(event.currentTarget);
    };
    const handleShadowClose = () => {
        setShadowAnchorEl(null);
    };

    return (
        <>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Font Weight</Typography>
            <Slider
                value={props.fontWeight ?? 500}
                onChange={(e, val) =>
                    setProp((props) => {
                        props.fontWeight = val;
                    })
                }
                min={100}
                max={900}
                step={100}
                valueLabelDisplay="auto"
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2" style={{ fontWeight: 600 }}>Text Shadow</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Horizontal Offset</Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <Slider
                    value={props.textShadowX ?? null}
                    onChange={(e, val) => setProp(p => (p.textShadowX = val))}
                    min={-20}
                    max={20}
                />
                <Button
                    onClick={() => setProp(p => (p.textShadowX = null))}
                    variant="outlined"
                    size="small"
                >
                    Reset
                </Button>
            </Box>
            <Typography variant="body2">Vertical Offset</Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <Slider
                    value={props.textShadowY ?? null}
                    onChange={(e, val) => setProp(p => (p.textShadowY = val))}
                    min={-20}
                    max={20}
                />
                <Button
                    onClick={() => setProp(p => (p.textShadowY = null))}
                    variant="outlined"
                    size="small"
                >
                    Reset
                </Button>
            </Box>
            <Typography variant="body2">Blur Radius</Typography>

            <Box display="flex" alignItems="center" gap={2}>
                <Slider
                    value={props.textShadowBlur ?? 0}
                    onChange={(e, val) => setProp(p => (p.textShadowBlur = val))}
                    min={0}
                    max={30}
                    sx={{ flex: 1 }}
                />
                <Button
                    onClick={() => setProp(p => (p.textShadowBlur = null))}
                    variant="outlined"
                    size="small"
                >
                    Reset
                </Button>
            </Box>

            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Text Case
            </Typography>
            <Select
                fullWidth
                value={props.textTransform || "none"}
                onChange={(e) => setProp((props) => (props.textTransform = e.target.value))}
                sx={{ mt: 1 }}
            >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="uppercase">UPPERCASE</MenuItem>
                <MenuItem value="lowercase">lowercase</MenuItem>
                <MenuItem value="capitalize">Capitalize</MenuItem>
            </Select>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Text Decoration
            </Typography>
            <Select
                fullWidth
                value={props.textDecoration || "none"}
                onChange={(e) => setProp((props) => (props.textDecoration = e.target.value))}
                sx={{ mt: 1 }}
            >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="underline">Underline</MenuItem>
                <MenuItem value="line-through">Strikethrough</MenuItem>
            </Select>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Font
            </Typography>
            <Select
                fullWidth
                value={props.fontFamily || "none"}
                onChange={(e) => setProp((props) => (props.fontFamily = e.target.value))}
                sx={{ mt: 1 }}
                slotProps={{
                    paper: {
                        sx: {
                            maxHeight: 200,
                        },
                    },
                }}
            >
                <MenuItem value="none">Default</MenuItem>
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Open Sans">Open Sans</MenuItem>
                <MenuItem value="Montserrat">Montserrat</MenuItem>
                <MenuItem value="Lato">Lato</MenuItem>
                <MenuItem value="Playfair Display">Playfair Display</MenuItem>
                <MenuItem value="Poppins">Poppins</MenuItem>
                <MenuItem value="Nunito">Nunito</MenuItem>
                <MenuItem value="Raleway">Raleway</MenuItem>
                <MenuItem value="Oswald">Oswald</MenuItem>
                <MenuItem value="Merriweather">Merriweather</MenuItem>
                <MenuItem value="Ubuntu">Ubuntu</MenuItem>
                <MenuItem value="Rubik">Rubik</MenuItem>
                <MenuItem value="Inter">Inter</MenuItem>
                <MenuItem value="Bebas Neue">Bebas Neue</MenuItem>
                <MenuItem value="Quicksand">Quicksand</MenuItem>
                <MenuItem value="Muli">Muli</MenuItem>
                <MenuItem value="PT Sans">PT Sans</MenuItem>
                <MenuItem value="Work Sans">Work Sans</MenuItem>
                <MenuItem value="Source Sans Pro">Source Sans Pro</MenuItem>
                <MenuItem value="Fira Sans">Fira Sans</MenuItem>
                <MenuItem value="Inconsolata">Inconsolata</MenuItem>
                <MenuItem value="Cabin">Cabin</MenuItem>
                <MenuItem value="Anton">Anton</MenuItem>
                <MenuItem value="Noto Sans">Noto Sans</MenuItem>
                <MenuItem value="Heebo">Heebo</MenuItem>
                <MenuItem value="Signika">Signika</MenuItem>
                <MenuItem value="Savate">Savate</MenuItem>
                <MenuItem value="Mukta">Mukta</MenuItem>
                <MenuItem value="Josefin Sans">Josefin Sans</MenuItem>
                <MenuItem value="Teko">Teko</MenuItem>
                <MenuItem value="Arimo">Arimo</MenuItem>
                <MenuItem value="IBM Plex Sans">IBM Plex Sans</MenuItem>
                <MenuItem value="DM Sans">DM Sans</MenuItem>
                <MenuItem value="Karla">Karla</MenuItem>
                <MenuItem value="Manrope">Manrope</MenuItem>
                <MenuItem value="Caveat">Caveat</MenuItem>
                <MenuItem value="Exo 2">Exo 2</MenuItem>
                <MenuItem value="Honk">Honk</MenuItem>
                <MenuItem value="Catamaran">Catamaran</MenuItem>
                <MenuItem value="Playwrite Australia QLD">Playwrite Australia QLD</MenuItem>
                <MenuItem value="Abel">Abel</MenuItem>
                <MenuItem value="Dancing Script">Dancing Script</MenuItem>
                <MenuItem value="Crimson Text">Crimson Text</MenuItem>
                <MenuItem value="Cinzel">Cinzel</MenuItem>
                <MenuItem value="Zilla Slab">Zilla Slab</MenuItem>
                <MenuItem value="Courier New">Courier New</MenuItem>
                <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                <MenuItem value="sans-serif">sans-serif</MenuItem>
                <MenuItem value="serif">serif</MenuItem>
                <MenuItem value="cursive">cursive</MenuItem>
                <MenuItem value="Bitcount Prop Single">Bitcount Prop Single</MenuItem>
                <MenuItem value="Bitcount">Bitcount</MenuItem>
                <MenuItem value="Playwrite Magyarország">Playwrite Magyarország</MenuItem>
                <MenuItem value="Playfair Display">Playfair Display</MenuItem>
            </Select>

            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 5 }}>
                    Text Color
                </Typography>
                <IconButton
                    onClick={handleClick}
                    sx={{
                        bgcolor: color.hex,
                        border: "1px solid #000000",
                        p: 1,
                    }}
                >
                    <PaletteIcon sx={{ color: "#000000" }} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem disableRipple sx={{ p: 0 }}>
                    <ColorPicker
                        hideInput={["rgb", "hsv"]}
                        color={color}
                        onChange={(newColor) => {
                            setColor(newColor);
                            setProp((props) => {
                                props.textColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>

             <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 5 }}>
                    Shadow Color
                </Typography>
                <IconButton
                    onClick={handleShadowClick}
                    sx={{
                        bgcolor: shadowcolor.hex,
                        border: "1px solid #000000",
                        p: 1,
                    }}
                >
                    <PaletteIcon sx={{ color: "#000000" }} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={shadowanchorEl}
                open={shadowopen}
                onClose={handleShadowClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem disableRipple sx={{ p: 0 }}>
                    <ColorPicker
                        hideInput={["rgb", "hsv"]}
                        color={shadowcolor}
                        onChange={(newColor) => {
                            setShadowColor(newColor);
                            setProp((props) => {
                                props.textShadowColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
        </>
    )
}

export default TextSettingsStyle