import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import {
    Slider,
    Typography,
    Divider,
    Box,
    IconButton,
    MenuItem,
    Menu
} from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import PaletteIcon from "@mui/icons-material/Palette";

function ButtonSettingsStyle() {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props
    }));

    const [color, setColor] = useColor(props.color || "#1565c0");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [textcolor, setTextColor] = useColor(props.textColor || "#000000");
    const [textanchorEl, setTextAnchorEl] = useState(null);
    const opentext = Boolean(textanchorEl);

    const handleTextClick = (event) => {
        setTextAnchorEl(event.currentTarget);
    };

    const handleTextClose = () => {
        setTextAnchorEl(null);
    };

    const [bordercolor, setBorderColor] = useColor(props.borderColor || "#000000");
    const [borderanchorEl, setBorderAnchorEl] = useState(null);
    const openborder = Boolean(borderanchorEl);

    const handleBorderColor = (event) => {
        setBorderAnchorEl(event.currentTarget);
    };

    const handleBorderClose = () => {
        setBorderAnchorEl(null);
    };


    const marks = [
        {
            value: 0,
            label: 'LEFT',
        },
        {
            value: 50,
            label: 'CENTER',
        },
        {
            value: 100,
            label: 'RIGHT',
        }
    ];

    const valueToAlignment = {
        0: 'flex-start',
        50: 'center',
        100: 'flex-end',
    };

    return (
        <>
            <Typography>Alignment</Typography>
            <Box sx={{ width: 200, mx: 5 }}>
                <Slider
                    aria-label="Button alignment"
                    marks={marks}
                    defaultValue={0}
                    step={null}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => marks.find(m => m.value === value)?.label || ''}
                    onChange={(e, newValue) => {
                        setProp((props) => {
                            props.align = valueToAlignment[newValue];
                        });
                    }}
                />
            </Box>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2">Margin</Typography>
            <Slider
                value={props.margin}
                onChange={(e) => setProp((props) => (props.margin = e.target.value))}
                min={0}
                max={32}
                sx={{ width: 200, mx: 5 }}
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography>Button Corner</Typography>
            <Slider
                value={props.borderRadius}
                onChange={(e) => setProp((props) => (props.borderRadius = e.target.value))}
                min={0}
                max={15}
                sx={{ width: 200, mx: 5 }}
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography>Button Boder</Typography>
            <Slider
                value={props.borderWidth}
                onChange={(e) => setProp((props) => (props.borderWidth = e.target.value))}
                min={0}
                max={16}
                sx={{ width: 200, mx: 5 }}
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 5 }}>
                    Background Color
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
                                props.color = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 11 }}>
                    Text Color
                </Typography>
                <IconButton
                    onClick={handleTextClick}
                    sx={{
                        bgcolor: textcolor.hex,
                        border: "1px solid #000000",
                        p: 1,
                    }}
                >
                    <PaletteIcon sx={{ color: "#000000" }} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={textanchorEl}
                open={opentext}
                onClose={handleTextClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem disableRipple sx={{ p: 0 }}>
                    <ColorPicker
                        hideInput={["rgb", "hsv"]}
                        color={textcolor}
                        onChange={(newColor) => {
                            setTextColor(newColor);
                            setProp((props) => {
                                props.textColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 9 }}>
                    Border Color
                </Typography>
                <IconButton
                    onClick={handleBorderColor}
                    sx={{
                        bgcolor: bordercolor.hex,
                        border: "1px solid #000000",
                        p: 1,
                    }}
                >
                    <PaletteIcon sx={{ color: "#000000" }} />
                </IconButton>
            </Box>
            <Menu
                anchorEl={borderanchorEl}
                open={openborder}
                onClose={handleBorderClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem disableRipple sx={{ p: 0 }}>
                    <ColorPicker
                        hideInput={["rgb", "hsv"]}
                        color={bordercolor}
                        onChange={(newColor) => {
                            setBorderColor(newColor);
                            setProp((props) => {
                                props.borderColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>

        </>
    )
}

export default ButtonSettingsStyle