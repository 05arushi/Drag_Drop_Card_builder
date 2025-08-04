// this is the main canvas+container file
import { Element } from "@craftjs/core";
import { Paper, Box } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import { useState, useRef, useEffect } from "react";
export const InsideContainer = ({ padding = 0, children, onclick = false }) => {
  const [onHover, setOnHover] = useState(false);
  const notEmpty = children?.props?.children?.length > 0;
  const {
    connectors: { connect, drag },
    id,
    width = '100%'
  } = useNode((node) => ({
    width: node.data.props.width,
  }));

  const handleClick = (e) => {
    if (onclick === false) {
      e.stopPropagation();
    }
  };
  console.log("nonEmpty value in inside container:",notEmpty);

  return (
    <Paper
      ref={ref => connect(drag(ref))}
      elevation={0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={handleClick}
      style={{
        margin: "5px 0",
        background: notEmpty ? "tranparent" : "#F1F1F2",
        padding: `${padding}px`,
        minHeight: '100px',
        border: onHover ? '1px dotted black' : "none",
        width: `${width}%`,
      }}
    >
      {children}
    </Paper>
  );
};

InsideContainer.craft = {
  props: {
    background: "#F1F1F2",
    padding: 20,
    onclick: false,
    column: 1,
  },
  displayName: "InsideContainer",
  isCanvas: true,
};