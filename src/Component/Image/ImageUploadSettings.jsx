import React, { useState, useRef } from 'react'
import { IconButton, Button, Divider, Avatar, Box, Tooltip, Typography } from "@mui/material";
import { useNode } from "@craftjs/core";
import { ImageEditorModal } from '../Gallery/ImageEditorModal';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";

function ImageUploadSettings() {
    const {
        actions: { setProp },
        imageUrl
    } = useNode((node) => ({
        props: node.data.props,
        imageUrl: node.data.props.imageUrl,
    }));

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageSave = (newSrc) => {
        setProp((props) => {
            props.imageUrl = newSrc;
        });
        setSelectedImage(null);
    };

    //basic imgae upload
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage({
                    id: Date.now(),
                    src: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Always open file picker to replace
    const handleClickUpload = () => {
        fileInputRef.current.click(); 
    };

    //to replace the current image with the new one
    const handleImageEdit = () => {
        if (imageUrl) {
            setSelectedImage({ id: Date.now(), src: imageUrl });
        } else {
            fileInputRef.current.click();
        }
    };

    const handleDeleteImage = () => {
        setProp((props) => {
            props.imageUrl = '';
        });
    };

    return (
        <>
            <Typography sx={{ mt: 2 }}>Edit Image</Typography>
            <Box
                sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 60px)",
                    gap: 1.5,
                }}
            >
                {imageUrl && (
                    <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                        <Avatar
                            src={imageUrl}
                            variant="rounded"
                            sx={{ width: 64, height: 64, border: '1px solid #ccc' }}
                        />

                        <Tooltip title="Edit Image">
                            <IconButton
                                size="small"
                                onClick={handleImageEdit}
                                sx={{
                                    position: 'absolute',
                                    bottom: -10,
                                    right: -10,
                                    backgroundColor: 'primary.main',
                                    color: '#fff',
                                    width: 28,
                                    height: 28,
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        {/* Delete icon */}
                        <Tooltip title="Remove Image">
                            <IconButton
                                size="small"
                                onClick={handleDeleteImage}
                                sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -10,
                                    backgroundColor: 'error.main',
                                    color: '#fff',
                                    width: 24,
                                    height: 24,
                                    '&:hover': {
                                        backgroundColor: 'error.dark',
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>
            <Button variant="outlined" onClick={handleClickUpload} sx={{ mt: 1, mb: 2 }}>
                Upload Image
            </Button>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageUpload}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            {selectedImage && (
                <ImageEditorModal
                    image={selectedImage}
                    onSave={handleImageSave}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </>
    )
}

export default ImageUploadSettings