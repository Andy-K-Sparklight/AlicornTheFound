import "neutralinojs-types";
import { kernelMain } from "./kernel/KernelMain";
import { uiMain } from "./ui/UIMain";

async function init() {
  Neutralino.init();
  await kernelMain();
  uiMain();
}

window.addEventListener("DOMContentLoaded", async () => {
  await init();
  console.log((await Neutralino.os.spawnProcess("dir")).pid);
  // await startAria2Daemon();
  // await stopAria2Daemon();
});
