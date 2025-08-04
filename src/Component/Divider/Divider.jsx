import React, { useRef, useEffect,useState } from "react";
import { Divider as MUIDivider, Box } from "@mui/material";
import { useNode } from "@craftjs/core";
import DividerSettings from "./DividerSettings";

function Divider({
    height = 5,
    backgroundColor = "#000000",
    width = 100,
    align = "left",
    axis = "horizontal",
    shapeType = "line"
}) {
    const {
        connectors: { connect, drag },
        actions: { setProp }
    } = useNode();
    const dividerRef = useRef(null);
    const [onHover, setOnHover] = useState(false);

    useEffect(() => {
        if (dividerRef.current) {
            connect(drag(dividerRef.current));
        }
    }, []);

    const adjustedHeight = shapeType === "line" ? height : Math.max(height, 100);
    const adjustedwidth = shapeType === "line" ? width : Math.max(width, 50);
    return (
        <Box
            ref={dividerRef}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            sx={{
                display: 'flex',
                justifyContent: align || 'left',
                width: '100%',
                cursor: onHover ? 'pointer' : 'default',
                border: onHover ?'2px solid #4ca1fa':'none'
            }}
        >
            {shapeType === "line" ? (
                <Box
                    sx={{
                        height: `${height}px`,
                        backgroundColor,
                        width: `${width}%`
                    }}
                />
            ) : (
                <Box sx={{
                    width: axis === "vertical" ? `${adjustedwidth}px` : `${width}%`,
                    height: axis === "vertical" ? `${height}px` : `${adjustedHeight}px`,
                    overflow: "hidden",
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 150"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="none"
                        style={{
                            transform: axis === "vertical" ? "rotate(90deg)" : "none",
                            transformOrigin: "center",
                        }}>
                        {shapeType === "wave" && (
                            <>
                                <defs>
                                    <pattern
                                        id="wave-pattern"
                                        width="120"
                                        height="60"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M0 30 Q30 0, 60 30 T120 30"
                                            fill="none"
                                            stroke={backgroundColor}
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </pattern>
                                </defs>

                                <rect
                                    width={axis === "vertical" ? `${width}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : "60"}
                                    fill="url(#wave-pattern)"
                                />

                            </>
                        )}
                        {shapeType === "zigzag" && (
                            <>
                                <defs>
                                    <pattern
                                        id="zigzag-pattern"
                                        width="60"
                                        height="60"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M0 30 L15 0 L30 30 L45 0 L60 30"
                                            fill="none"
                                            stroke={backgroundColor}
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={axis === "vertical" ? `${height}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : `${height}px`}
                                    fill="url(#zigzag-pattern)"
                                />

                            </>
                        )}
                        {shapeType === "outarrow" && (
                            <>
                                <defs>
                                    <pattern
                                        id="outward-arrow-pattern"
                                        width="80"
                                        height="50"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M0 0 L20 25 L0 50 H30 L50 25 L30 0 H0 Z"
                                            fill={backgroundColor}
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={axis === "vertical" ? `${height}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : "50"}
                                    fill="url(#outward-arrow-pattern)"
                                />
                                {/* <rect width="100%" height="50" fill="url(#outward-arrow-pattern)" /> */}
                            </>
                        )}
                        {shapeType === "wavystar" && (
                            <>
                                <defs>
                                    <pattern
                                        id="stars-pattern"
                                        width="100"
                                        height="80"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            fill="none"
                                            stroke={backgroundColor}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M250 15h0a50 50 0 0 0-50 50h0s0 0 0 0a50 50 0 0 0-50-50h0a50 50 0 0 0-50 50h0s0 0 0 0a50 50 0 0 0-50-50h0A50 50 0 0 0 0 65h0s0 0 0 0a50 50 0 0 0-50-50h0M-50 65h0A50 50 0 0 0 0 15h0s0 0 0 0a50 50 0 0 0 50 50h0a50 50 0 0 0 50-50h0s0 0 0 0a50 50 0 0 0 50 50h0a50 50 0 0 0 50-50h0s0 0 0 0a50 50 0 0 0 50 50h0"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={axis === "vertical" ? `${height}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : "80"}
                                    fill="url(#stars-pattern)"
                                />
                                {/* <rect width="100%" height="80" fill="url(#stars-pattern)" /> */}
                            </>
                        )}
                        {shapeType === "circles" && (
                            <>
                                <defs>
                                    <pattern
                                        id="circle-pattern"
                                        width="100"
                                        height="100"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle cx="50" cy="50" r="25" fill={backgroundColor} />
                                    </pattern>
                                </defs>
                                <rect
                                    width={axis === "vertical" ? `${height}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : "100"}
                                    fill="url(#circle-pattern)"
                                />
                                {/* <rect width="100%" height="100" fill="url(#circle-pattern)" /> */}
                            </>
                        )}
                        {shapeType === "diamonds" && (
                            <>
                                <defs>
                                    <pattern
                                        id="a23"
                                        width="200"
                                        height="100"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            fill={backgroundColor}
                                            d="m0 100 50-50L0 0l-10 50 10 50zM50 
                                            50l50-50 50 50-50 50zM150 
                                            50l50 50 10-50-10-50-50 50z"
                                        />
                                    </pattern>
                                </defs>
                                <rect
                                    width={axis === "vertical" ? `${height}%` : "100%"}
                                    height={axis === "vertical" ? "100%" : "101"}
                                    fill="url(#a23)"
                                />
                                {/* <rect fill="url(#a23)" width="100%" height="101" /> */}

                            </>
                        )}



                    </svg>
                </Box>
            )}

        </Box>
    )
}

export default Divider

Divider.craft = {
    props: {
        shapeType: "line",
        variant: "fullWidth",
        axis: "horizontal",
        backgroundColor: "#000000",
        height: 5,
        margin: 0,
        width: 100,
        align: "left"
    },
    displayName: "Divider",
    related: {
        settings: DividerSettings,
    }
};
