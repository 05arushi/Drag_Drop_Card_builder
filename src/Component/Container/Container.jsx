// this is the main canvas + container file
import { Element } from "@craftjs/core";
import { Paper, Box } from "@mui/material";
import { useNode, useEditor } from "@craftjs/core";
import ContainerSettings from "./ContainerSettings";
import { InsideContainer } from "../InsideContainer/InsideContainer";
import { useState, useRef, useEffect } from "react";

export const Container = ({ background, padding = 0, children, onclick = true, column = 1, widths = [] }) => {
  const [onHover, setOnHover] = useState(false);
  const prevColumn = useRef(column);
  const prevChildsRef = useRef([]);
  const notEmpty = children?.props?.children?.length > 0;

  const {
    connectors: { connect, drag },
    id
  } = useNode();

  const { actions, query } = useEditor();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onclick) {
      actions.selectNode(id);
    }
  };

  useEffect(() => {
    if (column === 1) {
      const nodeData = query.node(id)?.get()?.data;
      prevChildsRef.current = nodeData.nodes;
    }
  }, [children])

  const findNodeIdByColumnId = (targetColumnId) => {
    const allNodes = query.getSerializedNodes();
    for (let nodeId in allNodes) {
      const props = allNodes[nodeId]?.props;
      if (props?.columnId === targetColumnId) {
        return nodeId;
      }
    }
    return null;
  };

  useEffect(() => {
    if (prevColumn.current === 1 && column > 1 && prevChildsRef.current.length > 0) {
      const interval = setInterval(() => {
        const targetColumnId = `col-${id}-0`;
        const targetNode = findNodeIdByColumnId(targetColumnId);
        if (targetNode) {
          prevChildsRef.current.forEach(childId => {
            actions.move(childId, targetNode, 0);
          });

          prevChildsRef.current = [];
          prevColumn.current = column;
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [column]);

  useEffect(() => {
    if (column > 1 && widths.length === column) {
      const interval = setInterval(() => {
        let allUpdated = true;

        widths.forEach((newwidth, index) => {
          console.log("index",index);
          const columnId = `col-${id}-${index}`;
          const nodeId = findNodeIdByColumnId(columnId);

          if (nodeId) {
            console.log("the node is:",nodeId);
            actions.setProp(nodeId, (props) => {
              props.width = newwidth;
            });
          } else {
            allUpdated = false; 
          }
        });
        if (allUpdated) clearInterval(interval);
      }, 500); 

      return () => clearInterval(interval);
    }
  }, [widths, column]);

  const renderColumns = () => {
    const columnsArray = Array.from({ length: column });
    return (
      <Box display="flex" gap={1} width="100%">
        {columnsArray.map((_, index) => {
          const columnId = `col-${id}-${index}`;
          const widthPercent = widths[index] || (100 / column);
          console.log("the width percentage in the container:", widthPercent);
          return (
            <Element id={columnId} key={index} columnId={columnId} is={InsideContainer} onclick={false} canvas>
              {/* Empty droppable canvas in each column */}
            </Element>
          );
        })}
      </Box>
    );
  };

  return (
    <Paper
      ref={ref => connect(drag(ref))}
      onClick={handleClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      elevation={0}
      style={{
        margin: "5px 0",
        background: (notEmpty || column > 1) ? "transparent" : background,
        padding: `${padding}px`,
        minHeight: '100px',
        border: onHover ? "1px dashed grey" : "none",
      }}
    >
      {column > 1 ? renderColumns() : children}
    </Paper>
  );
};

Container.craft = {
  props: {
    background: "#ffffff",
    padding: 20,
    onclick: false,
    column: 1,
    widths: []
  },
  displayName: "Container",
  isCanvas: true,
  related: {
    settings: ContainerSettings
  }
};
