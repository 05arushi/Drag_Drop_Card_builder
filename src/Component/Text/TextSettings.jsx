import React, { useMemo } from "react";
import { useNode } from "@craftjs/core";
import { Slider, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import "react-color-palette/css";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const TextSettings = () => {

  const {
    actions: { setProp },
    props,
    textAlign
  } = useNode((node) => ({
    props: node.data.props,
    textAlign: node.data.props.textAlign,
  }));

  const handleChange = (e) => {
    setProp((props) => (props.textAlign = e.target.value), 500);
  };

  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      placeholder: "Type markdown text...",
      toolbar: ["bold", "italic", "heading", "|", "code", "quote"],
    }),
    []
  );

  return (
    <>
      <Typography variant="subtitle2">Text</Typography>
      <Box sx={{ width: '300px' }}>
        <SimpleMDE
          value={props.text}
          onChange={(value) => setProp((props) => (props.text = value))}
          options={mdeOptions}
        />
      </Box>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Typography variant="subtitle2" sx={{ mt: 2 }}>Font Size</Typography>
      <Slider
        value={props.fontSize}
        onChange={(e, val) => setProp((props) => (props.fontSize = val))}
        min={10}
        max={48}
      />
      <Divider sx={{ mb: 2, mt: 2 }} />
      <FormControl fullWidth>
        <InputLabel>Text Align</InputLabel>
        <Select value={textAlign || "left"} onChange={handleChange} label="Text Align">
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
          <MenuItem value="justify">Justify</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ mb: 2, mt: 2 }} />
    </>
  );
};
