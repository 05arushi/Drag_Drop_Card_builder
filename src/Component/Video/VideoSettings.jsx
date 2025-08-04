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

function VideoSettings() {
    const {
        actions: { setProp },
        props,
        type,
        finalVideo,
    } = useNode((node) => ({
        props: node.data.props,
        type: node.data.props.type || "upload",
    }));

    const [videoUrl, setVideoUrl] = useState('');
    const [uploadedVideo, setUploadedVideo] = useState(null);

    const handleUrlChange = (e) => {
        const url = getEmbedUrl(e.target.value);
        setProp((props) => {
            props.video = url;
        });
        setVideoUrl(url);
        setUploadedVideo(null);
    };

    const getEmbedUrl = (url) => {
        const youtubeMatch = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?\/]+)/
        );
        if (youtubeMatch && youtubeMatch[1]) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }

        // fallback for direct video file
        return url;
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            const url = URL.createObjectURL(file);
            setUploadedVideo(url);
            setVideoUrl('');
            setProp((props) => {
                props.video = url;
            });
        } else {
            alert('Please upload a valid video file.');
        }
    };


    return (
        <>
            <Typography variant="subtitle1">Type</Typography>
            <FormControl fullWidth>
                <Select
                    labelId="type-label"
                    value={type || "upload"}
                    onChange={(e) => setProp(props => props.type = e.target.value)}
                >
                    <MenuItem value="upload">Upload</MenuItem>
                    <MenuItem value="url">URL</MenuItem>
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2, mt: 2 }} />
            <Box sx={{ p: 2 }}>

                {type === "url" && (
                    <TextField
                        fullWidth
                        label="Video URL"
                        variant="outlined"
                        value={videoUrl}
                        onChange={handleUrlChange}
                        sx={{ mb: 2 }}
                    />
                )}

                {type === "upload" && (
                    <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                        Upload Video
                        <input
                            type="file"
                            accept="video/*"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>
                )}

                {uploadedVideo && (
                    <Box sx={{ mt: 2 }}>
                        <video
                            width="100%"
                            height="auto"
                            controls
                            style={{ borderRadius: '8px' }}
                        >
                            <source src={uploadedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                )}
                {videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            borderRadius: '8px',
                        }}
                    ></iframe>
                )}

            </Box >
        </>
    )
}

export default VideoSettings