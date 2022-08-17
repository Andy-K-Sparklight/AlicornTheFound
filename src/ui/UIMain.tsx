import { Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";

export function RendererBase(): JSX.Element {
  return (
    <ChakraProvider>
      <Button>Click Me</Button>
    </ChakraProvider>
  );
}

export function uiMain(): void {
  attachWindowEvents();
  const root = createRoot(document.getElementById("afmain")!);
  root.render(<RendererBase />);
}

function attachWindowEvents(): void {
  Neutralino.events.on("windowClose", () => {
    Neutralino.app.exit();
  });
}
