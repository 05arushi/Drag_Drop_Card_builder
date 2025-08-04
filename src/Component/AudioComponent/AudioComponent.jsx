import React, { useState } from 'react';
import { useNode } from "@craftjs/core";
import { Box } from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AudioSettings from './AudioSettings';
import VideoSettingsStyle from '../Video/VideoSettingsStyle';

function AudioComponent({
    width = "100%",
    height = "60px",
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
        finalAudio,
    } = useNode((node) => ({
        finalAudio: node.data.props.audio
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
                    {finalAudio ? (
                        <audio
                            controls
                            style={{
                                width: "100%",
                                borderRadius: `${borderRadius}px`,
                                border: `${borderWidth}px ${borderStyle} ${borderColor}`
                            }}
                        >
                            <source src={finalAudio} />
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <AudiotrackIcon sx={{ fontSize: 48, color: "#888" }} />
                    )}
                </Box>
            </Box>
        </>
    )
}

export default AudioComponent

AudioComponent.craft = {
    props: {
        audio: "",
        width: "100%",
        height: "60px",
        borderRadius: 8,
        alignItems: "flex-start",
        padding: 0,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000"
    },
    displayName: "Audio",
    related: {
        settings: AudioSettings,
        styleSettings: VideoSettingsStyle
    }
};