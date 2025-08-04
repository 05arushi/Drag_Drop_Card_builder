import { Element } from "@craftjs/core";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import { useState, useRef, useEffect } from "react";
import MainCanvasSettings from "./MainCanvasSettings";
import 'pattern.css';

function MainCanvas({ children,
    boxPosition = "center",
    boxStyle = "box",
    patternName = "",
    background = "#ffffff",
    isMobileView = false }) {

    const [onHover, setOnHover] = useState(false);

    const {
        connectors: { connect, drag },
        id
    } = useNode();

    const { actions, query } = useEditor();

    const isMobile = useMediaQuery('(max-width:600px)');
    const getPositionClass = (position) => {
        switch (position) {
            case 'top-left': return 'pos-top-left';
            case 'top-right': return 'pos-top-right';
            case 'bottom-left': return 'pos-bottom-left';
            case 'bottom-right': return 'pos-bottom-right';
            case 'top': return 'pos-top';
            case 'bottom': return 'pos-bottom';
            case 'left': return 'pos-left';
            case 'right': return 'pos-right';
            case 'center':
            default: return 'pos-center';
        }
    };

    const getBoxSizeStyles = (style) => {
        if (isMobileView) {
            // On mobile, all styles should be full width
            return {
                width: '100%',
                minHeight: style === 'tallbox' ? '400px' : style === 'widebox' ? '200px' : '250px',
            };
        } else {
            // Desktop styles
            switch (style) {
                case 'widebox':
                    return {
                        width: '100%',
                        minHeight: '250px',
                    };
                case 'tallbox':
                    return {
                        width: '850px',
                        minHeight: '100%',
                        margin: '0 auto',
                    };
                case 'box':
                default:
                    return {
                        width: '850px',
                        minHeight: '250px',
                        margin: '0 auto',
                    };
            }
        }
    };

    return (
        <Box
            position="relative"
            height="95vh"
        >
            <div
                ref={ref => connect(drag(ref))}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                elevation={0}
                className={`${patternName || ''} ${getPositionClass(boxPosition)}`}
                style={{
                    position: 'absolute',
                    backgroundColor: background,
                    // ...getPositionStyles(boxPosition),
                    ...getBoxSizeStyles(boxStyle),
                    padding: "10px",
                    boxSizing: 'border-box',
                    border: onHover ? "5px solid #4ca1fa" : "none",
                }}
            >
                {children}
            </div>
        </Box >
    )
}

export default MainCanvas

MainCanvas.craft = {
    props: {
        background: "#ffffff",
        boxPosition: "center",
        boxStyle: "box",
        patternName: "",
    },
    displayName: "MainCanvas",
    isCanvas: true,
    related: {
        settings: MainCanvasSettings
    }
};