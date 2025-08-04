import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import GallerySettings from "./GallerySettings";
import { Box, Grid, Paper } from "@mui/material";
import ImageStyleSettings from "../Image/ImageStyleSettings";

export const GalleryComponent = ({ images ,  objectFit}) => {
    const {
        connectors: { connect, drag },
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
    } = useNode((node) => ({
        borderRadius: node.data.props.borderRadius,
        borderWidth: node.data.props.borderWidth,
        borderColor: node.data.props.borderColor,
        borderStyle: node.data.props.borderStyle,
    }));

    const [onHover, SetonHover] = useState(false);

    return (
        <Box
            ref={(ref) => connect(drag(ref))}
            onMouseEnter={() => SetonHover(true)}
            onMouseLeave={() => SetonHover(false)}
            sx={{
                p: 2,
                border: onHover ? "2px solid #ccc" : "none",
                borderRadius: 2,
            }}
        >
            <Grid container spacing={2}>
                {images?.map((img) => (
                    <Grid item key={img.id}>
                        <Paper
                            elevation={0}
                            sx={{
                                overflow: "hidden",
                                borderRadius: 1,
                                background: "transparent"
                            }}
                        >
                            <img
                                src={img.src}
                                alt=""
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    maxWidth: "400px",
                                    maxHeight: "600px",
                                    objectFit: `${objectFit}` || "contain",
                                    display: "block",
                                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                                    borderRadius: `${borderRadius}px`,
                                }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

GalleryComponent.craft = {
    displayName: "Gallery",
    props: {
        images: [
            {
                id: 1,
                src: '/image/circles.jpg',
            },
        ],
        objectFit: "contain",
        borderRadius: 8,
        alignItems: "flex-start",
        borderWidth: 1,
        borderStyle: "solid",
        boderColor: "#000000"
    },
    related: {
        settings: GallerySettings,
        styleSettings: ImageStyleSettings
    },
};
