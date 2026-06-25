import { Element } from "@craftjs/core";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import { useState, useRef, useEffect, useContext } from "react";
import MainCanvasSettings from "./MainCanvasSettings";
import { MobileViewContext } from "../../App";
import 'pattern.css';

function MainCanvas({ children,
    boxPosition = "center",
    boxStyle = "box",
    patternName = "",
    background = "#ffffff" }) {

    const isMobileView = useContext(MobileViewContext);
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
            // On mobile, fill the phone frame fully
            return {
                width: '100%',
                height: '100%',
                minHeight: '100%',
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
            sx={{
                width: '100%',
                height: isMobileView ? '100%' : '95vh',
                minHeight: isMobileView ? '100%' : '95vh',
            }}
        >
            <div
                ref={ref => connect(drag(ref))}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                elevation={0}
                className={isMobileView ? (patternName || '') : `${patternName || ''} ${getPositionClass(boxPosition)}`}
                style={{
                    position: isMobileView ? 'relative' : 'absolute',
                    backgroundColor: background,
                    ...getBoxSizeStyles(boxStyle),
                    padding: "10px",
                    boxSizing: 'border-box',
                    border: onHover ? "5px solid #4ca1fa" : "none",
                    overflow: isMobileView ? 'hidden' : 'visible',
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