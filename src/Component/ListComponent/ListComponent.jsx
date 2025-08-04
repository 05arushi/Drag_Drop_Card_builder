import React, { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { Box, List as MuiList, ListItem, ListItemText } from "@mui/material";
import ListComponentSettings from "./ListComponentSettings";
import TextSettingsStyle from "../Text/TextSettingsStyle";
import WebFont from 'webfontloader';
import "easymde/dist/easymde.min.css";

function ListComponent({ type = "unordered",
    items = ["Item 1", "Item 2", "Item 3"],
    fontSize = 14,
    bulletStyle = "disc",
    textAlign,
    textColor,
    fontWeight,
    textTransform,
    textDecoration,
    fontFamily,
    textShadowX,
    textShadowY,
    textShadowBlur,
    textShadowColor
}) {
    const [onHover, setOnHover] = useState(false);
    const { connectors: { connect, drag }, actions: { setProp } } = useNode();

    if (fontFamily != "none") {
        WebFont.load({
            google: {
                families: [fontFamily]
            }
        })
    }

    useEffect(() => {
        setProp((props) => {
            const newItems = [...props.items];
            for (let i = 0; i < 3; i++) {
                newItems[i] = newItems[i] || `Item ${i + 1}`;
            }
            props.items = newItems;
        });
    }, [setProp]);

    const ListTag = type === "ordered" ? "ol" : "ul";
    return (
        <>
            <Box ref={(ref) => connect(drag(ref))}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                sx={{ pl: 2 , cursor: onHover ? 'pointer' : 'default', border: onHover ?'2px solid #4ca1fa':'none'}}>
                <MuiList component={ListTag}
                    sx={{
                        listStyleType: type === "ordered" ? "decimal" : bulletStyle,
                        pl: 2
                    }}>
                    {items.map((item, index) => (
                        <ListItem key={index} sx={{ display: "list-item", padding: 0 }}>
                            <ListItemText
                                primary={
                                    <ContentEditable
                                        html={item}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
                                            setProp((props) => {
                                                props.items[index] = value;
                                            });
                                        }}
                                        style={{
                                            fontSize: `${fontSize}px`,
                                            color: textColor,
                                            textTransform,
                                            fontWeight,
                                            textAlign,
                                            textDecoration,
                                            fontFamily,
                                            textShadow:
                                                textShadowX != null &&
                                                    textShadowY != null &&
                                                    textShadowBlur != null &&
                                                    textShadowColor
                                                    ? `${textShadowX}px ${textShadowY}px ${textShadowBlur}px ${textShadowColor}`
                                                    : "none"
                                        }}
                                    />
                                }
                            />
                        </ListItem>
                    ))}
                </MuiList>
            </Box>
        </>
    )
}

export default ListComponent

ListComponent.craft = {
    props: {
        type: "unordered",
        items: ["Item 1", "Item 2", "Item 3"],
        fontSize: 14,
        bulletStyle: "disc",
        textAlign: "left",
        textColor: "#000000",
        fontWeight: null,
        textTransform: "none",
        textDecoration: "none",
        fontFamily: "none",
        textShadowX: null,
        textShadowY: null,
        textShadowBlur: null,
        textShadowColor: "#000000"
    },
    displayName: "List",
    related: {
        settings: ListComponentSettings,
        styleSettings: TextSettingsStyle
    },
};