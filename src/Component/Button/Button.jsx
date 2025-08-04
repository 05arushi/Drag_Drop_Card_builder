// components/user/Button.js
import React, { useRef, useEffect } from "react";
import { Button as MaterialButton, Box } from "@mui/material";
import { useNode } from "@craftjs/core";
import ContentEditable from 'react-contenteditable';
import { ButtonSettings } from "./ButtonSettings";
import ButtonSettingsStyle from "./ButtonSettingsStyle";

export const Button = ({
  size = "medium",
  variant = "contained",
  color = "#1565c0",
  text = "Click me",
  fontSize,
  margin,
  textColor = "#000000",
  align = "flex-start",
  borderRadius = 0, borderWidth = 0,
  borderColor = "#000000",
  borderStyle = "solid" }) => {

  const {
    connectors: { connect, drag },
    actions: { setProp }
  } = useNode();

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      connect(drag(buttonRef.current));
    }
  }, []);

  return (
    <Box
      ref={buttonRef}
      sx={{
        display: 'flex',
        justifyContent: align,
        width: '100%',
        margin: `${margin}px`
      }}
    >
      <MaterialButton
        size={size}
        variant={variant}
        sx={{
          backgroundColor: color,
          border: `${borderWidth}px ${borderStyle} ${borderColor}`,
          borderRadius: borderRadius
        }}
      >
        <ContentEditable
          html={text}
          onChange={e =>
            setProp(props =>
              props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
            )
          }
          tagName="p"
          style={{
            fontSize: `${fontSize}px`,
            color: textColor,
            margin: 0
          }}
        />
      </MaterialButton>
    </Box>
  );
};

Button.craft = {
  props: {
    size: "medium",
    variant: "contained",
    color: "#1565c0",
    text: "Click me",
    fontSize: 13,
    align: "flex-start",
    margin: 0,
    textColor: "#000000",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid"
  },
  displayName: "Button",
  related: {
    settings: ButtonSettings,
    styleSettings: ButtonSettingsStyle
  }
};
