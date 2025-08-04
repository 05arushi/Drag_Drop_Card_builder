import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Divider,
    Avatar,
    Tooltip,
    IconButton
} from '@mui/material';
import { useNode } from "@craftjs/core";

function AudioSettings() {
    const {
        actions: { setProp },
        props,
        audio,
    } = useNode((node) => ({
        props: node.data.props,
        audio: node.data.props.audio,
    }));

    const [uploadedAudio, setUploadedAudio] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setUploadedAudio(url);
            setProp((props) => {
                props.audio = url;
            });
        } else {
            alert('Please upload a valid audio file.');
        }
    };
    return (
        <>
        <Box sx={{ p: 2 }}>
                <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    Upload Audio
                    <input
                        type="file"
                        accept="audio/*"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>

                {uploadedAudio && (
                    <Box sx={{ mt: 2 }}>
                        <audio
                            controls
                            style={{ width: '100%', borderRadius: '8px' }}
                        >
                            <source src={uploadedAudio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </Box>
                )}
            </Box>
        </>
    )
}

export default AudioSettings