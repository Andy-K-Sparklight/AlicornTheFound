import { getOSType } from "../init/AsyncInfo";

// @ts-ignore
const Aria2: any = global.Aria2;

let Aria2RPC: typeof Aria2;
let Aria2PROC: Neutralino.os.ExecCommandResult;

export async function startAria2Daemon(): Promise<void> {
  const aria2Exec = getOSType() === "windows" ? "aria2c.exe" : "aria2c";
  const secret = Math.floor(Math.random() * 1e15).toString(16);
  const cmdLine =
    aria2Exec +
    " --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --rpc-secret=" +
    secret;
  console.log("Starting Aria2 RPC.");
  Aria2PROC = await Neutralino.os.execCommand(cmdLine, { background: true });
  Aria2RPC = new Aria2({ Websocket: WebSocket, fetch: fetch, secret: secret });
  // Ping test
  await Aria2RPC.open();
  const version = await Aria2RPC.call("getVersion");
  console.log("Aria2 " + version + " started.");
}

export async function stopAria2Daemon() {
  let cmdLine: string;
  if (getOSType() === "windows") {
    cmdLine = "taskkill /PID " + Aria2PROC.pid;
  } else {
    cmdLine = "kill " + Aria2PROC.pid;
  }
  await Neutralino.os.execCommand(cmdLine);
}
