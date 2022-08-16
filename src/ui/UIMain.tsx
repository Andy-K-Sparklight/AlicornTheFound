import { Button, ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { commitMsg } from "../kernel/Listeners";

export function UIMain(): JSX.Element {
  const [msg, setMsg] = useState("Say Hi");

  return (
    <ChakraProvider>
      <Button onClick={onBtnClick}>{msg}</Button>
    </ChakraProvider>
  );

  function onBtnClick(): void {
    setMsg(commitMsg("ping", "Hi"));
  }
}

export function main(): void {
  const root = createRoot(document.getElementById("afmain")!);
  root.render(<UIMain />);
}
