import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import {
    Box,
    TextField,
    Typography,
    Slider,
    Divider,
    IconButton,
    MenuItem,
    Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

function ListComponentSettings() {
    const {
        actions: { setProp },
        fontSize,
        type,
        items,
        bulletStyle,
    } = useNode((node) => ({
        fontSize: node.data.props.fontSize,
        type: node.data.props.type,
        items: node.data.props.items,
        bulletStyle: node.data.props.bulletStyle,
    }));

    const handleItemChange = (index, value) => {
        setProp((props) => {
            props.items[index] = value;
        });
    };

    const addListItem = () => {
        setProp((props) => {
            props.items.push(`Item ${props.items.length + 1}`);
        });
    };

    const removeListItem = (index) => {
        setProp((props) => {
            props.items.splice(index, 1);
        });
    };

    const toggleListType = () => {
        setProp((props) => {
            props.type = props.type === "unordered" ? "ordered" : "unordered";
        });
    };

    const bulletOptions = ["disc", "circle", "square"];

    return (
        <>
            <Typography gutterBottom>Font Size</Typography>
            <Slider
                value={fontSize}
                min={10}
                max={24}
                step={1}
                onChange={(_, value) => setProp((props) => (props.fontSize = value))}
            />

            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography gutterBottom>List Type</Typography>
                <IconButton onClick={toggleListType}>
                    {type === "ordered" ? (
                        <FormatListNumberedIcon />
                    ) : (
                        <FormatListBulletedIcon />
                    )}
                </IconButton>
            </Box>

            {type === "unordered" && (
                <>
                    <Divider sx={{ mb: 2, mt: 2 }} />
                    <Typography gutterBottom>Bullet Style</Typography>
                    <Select
                        fullWidth
                        value={bulletStyle || disc}
                        onChange={(e) => setProp((props) => (props.bulletStyle = e.target.value))}
                    >
                        {bulletOptions.map((style) => (
                            <MenuItem key={style} value={style}>
                                {style.charAt(0).toUpperCase() + style.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}

            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography gutterBottom>List Items</Typography>

            {items.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                    <TextField
                        fullWidth
                        label={`Item ${index + 1}`}
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                    />
                    <IconButton onClick={() => removeListItem(index)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Box textAlign="center" mt={2}>
                <IconButton onClick={addListItem} color="primary">
                    <AddIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default ListComponentSettings