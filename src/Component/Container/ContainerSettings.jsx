import { useState, useEffect } from 'react'
import { useNode } from "@craftjs/core";
import {
    Typography,
    Divider,
    FormControl,
    FormGroup,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment
} from "@mui/material";

function ContainerSettings() {

    const {
        actions: { setProp },
        props
    } = useNode((node) => ({
        props: node.data.props
    }));

    const [selColumnCount, setSelColumnCount] = useState(2);
    const [widths, setWidths] = useState([]);

    useEffect(() => {
        if (props.column === 2 && !selColumnCount) {
            setSelColumnCount(2);
        }
    }, [props.column]);

    const handleCheckboxChange = (label) => {
        setSelColumnCount(label);
        setProp((props) => {
            props.column = label;
        });
    };

    useEffect(() => {
        if (selColumnCount >= 2) {
            const initial = Array(selColumnCount).fill((parseFloat((100 / selColumnCount).toFixed(2))));
            setWidths(initial);
            setProp((props) => {
                props.widths = initial;
            });
        }
    }, [selColumnCount]);

    const handleChange = (value, changedIndex) => {
        const newVal = parseFloat(parseFloat(value).toFixed(2));

        if (isNaN(newVal) || newVal < 0 || newVal > 100) return;

        const otherTotal = 100 - newVal;
        const otherCount = selColumnCount - 1;

        const updatedWidths = widths.map((w, i) => {
            if (i === changedIndex) return newVal;
            return parseFloat((otherTotal / otherCount).toFixed(2));
        });
        setWidths(updatedWidths);

        setProp((props) => {
            props.widths = updatedWidths;
        });
    };

    return (
        <>
            <Divider />
            <FormControl fullWidth>
                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>Type</Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.column || 1}
                    label="Type"
                    onChange={(e) => {
                        const value = e.target.value;
                        setProp((props) => {
                            props.column = value;
                        });
                    }}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value={1}>Default</MenuItem>
                    <MenuItem value={2}>Columns</MenuItem>
                </Select>
            </FormControl>
            <Divider />
            {(props.column === 2 || props.column > 2) && (
                <>
                    <Divider />
                    <FormGroup>
                        <Typography sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>Columns</Typography>
                        {[2, 3, 4, 5].map((num) => (
                            <FormControlLabel
                                key={num}
                                control={
                                    <Checkbox
                                        checked={selColumnCount === num}
                                        onChange={() => handleCheckboxChange(num)}
                                    />
                                }
                                label={String(num)}
                            />
                        ))}
                    </FormGroup>
                </>
            )}

            {(props.column === 2 || props.column > 2) && (
                <>
                    <Divider />
                    <Typography sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>Width</Typography>
                    {widths.map((width, index) => (
                        <TextField
                            key={index}
                            label={`Width column ${index + 1}`}
                            variant="outlined"
                            value={width}
                            fullWidth
                            type="number"
                            onChange={(e) => handleChange(e.target.value, index)}
                            slotProps={{
                                input: {
                                    min: 0,
                                    max: 100,
                                },
                                endAdornment: {
                                    children: <InputAdornment position="end">%</InputAdornment>
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                    ))}
                </>
            )}

        </>
    )
}

export default ContainerSettings