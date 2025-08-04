import React, { useState } from 'react'
import { useNode } from "@craftjs/core";
import { Box, Typography } from "@mui/material";
import VideoSettings from './VideoSettings';
import VideoSettingsStyle from './VideoSettingsStyle';
import VideocamIcon from "@mui/icons-material/Videocam";

function Video({
    width = "300px",
    height = "200px",
    alignItems = "flex-start",
    borderRadius = 0,
    padding = 0,
    borderWidth = 1,
    borderColor = "#000000",
    borderStyle = "solid"
}) {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        finalVideo,
    } = useNode((node) => ({
        finalVideo: node.data.props.video
    }));

    const [onHover, setOnHover] = useState(false);

    return (
        <>
            <Box
                ref={(ref) => connect(drag(ref))}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                display="flex"
                flexDirection="column"
                alignItems={alignItems}
                sx={{
                    border: onHover ? "2px solid #33ADA9" : "none",
                    padding: `${padding}px`
                }}
            >
                <Box
                    sx={{
                        width,
                        height,
                        backgroundColor: "#f0f0f091",
                        borderRadius: `${borderRadius}px`,
                        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative"
                    }}
                >
                    {finalVideo ? (
                        finalVideo.includes("youtube.com") || finalVideo.includes("youtu.be") ? (
                            <iframe
                                width={width}
                                height={height}
                                src={finalVideo}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    borderRadius: `${borderRadius}px`,
                                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                                    objectFit: "cover"
                                }}
                            ></iframe>
                        ) : (
                            <video
                                controls
                                width={width}
                                height={height}
                                style={{
                                    borderRadius: `${borderRadius}px`,
                                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                                    objectFit: "cover"
                                }}
                            >
                                <source src={finalVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )
                    ) : (
                        <VideocamIcon sx={{ fontSize: 48, color: "#888" }} />
                    )}

                </Box>
            </Box>
        </>
    )
}

export default Video

Video.craft = {
    props: {
        videoUrl: "",
        width: "300px",
        height: "200px",
        borderRadius: 8,
        alignItems: "flex-start",
        padding: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000"
    },
    displayName: "Video Upload",
    related: {
        settings: VideoSettings,
        styleSettings: VideoSettingsStyle
    }
};