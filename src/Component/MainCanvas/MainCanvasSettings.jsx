import React, { useState } from 'react'
import {
    TextField,
    Slider,
    Typography,
    Divider, FormControl,
    InputLabel,
    Select,
    Menu,
    MenuItem,
    IconButton,
    Box
} from "@mui/material";
import { useNode } from "@craftjs/core";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import PaletteIcon from "@mui/icons-material/Palette";

function MainCanvasSettings() {

    const {
        actions: { setProp },
        props,
        boxPosition,
        boxStyle,
        patternName
    } = useNode((node) => ({
        props: node.data.props,
        boxPosition: node.data.props.boxPosition,
        boxStyle: node.data.props.boxStyle,
        patternName: node.data.props.patternName,
    }));
    const [patternType, setPatternType] = useState('none');
    const [patternSize, setPatternSize] = useState('none');

    const [color, setColor] = useColor(props.background || "#FFFFFF");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePatternChange = (e) => {
        const selected = e.target.value;
        if (selected === 'none') {
            setPatternType('none');
            setPatternSize('none');
            setProp((props) => (props.patternName = ''), 500);
        } else {
            setPatternType(selected);
            const newSize = patternSize || 'sm';
            setPatternSize(newSize);
            setProp((props) => (props.patternName = `pattern-${selected}-${newSize}`), 500);
        }
    };

    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setPatternSize(newSize);
        if (patternType && newSize !== "none") {
            setProp((props) => (props.patternName = `pattern-${patternType}-${newSize}`), 500);
        } else {
            setProp((props) => (props.patternName = ""), 500);
        }
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select value={boxPosition || "center"}
                    onChange={(e) => setProp((props) => (props.boxPosition = e.target.value), 500)}
                    label="Box Position">
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                    <MenuItem value="top">Top</MenuItem>
                    <MenuItem value="bottom-right">Bottom-Right</MenuItem>
                    <MenuItem value="bottom-left">Bottom-Left</MenuItem>
                    <MenuItem value="top-right">Top-Right</MenuItem>
                    <MenuItem value="top-left">Top-Left</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <FormControl fullWidth>
                <InputLabel>Style</InputLabel>
                <Select value={boxStyle || "box"}
                    onChange={(e) => setProp((props) => (props.boxStyle = e.target.value), 500)}
                    label="Box Style"
                    displayEmpty
                >
                    <MenuItem value="box">Default</MenuItem>
                    <MenuItem value="widebox">Wide Box</MenuItem>
                    <MenuItem value="tallbox">Tall Box</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Pattern</InputLabel>
                <Select
                    value={patternType || "none"}
                    label="Pattern"
                    onChange={handlePatternChange}
                >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="dots">Dots</MenuItem>
                    <MenuItem value="diagonal-lines">Diagonal Lines</MenuItem>
                    <MenuItem value="zigzag">Zigzag</MenuItem>
                    <MenuItem value="checks">Checks</MenuItem>
                    <MenuItem value="vertical-stripes">Vertical Stripes</MenuItem>
                    <MenuItem value="horizontal-stripes">Horizonatal Stripes</MenuItem>
                    <MenuItem value="triangles">Triangles</MenuItem>
                    <MenuItem value="grid">Grid</MenuItem>
                    <MenuItem value="cross-dots">Cross dots</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth disabled={!patternType}>
                <InputLabel>Size</InputLabel>
                <Select
                    value={patternSize || "none"}
                    label="Size"
                    onChange={handleSizeChange}
                >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="sm">Small</MenuItem>
                    <MenuItem value="md">Medium</MenuItem>
                    <MenuItem value="lg">Large</MenuItem>
                </Select>
            </FormControl>
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
                                props.background = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
        </>
    )
}

export default MainCanvasSettings