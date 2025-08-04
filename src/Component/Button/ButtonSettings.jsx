import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import {
    TextField,
    Slider,
    Typography,
    Divider,
    FormControl,
    Select,
    MenuItem,
    Box
} from "@mui/material";
import "react-color-palette/css";

export const ButtonSettings = () => {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props
    }));

    return (
        <>
            <Typography variant="subtitle2">Text</Typography>
            <TextField
                fullWidth
                value={props.text}
                onChange={(e) =>
                    setProp((props) => (props.text = e.target.value))
                }
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle1">Size</Typography>
            <FormControl fullWidth>
                <Select
                    labelId="size-label"
                    value={props.size}
                    onChange={(e) => setProp(props => props.size = e.target.value)}
                >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>Font Size</Typography>
            <Slider
                value={props.fontSize}
                onChange={(e, val) => setProp((props) => (props.fontSize = val))}
                min={10}
                max={48}
                sx={{ width: 200, mx: 5 }}
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
        </>
    );
};
