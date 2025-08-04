import React, { useRef, useState } from "react";
import { useNode } from "@craftjs/core";
import { ImageEditorModal } from "./ImageEditorModal";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function GallerySettings() {
    const {
        actions: { setProp },
        images,
    } = useNode((node) => ({
        images: node.data.props.images,
    }));

    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleAddImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = {
                id: Date.now(),
                src: reader.result,
            };
            setProp((props) => {
                props.images = [...props.images, newImage];
            });
        };
        reader.readAsDataURL(file);
        fileInputRef.current.value = null;
    };

    const handleImageSave = (id, newSrc) => {
        setProp((props) => {
            props.images = props.images.map((img) =>
                img.id === id ? { ...img, src: newSrc } : img
            );
        });
        setSelectedImage(null);
    };

    const handleDelete = (id) => {
        setProp((props) => {
            props.images = props.images.filter((img) => img.id !== id);
        });
    };


    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Gallery
            </Typography>

            <Box
                sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, 60px)",
                    gap: 1.5,
                }}
            >
                {images.map((img) => (
                    <Box
                        key={img.id}
                        onClick={() => setSelectedImage(img)}
                        sx={{
                            position: "relative",
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            p: 0.5,
                            cursor: "pointer",
                            textAlign: "center",
                            "&:hover": {
                                boxShadow: 2,
                            },
                        }}
                    >
                        <Avatar
                            src={img.src}
                            variant="rounded"
                            sx={{ width: 50, height: 50, mx: "auto" }}
                        />
                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(img.id);
                                }}
                                sx={{
                                    position: "absolute",
                                    top: -6,
                                    right: -6,
                                    backgroundColor: "error.main",
                                    color: "#fff",
                                    width: 20,
                                    height: 20,
                                    "&:hover": {
                                        backgroundColor: "error.dark",
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" sx={{ fontSize: 12 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>

            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddImage}>
                Add Image
            </Button>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            {selectedImage && (
                <ImageEditorModal
                    image={selectedImage}
                    onSave={(newSrc) => handleImageSave(selectedImage.id, newSrc)}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </Box>
    )
}

export default GallerySettings


