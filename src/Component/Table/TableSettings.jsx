import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import {
  Slider,
  Typography,
  Divider,
  TextField,
  Box,
  IconButton,
  Collapse
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const TableSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    props
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    props: node.data.props
  }));

  const [openRows, setOpenRows] = useState([]);

  const toggleRow = (index) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleHeaderChange = (index, value) => {
    setProp((props) => {
      props.headerData[index] = value;
    });
  };

  const handleRowDataChange = (rowIndex, colIndex, value) => {
    setProp((props) => {
      props.rowData[rowIndex][colIndex] = value;
    });
  };

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

      <Box display="flex" alignItems="center" gap={2}>
        <Box flex={1}>
          <Typography gutterBottom>Rows</Typography>
          <TextField
            fullWidth
            type="number"
            value={props.rows}
            onChange={(e) =>
              setProp((props) => (props.rows = parseInt(e.target.value)))
            }
          />
        </Box>

        <Box flex={1}>
          <Typography gutterBottom>Columns</Typography>
          <TextField
            fullWidth
            type="number"
            value={props.columns}
            onChange={(e) =>
              setProp((props) => (props.columns = parseInt(e.target.value)))
            }
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 2, mt: 2 }} />
      <Typography gutterBottom>Edit Header Data</Typography>
      {props.headerData?.map((header, index) => (
        <TextField
          key={index}
          fullWidth
          margin="dense"
          label={`Header ${index + 1}`}
          value={header}
          onChange={(e) => handleHeaderChange(index, e.target.value)}
        />
      ))}

      <Divider sx={{ mb: 2, mt: 2 }} />
      <Typography gutterBottom>Edit Row Data</Typography>
      {props.rowData?.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ mb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Row {rowIndex + 1}</Typography>
            <IconButton onClick={() => toggleRow(rowIndex)} size="small">
              {openRows.includes(rowIndex) ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </IconButton>
          </Box>

          <Collapse in={openRows.includes(rowIndex)}>
            {row.map((cell, colIndex) => (
              <TextField
                key={`${rowIndex}-${colIndex}`}
                margin="dense"
                label={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                value={cell}
                fullWidth
                onChange={(e) =>
                  handleRowDataChange(rowIndex, colIndex, e.target.value)
                }
              />
            ))}
          </Collapse>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </>
  );
};
