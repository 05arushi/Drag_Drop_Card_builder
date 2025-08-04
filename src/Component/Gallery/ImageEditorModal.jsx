import React, { useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";

export const ImageEditorModal = ({ image, onSave, onClose }) => {
    const cropperRef =  useRef(null);

    const handleCropperReady = () => {
    };

    const handleSave = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const canvas = cropper?.getCroppedCanvas();
            if (canvas) {
                const croppedImage = canvas?.toDataURL();
                onSave(croppedImage);
            }
        }
    };

    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Image</DialogTitle>

            <DialogContent sx={{ height: 400 }}>
                <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    src={image?.src}
                    initialAspectRatio={1}
                    //preview=".img-preview"
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={false}
                    crop={handleCropperReady}
                />
            </DialogContent>

            <Box sx={{ px: 3, pt: 1 }}>
                <div className="img-preview" style={{ width: "100%", height: 100, overflow: "hidden" }} />
            </Box>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
