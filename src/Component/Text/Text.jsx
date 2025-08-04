// components/user/Text.js
import React from "react";
import { useNode } from "@craftjs/core";
import { TextSettings } from "./TextSettings";
import TextSettingsStyle from "./TextSettingsStyle";
import WebFont from 'webfontloader';
import "easymde/dist/easymde.min.css";
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const Text = ({
  text,
  fontSize,
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
}) => {
  const { connectors: { connect, drag },
    actions: { setProp }
  } = useNode();

  if (fontFamily != "none") {
    WebFont.load({
      google: {
        families: [fontFamily]
      }
    })
  }

  return (
    <div
      ref={ref => connect(drag(ref))}
    >
      <div
        ref={ref => connect(drag(ref))}
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
              : "none",
          whiteSpace: "pre-wrap",
        }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(text || ''))
        }}
      />
    </div>
  )
}

Text.craft = {
  props: {
    text: "Editable Text",
    fontSize: 16,
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
  displayName: "Text",
  related: {
    settings: TextSettings,
    styleSettings: TextSettingsStyle
  }
};