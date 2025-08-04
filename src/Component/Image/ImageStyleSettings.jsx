import React, { useState, useEffect } from 'react'
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
import { useNode } from "@craftjs/core";
import { ColorPicker, useColor } from "react-color-palette";
import PaletteIcon from "@mui/icons-material/Palette";

function ImageStyleSettings() {
    const {
        actions: { setProp },
        data,
        componentname,
        width,
        height,
        alignItems,
        objectFit,
        borderRadius,
        padding,
        borderWidth,
        props,
        borderStyle
    } = useNode((node) => ({
        data: node.data,
        componentname: node.data.name,
        props: node.data.props,
        width: node.data.props.width,
        height: node.data.props.height,
        alignItems: node.data.props.alignItems,
        objectFit: node.data.props.objectFit,
        borderRadius: node.data.props.borderRadius,
        padding: node.data.props.padding,
        borderWidth: node.data.props.borderWidth,
        borderStyle: node.data.props.borderStyle,
    }));

    const options = [
        { label: 'Default', value: 'contain' },
        { label: 'Cover', value: 'cover' },
        { label: 'Fill', value: 'fill' },
        { label: 'None', value: 'none' },
    ];
    const borderStyles = ['solid', 'dotted', 'dashed'];

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

    const [color, setColor] = useColor(props.borderColor || "#000000");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            {componentname === "GalleryComponent" && (
                <>
                    <FormControl fullWidth size="small" sx={{ my: 2 }}>
                        <InputLabel id="fit-label">Image Fit</InputLabel>
                        <Select
                            labelId="fit-label"
                            value={objectFit || 'contain'}
                            label="Image Fit"
                            onChange={(e) =>
                                setProp((props) => {
                                    props.objectFit = e.target.value;
                                })
                            }
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )
            }
            {componentname !== "GalleryComponent" && (
                <>
                    <Typography gutterBottom>Width</Typography>
                    <Slider
                        value={Number(width)}
                        min={0}
                        max={1000}
                        step={1}
                        onChange={(e, newValue) => setProp((props) => (props.width = newValue))}
                        valueLabelDisplay="auto"
                        sx={{ my: 2 }}
                    />

                    <Typography gutterBottom>Height</Typography>
                    <Slider
                        value={Number(height)}
                        min={0}
                        max={1000}
                        step={1}
                        onChange={(e, newValue) => setProp((props) => (props.height = newValue))}
                        valueLabelDisplay="auto"
                        sx={{ my: 2 }}
                    />

                    <Divider sx={{ mt: 2, mb: 2 }} />

                    <Typography sx={{ mt: 2 }}>Alignment</Typography>
                    <Box sx={{ width: 200, mx: 5 }}>
                        <Slider
                            aria-label="Image alignment"
                            marks={marks}
                            defaultValue={0}
                            step={null}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => marks.find((m) => m.value === value)?.label || ""}
                            onChange={(e, newValue) => {
                                setProp((props) => {
                                    props.alignItems = valueToAlignment[newValue];
                                });
                            }}
                        />
                    </Box>

                    <Divider sx={{ mt: 2, mb: 2 }} />
                </>
            )}


            <Typography gutterBottom>Corner Rounding</Typography>
            <Slider
                value={Number(borderRadius)}
                min={0}
                max={100}
                step={1}
                onChange={(e, newValue) => setProp((props) => (props.borderRadius = newValue))}
                valueLabelDisplay="auto"
                sx={{ my: 2 }}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography gutterBottom>Padding</Typography>
            <Slider
                value={parseInt(padding)}
                onChange={(_, value) => setProp((props) => (props.padding = value))}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ mr: 5 }}>
                    Boder Color
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
                                props.borderColor = newColor.hex;
                            });
                        }}
                    />
                </MenuItem>
            </Menu>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Border Width
                </Typography>
                <Slider
                    size="small"
                    value={borderWidth}
                    min={0}
                    max={10}
                    step={1}
                    onChange={(e, val) =>
                        setProp((props) => (props.borderWidth = val), 500)
                    }
                    valueLabelDisplay="auto"
                />
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Border Style
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Slider
                        size="small"
                        value={borderStyles.indexOf(borderStyle)}
                        min={0}
                        max={2}
                        step={1}
                        onChange={(e, val) =>
                            setProp((props) => (props.borderStyle = borderStyles[val]), 500)
                        }
                        sx={{ flex: 1 }}
                    />

                    <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 1.5,
                            pointerEvents: 'none',
                        }}
                    >
                        {borderStyle}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default ImageStyleSettings