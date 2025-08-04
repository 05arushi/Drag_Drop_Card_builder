import React, { useState, useEffect } from "react";
import { useNode } from "@craftjs/core";
import {
    Slider,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Divider,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";
import PaletteIcon from "@mui/icons-material/Palette";

function DividerSettings() {
    const {
        actions: { setProp },
        props,
        width,
        height,
        align,
        axis,
        shapeType
    } = useNode((node) => ({
        props: node.data.props,
        width: node.data.props.width,
        height: node.data.props.height,
        align: node.data.props.align,
        axis: node.data.props.axis,
        shapeType: node.data.props.shapeType
    }));

    const [color, setColor] = useColor(props.backgroundColor || "#000000");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (e) => {
        setProp((props) => (props.align = e.target.value), 500);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Changeaxis = (e) => {
        const value = e.target.value;
        let width = 100;
        let height = 5;

        if (value === "vertical") {
            width = (5 / window.innerWidth) * 100
            height = 100;
        };

        setProp((props) => {
            props.height = height;
            props.width = width;
            props.axis = value;
        }, 500);
    }


    return (
        <>
            <Typography gutterBottom>Width</Typography>
            <Slider
                value={Number(width)}
                min={0}
                max={500}
                step={1}
                onChange={(e, newValue) => setProp((props) => (props.width = newValue))}
                valueLabelDisplay="auto"
                sx={{ my: 2 }}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography gutterBottom>Height</Typography>
            <Slider
                value={Number(height)}
                min={0}
                max={200}
                step={1}
                onChange={(e, newValue) => setProp((props) => (props.height = newValue))}
                valueLabelDisplay="auto"
                sx={{ my: 2 }}
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select
                    value={shapeType !== undefined ? shapeType : 'line'}
                    onChange={(e) => setProp((props) => (props.shapeType = e.target.value))}
                    label="Style"
                >
                    <MenuItem value="line">Line</MenuItem>
                    <MenuItem value="wave">Wave</MenuItem>
                    <MenuItem value="zigzag">Zigzag</MenuItem>
                    <MenuItem value="outarrow">Outward arrow</MenuItem>
                    <MenuItem value="wavystar">Wavy Stars</MenuItem>
                    <MenuItem value="circles">Circles</MenuItem>
                    <MenuItem value="diamonds">Diamonds</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <FormControl fullWidth>
                <InputLabel>Alignment</InputLabel>
                <Select value={align || "left"} onChange={handleChange} label="Alignment">
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                </Select>
            </FormControl>
            {/* <Divider sx={{ mb: 2, mt: 2 }} />
            <FormControl fullWidth>
                <InputLabel>Orientation</InputLabel>
                <Select value={axis || "default"} onChange={Changeaxis} label="Orientation">
                    <MenuItem value="horizontal">Horizontal</MenuItem>
                    <MenuItem value="vertical">vertical</MenuItem>
                </Select>
            </FormControl> */}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 5 }}>
                    Divider Color
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
                                props.backgroundColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
            <Divider sx={{ mt: 2, mb: 2 }} />
        </>
    )
}

export default DividerSettings

