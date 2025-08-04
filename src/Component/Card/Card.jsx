import React from "react";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";
import { Container } from "../Container/Container";
import { useNode, Element } from "@craftjs/core";

export const Card = ({ background, padding = 20 }) => {
  return (
    <Container background={background} padding={padding}>
      {/* Canvas Node of type div */}
      <Element id="text" is="div" canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>

      {/* Canvas Node of type div */}
      <Element id="buttons" is="div" canvas>
        <Button size="small" text="Learn more" />
      </Element>
    </Container>
  );
};

Card.craft = {
  props: {
    background: "#d3d3d37b",
    padding: 20,
  },
  displayName: "Card",
};
