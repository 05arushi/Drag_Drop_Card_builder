import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import { Box, Button, Typography } from "@mui/material";
import ImageUploadSettings from "./ImageUploadSettings";
import ImageStyleSettings from "./ImageStyleSettings";

export default function ImageUpload({
    imageUrl = '/image/circles.jpg',
    width = "200px",
    height = "200px",
    alignItems = "flex-start",
    borderRadius = 0,
    padding = 0,
    borderWidth,
    borderColor,
    borderStyle
}) {
    const { connectors: { connect, drag }, actions: { setProp } } = useNode();
    const [onHover, SetOnHover] = useState(false);

    return (
        <Box ref={ref => connect(drag(ref))}
            onMouseEnter={() => SetOnHover(true)}
            onMouseLeave={() => SetOnHover(false)}
            display="flex"
            flexDirection="column"
            alignItems={alignItems}
            sx={{ border: onHover ? "2px solid #33ADA9" : "none" }}>
            <Box
                component="img"
                src={imageUrl}
                alt="Uploaded"
                sx={{
                    width,
                    height,
                    padding: `${padding}px`,
                    objectFit: "cover",
                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                    borderRadius: `${borderRadius}px`,
                    background: "transparent",
                }}
            />
        </Box>
    )
}


ImageUpload.craft = {
    props: {
        imageUrl: '/image/circles.jpg',
        width: "200px",
        height: "200px",
        borderRadius: 8,
        alignItems: "flex-start",
        padding: 0,
        borderWidth: 1,
        borderStyle: "solid",
        boderColor: "#000000"
    },
    displayName: "Image Upload",
    related: {
        settings: ImageUploadSettings,
        styleSettings: ImageStyleSettings
    }
};