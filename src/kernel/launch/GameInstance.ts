import shellEscape from "shell-escape";
import { getOSType } from "../init/AsyncInfo";

type AFListener<T> = (d: T) => unknown;

export interface GameInstance {
  running: boolean;
  pid: number;
  id: number;
  logs: string[];
  exitListener: AFListener<string>;
  logListener: AFListener<string>;
  exitCode: string;
}

export async function spawnGameProcess(
  javaPath: string,
  args: string[],
  envAdd: Record<string, string>,
  cwd: string,
  onExit: AFListener<string>,
  onLog: AFListener<string>
): Promise<GameInstance> {
  const finalCmdLine =
    mkCd(cwd) +
    "&&" +
    mkEnv(envAdd) +
    "&&" +
    shellEscape([javaPath].concat(args));
  const proc = await Neutralino.os.spawnProcess(finalCmdLine);

  const gameInstance: GameInstance = {
    running: true,
    pid: proc.pid,
    id: proc.id,
    logs: [],
    exitListener: onExit,
    logListener: onLog,
    exitCode: "", // Not yet
  };

  const listener: Neutralino.events.Handler<
    Neutralino.os.SpawnProcessResult
  > = (e) => {
    if (e) {
      if (proc.id === e.detail.pid) {
        // @ts-ignore The typings are not complete yet
        switch (e.detail.action) {
          case "stdOut":
          case "stdErr":
            // @ts-ignore
            const d = String(e.detail.data);
            console.log(`[PID ${proc.pid}] ${d}`);
            gameInstance.logs.push(d);
            break;
          case "exit":
            // @ts-ignore
            const exitCode = String(e.detail.data);
            Neutralino.events.off("spawnedProcess", listener);
            console.log(`Process ${proc.pid} exited with code ${exitCode}.`);
            break;
        }
      }
    }
  };

  Neutralino.events.on("spawnedProcess", listener);
  console.log(`Spawned process with PID ${proc.pid}.`);

  return gameInstance;
}

function mkEnv(env: Record<string, string>): string {
  const output = [];
  const prefix = getOSType() === "windows" ? "set" : "export";
  for (const [k, v] of Object.entries(env)) {
    output.push(shellEscape([prefix, k + "=" + v]));
  }
  return output.join("&&");
}

function mkCd(cwd: string): string {
  return shellEscape(["cd", cwd]);
}
