import "neutralinojs-types";
import { main } from "./ui/UIMain";

function init() {
  Neutralino.init();
  Neutralino.events.on("windowClose", () => {
    Neutralino.app.exit();
  });
  main();
}
window.addEventListener("DOMContentLoaded", () => {
  init();
});
